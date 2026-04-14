import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { DOC_SECTIONS, getAllDocSlugs, getDocBySlug } from "@/lib/docs";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDocBySlug(slug.join("/"));
  if (!entry) {
    return { title: "Docs" };
  }
  return {
    title: `${entry.title} — Bohr AI Docs`,
    description: entry.description,
  };
}

export default async function DocsCatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const currentSlug = slug.join("/");
  const entry = getDocBySlug(currentSlug);
  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed left-0 right-0 top-0 z-50 w-full px-3 pt-3 sm:px-4 lg:px-6">
        <div className="flex h-14 w-full items-center justify-between gap-4 rounded-xl bg-black/45 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-6">
          <Link href="/" className="font-mono text-2xl text-white">
            bohr ai
          </Link>
          <Link href="/docs/getting-started/installation" className="text-sm text-zinc-300 hover:text-zinc-100">
            Docs
          </Link>
        </div>
      </nav>

      <main className="mx-auto w-full px-4 pb-12 pt-24 sm:px-6 lg:px-10 2xl:px-16">
        <div className="mx-auto flex w-full max-w-[1600px] gap-8">
          <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-72 shrink-0 overflow-y-auto border-r border-zinc-800 pr-5 lg:block">
            {DOC_SECTIONS.map((section) => (
              <div key={section.title} className="mb-6">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{section.title}</p>
                {section.items.map((item) => {
                  const active = item.slug === currentSlug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/docs/${item.slug}`}
                      className={`block border-l-2 px-3 py-1.5 text-sm transition-colors ${
                        active
                          ? "border-zinc-200 text-zinc-100"
                          : "border-transparent text-zinc-400 hover:text-zinc-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </aside>

          <article className="mx-auto w-full max-w-4xl py-4">
            <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">{entry.title}</h1>
            <div className="docs-prose">
              <Markdown remarkPlugins={[remarkGfm]}>{entry.content}</Markdown>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
