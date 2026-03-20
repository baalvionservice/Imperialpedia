"use client";

import { slugify } from "@/modules/content-engine/utils/slugify";
import { cn } from "@/lib/utils";

interface TableContentProps {
  id: string;
  text: string;
  isActive: boolean;
  onActivate: () => void;
}

export default function TableContent({
  id,
  text,
  isActive,
  onActivate,
}: TableContentProps) {
  const slug = slugify(id);

  if (!id) return null;

  return (
    <li key={id}>
      <a
        href={`#${slug}`}
        className={cn(
          "text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm leading-relaxed block py-1",
          isActive && "text-foreground font-medium"
        )}
        onClick={(e) => {
          onActivate();
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }}
      >
        {id}
      </a>
    </li>
  );
}
