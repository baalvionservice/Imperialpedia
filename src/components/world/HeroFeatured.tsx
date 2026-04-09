import { featuredNews } from "@/lib/data/worldData";
import Image from "next/image";

export default function HeroFeatured() {
  const [main, ...secondary] = featuredNews;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-gray-200 border-b border-gray-200">
      {/* Main hero story */}
      <div className="lg:col-span-2 bg-white group cursor-pointer">
        <div className="relative overflow-hidden h-[300px] lg:h-[400px]">
          <Image
            src={main.image}
            alt={main.headline}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              {main.tag && (
                <span className="bg-[#CC0000] text-white text-[10px] font-black tracking-widest px-2 py-0.5">
                  {main.tag}
                </span>
              )}
              <span className="text-[11px] font-bold text-[#FF6B35] tracking-widest uppercase">
                {main.category}
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold leading-tight text-white mb-2 max-w-xl">
              {main.headline}
            </h1>
            <p className="text-sm text-gray-300 line-clamp-2 max-w-lg hidden lg:block">
              {main.summary}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span>{main.author}</span>
              <span>•</span>
              <span>{main.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary stories */}
      <div className="bg-white divide-y divide-gray-100">
        {secondary.map((story) => (
          <div key={story.id} className="group cursor-pointer p-4 hover:bg-gray-50 transition-colors">
            <span className="text-[10px] font-black tracking-widest text-[#CC0000] uppercase">
              {story.category}
            </span>
            <h2 className="text-sm font-semibold leading-snug mt-1 text-gray-900 group-hover:text-[#CC0000] transition-colors line-clamp-3">
              {story.headline}
            </h2>
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{story.summary}</p>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
              <span>{story.author}</span>
              <span>•</span>
              <span>{story.time}</span>
            </div>
          </div>
        ))}
       
      </div>
    </div>
  );
}
