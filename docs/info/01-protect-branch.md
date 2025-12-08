# Protect Branches with Rulesets

This guide explains how to configure GitHub Rulesets to require status checks (like ESLint) to pass before allowing merges.

## Steps to Require ESLint Checks with Rulesets

1. **Navigate to Rulesets Settings**
   - Go to your repository on GitHub.com
   - Navigate to **Settings** → **Rules** → **Rulesets**
   - Or go directly to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/rules`

2. **Create a New Ruleset**
   - Click **"New ruleset"** (or **"Add ruleset"**)

3. **Configure the Ruleset**
   - **Ruleset Name**: Enter a descriptive name (e.g., "Main branch protection")
   - **Enforcement status**: Set to **"Active"**
   - **Target branches**: Add the branches you want to protect (e.g., `main`, `master`, or use a pattern)

4. **Enable Status Check Requirements**
   - In the **Rules** section, enable:
     - ✅ **"Require status checks to pass before merging"**
     - ✅ **"Require branches to be up to date before merging"** (recommended)
   - Under **"Status checks that are required"**, select:
     - `CI / Lint (pull_request)` or `Lint` (the exact name depends on your workflow)

5. **Save the Ruleset**
   - Click **"Create ruleset"** or **"Save changes"**

## Status Check Names

The status check name comes from your GitHub Actions workflow. In `ci.yml`, the job is named `lint`, so the check will appear as:
- `CI / Lint (pull_request)` for pull request events
- `CI / Lint (push)` for push events

The status check name is typically `{workflow_name} / {job_name}` or just `{job_name}`.

## Result

After saving the ruleset, merges to protected branches will be blocked if the lint check fails. The merge button will be disabled until all required checks pass.

