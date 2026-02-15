import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionWrapper from '../ui/SectionWrapper';
import Card from '../ui/Card';

const services = [
  {
    title: 'Strategy & Advisory',
    description:
      'Product strategy, technology roadmaps, and execution planning that align business goals with technical reality.',
  },
  {
    title: 'Product Engineering',
    description:
      'From discovery to launch and beyond. We build products from scratch\u2014web apps, APIs, integrations\u2014designed to scale.',
  },
  {
    title: 'Modernization & Migrations',
    description:
      'Monolith to services, on-prem to cloud, cloud to cloud. We de-risk complex migrations and deliver reliability.',
  },
  {
    title: 'Platform & Reliability',
    description:
      'Observability, CI/CD, cost optimization, SRE practices. We build the foundation your engineering team needs.',
  },
  {
    title: 'Security Posture',
    description:
      'Security assessments, compliance guidance, and infrastructure hardening to protect what you\'ve built.',
  },
  {
    title: 'AI & Automation',
    description:
      'Pragmatic AI adoption and workflow automation. We focus on real impact, not hype.',
  },
];

export default function ServicesPreview() {
  return (
    <SectionWrapper id="services-preview">
      <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <p className="label-caps text-accent mb-4">What We Do</p>
          <h2 className="heading-lg">Services</h2>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-black/50 hover:text-accent dark:text-white/50 dark:hover:text-accent transition-colors group"
        >
          View all services
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 dark:bg-white/10">
        {services.map((service, i) => (
          <Card key={service.title} delay={i * 0.06} className="border-0 bg-white dark:bg-dark-bg">
            <h3 className="heading-sm mb-4">{service.title}</h3>
            <p className="body-md text-black/50 dark:text-white/50">{service.description}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
