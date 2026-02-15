import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts, categories } from '../data/blog-posts';
import { ease } from '../lib/motion';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = filteredPosts.find(post => post.featured);
  const otherPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <section className="section-padding pt-40 pb-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="label-caps text-accent mb-5">Blog</p>
            <h1 className="heading-xl mb-8 max-w-4xl">
              Insights on building, modernizing, and scaling{' '}
              <span className="text-accent">production systems.</span>
            </h1>
            <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl">
              Technical deep-dives, architectural patterns, and lessons learned from building
              enterprise-grade products.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-black/5 text-black/60 hover:bg-black/8 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/8'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding pb-36">
        <div className="container-wide">
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease }}
              className="mb-16"
            >
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group block bg-off-white dark:bg-dark-surface border border-black/8 dark:border-white/8 p-12 sm:p-16 transition-all duration-300 hover:border-accent-light dark:hover:border-accent-light"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="label-caps text-accent">{featuredPost.category}</span>
                  <span className="text-sm text-black/30 dark:text-white/30">•</span>
                  <span className="flex items-center gap-2 text-sm text-black/40 dark:text-white/40">
                    <Clock size={14} />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="heading-lg mb-6 group-hover:text-accent transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="body-lg text-black/50 dark:text-white/50 mb-8 max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/40 dark:text-white/40">
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Read article
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8 dark:bg-white/8">
            {otherPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.05, ease }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-white dark:bg-dark-bg p-10 h-full transition-all duration-300 hover:bg-off-white dark:hover:bg-dark-surface"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-semibold tracking-wide uppercase text-accent">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-black/35 dark:text-white/35">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="heading-sm mb-4 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="body-md text-black/45 dark:text-white/45 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-black/8 dark:border-white/8">
                    <span className="text-xs text-black/35 dark:text-white/35">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
