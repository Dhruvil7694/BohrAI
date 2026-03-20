---
description: Build a prioritized reading list on a research topic with rationale for each paper.
---
Create a research reading list for: $@

Requirements:
- Use `alpha_search` with `all` mode.
- Inspect the strongest papers with `alpha_get_paper`.
- Use `alpha_ask_paper` when a paper's fit is unclear.
- Group papers by role when useful: foundational, strongest recent work, methods, benchmarks, critiques, replication targets.
- For each paper, explain why it is on the list.
- Include direct URLs for each recommended source.
- Save the final reading list to `outputs/` as markdown.
