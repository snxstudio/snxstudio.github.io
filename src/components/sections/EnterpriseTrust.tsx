import { Shield, Cloud, Globe, Layers } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import Card from '../ui/Card';

const trustSignals = [
  {
    icon: Shield,
    title: 'Security-First Engineering',
    description: 'OWASP compliance, threat modeling, and secure-by-default architecture patterns across every layer.',
  },
  {
    icon: Cloud,
    title: 'Cloud-Native Architecture',
    description: 'Platform-agnostic designs leveraging serverless, containers, and managed services for resilience.',
  },
  {
    icon: Globe,
    title: 'Timezone-Aligned Delivery',
    description: 'US and European coverage with overlapping hours for real-time collaboration and rapid iteration.',
  },
  {
    icon: Layers,
    title: 'Scalable Infrastructure',
    description: 'Systems designed to handle 10x growth without architectural rewrites or reliability degradation.',
  },
];

const stats = [
  { value: '40%', label: 'Performance Optimization' },
  { value: '30%', label: 'Cost Reduction' },
  { value: '99.9%', label: 'Uptime Reliability' },
];

export default function EnterpriseTrust() {
  return (
    <SectionWrapper className="bg-off-white dark:bg-dark-surface">
      <div className="mb-20">
        <p className="label-caps text-accent mb-5">Enterprise-Ready by Design</p>
        <h2 className="heading-lg mb-8">
          Built for scale, security, and{' '}
          <span className="text-accent">global delivery.</span>
        </h2>
        <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl">
          We architect systems that meet enterprise requirements without sacrificing velocity.
          Security, compliance, and reliability are built in from day one.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/8 dark:bg-white/8 mb-20">
        {trustSignals.map((signal, i) => {
          const Icon = signal.icon;
          return (
            <Card key={signal.title} delay={i * 0.06} className="border-0 bg-white dark:bg-dark-bg">
              <Icon size={32} strokeWidth={1.5} className="text-accent mb-6" />
              <h3 className="heading-sm mb-4">{signal.title}</h3>
              <p className="body-md text-black/45 dark:text-white/45">{signal.description}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-16 border-t border-black/8 dark:border-white/8">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-5xl sm:text-6xl font-bold text-accent mb-3">{stat.value}</div>
            <div className="text-sm text-black/50 dark:text-white/50 tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
