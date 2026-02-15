import { motion } from 'framer-motion';
import {
  Rocket,
  RefreshCw,
  Cloud,
  Layers,
  Cpu,
  Shield,
} from 'lucide-react';

const capabilities = [
  { icon: Rocket, label: '0 \u2192 1 Product Build' },
  { icon: RefreshCw, label: 'Legacy Modernization' },
  { icon: Cloud, label: 'Cloud & Data Migrations' },
  { icon: Layers, label: 'Platform & DevEx' },
  { icon: Cpu, label: 'AI & Automation' },
  { icon: Shield, label: 'Security & Reliability' },
];

export default function Capabilities() {
  return (
    <section className="section-padding py-16 border-y border-black/5 dark:border-white/5">
      <div className="container-wide">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <cap.icon
                size={24}
                strokeWidth={1.5}
                className="text-black/40 dark:text-white/40 group-hover:text-accent transition-colors duration-300"
              />
              <span className="text-xs font-medium tracking-wide uppercase text-black/60 dark:text-white/60">
                {cap.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
