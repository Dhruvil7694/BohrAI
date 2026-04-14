---
description: Generate testable hypotheses from current evidence and rank them by impact and falsifiability.
args: <topic-or-artifact>
section: Research Workflows
topLevelCli: true
---
Generate a hypothesis set for: $@

Goal:
- produce competing, testable hypotheses grounded in available evidence
- avoid vague brainstorming; every hypothesis must be falsifiable

Execution:
1. Inspect the provided artifact/topic context and identify strongest observations.
2. Spawn `researcher` only if source context is missing; otherwise work directly.
3. Spawn `hypothesis` to produce a structured hypothesis table with:
   - statement
   - type (descriptive / causal / boundary)
   - assumptions
   - measurable test
   - falsifier
   - expected impact
   - confidence
4. If hypotheses conflict materially, spawn `contradiction` for a quick adversarial pass.

Output requirements:
- Save one artifact to `outputs/<slug>-hypotheses.md`.
- Include "Priority tests" section with the top 3 validation actions.
- End with direct source URLs for any external material used.
