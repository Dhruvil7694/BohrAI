---
title: Peer Review
description: Simulate a rigorous peer review with severity-graded feedback.
section: Workflows
order: 3
---

The peer review workflow simulates a thorough academic peer review of a paper, draft, or research artifact. It produces severity-graded feedback with inline annotations, covering methodology, claims, writing quality, and reproducibility.

## Usage

From the REPL:

```
/review arxiv:2401.12345
```

```
/review ~/papers/my-draft.pdf
```

From the CLI:

```bash
bohr review arxiv:2401.12345
bohr review my-draft.md
```

You can pass an arXiv ID, a URL, or a local file path. For arXiv papers, Bohr AI fetches the full PDF through AlphaXiv.

## How it works

The review workflow assigns the reviewer agent to read the document end-to-end and evaluate it against standard academic criteria. The reviewer examines the paper's claims, checks whether the methodology supports the conclusions, evaluates the experimental design for potential confounds, and assesses the clarity and completeness of the writing.

Each piece of feedback is assigned a severity level: **critical** (fundamental issues that undermine the paper's validity), **major** (significant problems that should be addressed), **minor** (suggestions for improvement), or **nit** (stylistic or formatting issues). This grading helps you triage feedback and focus on what matters most.

The reviewer also produces a summary assessment with an overall recommendation and a confidence score indicating how certain it is about each finding. When the reviewer identifies a claim that cannot be verified from the paper alone, it flags it as needing additional evidence.

## Output format

The review output includes:

- **Summary Assessment** -- Overall evaluation and recommendation
- **Strengths** -- What the paper does well
- **Critical Issues** -- Fundamental problems that need to be addressed
- **Major Issues** -- Significant concerns with suggested fixes
- **Minor Issues** -- Smaller improvements and suggestions
- **Inline Annotations** -- Specific comments tied to sections of the document

## Customization

You can focus the review by specifying what to examine: "focus on the statistical methodology" or "check the claims in Section 4 against the experimental results." The reviewer adapts its analysis to your priorities while still performing a baseline check of the full document.
