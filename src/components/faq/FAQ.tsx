"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { stockFaqs } from "@/lib/data/data.faq";


export default function FAQ() {
  return (
    <section className="w-full px-6 border-2 border-blue-400 mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full">
        {stockFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-xl font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg p-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}