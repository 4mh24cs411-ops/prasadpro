# Project Rules & Instructions

## Git & Vercel Auto-Sync Workflow

Whenever changes are made or completed in this project, automatically synchronize the latest work with the connected Git repository and connected Vercel deployment following this workflow:

1. Validate build locally (`npm run build`).
2. Check current Git repository status (`git status`).
3. Detect all new, modified, and deleted project files.
4. Review changes to ensure no sensitive data (`.env`, secrets, API keys, passwords, build artifacts, etc.) is included.
5. Stage appropriate changed files (`git add .` or selective staging).
6. Create a clear, meaningful commit message describing the changes.
7. Commit changes (`git commit`).
8. Pull/rebase from remote repository first if required (`git pull --rebase`).
9. Push commit to configured remote branch (`git push origin main`).
10. Verify push was successful (`git status`).
11. Report commit hash, branch name, files/changes synchronized, and confirm Vercel auto-deployment trigger.

### Vercel Deployment Connection
- Remote Git Repository: `https://github.com/4mh24cs411-ops/prasadpro.git`
- Target Branch: `main`
- Automatic Trigger: Every push to `main` automatically triggers Vercel CI/CD to build and update the live web application.

### Safety Rules
- **Never commit** `.env`, API keys, passwords, tokens, credentials, or private files.
- **Do not force push**.
- **Do not delete or overwrite remote work**.
- If there is a merge conflict, **stop and explain the conflict** instead of automatically resolving it incorrectly.
- If there are no changes, report that the repository is up to date.
