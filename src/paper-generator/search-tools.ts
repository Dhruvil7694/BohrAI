/**
 * Free research paper search tools integration
 * Provides access to ArXiv, Semantic Scholar, PubMed, and web search
 */

import { parseStringPromise } from 'xml2js';

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  abstract: string;
  url: string;
  venue?: string;
  citationCount?: number;
  source: 'arxiv' | 'semantic-scholar' | 'pubmed' | 'web';
}

/**
 * Search ArXiv for papers
 * Free, no API key required
 */
export async function searchArXiv(query: string, maxResults: number = 20): Promise<Paper[]> {
  try {
    const url = `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${maxResults}&sortBy=relevance&sortOrder=descending`;
    
    const response = await fetch(url);
    const xml = await response.text();
    
    // Parse XML
    const result = await parseStringPromise(xml);
    const entries = result.feed?.entry || [];
    
    return entries.map((entry: any) => ({
      id: entry.id[0].split('/').pop(),
      title: entry.title[0].trim(),
      authors: entry.author?.map((a: any) => a.name[0]) || [],
      year: parseInt(entry.published[0].substring(0, 4)),
      abstract: entry.summary[0].trim(),
      url: entry.id[0],
      source: 'arxiv' as const
    }));
  } catch (error) {
    console.error('ArXiv search error:', error);
    return [];
  }
}

/**
 * Search Semantic Scholar for papers
 * Free tier: 100 requests/5 minutes
 * Optional API key for higher limits
 */
export async function searchSemanticScholar(
  query: string,
  maxResults: number = 20,
  apiKey?: string
): Promise<Paper[]> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
    
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${maxResults}&fields=title,authors,year,abstract,citationCount,url,venue`;
    
    const response = await fetch(url, { headers });
    const data = await response.json();
    
    if (!data.data) {
      return [];
    }
    
    return data.data.map((paper: any) => ({
      id: paper.paperId,
      title: paper.title,
      authors: paper.authors?.map((a: any) => a.name) || [],
      year: paper.year || 0,
      abstract: paper.abstract || '',
      url: paper.url || `https://www.semanticscholar.org/paper/${paper.paperId}`,
      venue: paper.venue,
      citationCount: paper.citationCount,
      source: 'semantic-scholar' as const
    }));
  } catch (error) {
    console.error('Semantic Scholar search error:', error);
    return [];
  }
}

/**
 * Search PubMed for papers
 * Free, no API key required
 */
export async function searchPubMed(query: string, maxResults: number = 20): Promise<Paper[]> {
  try {
    // Step 1: Search for IDs
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${maxResults}&retmode=json`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    const ids = searchData.esearchresult?.idlist || [];
    if (ids.length === 0) {
      return [];
    }
    
    // Step 2: Fetch details
    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids.join(',')}&retmode=xml`;
    
    const fetchResponse = await fetch(fetchUrl);
    const xml = await fetchResponse.text();
    
    // Parse XML
    const result = await parseStringPromise(xml);
    const articles = result.PubmedArticleSet?.PubmedArticle || [];
    
    return articles.map((article: any) => {
      const medline = article.MedlineCitation?.[0];
      const articleData = medline?.Article?.[0];
      
      return {
        id: medline?.PMID?.[0]._ || medline?.PMID?.[0],
        title: articleData?.ArticleTitle?.[0] || '',
        authors: articleData?.AuthorList?.[0]?.Author?.map((a: any) => 
          `${a.LastName?.[0] || ''} ${a.ForeName?.[0] || ''}`.trim()
        ) || [],
        year: parseInt(articleData?.Journal?.[0]?.JournalIssue?.[0]?.PubDate?.[0]?.Year?.[0] || '0'),
        abstract: articleData?.Abstract?.[0]?.AbstractText?.[0] || '',
        url: `https://pubmed.ncbi.nlm.nih.gov/${medline?.PMID?.[0]._ || medline?.PMID?.[0]}/`,
        venue: articleData?.Journal?.[0]?.Title?.[0],
        source: 'pubmed' as const
      };
    });
  } catch (error) {
    console.error('PubMed search error:', error);
    return [];
  }
}

