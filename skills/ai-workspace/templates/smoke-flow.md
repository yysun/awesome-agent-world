# Smoke Flow

## Goal

Prove the main workspace path works.

## Preconditions

- Host can read and write files.
- Host can run skill-owned scripts.
- Required input files exist.

## Flow

1. Start from a realistic user request.
2. Confirm the expected skill triggers.
3. Read required files.
4. Use references only when needed.
5. Run host-invoked scripts if the workflow requires them.
6. Write the expected artifact.
7. Validate the artifact path and content.
8. Report what passed and what remains unverified.

## Expected Evidence

- files inspected;
- scripts run through host tools;
- outputs created;
- validation result;
- unverified gaps.
