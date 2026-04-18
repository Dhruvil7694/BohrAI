# Homepage Redesign (Website) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a complete enterprise-minimal redesign of the Astro homepage in `website` with balanced install and docs conversion paths, while keeping docs pages unchanged.

**Architecture:** Rebuild the homepage structure in `index.astro` around a split-intent hero and curated section blocks, then apply focused shell/style refinements in `Navbar.astro`, `Footer.astro`, and `global.css`. Keep all behavior inside existing Astro/Tailwind patterns, with lightweight inline script interactions for install-copy feedback.

**Tech Stack:** Astro 5, Tailwind CSS 4, shadcn/react UI wrappers currently used in project, TypeScript tooling, ESLint, Astro Check.

---

## File Structure and Responsibilities

- Modify: `website/src/pages/index.astro`
  - Owns homepage content model, section IA, CTA hierarchy, install command interactions.
- Modify: `website/src/components/Navbar.astro`
  - Owns top-level navigation clarity, CTA prominence, theme toggle continuity.
- Modify: `website/src/components/Footer.astro`
  - Owns closing trust/support links and minimal enterprise footer tone.
- Modify: `website/src/styles/global.css`
  - Owns global design tokens and reusable utility classes needed for the new homepage.

No docs routes or markdown rendering files are modified in this plan.

---

### Task 1: Baseline Validation and Safety Snapshot

**Files:**
- Modify: none
- Test: `website` lint/typecheck commands

- [ ] **Step 1: Capture current branch state before edits**

Run:
```bash
git status --short
```
Expected: existing unrelated workspace changes may appear; note them, do not revert.

- [ ] **Step 2: Validate current website baseline**

Run:
```bash
cd website
npm run typecheck
npm run lint
```
Expected: both commands complete (or known pre-existing errors are recorded before redesign work starts).

- [ ] **Step 3: Commit checkpoint note (if baseline commands are clean)**

Run:
```bash
git add -A
git commit -m "chore: capture pre-redesign baseline for website homepage"
```
Expected: commit succeeds only if this branch is dedicated to redesign work; otherwise skip commit and continue with local edits.

---

### Task 2: Rebuild Homepage Information Architecture in `index.astro`

**Files:**
- Modify: `website/src/pages/index.astro`
- Test: `website/src/pages/index.astro` render/type validation via `npm run typecheck`

- [ ] **Step 1: Write/replace homepage data structures to support curated sections**

Add or update typed arrays (example shape):
```ts
const trustPoints = [
  { title: "Private by design", detail: "Deploy inside your infrastructure with controlled access." },
  { title: "Source-grounded output", detail: "Every conclusion ties back to explicit evidence." },
  { title: "Reproducible workflows", detail: "Repeatable command paths from discovery to decision memo." },
]
```

- [ ] **Step 2: Build split-intent hero markup (balanced CTAs)**

Implement a two-column section with:
```astro
<section class="home-hero">
  <div>
    <h1>Private AI research for high-stakes decisions.</h1>
    <p>Run evidence-first workflows from question to recommendation.</p>
    <div class="flex gap-3">
      <a href="/docs/getting-started/installation" class="btn-primary">Get Started</a>
      <a href="/docs" class="btn-secondary">Explore Docs</a>
    </div>
  </div>
  <div>{/* install command card */}</div>
</section>
```

- [ ] **Step 3: Implement trust row and use-case cards**

Add sections directly after hero:
```astro
<section class="home-trust-grid">
  {trustPoints.map((point) => (
    <article class="home-surface">
      <h3>{point.title}</h3>
      <p>{point.detail}</p>
    </article>
  ))}
</section>
```

- [ ] **Step 4: Curate workflow snapshot and grouped agent capabilities**

Limit visible workflows to top 6-8 and group agent capabilities by function:
```ts
const capabilityGroups = [
  { name: "Research", items: ["Researcher", "Literature Collector", "Knowledge Graph"] },
  { name: "Synthesis", items: ["Writer", "Literature Synthesizer", "Research Planner"] },
  { name: "Validation", items: ["Reasoning Validator", "Citation Integrity", "Contradiction"] },
]
```

- [ ] **Step 5: Add closing CTA band with mirrored actions**

Implement concise final action strip:
```astro
<section class="home-cta-band">
  <p>Start with install or jump into documentation workflows.</p>
  <div class="flex gap-3">
    <a href="/docs/getting-started/installation" class="btn-primary">Get Started</a>
    <a href="/docs" class="btn-secondary">Explore Docs</a>
  </div>
</section>
```

- [ ] **Step 6: Keep install command copy interaction stable**

Retain existing behavior with robust id/class hooks:
```js
btn.addEventListener("click", function () {
  navigator.clipboard.writeText(cmd).then(function () {
    checkIcon.classList.remove("hidden")
    setTimeout(function () { checkIcon.classList.add("hidden") }, 1800)
  })
})
```

- [ ] **Step 7: Run typecheck after homepage rewrite**

Run:
```bash
cd website
npm run typecheck
```
Expected: PASS.

- [ ] **Step 8: Commit homepage IA rewrite**

Run:
```bash
git add website/src/pages/index.astro
git commit -m "feat: redesign homepage information architecture and balanced CTA flow"
```
Expected: commit succeeds with only homepage structure/content changes.

