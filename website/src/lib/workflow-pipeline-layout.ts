/**
 * Layout engine for developer-tool style workflow pipeline SVGs.
 */

export type PipelineNodeVariant = 'outline' | 'dark' | 'hero'

export interface PipelineNodeInput {
  variant?: PipelineNodeVariant
  lines: string[]
}

export interface PipelineColumnInput {
  stage: string
  nodes: PipelineNodeInput[]
}

export interface PipelineDiagramInput {
  columns: PipelineColumnInput[]
  /** Shown under a dashed feedback curve when set */
  loopCaption?: string
}

export interface PlacedNode {
  col: number
  x: number
  y: number
  w: number
  h: number
  variant: PipelineNodeVariant
  lines: string[]
}

export interface PipelineLayoutResult {
  width: number
  height: number
  markerId: string
  dividerY: number
  columnCenters: number[]
  placed: PlacedNode[][]
  meshPaths: { d: string; opacity: number }[]
  arrowPath: string | null
  loopPath: string | null
  loopCaption: string | undefined
}

const W_MIN = 920
const MARGIN_X = 24
const DIVIDER_Y = 26
const CONTENT_TOP = 44
const GAP_Y = 10
/** Breathing room between column band edge and node rect (each side ~half). */
const COL_NODE_MARGIN = 10
/**
 * Same stack as site body (`--font-sans` / IBM Plex Sans). Exported for tests or SSR fallbacks.
 * Diagram text uses CSS `var(--font-sans)` so it tracks global typography.
 */
const FONT_STACK = "'IBM Plex Sans Variable', ui-sans-serif, system-ui, sans-serif"

function nodeVariant(n: PipelineNodeInput): PipelineNodeVariant {
  return n.variant ?? 'dark'
}

/** Estimated width in SVG user units (proportional sans at ~10–13px; hero line slightly wider). */
function nodeIntrinsicWidth(n: PipelineNodeInput): number {
  const longest = Math.max(...n.lines.map((l) => l.length), 4)
  const v = nodeVariant(n)
  if (v === 'hero') {
    return Math.max(136, longest * 9.8 + 58)
  }
  if (v === 'outline') {
    return Math.max(128, longest * 8 + 46)
  }
  return Math.max(124, longest * 7.85 + 42)
}

function nodeHeight(n: PipelineNodeInput): number {
  const v = nodeVariant(n)
  const lines = n.lines.length
  if (v === 'hero') {
    return n.lines.length >= 2 ? 58 : 50
  }
  if (v === 'outline') {
    return Math.max(64, 36 + lines * 14)
  }
  return Math.max(36, 22 + lines * 14)
}

function nodeWidth(colW: number, n: PipelineNodeInput): number {
  const intrinsic = nodeIntrinsicWidth(n)
  const maxAllowed = Math.max(80, colW - 2 * COL_NODE_MARGIN)
  return Math.min(maxAllowed, intrinsic)
}

