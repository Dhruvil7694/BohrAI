---
title: Knowledge Graph
description: Build reusable entity-relation graphs from research findings.
section: Workflows
order: 17
---

The knowledge-graph workflow structures findings into reusable relational memory.

## How it works

1. Parses findings and claims from your artifact/topic.
2. Extracts entities and relation edges.
3. Links claims to source-backed evidence.
4. Produces a normalized graph artifact.

## Real examples

```
/knowledge-graph outputs/scaling-laws-brief.md
```

```bash
bohr knowledge-graph outputs/scaling-laws-brief.md
```

## Expected output

- `outputs/<slug>-knowledge-graph.md`

Includes: entities, relations, and claim-link mappings.

## Customization

- Limit to a domain slice (for example, "only compute and data-quality concepts")
- Require high-confidence claims only
- Include contradiction edges when available
