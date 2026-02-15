import { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}

export default function SectionWrapper({ children, id, className = '', dark }: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id={id}
      ref={ref}
      className={`section-padding py-24 sm:py-32 ${
        dark
          ? 'bg-black text-white dark:bg-white dark:text-black'
          : ''
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="container-wide"
      >
        {children}
      </motion.div>
    </section>
  );
}
