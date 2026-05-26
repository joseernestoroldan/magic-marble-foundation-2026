import { getAllRecipes } from "@/client";
import { recipesType } from "@/clientTypes";
import AllRecipes from "@/components/PaddyField/AllRecipes";
import Link from "next/link";

export const metadata = {
  title: "All Recipes | Magic Marble Foundation",
  description: "Browse our entire collection of nourishing recipes.",
};

export default async function AllRecipesPage() {
  const recipes: recipesType[] = await getAllRecipes() || [];
  
  const sortedRecipes = recipes.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());

  return (
    <div className="min-h-screen bg-[#f4fdf8] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <Link
          href="/paddyfield"
          className="inline-flex items-center gap-2 text-[#042f1a]/60 hover:text-[#10b981] font-semibold text-sm uppercase tracking-widest transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Portal
        </Link>
      </div>
      
      <AllRecipes recipes={sortedRecipes} />
    </div>
  );
}
