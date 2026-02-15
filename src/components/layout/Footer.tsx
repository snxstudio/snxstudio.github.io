import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="section-padding py-24 mt-24 border-t border-black/8 dark:border-white/8">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="mb-6">
              <span className="text-2xl font-bold tracking-tight">
                SN<span className="text-accent">X</span>{' '}
                <span className="font-light">Studio</span>
              </span>
            </div>
            <p className="label-caps text-black/40 dark:text-white/40 mb-6">
              Building What&apos;s Next.
            </p>
            <p className="body-md text-black/50 dark:text-white/50 max-w-sm">
              Strategy, technology, and execution clarity for companies ready to move forward.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="label-caps text-black/40 dark:text-white/40 mb-6">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-black/60 hover:text-accent dark:text-white/60 dark:hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <h4 className="label-caps text-black/40 dark:text-white/40 mb-6">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@snxstudio.com"
                className="text-sm font-medium text-black/60 hover:text-accent dark:text-white/60 dark:hover:text-accent transition-colors inline-flex items-center gap-1.5"
              >
                hello@snxstudio.com
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-black/60 hover:text-accent dark:text-white/60 dark:hover:text-accent transition-colors inline-flex items-center gap-1.5"
              >
                Schedule a call
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://github.com/snxstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-black/60 hover:text-accent dark:text-white/60 dark:hover:text-accent transition-colors inline-flex items-center gap-1.5"
              >
                GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/25 dark:text-white/25">
            &copy; {new Date().getFullYear()} SNX Studio. All rights reserved.
          </p>
          <p className="text-xs text-black/25 dark:text-white/25">
            Strategy for the Next.
          </p>
        </div>
      </div>
    </footer>
  );
}