/**
 * Search multiple sources in parallel
 */
export async function searchAllSources(
  query: string,
  maxResultsPerSource: number = 20,
  semanticScholarApiKey?: string
): Promise<Paper[]> {
  const [arxivResults, semanticResults, pubmedResults] = await Promise.all([
    searchArXiv(query, maxResultsPerSource),
    searchSemanticScholar(query, maxResultsPerSource, semanticScholarApiKey),
    searchPubMed(query, maxResultsPerSource)
  ]);
  
  // Combine and deduplicate by title
  const allPapers = [...arxivResults, ...semanticResults, ...pubmedResults];
  const uniquePapers = new Map<string, Paper>();
  
  for (const paper of allPapers) {
    const normalizedTitle = paper.title.toLowerCase().trim();
    if (!uniquePapers.has(normalizedTitle)) {
      uniquePapers.set(normalizedTitle, paper);
    }
  }
  
  return Array.from(uniquePapers.values());
}

/**
 * Filter papers by year
 */
export function filterByYear(papers: Paper[], minYear: number, maxYear?: number): Paper[] {
  return papers.filter(paper => {
    if (paper.year < minYear) return false;
    if (maxYear && paper.year > maxYear) return false;
    return true;
  });
}

/**
 * Sort papers by citation count
 */
export function sortByCitations(papers: Paper[]): Paper[] {
  return papers.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));
}

/**
 * Sort papers by year (newest first)
 */
export function sortByYear(papers: Paper[]): Paper[] {
  return papers.sort((a, b) => b.year - a.year);
}

/**
 * Get paper statistics
 */
export function getPaperStats(papers: Paper[]): {
  total: number;
  bySource: Record<string, number>;
  byYear: Record<number, number>;
  avgCitations: number;
  yearRange: { min: number; max: number };
} {
  const bySource: Record<string, number> = {};
  const byYear: Record<number, number> = {};
  let totalCitations = 0;
  let citationCount = 0;
  let minYear = Infinity;
  let maxYear = -Infinity;
  
  for (const paper of papers) {
    // By source
    bySource[paper.source] = (bySource[paper.source] || 0) + 1;
    
    // By year
    if (paper.year > 0) {
      byYear[paper.year] = (byYear[paper.year] || 0) + 1;
      minYear = Math.min(minYear, paper.year);
      maxYear = Math.max(maxYear, paper.year);
    }
    
    // Citations
    if (paper.citationCount !== undefined) {
      totalCitations += paper.citationCount;
      citationCount++;
    }
  }
  
  return {
    total: papers.length,
    bySource,
    byYear,
    avgCitations: citationCount > 0 ? totalCitations / citationCount : 0,
    yearRange: { min: minYear === Infinity ? 0 : minYear, max: maxYear === -Infinity ? 0 : maxYear }
  };
}

/**
 * Export papers to BibTeX format
 */
export function exportToBibTeX(papers: Paper[]): string {
  return papers.map((paper, index) => {
    const key = `paper${index + 1}`;
    const authors = paper.authors.join(' and ');
    
    return `@article{${key},
  title={${paper.title}},
  author={${authors}},
  year={${paper.year}},
  url={${paper.url}}${paper.venue ? `,\n  journal={${paper.venue}}` : ''}
}`;
  }).join('\n\n');
}

/**
 * Export papers to Markdown format
 */
export function exportToMarkdown(papers: Paper[]): string {
  let md = '# Research Papers\n\n';
  
  for (const paper of papers) {
    md += `## ${paper.title}\n\n`;
    md += `**Authors:** ${paper.authors.join(', ')}\n\n`;
    md += `**Year:** ${paper.year}\n\n`;
    if (paper.venue) {
      md += `**Venue:** ${paper.venue}\n\n`;
    }
    if (paper.citationCount !== undefined) {
      md += `**Citations:** ${paper.citationCount}\n\n`;
    }
    md += `**Source:** ${paper.source}\n\n`;
    md += `**URL:** ${paper.url}\n\n`;
    md += `**Abstract:**\n${paper.abstract}\n\n`;
    md += '---\n\n';
  }
  
  return md;
}
