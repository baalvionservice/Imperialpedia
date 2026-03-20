import { NewsBodyBlock } from "@/lib/data.news";
import Image from "next/image";

export default function BodyBlock({ block }: { block: NewsBodyBlock }) {
    switch (block.type) {
      case "paragraph":
        return (
          <p className="text-foreground text-[1.0625rem] leading-[1.85] mb-5">
            {block.text}
          </p>
        );
  
      case "heading":
        return (
          <h2 className="text-foreground text-2xl font-bold mt-10 mb-4 leading-snug">
            {block.text}
          </h2>
        );
  
      case "subheading":
        return (
          <h3 className="text-foreground text-lg font-semibold mt-7 mb-3 leading-snug">
            {block.text}
          </h3>
        );
  
      case "quote":
        return (
          <blockquote className="my-8 pl-6 border-l-4 border-foreground">
            <p className="text-foreground text-xl font-medium leading-relaxed italic mb-2">
              &ldquo;{block.text}&rdquo;
            </p>
            {block.attribution && (
              <footer className="text-sm text-muted-foreground not-italic font-medium">
                — {block.attribution}
              </footer>
            )}
          </blockquote>
        );
  
      case "callout":
        return (
          <div className="my-7 rounded-xl bg-muted border border-border px-6 py-5">
            <p className="text-foreground text-[0.9375rem] leading-relaxed font-medium">
              {block.text}
            </p>
          </div>
        );
  
      case "list":
        return (
          <ul className="my-5 space-y-2 pl-2">
            {block.items.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-foreground text-[1.0625rem] leading-relaxed"
              >
                <span className="mt-[0.4rem] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        );
  
      case "image":
        return (
          <figure className="my-8">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={block.url}
                alt={block.caption ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
            {block.caption && (
              <figcaption className="mt-2 text-xs text-muted-foreground text-center leading-relaxed">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
  
      default:
        return null;
    }
  }