import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Star } from 'lucide-react';
import SectionWrapper from '../components/ui/SectionWrapper';
import { ease } from '../lib/motion';

const caseStudies = [
  {
    category: 'Modernization',
    title: 'Legacy Platform Modernization',
    challenge:
      'A mid-market SaaS company was running on a decade-old monolithic architecture. Deployments took days, incidents were frequent, and developer velocity had stalled.',
    approach:
      'We decomposed the monolith into domain-aligned services, introduced observability tooling, and migrated to a containerized infrastructure\u2014all while keeping the platform live.',
    outcomes: [
      '94% reduction in deployment time',
      '60% fewer production incidents',
      '35% infrastructure cost savings',
      'Team velocity doubled within 6 months',
    ],
  },
  {
    category: 'Product Build',
    title: '0 \u2192 1 Product MVP',
    challenge:
      'A Series A startup needed to go from concept to a production-ready platform in 14 weeks to meet investor milestones and early customer commitments.',
    approach:
      'We ran compressed discovery, defined a focused MVP scope, designed the architecture for scale-readiness, and delivered through two-week sprints with continuous design collaboration.',
    outcomes: [
      'Production launch in 12 weeks',
      'First paying customers within 30 days of launch',
      '3 major feature iterations shipped post-launch',
      'Architecture scaled cleanly to 50x initial load',
    ],
  },
  {
    category: 'Cloud Migration',
    title: 'Enterprise Cloud Migration',
    challenge:
      'A regulated financial services firm needed to migrate 200+ services from on-premises data centers to a cloud-native environment while maintaining compliance and zero downtime.',
    approach:
      'We designed a phased migration strategy with automated compliance checks, built migration tooling to accelerate the process, and executed with rigorous rollback procedures.',
    outcomes: [
      'Zero-downtime migration completed on schedule',
      'Full regulatory compliance maintained throughout',
      '40% reduction in operational costs',
      'Custom migration tooling reused across teams',
    ],
  },
  {
    category: 'Platform & Security',
    title: 'Developer Experience Overhaul',
    challenge:
      'A growth-stage company\'s engineering team was losing hours daily to slow CI pipelines, poor tooling, and an inconsistent development environment. Retention was becoming a concern.',
    approach:
      'We audited the full developer lifecycle, redesigned the CI/CD pipeline, standardized local development environments, and introduced an internal developer platform.',
    outcomes: [
      'CI pipeline time reduced from 45min to 8min',
      'Developer onboarding time cut by 70%',
      'Engineering satisfaction scores increased significantly',
      'Internal platform adopted by all product teams',
    ],
  },
];

const projectCategories = ['All', 'Open Source', 'Internal Tools', 'UI Systems', 'Platform Tools'];

const githubProjects = [
  {
    name: 'snx-migrate',
    description: 'Zero-downtime database migration framework with automatic rollback and verification.',
    category: 'Open Source',
    stars: 847,
    tech: ['TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    name: 'design-tokens',
    description: 'Multi-platform design token pipeline supporting web, iOS, and Android from a single source.',
    category: 'UI Systems',
    stars: 623,
    tech: ['JavaScript', 'Figma API', 'CSS'],
  },
  {
    name: 'infra-cost-analyzer',
    description: 'Real-time cloud cost analysis and optimization recommendations for AWS, GCP, and Azure.',
    category: 'Internal Tools',
    stars: 412,
    tech: ['Python', 'AWS SDK', 'React'],
  },
  {
    name: 'snx-components',
    description: 'Enterprise React component library with accessibility built-in and full TypeScript support.',
    category: 'UI Systems',
    stars: 1240,
    tech: ['React', 'TypeScript', 'Storybook'],
  },
  {
    name: 'service-health',
    description: 'Distributed health check orchestration with intelligent alerting and incident response automation.',
    category: 'Platform Tools',
    stars: 328,
    tech: ['Go', 'Redis', 'Prometheus'],
  },
  {
    name: 'api-scaffold',
    description: 'Production-ready API boilerplate with auth, rate limiting, observability, and deployment configs.',
    category: 'Open Source',
    stars: 956,
    tech: ['Node.js', 'PostgreSQL', 'Docker'],
  },
];

export default function Work() {
  const [selectedProjectCategory, setSelectedProjectCategory] = useState('All');
  return (
    <>
      <section className="section-padding pt-40 pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="label-caps text-accent mb-5">Work</p>
            <h1 className="heading-xl mb-8 max-w-3xl">
              Outcomes,{' '}
              <span className="text-black/30 dark:text-white/30">not outputs.</span>
            </h1>
            <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl">
              Every engagement is measured by the change it creates. Here are representative examples
              of the work we do and the results we deliver.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-padding pb-24">
        <div className="container-wide space-y-20">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 py-16 ${
                index > 0 ? 'border-t border-black/8 dark:border-white/8' : ''
              }`}
            >
              <div className="lg:col-span-4">
                <span className="label-caps text-accent mb-3 block">{study.category}</span>
                <h2 className="heading-md mb-4">{study.title}</h2>
              </div>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="label-caps text-black/40 dark:text-white/40 mb-3">Challenge</h4>
                    <p className="body-md text-black/60 dark:text-white/60 mb-8">{study.challenge}</p>

                    <h4 className="label-caps text-black/40 dark:text-white/40 mb-3">Approach</h4>
                    <p className="body-md text-black/60 dark:text-white/60">{study.approach}</p>
                  </div>

                  <div>
                    <h4 className="label-caps text-black/40 dark:text-white/40 mb-3">Outcomes</h4>
                    <ul className="space-y-3">
                      {study.outcomes.map((outcome, i) => (
                        <motion.li
                          key={outcome}
                          initial={{ opacity: 0, x: 12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05, duration: 0.35 }}
                          className="flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="body-md text-black/70 dark:text-white/70">{outcome}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <SectionWrapper className="bg-off-white dark:bg-dark-surface">
        <div className="mb-16">
          <p className="label-caps text-accent mb-5">GitHub Projects</p>
          <h2 className="heading-lg mb-8">
            Open-source tools and{' '}
            <span className="text-accent">internal accelerators.</span>
          </h2>
          <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl mb-10">
            We contribute to the ecosystem and build internal tools that solve common problems.
            Everything here is production-tested and actively maintained.
          </p>
          <div className="flex flex-wrap gap-3">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedProjectCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                  selectedProjectCategory === category
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-black/5 text-black/60 hover:bg-black/8 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/8'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8 dark:bg-white/8">
          {githubProjects
            .filter(project => selectedProjectCategory === 'All' || project.category === selectedProjectCategory)
            .map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
                className="bg-white dark:bg-dark-bg p-10 group hover:bg-off-white dark:hover:bg-dark-surface transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <Github size={24} strokeWidth={1.5} className="text-accent" />
                  <div className="flex items-center gap-1.5 text-sm text-black/40 dark:text-white/40">
                    <Star size={14} />
                    {project.stars}
                  </div>
                </div>
                <h3 className="heading-sm mb-3 font-mono text-lg">{project.name}</h3>
                <p className="body-md text-black/45 dark:text-white/45 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-black/5 text-black/60 dark:bg-white/5 dark:text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="heading-lg mb-6">Have a challenge in mind?</h2>
          <p className="body-lg opacity-50 mb-10">
            We&apos;d love to hear about what you&apos;re working on and explore how we can help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-accent-hover group"
          >
            Get in Touch
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
