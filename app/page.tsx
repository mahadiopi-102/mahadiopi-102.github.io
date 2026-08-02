import { Hero } from '@/components/Hero';
import { Work } from '@/components/Work';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Proof } from '@/components/Proof';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Work />
      <Services />
      <Process />
      <Proof />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  );
}
