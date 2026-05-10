# Runtime Process

Use the user's workspace language for headings, filenames, and path segments.
Create this contract as a localized file under `process/`.

## Goal

Turn source evidence and business data into durable knowledge artifacts.

## Main Flow

```txt
source evidence / business data
-> object situation
-> tension
-> insight
-> action
-> local proposal or artifact
```

## Source Rules

- Name the authoritative source files or APIs.
- Do not use unsupported chat history as evidence.
- Do not invent object IDs.
- Use flat seed layer files when evidence is domain-level, not object-level.
- Use nested seed paths only when the user asks for multiple knowledge bases.
- If multiple seed knowledge bases exist, choose by documented routing rules.

## Object Rules

- Put shared layer rules in `process/`.
- Put object-type differences in localized object process files.
- Write object instances under the object-first `data/` path.
- Read the object-type contract before generating object artifacts.

## Output Boundary

- This workspace produces knowledge assets and recommendations.
- External writes require explicit approval.
- Report what was inspected, changed, and verified.