---

### Task 3: Refine Shared Navigation and Footer Shell

**Files:**
- Modify: `website/src/components/Navbar.astro`
- Modify: `website/src/components/Footer.astro`
- Test: visual and lint verification

- [ ] **Step 1: Update navbar for enterprise-minimal hierarchy**

Apply compact, high-clarity nav structure:
```astro
<nav class="site-nav">
  <a href="/" class="brand">bohr ai</a>
  <div class="nav-actions">
    <a href="/docs" class="nav-link">Docs</a>
    <a href="/docs/getting-started/installation" class="btn-primary btn-sm">Get Started</a>
    <button id="theme-toggle" aria-label="Toggle theme">...</button>
  </div>
</nav>
```

- [ ] **Step 2: Preserve theme-toggle script behavior across Astro swaps**

Ensure guarded setup:
```js
function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle")
  if (!btn || btn.dataset.bound === "1") return
  btn.dataset.bound = "1"
  // existing toggle logic
}
```

- [ ] **Step 3: Replace footer with concise enterprise footer**

Use minimal support links and trust tone:
```astro
<footer class="site-footer">
  <p>&copy; {new Date().getFullYear()} Bohr AI.</p>
  <div>
    <a href="/docs">Docs</a>
    <a href="/docs/getting-started/installation">Installation</a>
  </div>
</footer>
```

- [ ] **Step 4: Run lint for component-level changes**

Run:
```bash
cd website
npm run lint
```
Expected: PASS.

- [ ] **Step 5: Commit shell refinements**

Run:
```bash
git add website/src/components/Navbar.astro website/src/components/Footer.astro
git commit -m "feat: align navbar and footer with enterprise homepage redesign"
```
Expected: commit succeeds.

---

### Task 4: Introduce Homepage-Focused Styling in `global.css`

**Files:**
- Modify: `website/src/styles/global.css`
- Test: lint/typecheck + manual responsive check

- [ ] **Step 1: Add reusable homepage utility classes (scoped names)**

Add classes that avoid docs regressions:
```css
.home-shell { max-width: 1200px; margin-inline: auto; padding-inline: 1rem; }
.home-surface { border: 1px solid var(--border); background: var(--card); border-radius: var(--radius-lg); }
.home-kicker { letter-spacing: 0.16em; text-transform: uppercase; font-size: 0.75rem; color: var(--muted-foreground); }
```

- [ ] **Step 2: Define CTA and focus-visible consistency helpers**

```css
.btn-primary { background: var(--primary); color: var(--primary-foreground); }
.btn-secondary { border: 1px solid var(--border); background: transparent; color: var(--foreground); }
.btn-primary:focus-visible,
.btn-secondary:focus-visible,
.nav-link:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

- [ ] **Step 3: Add responsive spacing/typography helpers for hero and grids**

```css
.home-hero { display: grid; gap: 1.5rem; }
@media (min-width: 1024px) {
  .home-hero { grid-template-columns: 1.1fr 0.9fr; gap: 2rem; }
}
```

- [ ] **Step 4: Verify style changes do not break docs readability**

Run:
```bash
cd website
npm run typecheck
npm run lint
```
Expected: PASS.

- [ ] **Step 5: Commit style layer update**

Run:
```bash
git add website/src/styles/global.css
git commit -m "feat: add homepage design utilities and accessible interaction styles"
```
Expected: commit succeeds.

---

### Task 5: End-to-End Verification and Final Polish

**Files:**
- Modify: `website/src/pages/index.astro` (only if fixes required)
- Modify: `website/src/components/Navbar.astro` (only if fixes required)
- Modify: `website/src/components/Footer.astro` (only if fixes required)
- Modify: `website/src/styles/global.css` (only if fixes required)
- Test: local dev manual QA + command checks

- [ ] **Step 1: Build and run final static checks**

Run:
```bash
cd website
npm run typecheck
npm run lint
npm run build
```
Expected: all commands pass.

- [ ] **Step 2: Manual QA in browser**

Validate:
```md
- Mobile (<= 640px): hero content readable, both CTAs visible, no horizontal overflow
- Tablet (~768px): section spacing and card wrapping remain balanced
- Desktop (>= 1280px): split hero columns, scannable section rhythm
- Install copy button: copied state appears then resets
- Theme toggle: works on initial load and after Astro page swap
```

- [ ] **Step 3: Apply fixups from QA (if needed)**

Example safe fixup pattern:
```astro
<!-- Keep section wrappers consistent -->
<section class="home-shell py-16 md:py-20">...</section>
```

- [ ] **Step 4: Final redesign commit**

Run:
```bash
git add website/src/pages/index.astro website/src/components/Navbar.astro website/src/components/Footer.astro website/src/styles/global.css
git commit -m "feat: complete enterprise-minimal homepage redesign in website"
```
Expected: commit succeeds and includes only homepage redesign scope.

---

## Self-Review Against Spec

- Spec coverage: all approved sections are represented (IA, visual system, interaction behavior, content strategy, accessibility, verification).
- Placeholder scan: no TODO/TBD markers; each task includes concrete files, code patterns, and commands.
- Consistency check: all CTA destinations and target files stay aligned with homepage-only scope.

No gaps found for the approved phase scope.
