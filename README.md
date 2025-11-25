Auto Comment AI 🤖An intelligent GitHub App that automatically responds to Issues and Pull Requests using GitHub Models (GPT-4o, Llama 3, etc.).Auto Comment AI acts as a first responder for your repository. It analyzes the context of new Issues and PRs and provides helpful, context-aware responses based on your configuration.✨ FeaturesContext Aware: Reads the title and body of issues/PRs to generate relevant replies.Configurable Personality: Make the bot act like a Senior Engineer, a QA Tester, or a friendly guide via YAML config.Model Agnostic: Supports any model available via the GitHub Models API.Zero Config Fallback: Works out of the box with sensible defaults.🚀 Getting StartedPrerequisitesNode.js 18+A GitHub Personal Access Token (PAT) with access to GitHub Models (Beta).InstallationClone the repository:git clone [https://github.com/saikothasan/auto-comment-ai.git](https://github.com/saikothasan/auto-comment-ai.git)
cd auto-comment-ai
Install dependencies:npm install
Setup Environment Variables:Copy .env.example to .env:cp .env.example .env
Fill in the required values:APP_ID: Your GitHub App ID.PRIVATE_KEY: Your GitHub App Private Key.WEBHOOK_SECRET: Your Webhook Secret.AI_TOKEN: Your GitHub Personal Access Token (for AI inference).Run locally:npm run build
npm start
⚙️ ConfigurationUsers can customize the bot by creating a file at .github/auto-comment-ai.yml in their repository.Example .github/auto-comment-ai.yml:# Enable or disable the bot
active: true

# Select the AI model
model: "openai/gpt-4o"

# Define the bot's persona
systemMessage: >
  You are an expert maintainer. 
  - If this is a bug, ask for a reproduction script.
  - If this is a PR, check if tests are included.
  - Be concise and professional.

# Trigger settings
issueTrigger: true
prTrigger: true
🐳 Deployment (Docker)This repository includes a GitHub Action to automatically publish a Docker image to the GitHub Container Registry (GHCR).Running with Dockerdocker run -d \
  -e APP_ID=123 \
  -e PRIVATE_KEY="-----BEGIN..." \
  -e WEBHOOK_SECRET="secret" \
  -e AI_TOKEN="token" \
  ghcr.io/saikothasan/auto-comment-ai:latest
🛠️ Development# Run in watch mode
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test
📝 LicenseISC © 2025 Saikot Hasan
