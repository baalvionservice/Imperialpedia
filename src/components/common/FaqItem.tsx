'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Text } from "@/design-system/typography/text";
import { cn } from "@/lib/utils";

interface FaqItemProps {
  question: string;
  answer: string;
}

/**
 * Individual FAQ node with smooth accordion transitions.
 * Optimized for institutional-grade information discovery.
 */
export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex justify-between items-center py-4 px-2 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl transition-all group"
        aria-expanded={isOpen}
      >
        <Text variant="h4" className="font-bold text-lg group-hover:text-primary transition-colors pr-8">
          {question}
        </Text>
        <div className={cn(
          "p-2 rounded-lg bg-primary/10 text-primary transition-all duration-300 shrink-0",
          isOpen && "bg-primary text-white rotate-180"
        )}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-2 mt-2">
              <Text variant="bodySmall" className="text-muted-foreground leading-relaxed text-base">
                {answer}
              </Text>
              
              {/* TODO: AI-generated follow-up research nodes or deeper context links */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
