import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Mail, Calendar } from 'lucide-react';
import { ease } from '../lib/motion';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses =
    'w-full bg-transparent border border-black/12 dark:border-white/12 px-5 py-4 text-base font-light tracking-premium transition-all duration-300 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-black/25 dark:placeholder:text-white/25';

  return (
    <>
      <section className="section-padding pt-40 pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="label-caps text-accent mb-5">Contact</p>
            <h1 className="heading-xl mb-8 max-w-3xl">
              Let&apos;s build something{' '}
              <span className="text-accent">together.</span>
            </h1>
            <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl">
              Tell us what you&apos;re working on. Whether it&apos;s a new product, a migration,
              or a strategic question\u2014we&apos;re here to help you move forward.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pb-36">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease }}
              className="lg:col-span-7"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="py-24 text-center"
                >
                  <h2 className="heading-md mb-4">Message received.</h2>
                  <p className="body-lg text-black/50 dark:text-white/50">
                    We&apos;ll be in touch shortly to discuss your project.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor="name" className="label-caps text-black/35 dark:text-white/35 mb-2.5 block">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label-caps text-black/35 dark:text-white/35 mb-2.5 block">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="label-caps text-black/35 dark:text-white/35 mb-2.5 block">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Your company"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="label-caps text-black/35 dark:text-white/35 mb-2.5 block">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project, challenge, or idea..."
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-black text-white dark:bg-white dark:text-black text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/15 hover:-translate-y-px dark:hover:bg-accent dark:hover:text-white group"
                  >
                    Send Message
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease }}
              className="lg:col-span-5"
            >
              <div className="space-y-12">
                <div>
                  <h3 className="label-caps text-black/35 dark:text-white/35 mb-4">Prefer email?</h3>
                  <a
                    href="mailto:hello@snxstudio.com"
                    className="inline-flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors group"
                  >
                    <Mail size={20} strokeWidth={1.5} />
                    hello@snxstudio.com
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div>
                  <h3 className="label-caps text-black/35 dark:text-white/35 mb-4">Schedule a call</h3>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors group"
                  >
                    <Calendar size={20} strokeWidth={1.5} />
                    Book a 30-minute intro
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="pt-10 border-t border-black/8 dark:border-white/8">
                  <p className="body-md text-black/35 dark:text-white/35">
                    Not sure where to start? Just describe what you&apos;re building or the challenge
                    you&apos;re facing. We&apos;ll take it from there.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
