# Validation Flow

## Goal

Prove the main workspace path works.

## Preconditions

- Host can read and write files.
- Host can run referenced scripts only when the workspace uses scripts.
- Required input files exist.

## Flow

1. Start from a realistic user request.
2. Confirm the expected root instructions or process contract apply.
3. Read required files.
4. Use process files or references only when needed.
5. Run referenced scripts only if the workflow requires them.
6. Write the expected artifact.
7. Validate the artifact path and content.
8. Report what passed and what remains unverified.

## Expected Evidence

- files inspected;
- scripts run through host tools, if any;
- outputs created;
- validation result;
- unverified gaps.
