import SectionWrapper from '../ui/SectionWrapper';
import { motion } from 'framer-motion';

const pillars = [
  {
    symbol: '\u2229',
    title: 'Intersection',
    description: 'Where strategy meets execution. We operate at the crossroads of business thinking and technical delivery.',
  },
  {
    symbol: '\u00D7',
    title: 'Multiplier',
    description: 'We amplify your team\'s capability. Our engagement multiplies velocity, clarity, and confidence.',
  },
  {
    symbol: '\u2192',
    title: 'Forward',
    description: 'Always oriented toward the next state. Every decision is a step toward where you need to be.',
  },
];

export default function Philosophy() {
  return (
    <SectionWrapper dark>
      <div className="mb-16">
        <p className="label-caps text-accent mb-4">Philosophy</p>
        <h2 className="heading-lg mb-6">
          The <span className="text-accent">X</span>
        </h2>
        <p className="body-lg opacity-60 max-w-2xl">
          The X in SNX represents more than a letter. It's a mindset\u2014a way of approaching
          technology challenges with precision and purpose.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-4xl text-accent mb-6 block">{pillar.symbol}</span>
            <h3 className="heading-sm mb-3">{pillar.title}</h3>
            <p className="body-md opacity-50">{pillar.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
