import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blog-posts';
import { ease } from '../lib/motion';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <section className="section-padding pt-40 pb-20">
        <div className="container-article">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-black/50 hover:text-accent dark:text-white/50 dark:hover:text-accent transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              Back to blog
            </Link>

            <div className="flex items-center gap-4 mb-8">
              <span className="label-caps text-accent">{post.category}</span>
              <span className="text-sm text-black/30 dark:text-white/30">•</span>
              <span className="flex items-center gap-2 text-sm text-black/40 dark:text-white/40">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            <h1 className="heading-display mb-8">{post.title}</h1>

            <div className="flex items-center justify-between pb-10 mb-12 border-b border-black/8 dark:border-white/8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{post.author}</span>
                <span className="text-sm text-black/30 dark:text-white/30">•</span>
                <span className="text-sm text-black/40 dark:text-white/40">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black/60 hover:text-accent dark:text-white/60 dark:hover:text-accent transition-colors"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
            className="mt-16 pt-10 border-t border-black/8 dark:border-white/8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <ArrowLeft size={14} />
              Back to all articles
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
