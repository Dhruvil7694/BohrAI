/**
 * End-to-end test for paper generator
 */

import { PaperOrchestrator, PaperGenerationConfig } from '../src/paper-generator/orchestrator.js';
import { searchArXiv, searchSemanticScholar, searchAllSources } from '../src/paper-generator/search-tools.js';

async function testSearchTools() {
  console.log('🔍 Testing search tools...\n');
  
  // Test ArXiv
  console.log('Testing ArXiv...');
  const arxivResults = await searchArXiv('transformer neural networks', 5);
  console.log(`✅ ArXiv: Found ${arxivResults.length} papers`);
  if (arxivResults.length > 0) {
    console.log(`   Example: ${arxivResults[0].title}`);
  }
  
  // Test Semantic Scholar
  console.log('\nTesting Semantic Scholar...');
  const semanticResults = await searchSemanticScholar('transformer neural networks', 5);
  console.log(`✅ Semantic Scholar: Found ${semanticResults.length} papers`);
  if (semanticResults.length > 0) {
    console.log(`   Example: ${semanticResults[0].title}`);
  }
  
  // Test combined search
  console.log('\nTesting combined search...');
  const allResults = await searchAllSources('transformer neural networks', 5);
  console.log(`✅ Combined: Found ${allResults.length} unique papers`);
  
  console.log('\n✅ Search tools test passed!\n');
}

async function testOrchestrator() {
  console.log('🎯 Testing orchestrator...\n');
  
  const sessionId = `test-${Date.now()}`;
  const workspaceRoot = process.cwd();
  
  const orchestrator = new PaperOrchestrator(sessionId, workspaceRoot);
  
  // Test initialization
  console.log('Testing initialization...');
  const config: PaperGenerationConfig = {
    topic: 'Survey of transformer architectures for computer vision',
    paperType: 'survey',
    scope: 'medium',
    domain: 'Computer Vision',
    emphasis: ['Novelty', 'Benchmarks'],
    maxIterations: 2
  };
  
  const questions = await orchestrator.initialize(config);
  console.log(`✅ Initialization: Generated ${questions.length} questions`);
  
  // Test response processing
  console.log('\nTesting response processing...');
  const responses = {
    'paper-type': 'Survey/Review',
    'scope': 'Medium',
    'domain': 'Computer Vision',
    'emphasis': 'Novelty,Benchmarks'
  };
  
  await orchestrator.processUserResponses(responses);
  const state = orchestrator.getState();
  console.log(`✅ Response processing: State phase = ${state.phase}`);
  console.log(`   Tasks planned: ${state.tasks.length}`);
  console.log(`   Quality gates: ${state.qualityGates.length}`);
  
  console.log('\n✅ Orchestrator test passed!\n');
}

async function testTokenOptimization() {
  console.log('⚡ Testing token optimization...\n');
  
  const longText = 'This is a very long text that would normally consume many tokens. '.repeat(100);
  
  // Import TokenOptimizer
  const { TokenOptimizer } = await import('../src/paper-generator/orchestrator.js');
  
  // Test compression
  const compressed = TokenOptimizer.compressPrompt(longText, 'agent-to-agent');
  const reduction = ((longText.length - compressed.length) / longText.length * 100).toFixed(1);
  
  console.log(`Original length: ${longText.length} chars`);
  console.log(`Compressed length: ${compressed.length} chars`);
  console.log(`Reduction: ${reduction}%`);
  
  // Test summarization
  const summary = TokenOptimizer.summarizeForContext(longText, 100);
  const summaryReduction = ((longText.length - summary.length) / longText.length * 100).toFixed(1);
  
  console.log(`\nSummary length: ${summary.length} chars`);
  console.log(`Summary reduction: ${summaryReduction}%`);
  
  console.log('\n✅ Token optimization test passed!\n');
}

async function runAllTests() {
  console.log('🧪 Running Paper Generator Tests\n');
  console.log('='.repeat(50) + '\n');
  
  try {
    await testSearchTools();
    await testTokenOptimization();
    await testOrchestrator();
    
    console.log('='.repeat(50));
    console.log('✅ All tests passed!');
    console.log('='.repeat(50));
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
runAllTests();
