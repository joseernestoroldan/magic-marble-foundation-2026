"use client";

import { portalPaddyFieldType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

interface TopPicksGridProps {
  topPicks: portalPaddyFieldType[];
}

export default function TopPicksGrid({ topPicks }: TopPicksGridProps) {
  if (!topPicks || topPicks.length === 0) return null;

  return (
    <div className="w-full relative z-10 mt-32 mb-16 px-4 py-16 bg-[#0a4a2b] rounded-[5px]">
      {/* Decorative background noise/texture representation via gradient */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#10b981] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Curated Selection</span>
          <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#f4fdf8] tracking-tight`}>
            Editor's Top Picks
          </h2>
          <div className="w-24 h-1 bg-[#10b981] mx-auto mt-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {topPicks.map((pick, index) => {
            const x = (pick.hotSpot?.x ?? 0.5) * 100;
            const y = (pick.hotSpot?.y ?? 0.5) * 100;
            
            return (
              <Link
                key={pick._id}
                href={`/paddyfield/paddy/${pick._id}`}
                className="group flex flex-col bg-[#f4fdf8] overflow-hidden rounded-[5px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all [transition-duration:500ms] ease-out transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-full aspect-[4/5] bg-[#021f10] overflow-hidden">
                  {/* Image */}
                  {pick.mainImage ? (
                    <Image
                      src={pick.mainImage}
                      alt={pick.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-all [transition-duration:1000ms] ease-out group-hover:scale-105 group-hover:brightness-90"
                      style={{ objectPosition: `${x}% ${y}%` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] to-[#042f1a]" />
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-10 bg-[#042f1a] text-[#10b981] text-xs font-bold px-4 py-2 uppercase tracking-[0.15em] border border-[#10b981]/30 backdrop-blur-sm">
                    Top Pick
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow relative bg-[#f4fdf8]">
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#042f1a]/10 to-transparent transform -translate-y-full"></div>
                  
                  <h3 className={`${playfair.className} font-bold text-2xl text-[#042f1a] mb-4 group-hover:text-[#10b981] transition-colors leading-snug`}>
                    {pick.title}
                  </h3>
                  
                  {pick.description && (
                    <p className="text-[#042f1a]/70 line-clamp-3 text-sm leading-relaxed mb-6 flex-grow font-serif">
                      {pick.description}
                    </p>
                  )}
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[#042f1a] font-bold text-xs tracking-widest uppercase group-hover:text-[#10b981] transition-colors">
                      Read Article
                    </span>
                    <span className="w-8 h-8 rounded-full border border-[#042f1a]/20 flex items-center justify-center group-hover:bg-[#10b981] group-hover:border-[#10b981] transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#042f1a] group-hover:text-white transition-colors">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
