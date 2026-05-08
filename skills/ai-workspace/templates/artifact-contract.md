# Artifact Contract

## Purpose

This artifact stores:

- <durable output>;
- <reviewable evidence>.

## Path

Formula:

```txt
<path formula>
```

Example:

```txt
data/YYYY-MM-DD/<category>/<feature>.md
```

## Rules

- Date: <local run date | user-provided date | source field>.
- Category: <allowed values>.
- Slug: <lowercase kebab-case | source id | other rule>.
- Parent folder: create before writing.
- Overwrite: <never | ask first | version suffix>.
- Temporary files: <location or none>.

## Validation

Check:

- path matches formula;
- required fields exist;
- paired files are present;
- output is reviewable later.
