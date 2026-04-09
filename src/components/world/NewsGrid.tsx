import Image from "next/image";
import { newsGridSections } from "@/lib/data/worldData";

export default function NewsGrid() {
  return (
    <div className="space-y-8 py-6">
      {newsGridSections.map((section) => (
        <div key={section.section} className="">
         
          {/* Grid of articles */}
            {section.items.map((item) => (
              <div key={item.id} className="group cursor-pointer border-neutral-400">
                {item.image && (
                  <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex-1 w-4/5">
                      <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:underline mt-0.5 line-clamp-3">
                        {item.headline}
                      </h3>
                      <span className="text-[10px] font-black text-gray-400 tracking-wide">
                        {item.time}
                      </span>
                    </div>
                    <div className="relative  overflow-hidden rounded-sm aspect-square w-1/5 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.headline}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
