"use client";

import { recipesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RecipesMosaicGalleryProps {
  recipes: recipesType[];
}

type CellSpan = { colSpan: number; rowSpan: number };

/* ------------------------------------------------------------------ */
/*  Mosaic layout helper                                               */
/* ------------------------------------------------------------------ */

function getMosaicLayout(count: number): CellSpan[] {
  switch (count) {
    case 1:
      return [{ colSpan: 3, rowSpan: 2 }];
    case 2:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 2 },
      ];
    case 3:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
      ];
    case 4:
    default:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 3, rowSpan: 1 },
      ];
  }
}

/* ------------------------------------------------------------------ */
/*  Mosaic card                                                        */
/* ------------------------------------------------------------------ */

interface MosaicCardProps {
  recipe: recipesType;
  span: CellSpan;
  priority: boolean;
}

function MosaicCard({ recipe, span, priority }: MosaicCardProps) {
  const x = (recipe.hotSpot?.x ?? 0.5) * 100;
  const y = (recipe.hotSpot?.y ?? 0.5) * 100;

  return (
    <Link
      href={`/paddyfield/recipes/${recipe._id}`}
      className="group relative overflow-hidden rounded-[5px] bg-[#042f1a] shadow-[0_8px_30px_rgba(4,47,26,0.15)] transition-all [transition-duration:500ms] ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)] focus-visible:outline-2 focus-visible:outline-[#10b981] focus-visible:outline-offset-2"
      style={{
        gridColumn: `span ${span.colSpan}`,
        gridRow: `span ${span.rowSpan}`,
      }}
      aria-label={`View recipe: ${recipe.title}`}
    >
      {/* Image */}
      {recipe.mainImage ? (
        <Image
          src={recipe.mainImage}
          alt={recipe.title}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover brightness-90 saturate-[1.1] transition-transform [transition-duration:800ms] ease-out group-hover:scale-105 group-hover:brightness-50"
          style={{ objectPosition: `${x}% ${y}%` }}
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] to-[#042f1a]" />
      )}

      {/* Base Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#042f1a]/80 via-[#042f1a]/20 to-transparent p-6 flex flex-col justify-end transition-opacity [transition-duration:400ms] group-hover:opacity-0">
        <p className={`${playfair.className} text-[#f4fdf8] text-xl md:text-2xl font-semibold leading-tight drop-shadow-md`}>
          {recipe.title}
        </p>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#042f1a]/95 via-[#042f1a]/70 to-transparent p-6 flex flex-col justify-end opacity-0 transition-opacity [transition-duration:400ms] group-hover:opacity-100">
        <h3 className={`${playfair.className} text-[#10b981] text-2xl font-bold leading-tight mb-2 translate-y-4 opacity-0 transition-all [transition-duration:500ms] [transition-delay:50ms] ease-out group-hover:translate-y-0 group-hover:opacity-100`}>
          {recipe.title}
        </h3>

        {recipe.description && (
          <p className="text-[#f4fdf8]/80 text-sm leading-relaxed line-clamp-3 mb-4 translate-y-4 opacity-0 transition-all [transition-duration:500ms] [transition-delay:100ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
            {recipe.description}
          </p>
        )}

        <div className="flex items-center gap-2 text-[#f4fdf8] text-sm font-semibold tracking-wide uppercase translate-y-4 opacity-0 transition-all [transition-duration:500ms] [transition-delay:150ms] ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="border-b border-[#10b981] pb-0.5">Read recipe</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform [transition-duration:300ms] group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main gallery component                                             */
/* ------------------------------------------------------------------ */

export default function RecipesMosaicGallery({
  recipes,
}: RecipesMosaicGalleryProps) {
  const items = useMemo(() => recipes.slice(0, 4), [recipes]);
  const layout = useMemo(() => getMosaicLayout(items.length), [items.length]);

  if (!items.length) return null;

  return (
    <div className="w-full relative z-10 mt-24 mb-8">
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#10b981]/20">
        <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#042f1a] tracking-tight`}>
          Latest Recipes
        </h2>
        <Link href="/paddyfield/all-recipes" className="hidden md:inline-flex items-center gap-2 text-[#042f1a] font-semibold text-sm uppercase tracking-widest hover:text-[#10b981] transition-colors">
          View Cookbook <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="grid w-full gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[280px] sm:auto-rows-[220px] md:auto-rows-[260px]">
        {items.map((recipe, index) => (
          <MosaicCard
            key={recipe._id}
            recipe={recipe}
            span={layout[index]}
            priority={index === 0}
          />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center md:hidden">
        <Link href="/paddyfield/all-recipes" className="inline-flex items-center justify-center bg-[#042f1a] text-[#f4fdf8] px-6 py-3 font-semibold uppercase tracking-widest text-xs hover:bg-[#10b981] transition-colors w-full sm:w-auto">
          View Complete Cookbook
        </Link>
      </div>
    </div>
  );
}
