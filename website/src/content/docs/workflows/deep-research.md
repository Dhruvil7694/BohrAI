---
title: Deep Research
description: Run a thorough, multi-agent investigation that produces a cited research brief.
section: Workflows
order: 1
---

Deep research is the flagship Bohr AI workflow. It dispatches multiple researcher agents in parallel to search academic papers, web sources, and code repositories, then synthesizes everything into a structured research brief with inline citations.

## Usage

From the REPL:

```
/deepresearch What are the current approaches to mechanistic interpretability in LLMs?
```

From the CLI:

```bash
bohr deepresearch "What are the current approaches to mechanistic interpretability in LLMs?"
```

Both forms are equivalent. The workflow begins immediately and streams progress as agents discover and analyze sources.

## How it works

The deep research workflow proceeds through four phases. First, the researcher agents fan out to search AlphaXiv for relevant papers and the web for non-academic sources like blog posts, documentation, and code repositories. Each agent tackles a different angle of the topic to maximize coverage.

Second, the agents read and extract key findings from the most relevant sources. They pull claims, methodology details, results, and limitations from each paper or article. For academic papers, they access the full PDF through AlphaXiv when available.

Third, a synthesis step cross-references findings across sources, identifies areas of consensus and disagreement, and organizes the material into a coherent narrative. The writer agent structures the output as a research brief with sections for background, key findings, open questions, and references.

Finally, the verifier agent spot-checks claims against their cited sources to flag any misattributions or unsupported assertions. The finished report is saved to your session directory and can be previewed as rendered HTML with `/preview`.

## Output format

The research brief follows a consistent structure:

- **Summary** -- A concise overview of the topic and key takeaways
- **Background** -- Context and motivation for the research area
- **Key Findings** -- The main results organized by theme, with inline citations
- **Open Questions** -- Unresolved issues and promising research directions
- **References** -- Full citation list with links to source papers and articles

## Customization

You can steer the research by being specific in your prompt. Narrow topics produce more focused briefs. Broad topics produce survey-style overviews. You can also specify constraints like "focus on papers from 2024" or "only consider empirical results" to guide the agents.
