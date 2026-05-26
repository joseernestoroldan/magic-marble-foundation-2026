import { getAllPaddyField, getAllRecipes } from "@/client";
import { portalPaddyFieldType, recipesType } from "@/clientTypes";
import Container from "@/components/Layouts/Container/Container";
import PaddyFieldMosaicGallery from "@/components/PaddyField/PaddyFieldMosaicGallery";
import RecipesMosaicGallery from "@/components/PaddyField/RecipesMosaicGallery";
import TopPicksGrid from "@/components/PaddyField/TopPicksGrid";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Portal Paddy Field | Magic Marble Foundation",
  description: "Discover our latest paddy fields and recipes.",
};

const PortalPaddyFieldPage = async () => {
  const paddyfields: portalPaddyFieldType[] = await getAllPaddyField() || [];
  const recipes: recipesType[] = await getAllRecipes() || [];

  // Sort them if not already sorted by query
  const sortedPaddy = paddyfields.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());
  const sortedRecipes = recipes.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());

  // Top picks
  const topPicks = sortedPaddy.filter(p => p.topPick);

  return (
    <div className="min-h-screen bg-[#f4fdf8]">
      {/* Editorial Hero Header */}
      <div className="w-full bg-[#042f1a] pt-40 pb-32 px-4 text-center relative overflow-hidden">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <span className="text-[#10b981] text-sm font-bold tracking-[0.3em] uppercase mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-700">
            Magic Marble Foundation
          </span>
          <h1 className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-bold text-[#f4fdf8] mb-8 tracking-tight drop-shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150`}>
            Paddy Field
          </h1>
          <p className="text-[#10b981] text-lg md:text-xl max-w-2xl mx-auto font-serif leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Explore our latest stories, nourishing recipes, and editor's top picks straight from the fields.
          </p>
          <div className="w-24 h-[1px] bg-[#10b981]/50 mt-12 animate-in fade-in duration-1000 delay-500"></div>
        </div>
      </div>

      <Container>
        <div className="py-24 flex flex-col w-full gap-16">
          
          {/* Latest Paddy Fields Mosaic */}
          {sortedPaddy.length > 0 && (
            <section>
              <PaddyFieldMosaicGallery paddyFields={sortedPaddy} />
            </section>
          )}

          {/* Top Picks Grid (Breaks out of container for full width background) */}
          {topPicks.length > 0 && (
            <section className="-mx-4 md:-mx-8 lg:-mx-16 xl:-mx-32">
              <TopPicksGrid topPicks={topPicks} />
            </section>
          )}

          {/* Latest Recipes Mosaic */}
          {sortedRecipes.length > 0 && (
            <section>
              <RecipesMosaicGallery recipes={sortedRecipes} />
            </section>
          )}

          {/* Editorial Footer Links */}
          <section className="mt-16 border-t border-[#042f1a]/10 pt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start p-8 bg-white/50 backdrop-blur-sm border border-[#042f1a]/5 hover:border-[#10b981]/30 transition-colors">
              <h3 className={`${playfair.className} text-3xl font-bold text-[#042f1a] mb-4`}>All Field Stories</h3>
              <p className="text-[#042f1a]/70 font-serif mb-8 max-w-sm">Dive deep into our complete archive of paddy field updates and stories.</p>
              <Link href="/paddyfield/all-paddyfields" className="inline-flex items-center gap-2 text-[#042f1a] font-bold text-xs uppercase tracking-widest hover:text-[#10b981] transition-colors border-b-2 border-[#10b981] pb-1">
                View Archive <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            <div className="flex flex-col items-center md:items-start p-8 bg-white/50 backdrop-blur-sm border border-[#042f1a]/5 hover:border-[#10b981]/30 transition-colors">
              <h3 className={`${playfair.className} text-3xl font-bold text-[#042f1a] mb-4`}>Full Cookbook</h3>
              <p className="text-[#042f1a]/70 font-serif mb-8 max-w-sm">Browse our entire collection of nourishing recipes crafted from fresh ingredients.</p>
              <Link href="/paddyfield/all-recipes" className="inline-flex items-center gap-2 text-[#042f1a] font-bold text-xs uppercase tracking-widest hover:text-[#10b981] transition-colors border-b-2 border-[#10b981] pb-1">
                View Recipes <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </section>

        </div>
      </Container>
    </div>
  );
};

export default PortalPaddyFieldPage;
