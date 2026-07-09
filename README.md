# Balatro Simulator

A simple React + Vite starter app for the Balatro Simulator frontend.

## Getting Started

Install dependencies:

npm install

Start the development server:

npm run dev

Build for production:

npm run build

Preview the production build locally:

npm run preview

Deploy to GitHub Pages:

npm run deploy

The repository is also configured with a GitHub Actions workflow at `.github/workflows/deploy.yml` to automatically build and deploy the app to the `gh-pages` branch on pushes to `main`.

Troubleshooting:
- If the workflow fails with a git permission error ("Write access to repository not granted"), check these:
  1. Make sure the workflow is running in the same repository (actions triggered from forks cannot push back).
  2. Ensure repository Actions permissions allow write access to contents. The workflow includes `permissions: contents: write` to request this.
  3. If your organization restricts the default GITHUB_TOKEN, create a Personal Access Token (repo scope), add it as a secret named `GH_PAGES_PAT`, and replace `github_token: ${{ secrets.GITHUB_TOKEN }}` in `.github/workflows/deploy.yml` with `github_token: ${{ secrets.GH_PAGES_PAT }}`.
