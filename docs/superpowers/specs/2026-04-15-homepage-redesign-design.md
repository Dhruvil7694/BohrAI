# Homepage Redesign Design Spec (Website)

Date: 2026-04-15  
Scope: `website` homepage only (`website/src/pages/index.astro`) with limited shared style-shell refinements (`Navbar`, `Footer`, `global.css`) as needed to support the new homepage.

## 1) Goal and Non-Goals

### Goal
Completely redesign the `website` homepage with an enterprise-minimal visual language, optimized for a balanced conversion outcome:
- drive installation intent
- drive documentation exploration

### Non-Goals
- No redesign of docs pages, docs IA, or docs content in this phase.
- No migration to Next.js.
- (The repo no longer includes a separate `website-next` app; this phase is `website` only.)

## 2) Design Principles

1. **Clarity over decoration**: Use hierarchy, spacing, and typography first.
2. **Balanced decision paths**: Present install and docs actions with equal prominence.
3. **Trust-forward tone**: Emphasize reliability, privacy, and reproducibility.
4. **Fast scanning**: Short copy blocks, predictable card patterns, clear section boundaries.
5. **Accessible by default**: Strong contrast, keyboard-visible focus, semantic structure.

## 3) Chosen Direction

Approach selected: **Split-Intent Hero** (recommended and approved).

### Rationale
- Best fit for enterprise-minimal style.
- Supports both first-time and returning visitors.
- Preserves immediate command-centric utility without overwhelming the layout.

## 4) Homepage Information Architecture

1. **Top Navigation**
   - Brand/logo
   - Docs link
   - Theme toggle (subtle)
   - Primary CTA (`Get Started`)

2. **Hero (Split Intent)**
   - Left: concise value proposition + two equal CTAs (`Get Started`, `Explore Docs`)
   - Right: install command module with copy interaction and success feedback

3. **Trust Row**
   - Three compact proof points:
     - private deployment
     - source-grounded research
     - reproducible outputs

4. **Use Cases**
   - 4-6 audience/outcome cards
   - Focus on decision impact and practical outcomes

5. **Workflow Snapshot**
   - Curated top workflows (6-8)
   - Link to docs for full command catalog

6. **Agent Capability Grid**
   - Grouped by capability class (research, synthesis, validation) instead of a long flat list

7. **Closing CTA Band**
   - Repeat dual CTA (`Get Started`, `Explore Docs`)
   - Short confidence-building line

## 5) Visual System

### Typography
- Keep IBM Plex Sans as primary typeface.
- Tighten hero heading scale and leading for strong hierarchy.
- Restrict monospace to command snippets and technical labels.

### Color and Surfaces
- Neutral base palette with one action accent.
- Reduced decorative tinting; rely on whitespace and contrast.
- Moderate radius and subtle depth (border + soft shadow) for cards/containers.

### Motion and Feedback
- Minimal motion only for micro-interactions.
- Clear copied-state feedback in command module.
- Keep transitions short and functional (not ornamental).

## 6) Interaction and Behavior

1. **Install command panel**
   - Supports command variant tabs (future-ready pattern even if one option exists now)
   - Click-to-copy with visible success indicator and timeout reset

2. **CTA behavior**
   - `Get Started` routes to installation docs path
   - `Explore Docs` routes to docs index/getting-started path
   - Both remain visible above the fold on desktop and mobile

3. **Card interactions**
   - Consistent hover/focus treatment
   - No layout shift on hover

4. **Navigation**
   - Sticky/fixed nav retained
   - Clear active state emphasis
   - Theme toggle remains available and consistent across swaps

## 7) Content Strategy

1. Rewrite hero copy to be concise and outcome-first.
2. Reduce homepage command density; prioritize representative examples.
3. Convert feature-heavy phrasing into decision-support phrasing.
4. Keep copy understandable for mixed audiences (engineering, product, leadership).

## 8) Technical Implementation Scope

### Primary file
- `website/src/pages/index.astro` (major structural/content rewrite)

### Supporting files (targeted)
- `website/src/components/Navbar.astro`
- `website/src/components/Footer.astro`
- `website/src/styles/global.css`

### Constraints
- Maintain Astro architecture and existing stack.
- Preserve existing dark/light theming behavior.
- Keep docs routes and markdown rendering untouched.

## 9) Accessibility and Quality Requirements

1. Semantic heading order (`h1` -> `h2` blocks in sequence).
2. Landmarks and actionable controls remain keyboard-reachable.
3. Focus styles are visible and consistent.
4. Color contrast meets practical readability in dark and light modes.
5. Button/link wording is explicit and action-oriented.

## 10) Verification Plan

In `website`:
1. `npm run typecheck`
2. `npm run lint`

Manual checks:
1. Responsive layout at mobile/tablet/desktop breakpoints.
2. Install command copy interaction.
3. CTA visibility and clarity above the fold.
4. Theme toggle behavior across navigation/swaps.
5. Scanability of sections and card density.

## 11) Risks and Mitigations

1. **Risk**: Homepage becomes too dense with workflows/agents.  
   **Mitigation**: Cap visible items and link out to docs.

2. **Risk**: Equal CTA weight reduces immediate install conversion for some users.  
   **Mitigation**: Keep install command in hero while retaining symmetric CTA styling.

3. **Risk**: Styling refinements in global CSS impact docs unexpectedly.  
   **Mitigation**: Prefer scoped classes for homepage patterns; keep global token changes minimal.

## 12) Definition of Done

- New homepage IA and visual system implemented in `website`.
- Enterprise-minimal style is clearly reflected.
- Balanced install + docs conversion path is explicit.
- Accessibility baseline and verification checks pass.
- No docs-page redesign included in this phase.
