import { Reveal } from '@/components/Reveal';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { FAQS } from '@/content/faq';

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1160px] scroll-mt-28 border-t border-line px-6 py-24">
      <Reveal>
        <h2 className="max-w-[24ch] text-section font-bold text-ink">
          What people ask before we start.
        </h2>
      </Reveal>

      <Reveal className="mt-14 max-w-[760px] rounded-2xl border border-line bg-surface px-6">
        <Accordion>
          {FAQS.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-body font-medium text-ink">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-small text-ink-3">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
