import SectionWrapper from '../ui/SectionWrapper';
import { motion } from 'framer-motion';

const steps = [
  {
    phase: '01',
    title: 'Discovery',
    description: 'Deep-dive into your market, users, and constraints. We define the problem space clearly before building anything.',
  },
  {
    phase: '02',
    title: 'Architecture',
    description: 'System design, technology selection, and MVP scoping. We create a blueprint that balances speed with longevity.',
  },
  {
    phase: '03',
    title: 'Build & Launch',
    description: 'Rapid, iterative delivery with design collaboration throughout. From first commit to production-ready product.',
  },
  {
    phase: '04',
    title: 'Scale',
    description: 'Post-launch optimization, feature expansion, and operational maturity. We grow with you from 1 to n.',
  },
];

export default function FromScratch() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <p className="label-caps text-accent mb-4">From Scratch to Scale</p>
          <h2 className="heading-lg mb-6">We build products from zero.</h2>
          <p className="body-lg text-black/50 dark:text-white/50">
            Whether it&apos;s a new SaaS platform, an internal tool, or a customer-facing product\u2014we take ideas
            from concept through MVP to production and beyond. Discovery, PRD, UX direction, architecture,
            and delivery: all under one roof.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-6"
            >
              <span className="text-sm font-bold text-accent mt-1 shrink-0 w-8">{step.phase}</span>
              <div>
                <h3 className="text-lg font-semibold mb-1.5">{step.title}</h3>
                <p className="body-md text-black/50 dark:text-white/50">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
