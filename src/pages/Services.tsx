import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Compass,
  Code2,
  RefreshCw,
  Server,
  Cpu,
  Palette,
  ArrowRight,
} from 'lucide-react';
import SectionWrapper from '../components/ui/SectionWrapper';
import { ease } from '../lib/motion';

const services = [
  {
    icon: Compass,
    title: 'Strategy & Advisory',
    description:
      'We help you see clearly before you build. Our advisory practice aligns technology decisions with business outcomes.',
    items: [
      'Product and platform strategy',
      'Technology roadmaps and architecture reviews',
      'Tech due diligence for M&A and investment',
      'Execution planning and team structure',
      'Vendor and build-vs-buy evaluation',
    ],
  },
  {
    icon: Code2,
    title: 'Product Engineering',
    subtitle: 'Build from Scratch',
    description:
      'From idea to production. We take products from 0 to 1 and from 1 to n with design collaboration, engineering rigor, and delivery discipline.',
    items: [
      'Discovery workshops and PRD development',
      'MVP definition and UX direction',
      'Full-stack architecture and system design',
      'Web applications, APIs, and integrations',
      'Launch support and iterative scaling',
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    subtitle: 'Design Systems & Product Experience',
    description:
      'Strategic design that scales. We create design systems, optimize product experiences, and bridge the gap between design and engineering.',
    items: [
      'Product UX strategy and user research',
      'SaaS dashboard and enterprise UI design',
      'Design system creation and governance',
      'Interaction design and prototyping',
      'Design-to-code alignment and implementation',
      'Accessibility audits and compliance',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Modernization & Migrations',
    description:
      'Legacy systems don\'t need to hold you back. We modernize architectures, migrate platforms, and improve operational fundamentals.',
    items: [
      'Monolith to modular service decomposition',
      'On-prem to cloud migration',
      'Cloud-to-cloud platform migrations',
      'Database and data pipeline migrations',
      'Performance optimization and cost reduction',
    ],
  },
  {
    icon: Server,
    title: 'Platform, Reliability & Security',
    description:
      'The foundation beneath your product matters. We build platforms that are observable, secure, and cost-efficient.',
    items: [
      'Observability and monitoring setup',
      'SRE practices and incident management',
      'CI/CD pipeline design and optimization',
      'Infrastructure cost optimization',
      'Security posture assessment and hardening',
    ],
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    description:
      'Pragmatic AI adoption focused on real impact. We help teams integrate AI where it matters and automate workflows that create leverage.',
    items: [
      'AI readiness assessment',
      'Workflow automation and internal tooling',
      'LLM integration and prompt engineering',
      'Data pipeline architecture for ML',
      'Responsible AI implementation',
    ],
  },
];

export default function Services() {
  return (
    <>
      <section className="section-padding pt-40 pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="label-caps text-accent mb-5">Services</p>
            <h1 className="heading-xl mb-8 max-w-3xl">
              Anything on tech.<br />
              <span className="text-black/30 dark:text-white/30">Done right.</span>
            </h1>
            <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl">
              We partner across the full technology lifecycle: from new product creation to legacy
              modernization and large-scale migrations\u2014plus everything in between.
            </p>
          </motion.div>
        </div>
      </section>

      {services.map((service, index) => (
        <SectionWrapper
          key={service.title}
          className={index % 2 === 0 ? '' : 'bg-off-white dark:bg-dark-surface'}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <service.icon size={28} strokeWidth={1.5} className="text-accent" />
                <div>
                  <h2 className="heading-md">{service.title}</h2>
                  {service.subtitle && (
                    <p className="text-sm text-accent font-medium mt-0.5">{service.subtitle}</p>
                  )}
                </div>
              </div>
              <p className="body-lg text-black/50 dark:text-white/50">
                {service.description}
              </p>
            </div>

            <div>
              <h4 className="label-caps text-black/40 dark:text-white/40 mb-6">What you get</h4>
              <ul className="space-y-4">
                {service.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease }}
                    className="flex items-start gap-3 text-black/70 dark:text-white/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="body-md">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>
      ))}

      <SectionWrapper dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="heading-lg mb-6">Ready to move forward?</h2>
          <p className="body-lg opacity-50 mb-10">
            Tell us about your challenge. We&apos;ll tell you how we can help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-accent-hover group"
          >
            Start a Conversation
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
