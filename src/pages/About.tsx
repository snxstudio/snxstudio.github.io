import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../components/ui/SectionWrapper';
import Card from '../components/ui/Card';

const processSteps = [
  {
    phase: 'Diagnose',
    description:
      'We listen deeply and ask the right questions. Before prescribing anything, we understand your landscape\u2014technology, team, goals, and constraints.',
  },
  {
    phase: 'Design',
    description:
      'We architect solutions that fit your context. No one-size-fits-all\u2014every recommendation and plan is shaped to your specific situation.',
  },
  {
    phase: 'Build',
    description:
      'We execute with discipline and velocity. Iterative delivery, continuous communication, and quality at every step from first commit to production.',
  },
  {
    phase: 'Enable',
    description:
      'We transfer knowledge and build internal capability. Our goal is to leave your team stronger and more confident than when we started.',
  },
];

const principles = [
  {
    title: 'Intelligent',
    description: 'Every engagement begins with deep understanding. We prioritize thinking over doing until the direction is clear.',
  },
  {
    title: 'Minimal',
    description: 'Complexity is the enemy. We pursue the simplest solution that meets the real requirement\u2014nothing more, nothing less.',
  },
  {
    title: 'Strategic',
    description: 'Technology decisions are business decisions. We ensure alignment between what you build and where you\'re going.',
  },
  {
    title: 'Future-focused',
    description: 'We optimize for what comes next. Our work creates foundations that scale, adapt, and endure.',
  },
  {
    title: 'Confident',
    description: 'We bring conviction earned through experience. We\'ll tell you what we think\u2014honestly and with data.',
  },
];

export default function About() {
  return (
    <>
      <section className="section-padding pt-36 pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-caps text-accent mb-4">About</p>
            <h1 className="heading-xl mb-6 max-w-4xl">
              A modern consulting studio built for what&apos;s{' '}
              <span className="text-accent">next.</span>
            </h1>
            <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl">
              SNX Studio is a technology consulting practice focused on future-ready strategies and
              execution frameworks. We help companies navigate complexity with clarity, build
              products with precision, and modernize systems with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper className="bg-off-white dark:bg-dark-surface">
        <p className="label-caps text-accent mb-4">Process</p>
        <h2 className="heading-lg mb-16">How SNX Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-5xl font-bold text-accent/15 dark:text-accent/20 block mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-semibold mb-3">{step.phase}</h3>
              <p className="body-md text-black/50 dark:text-white/50">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <p className="label-caps text-accent mb-4">Principles</p>
        <h2 className="heading-lg mb-16">What Drives Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 dark:bg-white/10">
          {principles.map((principle, i) => (
            <Card key={principle.title} delay={i * 0.06} className="border-0 bg-white dark:bg-dark-bg">
              <h3 className="heading-sm mb-3">{principle.title}</h3>
              <p className="body-md text-black/50 dark:text-white/50">{principle.description}</p>
            </Card>
          ))}
          <Card delay={0.36} className="border-0 bg-off-white dark:bg-dark-surface flex items-center justify-center">
            <p className="text-center">
              <span className="text-3xl font-bold tracking-tight block mb-2">
                SN<span className="text-accent">X</span>
              </span>
              <span className="label-caps text-black/30 dark:text-white/30">
                Strategy for the Next
              </span>
            </p>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-caps text-accent mb-4">Open Source</p>
            <h2 className="heading-lg mb-6">Our Commitment to Open Source</h2>
            <p className="body-lg opacity-50 mb-8">
              We believe the best technology is built collaboratively. SNX Studio actively supports the
              open source ecosystem through sponsorship, maintenance, and meaningful contributions.
            </p>
            <div className="space-y-4 mb-10">
              <p className="body-md opacity-70">
                We contribute pull requests to projects we depend on, maintain packages used by the
                community, and sponsor developers doing critical infrastructure work.
              </p>
              <p className="body-md opacity-70">
                When our internal tools solve problems others face, we publish them responsibly\u2014with
                proper documentation, licensing, and ongoing support.
              </p>
            </div>
            <a
              href="https://github.com/snxstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 border border-white/20 text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:border-accent hover:text-accent dark:border-black/20 dark:hover:border-accent dark:hover:text-accent"
            >
              <Github size={18} />
              View Our GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[180px] sm:text-[220px] font-bold text-accent/10 leading-none select-none"
            >
              {"</>"}
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
