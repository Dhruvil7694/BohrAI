---
title: Experiment
description: Design and execute minimal experiments to validate key hypotheses.
section: Workflows
order: 13
---

The experiment workflow resolves uncertainty through focused, reproducible tests.

## How it works

The experiment workflow is designed for fast, auditable validation:

1. **Test definition** -- sets metric, threshold, and success criteria.
2. **Minimal design** -- creates the smallest experiment that can falsify the hypothesis.
3. **Execution** -- runs commands and captures logs/artifacts.
4. **Interpretation** -- returns supported, not supported, or inconclusive with rationale.

This structure avoids overbuilding while preserving reproducibility.

## Real examples

Example 1 (run from a hypothesis file):

```
/experiment "Hypothesis H2 from outputs/topic-hypotheses.md"
```

```bash
bohr experiment "Hypothesis H2 from outputs/topic-hypotheses.md"
```

Example 2 (direct objective):

```
/experiment "Does adaptive chunking reduce hallucination rate in legal QA?"
```

```bash
bohr experiment "Does adaptive chunking reduce hallucination rate in legal QA?"
```

## Expected output

Primary output file:

- `outputs/<slug>-experiment.md`

Typical structure:

- hypothesis and metric definition
- environment and command details
- execution log with artifact paths
- outcome classification and next test recommendation

Example snippet:

```markdown
## Conclusion
- Outcome: Inconclusive
- Reason: Improvement observed on 2/3 datasets; confidence interval overlaps baseline on one set.
- Next step: Increase sample size and rerun with fixed retrieval seed.
```

## Customization

You can set:

- **metric preference** -- latency, accuracy, cost, error rate, etc.
- **environment** -- local, containerized, or GPU-backed
- **budget/time limits** -- max runtime or iteration count
- **strictness** -- require statistically significant improvement before marking supported

## When to use

Use this when existing literature or prior runs do not settle a decision and you need a decisive empirical check.

If you are still defining hypotheses, run `/hypothesis` first.
