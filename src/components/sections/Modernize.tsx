import SectionWrapper from '../ui/SectionWrapper';
import Card from '../ui/Card';

const areas = [
  {
    title: 'Monolith \u2192 Services',
    description: 'Decompose monolithic applications into maintainable, independently deployable services without disrupting live operations.',
  },
  {
    title: 'Cloud Adoption',
    description: 'On-prem to cloud, cloud to cloud. We architect migrations that minimize risk and maximize the value of modern infrastructure.',
  },
  {
    title: 'Data Migrations',
    description: 'Schema evolution, ETL pipelines, and zero-downtime data transformations. Your data moves safely and completely.',
  },
  {
    title: 'Performance & Cost',
    description: 'Identify bottlenecks, optimize resource usage, and reduce infrastructure spend while improving reliability and speed.',
  },
];

export default function Modernize() {
  return (
    <SectionWrapper>
      <div className="mb-16">
        <p className="label-caps text-accent mb-4">Modernize What Exists</p>
        <h2 className="heading-lg mb-6">Legacy doesn&apos;t mean stuck.</h2>
        <p className="body-lg text-black/50 dark:text-white/50 max-w-2xl">
          Existing systems represent years of investment and institutional knowledge. We help you modernize
          without starting over\u2014refactoring architectures, migrating platforms, and improving reliability
          so your technology works for where you&apos;re going, not just where you&apos;ve been.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 dark:bg-white/10">
        {areas.map((area, i) => (
          <Card key={area.title} delay={i * 0.08} className="border-0 bg-white dark:bg-dark-bg">
            <h3 className="heading-sm mb-3">{area.title}</h3>
            <p className="body-md text-black/50 dark:text-white/50">{area.description}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
