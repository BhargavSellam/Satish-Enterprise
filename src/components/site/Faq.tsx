import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/content/faqs";

export function Faq() {
  return (
    <Accordion type="single" collapsible className="border-t">
      {FAQS.map((f, i) => (
        <AccordionItem key={f.q} value={`f${i}`}>
          <AccordionTrigger className="min-h-14 text-left font-display text-xl text-navy hover:no-underline">{f.q}</AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
