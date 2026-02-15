import { Github, ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { motion } from 'framer-motion';

export default function OpenSource() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="label-caps text-accent mb-4">Open Source</p>
          <h2 className="heading-lg mb-6">We believe in building in the open.</h2>
          <p className="body-lg text-black/50 dark:text-white/50 mb-8">
            SNX Studio supports open source projects through sponsorship, maintenance, and contributions.
            We publish internal tools where appropriate and contribute back to the ecosystems we depend on.
            Responsible open sourcing is part of how we operate.
          </p>
          <motion.a
            href="https://github.com/snxstudio"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-3 px-7 py-4 border border-black/20 dark:border-white/20 text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <Github size={18} />
            View GitHub
            <ArrowUpRight size={14} />
          </motion.a>
        </div>

        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm p-10 border border-black/10 dark:border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Github size={28} className="text-accent" />
              <span className="text-lg font-semibold">SNX Open Source</span>
            </div>
            <div className="space-y-4 text-sm text-black/50 dark:text-white/50">
              <div className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5">
                <span>Sponsor & Maintain</span>
                <span className="text-accent font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5">
                <span>Contribute PRs</span>
                <span className="text-accent font-medium">Ongoing</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span>Publish Tools</span>
                <span className="text-accent font-medium">Selectively</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
