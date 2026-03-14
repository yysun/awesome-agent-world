---
name: youtube-search
description: Use this skill when the user asks to search YouTube or find videos by keyword.
  Trigger on phrases like "search youtube", "find on youtube", "look up on youtube", or when the user
  provides search keywords and wants YouTube results. Always use this skill for YouTube searches.
---

# youtube-search Skill

## How to Search

```
node scripts/ytdlp-search.mjs --q "<keywords>" [--n 5] 
```

**Output JSON fields:** `ok`, `code`, `results[]` (id, title, url, duration, uploader, view_count), `stderr`

- Default `--n` to 5 unless the user specifies otherwise.
- Present results as a numbered list: title · duration · uploader · URL.
- If `ok=false`, show the most relevant stderr lines and suggest checking the search terms.