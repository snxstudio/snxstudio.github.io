import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="section-padding min-h-screen flex items-center relative overflow-hidden">
      <div className="container-wide pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="label-caps text-accent mb-8"
          >
            Enterprise Technology Partners
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-8"
          >
            We Build. You Scale.{' '}
            <span className="text-accent">Together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="body-lg text-black/60 dark:text-white/60 max-w-2xl mb-12"
          >
            From legacy modernization to greenfield development, we transform your
            technology vision into enterprise-grade solutions that drive measurable business impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white dark:bg-white dark:text-black text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white group"
            >
              Work With Us
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border border-black/20 dark:border-white/20 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 text-[40vw] font-bold leading-none tracking-tighter select-none pointer-events-none dark:opacity-[0.02]"
      >
        X
      </motion.div>
    </section>
  );
}
