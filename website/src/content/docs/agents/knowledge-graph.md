---
title: Knowledge Graph
description: The knowledge graph agent structures findings into entities and relationships.
section: Agents
order: 12
---

The knowledge graph agent converts research outputs into reusable structured knowledge.

## What it does

It extracts entities, relations, and claim dependencies from reports, then normalizes them into a graph format that can be reused across topics and sessions.

## Output

A graph artifact with:

- entity index
- relation list (depends_on, affected_by, supports, contradicts)
- claim-to-source links

## Used by

Primary in `/knowledge-graph`, and as a support pass for long-running `/deepresearch` and `/iterate` workflows.
