"use client";

import { recipesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";

interface RecipesArchiveListProps {
  recipes: recipesType[];
}

export default function RecipesArchiveList({
  recipes,
}: RecipesArchiveListProps) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="w-full mt-16 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1a7a3a] mb-6">More Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => {
          const x = (recipe.hotSpot?.x ?? 0.5) * 100;
          const y = (recipe.hotSpot?.y ?? 0.5) * 100;
          const formattedDate = new Date(recipe._createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <Link
              key={recipe._id}
              href={`/paddyfield/recipes/${recipe._id}`}
              className="flex items-center gap-4 bg-[#f0fdf4] p-3 rounded-[5px] border border-[#dcfce7] hover:border-[#86efac] hover:shadow-md transition-all [transition-duration:300ms] group"
            >
              <div className="relative w-24 h-24 flex-shrink-0 rounded-[5px] overflow-hidden bg-[#134e2a]">
                {recipe.mainImage ? (
                  <Image
                    src={recipe.mainImage}
                    alt={recipe.title}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform [transition-duration:500ms] group-hover:scale-110"
                    style={{ objectPosition: `${x}% ${y}%` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a7a3a] to-[#0a2e1a]" />
                )}
              </div>
              <div className="flex flex-col justify-center flex-grow overflow-hidden">
                <span className="text-xs font-semibold text-[#1a7a3a] mb-1">{formattedDate}</span>
                <h3 className="font-bold text-[#0a2e1a] text-sm md:text-base line-clamp-2 mb-1 group-hover:text-[#22c55e] transition-colors">
                  {recipe.title}
                </h3>
                {recipe.description && (
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {recipe.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
