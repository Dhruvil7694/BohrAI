import { defineCollection, z } from 'astro:content'

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    order: z.number(),
  }),
})

/** Marketing hub + detail pages at /workflows/[slug] — diagrams + prose */
const workflowPages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    slashCommand: z.string(),
    cliName: z.string(),
    docsSlug: z.string(),
    category: z.enum(['pipeline', 'module']),
    order: z.number(),
    pipelineDiagram: z.object({
      columns: z
        .array(
          z.object({
            stage: z.string(),
            nodes: z.array(
              z.object({
                variant: z.enum(['outline', 'dark', 'hero']).optional(),
                lines: z.array(z.string()).min(1),
              }),
            ).min(1),
          }),
        )
        .min(2),
      loopCaption: z.string().optional(),
    }),
    mermaidFlow: z.string(),
    /** Short bullets shown in “At a glance” on the workflow detail page */
    keyPoints: z.array(z.string()).min(1).max(6),
  }),
})

export const collections = { docs, workflowPages }
