---
title: Reasoning Validator
description: The reasoning validator checks whether conclusions logically follow from evidence.
section: Agents
order: 13
---

The reasoning validator prevents polished but invalid argument chains.

## What it does

It evaluates premise-to-conclusion logic, identifies hidden assumptions, flags inference jumps, and marks claim chains as valid, weak, or invalid.

## Output

A reasoning validation report with:

- claim-by-claim logic verdicts
- identified reasoning errors
- rewrite or evidence-gap fixes

## Used by

Primary in `/reasoning-validate`, and as a quality gate in `/iterate` and final synthesis phases.
