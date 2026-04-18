/**
 * Staged pipeline diagrams for /workflows/[slug] — consumed by gen-workflow-pages.mjs.
 * Kept as JS so the generator stays a single import without TS compilation.
 */

export const workflowPipelines = {
  "deep-research": {
    columns: [
      {
        stage: "01 · PROMPT",
        nodes: [{ variant: "outline", lines: ["you (REPL)", "/deepresearch …"] }],
      },
      {
        stage: "02 · ORCHESTRATE",
        nodes: [{ variant: "hero", lines: ["orchestrator", "PLAN · DISPATCH"] }],
      },
      {
        stage: "03 · GATHER",
        nodes: [
          { lines: ["researcher ×4"] },
          { lines: ["lit-collector"] },
          { lines: ["evidence-scorer"] },
        ],
      },
      {
        stage: "04 · CHALLENGE",
        nodes: [
          { lines: ["contradiction"] },
          { lines: ["reasoning-validator"] },
          { lines: ["knowledge-graph"] },
        ],
      },
      {
        stage: "05 · DELIVER",
        nodes: [
          { lines: ["writer → verifier"] },
          { lines: ["reviewer"] },
          { variant: "hero", lines: ["iteration-ctrl"] },
        ],
      },
    ],
    loopCaption: "LOOP UNTIL CONVERGENCE · RESEARCH → REVIEW → IMPROVE",
  },

  "literature-review": {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/lit …"] }] },
      { stage: "02 · COLLECT", nodes: [{ variant: "hero", lines: ["orchestrator", "SEARCH · ROUTE"] }] },
      {
        stage: "03 · SYNTHESIZE",
        nodes: [{ lines: ["theme clustering"] }, { lines: ["consensus map"] }],
      },
      {
        stage: "04 · TENSION",
        nodes: [{ lines: ["disagreements"] }, { lines: ["gap scan"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["reviewer polish"] }, { lines: ["survey doc"] }] },
    ],
  },

  "lit-review": {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/lit-review …"] }] },
      { stage: "02 · SOURCES", nodes: [{ variant: "hero", lines: ["planner", "SCOPE · COLLECT"] }] },
      {
        stage: "03 · ANALYSIS",
        nodes: [{ lines: ["theme map"] }, { lines: ["contradiction scan"] }, { lines: ["gap analysis"] }],
      },
      {
        stage: "04 · VALIDATE",
        nodes: [{ lines: ["validator"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["lit-review writer"] }, { lines: ["validated survey"] }] },
    ],
  },

  paper: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/paper …"] }] },
      { stage: "02 · DRAFT", nodes: [{ variant: "hero", lines: ["outline → sections", "STRUCTURE"] }] },
      {
        stage: "03 · ASSETS",
        nodes: [{ lines: ["figures & tables"] }, { lines: ["method / math"] }],
      },
      {
        stage: "04 · COMPLIANCE",
        nodes: [{ lines: ["paper checks"] }],
      },
      { stage: "05 · REVIEW", nodes: [{ lines: ["review pass"] }, { lines: ["submission draft"] }] },
    ],
  },

  review: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/review …"] }] },
      { stage: "02 · INGEST", nodes: [{ variant: "hero", lines: ["orchestrator", "SCOPE · ALLOCATE"] }] },
      {
        stage: "03 · REVIEW",
        nodes: [{ lines: ["reviewer agent"] }, { lines: ["severity grades"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["inline notes"] }, { lines: ["review report"] }] },
    ],
  },

  audit: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/audit …"] }] },
      { stage: "02 · MAP", nodes: [{ variant: "hero", lines: ["orchestrator", "CLAIM · CODE"] }] },
      {
        stage: "03 · TRACE",
        nodes: [{ lines: ["code retrieval"] }, { lines: ["claim→code map"] }],
      },
      {
        stage: "04 · FIND",
        nodes: [{ lines: ["mismatch finder"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["risk report"] }] },
    ],
  },

  replication: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/replicate …"] }] },
      { stage: "02 · PLAN", nodes: [{ variant: "hero", lines: ["planner", "GOAL · PROTOCOL"] }] },
      {
        stage: "03 · EXECUTE",
        nodes: [{ lines: ["experiment steps"] }, { lines: ["measure"] }],
      },
      {
        stage: "04 · COMPARE",
        nodes: [{ lines: ["vs paper results"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["replication notes"] }] },
    ],
  },

  compare: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/compare …"] }] },
      { stage: "02 · INGEST", nodes: [{ variant: "hero", lines: ["orchestrator", "SOURCES · ALIGN"] }] },
      {
        stage: "03 · MATRIX",
        nodes: [{ lines: ["matrix builder"] }],
      },
      {
        stage: "04 · READ",
        nodes: [{ lines: ["agree / disagree"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["matrix table"] }] },
    ],
  },

  draft: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/draft …"] }] },
      { stage: "02 · SHAPE", nodes: [{ variant: "hero", lines: ["outline", "SECTIONS"] }] },
      {
        stage: "03 · WRITE",
        nodes: [{ lines: ["writer"] }],
      },
      {
        stage: "04 · EDIT",
        nodes: [{ lines: ["editor pass"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["draft MD"] }] },
    ],
  },

  autoresearch: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/autoresearch …"] }] },
      { stage: "02 · LOOP", nodes: [{ variant: "hero", lines: ["controller", "GOAL · STOP RULES"] }] },
      {
        stage: "03 · THINK",
        nodes: [{ lines: ["analyze state"] }, { lines: ["new hypothesis"] }],
      },
      {
        stage: "04 · ACT",
        nodes: [{ lines: ["test / measure"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["report"] }] },
    ],
    loopCaption: "LOOP UNTIL STOP CRITERIA · ANALYZE → TEST → MEASURE",
  },

  watch: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/watch …"] }] },
      { stage: "02 · SCHEDULE", nodes: [{ variant: "hero", lines: ["scheduler", "CADENCE · SOURCES"] }] },
      {
        stage: "03 · FETCH",
        nodes: [{ lines: ["fetch deltas"] }],
      },
      {
        stage: "04 · SUMMARIZE",
        nodes: [{ lines: ["rolling summary"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["notify / log"] }] },
    ],
  },

  hypothesis: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/hypothesis …"] }] },
      { stage: "02 · FRAME", nodes: [{ variant: "hero", lines: ["hypothesis agent", "GENERATE · RANK"] }] },
      {
        stage: "03 · SHARPEN",
        nodes: [{ lines: ["falsifiers"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["hypothesis brief"] }] },
    ],
  },

  contradict: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/contradict …"] }] },
      { stage: "02 · ATTACK", nodes: [{ variant: "hero", lines: ["adversary", "CLAIMS · STRESS"] }] },
      {
        stage: "03 · STRESS",
        nodes: [{ lines: ["evidence stress"] }, { lines: ["counterclaims"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["risk list"] }] },
    ],
  },

  "evidence-score": {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/evidence-score …"] }] },
      { stage: "02 · RUBRIC", nodes: [{ variant: "hero", lines: ["scorer", "RUBRIC · WEIGHTS"] }] },
      {
        stage: "03 · TIER",
        nodes: [{ lines: ["tier table"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["scored sheet"] }] },
    ],
  },

  experiment: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/experiment …"] }] },
      { stage: "02 · DESIGN", nodes: [{ variant: "hero", lines: ["designer", "METRICS · CONTROLS"] }] },
      {
        stage: "03 · PROTOCOL",
        nodes: [{ lines: ["protocol"] }],
      },
      {
        stage: "04 · HOOK",
        nodes: [{ lines: ["execute hook"] }],
      },
      { stage: "05 · OUTPUT", nodes: [{ lines: ["log"] }] },
    ],
  },

  "citation-check": {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/citation-check …"] }] },
      { stage: "02 · PARSE", nodes: [{ variant: "hero", lines: ["parser", "SENTENCES · CITES"] }] },
      {
        stage: "03 · VERIFY",
        nodes: [{ lines: ["map to cites"] }, { lines: ["verify support"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["flags"] }] },
    ],
  },

  "memory-log": {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/memory-log …"] }] },
      { stage: "02 · COMPRESS", nodes: [{ variant: "hero", lines: ["compressor", "ARTIFACTS → MEMORY"] }] },
      {
        stage: "03 · STORE",
        nodes: [{ lines: ["memory agent"] }, { lines: ["durable log"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["retrieval keys"] }] },
    ],
  },

  "plan-research": {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/plan-research …"] }] },
      { stage: "02 · DECOMPOSE", nodes: [{ variant: "hero", lines: ["planner", "BREAKDOWN · ORDER"] }] },
      {
        stage: "03 · GOVERN",
        nodes: [{ lines: ["checkpoints"] }, { lines: ["stop rules"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["plan doc"] }] },
    ],
  },

  "knowledge-graph": {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/knowledge-graph …"] }] },
      { stage: "02 · EXTRACT", nodes: [{ variant: "hero", lines: ["extractor", "ENTITIES · RELS"] }] },
      {
        stage: "03 · GRAPH",
        nodes: [{ lines: ["graph build"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["queries"] }] },
    ],
  },

  "reasoning-validate": {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/reasoning-validate …"] }] },
      { stage: "02 · TRACE", nodes: [{ variant: "hero", lines: ["logic tracer", "PREMISES · CHAIN"] }] },
      {
        stage: "03 · CHECK",
        nodes: [{ lines: ["validator"] }],
      },
      { stage: "04 · OUTPUT", nodes: [{ lines: ["issues"] }] },
    ],
  },

  iterate: {
    columns: [
      { stage: "01 · PROMPT", nodes: [{ variant: "outline", lines: ["you (REPL)", "/iterate …"] }] },
      { stage: "02 · CONTROL", nodes: [{ variant: "hero", lines: ["iteration-ctrl", "LOOP · GATES"] }] },
      {
        stage: "03 · WORK",
        nodes: [{ lines: ["work unit"] }],
      },
      {
        stage: "04 · OUTPUT",
        nodes: [{ lines: ["evaluate"] }, { lines: ["final"] }],
      },
    ],
    loopCaption: "LOOP UNTIL THRESHOLDS · WORK → EVALUATE → CONTINUE OR STOP",
  },
}
