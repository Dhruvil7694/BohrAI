---
title: Experiment
description: The experiment agent designs and executes minimal tests to validate key hypotheses.
section: Agents
order: 8
---

The experiment agent is responsible for evidence generation when existing sources are insufficient.

## What it does

It defines measurable success criteria, designs the smallest decisive experiment, executes it, and records reproducible logs and artifacts.

The emphasis is speed with rigor: resolve uncertainty quickly without running oversized experiment plans.

## Output

An experiment report with plan, commands, artifact paths, metrics, and a supported/not-supported conclusion.

## Execution model

The experiment agent follows a simple loop:

1. **Define oracle** -- specify what metric/result determines success
2. **Design minimal test** -- choose the cheapest test that can falsify the claim
3. **Run and log** -- execute with explicit commands/config
4. **Interpret conservatively** -- report supported, not supported, or inconclusive

By requiring explicit artifact paths, the result can be audited and rerun by another team member.

## Good experiment outputs include

- exact command and runtime environment
- dataset/model/version identifiers
- metric values and thresholds
- failure modes and anomalies
- next recommended test

These details help prevent "it worked once on my machine" conclusions.

## When to use it

Use this agent when:

- literature does not settle the question
- two design options need empirical comparison
- a claim must be validated before adoption

For broad exploratory mapping, start with researcher/hypothesis passes first, then escalate to experiments for decisive questions.

## Limitations

Experiment outputs are only as reliable as the test design. If the oracle is weak or misaligned, results can look clean but still mislead. Pair with contradiction and verifier checks for higher confidence.

## Used by

Primary in `/replicate` and `/autoresearch`, and as an optional follow-up when `/deepresearch` identifies unresolved empirical questions.
