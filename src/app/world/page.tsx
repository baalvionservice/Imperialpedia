import Footer from "@/components/world/Footer";
import HeroFeatured from "@/components/world/HeroFeatured";
import LatestNews from "@/components/world/LatestNews";
import MarketIndicatorBar from "@/components/world/MarketIndicatorBar";
import MarketsPanel from "@/components/world/MarketsPanel";
import MarketTicker from "@/components/world/MarketTicker";
import NewsGrid from "@/components/world/NewsGrid";
import TopNav from "@/components/world/TopNav";
import TopStories from "@/components/world/TopStories";

export default function WorldPage() {
  return (
    <div className="min-h-screen bg-gray-100 mt-12 font-sans">
      {/* Scrolling market ticker */}
      {/* <MarketTicker /> */}

      {/* Sticky navigation */}
      {/* <TopNav /> */}

      {/* Dark market indicators strip */}
      <div className="max-w-7xl mx-auto">
        <MarketIndicatorBar />

        {/* World label */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="max-w-screen-xl mx-auto flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
              You are here:
            </span>
            <span className="text-[10px] font-black tracking-widest text-[#CC0000] uppercase">
              World
            </span>
          </div>
        </div>
      </div>

      {/* Main layout: Latest News | Main Content | Markets */}
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-px bg-gray-200">
          {/* CENTER — Main content area */}
          <main className="bg-white">
            {/* Hero featured stories */}
            <HeroFeatured />

            {/* Main body padding */}
            <div className="">
              {/* Top Stories horizontal */}
              {/* <TopStories /> */}

              {/* Sectioned news grid */}
              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
                {/* RIGHT SIDEBAR — Markets */}
                <aside className="bg-white lg:border-l border-gray-200">
                  <MarketsPanel />
                </aside>
                <NewsGrid />
              </div>
            </div>
          </main>
          {/* LEFT SIDEBAR — Latest News */}
          <aside className="bg-white lg:border-r border-gray-200">
            <LatestNews />
          </aside>
        </div>
      </div>
    </div>
  );
}
