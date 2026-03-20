---
name: paper-code-audit
description: Use this when the task is to compare a paper against its repository, verify whether claims are implemented, or assess reproducibility risk.
---

# Paper Code Audit

## When To Use

Use this skill for:
- paper-versus-code verification
- implementation gap analysis
- reproducibility audits
- checking whether public code matches reported results

## Procedure

1. Locate the paper with `alpha_search`.
2. Load the paper with `alpha_get_paper`.
3. Extract implementation-relevant details using `alpha_ask_paper`:
   - datasets
   - preprocessing
   - model architecture
   - hyperparameters
   - evaluation protocol
4. If the paper links a repository, inspect it using `alpha_read_code`.
5. Compare paper claims against code realities:
   - are all components present
   - do defaults match the paper
   - are metrics/eval scripts exposed
   - are hidden assumptions required
6. Record concrete mismatches, not vibes.
7. Save the audit in `outputs/`.
8. If you find a durable gotcha, save it with `alpha_annotate_paper`.
9. End with a `Sources` section for the paper and repository.

## Pitfalls

- Do not infer repository behavior without opening the relevant files.
- Do not assume README claims reflect the actual defaults.
- Do not mark something as missing if it exists under another name without checking.

## Deliverable

Include:
- paper summary
- repository coverage
- confirmed matches
- mismatches or omissions
- reproducibility risks
- recommended next actions
- sources
