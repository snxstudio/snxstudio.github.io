import { Search, PenTool, Hammer, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import { ease } from '../../lib/motion';

const steps = [
  {
    icon: Search,
    title: 'Diagnose',
    description: 'We map your architecture, identify bottlenecks, and uncover hidden constraints before writing code.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'We design systems for the problem you have today and the scale you need tomorrow—pragmatic, not perfect.',
  },
  {
    icon: Hammer,
    title: 'Build',
    description: 'We ship incremental value weekly. No waiting months for a big reveal—you see progress from day one.',
  },
  {
    icon: Zap,
    title: 'Enable',
    description: 'We transfer knowledge through pairing, documentation, and architecture reviews—no lock-in, no dependencies.',
  },
];

export default function HowWeWork() {
  return (
    <SectionWrapper>
      <div className="mb-20">
        <p className="label-caps text-accent mb-5">How We Work</p>
        <h2 className="heading-lg mb-8">
          A structured approach to{' '}
          <span className="text-accent">building what matters.</span>
        </h2>
        <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl">
          We don't follow a rigid process. But we do have a framework that ensures we're solving
          the right problems and delivering value every week.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/8 dark:bg-white/8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease }}
              className="bg-white dark:bg-dark-bg p-10 border-0"
            >
              <Icon size={36} strokeWidth={1.5} className="text-accent mb-6" />
              <h3 className="heading-sm mb-4">{step.title}</h3>
              <p className="body-md text-black/45 dark:text-white/45">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
