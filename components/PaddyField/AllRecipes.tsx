"use client";

import { recipesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface AllRecipesProps {
  recipes: recipesType[];
}

export default function AllRecipes({ recipes }: AllRecipesProps) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="w-full relative z-10 py-16 bg-[#f4fdf8]">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[#10b981] text-sm font-bold tracking-[0.2em] uppercase mb-4">Complete Cookbook</span>
          <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-bold text-[#042f1a] tracking-tight mb-6`}>
            Recipes Collection
          </h1>
          <p className="text-[#042f1a]/70 max-w-2xl text-lg md:text-xl font-serif">
            Browse our entire collection of nourishing, wholesome recipes crafted from the freshest ingredients.
          </p>
          <div className="w-16 h-1 bg-[#10b981] mt-10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {recipes.map((recipe, index) => {
            const x = (recipe.hotSpot?.x ?? 0.5) * 100;
            const y = (recipe.hotSpot?.y ?? 0.5) * 100;
            const formattedDate = new Date(recipe._createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <Link
                key={recipe._id}
                href={`/paddyfield/recipes/${recipe._id}`}
                className="group flex flex-col items-start text-left"
              >
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-[5px] bg-[#021f10]">
                  {recipe.mainImage ? (
                    <Image
                      src={recipe.mainImage}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform [transition-duration:1000ms] ease-out group-hover:scale-105"
                      style={{ objectPosition: `${x}% ${y}%` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] to-[#042f1a]" />
                  )}
                  
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#042f1a]/0 transition-colors [transition-duration:500ms] group-hover:bg-[#042f1a]/10" />
                </div>
                
                <span className="text-[#10b981] font-semibold text-xs uppercase tracking-widest mb-3">
                  {formattedDate}
                </span>
                
                <h3 className={`${playfair.className} font-bold text-2xl text-[#042f1a] mb-4 group-hover:text-[#10b981] transition-colors leading-snug`}>
                  {recipe.title}
                </h3>
                
                {recipe.description && (
                  <p className="text-[#042f1a]/70 line-clamp-3 text-base leading-relaxed mb-6 font-serif">
                    {recipe.description}
                  </p>
                )}
                
                <span className="text-[#042f1a] font-bold text-xs uppercase tracking-widest border-b-2 border-transparent group-hover:border-[#10b981] pb-1 transition-all mt-auto">
                  View Recipe
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
