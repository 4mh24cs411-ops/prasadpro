# Project Rules & Instructions

## Git Auto-Sync Workflow

Whenever changes are made or completed in this project, automatically synchronize the latest work with the connected Git repository following this workflow:

1. Check current Git repository status (`git status`).
2. Detect all new, modified, and deleted project files.
3. Review changes to ensure no sensitive data (`.env`, secrets, API keys, passwords, build artifacts, etc.) is included.
4. Stage appropriate changed files (`git add .` or selective staging).
5. Create a clear, meaningful commit message describing the changes.
6. Commit changes (`git commit`).
7. Pull/rebase from remote repository first if required (`git pull --rebase`).
8. Push commit to configured remote branch (`git push`).
9. Verify push was successful (`git status`).
10. Report commit hash, branch name, and files/changes synchronized.

### Safety Rules
- **Never commit** `.env`, API keys, passwords, tokens, credentials, or private files.
- **Do not force push**.
- **Do not delete or overwrite remote work**.
- If there is a merge conflict, **stop and explain the conflict** instead of automatically resolving it incorrectly.
- If there are no changes, report that the repository is up to date.