export function computePipelineLayout(
  diagram: PipelineDiagramInput,
  instanceId: string,
): PipelineLayoutResult {
  const cols = diagram.columns
  const n = cols.length

  const widestPerColumn = cols.map((col) =>
    Math.max(...col.nodes.map((node) => nodeIntrinsicWidth(node))),
  )
  /** Widest intrinsic width among all nodes — every column band must fit this plus margins. */
  const G = Math.max(...widestPerColumn, 96)
  /** Extra horizontal slack per column so `colW - 2*COL_NODE_MARGIN` still fits intrinsic-G nodes. */
  const EXTRA_PER_COLUMN = 2 * COL_NODE_MARGIN + 8
  const W = Math.max(W_MIN, 2 * MARGIN_X + n * G + n * EXTRA_PER_COLUMN)

  const usable = W - 2 * MARGIN_X
  const colW = usable / n

  const markerId = `wf-arrow-${instanceId}`

  interface ColumnMeta {
    nodes: PipelineNodeInput[]
    widths: number[]
    heights: number[]
    stackH: number
  }

  const columnsMeta: ColumnMeta[] = cols.map((col) => {
    const nodes = col.nodes.map((node) => ({ ...node, variant: nodeVariant(node) }))
    const widths = nodes.map((node) => nodeWidth(colW, node))
    const heights = nodes.map(nodeHeight)
    const stackH = heights.reduce((a, b) => a + b, 0) + GAP_Y * Math.max(0, nodes.length - 1)
    return { nodes, widths, heights, stackH }
  })

  const maxStack = Math.max(...columnsMeta.map((p) => p.stackH))

  const xCenter = (i: number) => MARGIN_X + (i + 0.5) * colW

  const placedNodes: PlacedNode[][] = []

  for (let ci = 0; ci < n; ci++) {
    const p = columnsMeta[ci]!
    let y = CONTENT_TOP + (maxStack - p.stackH) / 2
    const columnBoxes: PlacedNode[] = []
    for (let ni = 0; ni < p.nodes.length; ni++) {
      const node = p.nodes[ni]
      const w = p.widths[ni]
      const h = p.heights[ni]
      const cx = xCenter(ci)
      const x = cx - w / 2
      columnBoxes.push({
        col: ci,
        x,
        y,
        w,
        h,
        variant: node.variant as PipelineNodeVariant,
        lines: node.lines,
      })
      y += h + GAP_Y
    }
    placedNodes.push(columnBoxes)
  }

  const meshPaths: { d: string; opacity: number }[] = []
  const centers: { x: number; y: number }[][] = placedNodes.map((col) =>
    col.map((b) => ({ x: b.x + b.w, y: b.y + b.h / 2 })),
  )
  const leftCenters: { x: number; y: number }[][] = placedNodes.map((col) =>
    col.map((b) => ({ x: b.x, y: b.y + b.h / 2 })),
  )

  const skipMeshFirstSegment =
    placedNodes[0]?.length === 1 && placedNodes[1]?.length === 1

  for (let ci = 0; ci < n - 1; ci++) {
    if (ci === 0 && skipMeshFirstSegment) continue
    const rights = centers[ci]
    const lefts = leftCenters[ci + 1]
    let maxIJ = 0
    for (let i = 0; i < rights.length; i++) {
      for (let j = 0; j < lefts.length; j++) {
        maxIJ = Math.max(maxIJ, Math.abs(i - j))
      }
    }
    const denom = Math.max(1, maxIJ)

    for (let i = 0; i < rights.length; i++) {
      const a = rights[i]
      for (let j = 0; j < lefts.length; j++) {
        const b = lefts[j]
        const mid = (a.x + b.x) / 2
        const d = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} C ${mid.toFixed(1)} ${a.y.toFixed(1)}, ${mid.toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
        const dist = Math.abs(i - j)
        const opacity = 0.52 + (0.33 * (1 - dist / denom) + (rights.length === 1 && lefts.length === 1 ? 0.12 : 0))
        meshPaths.push({ d, opacity: Math.min(0.94, opacity) })
      }
    }
  }

  const columnCenters = cols.map((_, i) => xCenter(i))

  let arrowPath: string | null = null
  if (
    n >= 2 &&
    placedNodes[0]?.length === 1 &&
    placedNodes[1]?.length === 1 &&
    centers[0]?.[0] &&
    leftCenters[1]?.[0]
  ) {
    const a = centers[0][0]
    const b = leftCenters[1][0]
    arrowPath = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
  }

  const bottomNodes = Math.max(...placedNodes.map((col) => col[col.length - 1].y + col[col.length - 1].h))
  const loopCaption = diagram.loopCaption
  let loopPath: string | null = null

  if (loopCaption && n >= 2) {
    const lastCol = placedNodes[n - 1]
    const tgtCol = placedNodes[Math.min(1, n - 1)]
    const startX = lastCol[lastCol.length - 1].x + lastCol[lastCol.length - 1].w + 12
    const startY = lastCol[lastCol.length - 1].y + lastCol[lastCol.length - 1].h * 0.65
    const endX = tgtCol[0].x - 10
    const endY = tgtCol[0].y + tgtCol[0].h * 0.5
    const midX = W * 0.55
    const lowY = bottomNodes + 46
    loopPath = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${(W - 40).toFixed(1)} ${(startY + 50).toFixed(1)}, ${(W - 24).toFixed(1)} ${lowY.toFixed(1)}, ${midX.toFixed(1)} ${lowY.toFixed(1)} C ${(W * 0.2).toFixed(1)} ${(lowY + 6).toFixed(1)}, ${(endX - 70).toFixed(1)} ${(endY + 35).toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`
  }

  const baseH = Math.max(bottomNodes + (loopCaption ? 52 : 28), DIVIDER_Y + 80)
  const height = baseH + (loopCaption ? 36 : 0)

  return {
    width: W,
    height,
    markerId,
    dividerY: DIVIDER_Y,
    columnCenters,
    placed: placedNodes,
    meshPaths,
    arrowPath,
    loopPath,
    loopCaption,
  }
}

export function escapeSvgText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export { FONT_STACK }
