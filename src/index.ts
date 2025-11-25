import { Probot } from "probot";
import { loadConfig } from "./config";
import { generateAIResponse } from "./ai";

export = (app: Probot) => {
  app.log.info("Auto-comment-ai app loaded!");

  app.on(["issues.opened", "pull_request.opened"], async (context) => {
    const config = await loadConfig(context);

    // 1. Check if bot is active via config
    if (!config || !config.active) {
      return;
    }

    // 2. Check specific trigger settings
    const isPr = context.name === "pull_request";
    if (isPr && !config.prTrigger) return;
    if (!isPr && !config.issueTrigger) return;

    // 3. Extract Issue/PR details
    // 'issue' object exists on both issue and PR payloads in Probot
    const { title, body, number, user } = context.payload.issue || context.payload.pull_request;
    const author = user?.login || "unknown";
    const repoName = context.payload.repository.full_name;

    app.log.info(`Processing ${context.name} #${number} in ${repoName}`);

    // 4. Construct the prompt
    const userPrompt = `
Context: New ${isPr ? "Pull Request" : "Issue"} created by @${author}.
Title: ${title}
Body:
${body || "(No description provided)"}
`;

    // 5. Call AI Service
    const aiComment = await generateAIResponse(
      config.systemMessage,
      userPrompt,
      config.model,
      app.log
    );

    // 6. Post Comment
    if (aiComment) {
      const signature = "\n\n";
      await context.octokit.issues.createComment(
        context.issue({
          body: aiComment + signature,
        })
      );
      app.log.info(`Commented on #${number}`);
    } else {
      app.log.warn(`Skipped commenting on #${number} due to AI failure.`);
    }
  });
};
