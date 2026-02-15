export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
  content: string;
}

export const categories = [
  'All',
  'Engineering',
  'Product',
  'Modernization',
  'UI/UX',
  'Open Source',
  'AI & Automation',
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'modernizing-legacy-systems',
    title: 'Modernizing Legacy Systems Without Breaking Production',
    excerpt: 'A practical framework for refactoring mission-critical systems while maintaining business continuity and team velocity.',
    category: 'Modernization',
    date: '2024-02-10',
    readTime: '8 min read',
    author: 'SNX Studio',
    featured: true,
    content: `
      <p>Legacy systems represent billions in institutional knowledge and business logic. The challenge isn't whether to modernize—it's how to do it without disrupting the business that depends on them.</p>

      <h2>The Strangler Fig Pattern</h2>
      <p>We approach modernization using the Strangler Fig pattern: gradually replacing legacy components with modern alternatives while the old system continues to serve production traffic. This eliminates the risk of big-bang rewrites.</p>

      <p>The process begins with comprehensive dependency mapping. We identify:</p>
      <ul>
        <li>Core business logic that must be preserved</li>
        <li>Integration points and data flows</li>
        <li>Performance bottlenecks and failure modes</li>
        <li>Compliance and regulatory requirements</li>
      </ul>

      <h2>Incremental Extraction</h2>
      <p>Rather than rewriting monoliths wholesale, we extract bounded contexts incrementally:</p>

      <pre><code>// Phase 1: Add adapter layer
class LegacyOrderAdapter {
  async processOrder(order: Order) {
    // Route to new service if flagged
    if (this.shouldUseNewService(order)) {
      return this.newOrderService.process(order);
    }
    // Otherwise use legacy path
    return this.legacyOrderSystem.process(order);
  }
}</code></pre>

      <p>This allows us to A/B test the new implementation, gradually increase traffic, and maintain instant rollback capability.</p>

      <h2>Data Migration Strategy</h2>
      <p>Data migration is typically the highest-risk component. We use a multi-phase approach:</p>
      <ul>
        <li><strong>Phase 1:</strong> Dual-write to both old and new schemas</li>
        <li><strong>Phase 2:</strong> Backfill historical data in batches</li>
        <li><strong>Phase 3:</strong> Verify parity and switch read traffic</li>
        <li><strong>Phase 4:</strong> Deprecate legacy schema</li>
      </ul>

      <blockquote>The key insight: never trust a migration. Always verify data parity before switching traffic.</blockquote>

      <h2>Observability First</h2>
      <p>Before touching production code, we instrument everything. Modern observability tools let us compare behavior between old and new systems in real-time, catching regressions before they impact users.</p>

      <p>The result: systems that serve modern business needs while preserving the reliability that teams depend on.</p>
    `,
  },
  {
    slug: 'design-systems-that-scale',
    title: 'Design Systems That Scale Across Enterprise Products',
    excerpt: 'How we build design systems that maintain consistency across dozens of products while enabling team autonomy and rapid iteration.',
    category: 'UI/UX',
    date: '2024-01-28',
    readTime: '6 min read',
    author: 'SNX Studio',
    featured: false,
    content: `
      <p>Enterprise design systems fail when they become bottlenecks. The best systems enable teams to move fast while maintaining consistency—not by enforcing rigid rules, but by making the right thing the easy thing.</p>

      <h2>Token-Based Architecture</h2>
      <p>We structure design systems around semantic tokens that cascade from brand to component level:</p>

      <pre><code>// Design tokens cascade
const tokens = {
  // Brand primitives
  brand: {
    blue: { 500: '#2563EB', 600: '#1D4ED8' }
  },
  // Semantic tokens
  semantic: {
    action: {
      primary: tokens.brand.blue[500],
      hover: tokens.brand.blue[600]
    }
  },
  // Component tokens
  components: {
    button: {
      background: tokens.semantic.action.primary
    }
  }
}</code></pre>

      <p>This architecture lets product teams customize semantic tokens for their domain while maintaining brand consistency.</p>

      <h2>Component API Design</h2>
      <p>Components should be composable and unsurprising. We follow these principles:</p>
      <ul>
        <li><strong>Composition over configuration:</strong> Build complex UIs from simple primitives</li>
        <li><strong>Sensible defaults:</strong> Common use cases work with minimal props</li>
        <li><strong>Escape hatches:</strong> Advanced use cases are possible without forking</li>
        <li><strong>Accessible by default:</strong> ARIA attributes and keyboard navigation built-in</li>
      </ul>

      <h2>Documentation as Product</h2>
      <p>A design system is only as good as its documentation. We treat docs as a first-class product:</p>
      <ul>
        <li>Live code examples that teams can copy-paste</li>
        <li>Usage guidelines explaining when to use each component</li>
        <li>Accessibility requirements and testing guidance</li>
        <li>Migration guides when APIs change</li>
      </ul>

      <blockquote>The best design systems feel invisible—teams use them without thinking about them.</blockquote>

      <h2>Version Strategy</h2>
      <p>We version design systems semantically and support N-1 major versions. This lets product teams upgrade on their schedule without blocking system evolution.</p>

      <p>The goal: a system that scales to hundreds of engineers while maintaining the coherence of a product designed by one person.</p>
    `,
  },
  {
    slug: 'mvp-to-scalable-architecture',
    title: 'From MVP to Scalable Architecture: When and How to Rebuild',
    excerpt: 'Identifying the inflection point where MVP shortcuts become bottlenecks, and how to evolve architecture without disrupting growth.',
    category: 'Engineering',
    date: '2024-01-15',
    readTime: '7 min read',
    author: 'SNX Studio',
    featured: false,
    content: `
      <p>Every successful product starts as an MVP. The challenge comes when product-market fit arrives faster than architectural maturity. Here's how to evolve systems without stalling momentum.</p>

      <h2>Recognizing the Inflection Point</h2>
      <p>Technical debt becomes architectural debt when:</p>
      <ul>
        <li>Feature velocity decreases despite adding engineers</li>
        <li>Incidents become more frequent and harder to debug</li>
        <li>New features require touching increasingly distant parts of the codebase</li>
        <li>Onboarding time for new engineers exceeds two weeks</li>
      </ul>

      <p>These are signals that architectural patterns designed for 10 users don't work for 10,000.</p>

      <h2>Evolutionary Architecture</h2>
      <p>We don't rebuild systems—we evolve them. The pattern:</p>

      <pre><code>// Start: Monolithic handler
app.post('/checkout', async (req, res) => {
  await processPayment();
  await updateInventory();
  await sendEmail();
  await logAnalytics();
});

// Evolve: Extract to events
app.post('/checkout', async (req, res) => {
  const order = await createOrder(req.body);
  await eventBus.publish('order.created', order);
  return res.json(order);
});

// Subscribers handle downstream effects
eventBus.on('order.created', processPayment);
eventBus.on('order.created', updateInventory);
eventBus.on('order.created', sendEmail);</code></pre>

      <p>This decouples concerns without requiring a full rewrite.</p>

      <h2>Data Layer Evolution</h2>
      <p>Database bottlenecks often appear before application bottlenecks. We scale data layers progressively:</p>
      <ul>
        <li><strong>Phase 1:</strong> Optimize queries and add indexes</li>
        <li><strong>Phase 2:</strong> Introduce read replicas for analytics</li>
        <li><strong>Phase 3:</strong> Cache hot paths with Redis</li>
        <li><strong>Phase 4:</strong> Shard by tenant or geography</li>
      </ul>

      <blockquote>Premature optimization is costly, but so is late optimization. The key is recognizing which phase you're in.</blockquote>

      <h2>Team Structure Follows Architecture</h2>
      <p>As systems decompose, team structure should evolve too. We help organizations transition from:</p>
      <ul>
        <li>Feature teams → Platform + Product teams</li>
        <li>Shared codebase → Service ownership</li>
        <li>Central deployment → Team autonomy</li>
      </ul>

      <p>The result: architecture that supports growth without breaking what already works.</p>
    `,
  },
];
