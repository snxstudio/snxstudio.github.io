import Hero from '../components/sections/Hero';
import Capabilities from '../components/sections/Capabilities';
import ServicesPreview from '../components/sections/ServicesPreview';
import Philosophy from '../components/sections/Philosophy';
import FromScratch from '../components/sections/FromScratch';
import Modernize from '../components/sections/Modernize';
import EnterpriseTrust from '../components/sections/EnterpriseTrust';
import HowWeWork from '../components/sections/HowWeWork';
import OpenSource from '../components/sections/OpenSource';

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <ServicesPreview />
      <Philosophy />
      <FromScratch />
      <Modernize />
      <EnterpriseTrust />
      <HowWeWork />
      <OpenSource />
    </>
  );
}
