---
description: Build a reusable knowledge graph from research outputs for cross-topic reasoning.
args: <artifact-or-topic>
section: Research Workflows
topLevelCli: true
---
Build a knowledge graph for: $@

Execution:
1. Read target artifacts and extract entities, claims, and relations.
2. Spawn `knowledge-graph` to produce a normalized graph artifact.
3. Link high-confidence claims to source IDs.

Output:
- Save to `outputs/<slug>-knowledge-graph.md`.
- Include entities, relations, and claim linkage sections.
