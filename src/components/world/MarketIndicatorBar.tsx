import { marketIndicators } from "@/lib/data/worldData";

export default function MarketIndicatorBar() {
  const keyIndicators = marketIndicators.slice(0, 6);

  return (
    <div className="bg-[#002244] py-3 px-4">
      <div className="flex items-center gap-1 mb-2">
        <span className="text-[10px] font-black tracking-widest text-[#FF6B35] uppercase">Markets Overview</span>
        <span className="text-[10px] text-gray-500 ml-2">• As of Apr 8, 2026 12:45 PM ET</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {keyIndicators.map((indicator) => (
          <div key={indicator.name} className="group cursor-pointer">
            <div className="text-[10px] font-bold text-gray-400 tracking-wide uppercase mb-0.5">
              {indicator.name}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black font-mono text-white group-hover:text-[#FF6B35] transition-colors">
                {indicator.value}
              </span>
              <span className={`text-[11px] font-bold font-mono ${indicator.positive ? "text-green-400" : "text-red-400"}`}>
                {indicator.positive ? "▲" : "▼"} {indicator.percent}
              </span>
            </div>
            <div className={`text-[10px] font-mono ${indicator.positive ? "text-green-500/70" : "text-red-500/70"}`}>
              {indicator.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
