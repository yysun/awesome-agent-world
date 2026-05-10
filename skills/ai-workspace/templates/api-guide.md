# API Guide

Use this with the API contract file.

## Contract Source

Use:

```txt
process/api.yaml
```

Rules:

- use only documented routes;
- do not invent endpoints;
- inspect required fields before calls;
- report missing capability when no route exists.

## Auth

Load required variables from the workspace environment:

- `<BASE_URL_ENV>`;
- `<TOKEN_ENV>`.

Never print, log, or store secrets.

Create `.env.example` with variable names when env vars are required.
Add `.env` to `.gitignore` when local secrets are expected.
Do not create a real `.env` unless the user supplies non-secret values.

## Transport

Prefer host tools and simple shell calls.
Do not add scripts by default.

Use scripts only for:

- pagination;
- joins;
- validation;
- artifact generation;
- repeated structured processing.

## Read Flow

1. Read `process/api.yaml`.
2. Select exact method and path.
3. Gather required params.
4. Call the API.
5. Save raw response if durable evidence is needed.
6. Summarize useful fields.

## Write Gate

Before `POST`, `PUT`, `PATCH`, or `DELETE`:

1. Show method and route.
2. Show path and query params.
3. Show JSON body.
4. Ask for explicit approval.
5. Send only after approval.
6. Report confirmed result.

## Raw Response Storage

Store raw responses under:

```txt
data/api-responses/<yyyy>/<mm>/<dd>/<slug>.json
```

Do not store secrets.
