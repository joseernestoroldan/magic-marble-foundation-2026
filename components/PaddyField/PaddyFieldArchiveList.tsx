"use client";

import { portalPaddyFieldType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";

interface PaddyFieldArchiveListProps {
  paddyFields: portalPaddyFieldType[];
}

export default function PaddyFieldArchiveList({
  paddyFields,
}: PaddyFieldArchiveListProps) {
  if (!paddyFields || paddyFields.length === 0) return null;

  return (
    <div className="w-full mt-16 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1a7a3a] mb-6">More Paddy Fields</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paddyFields.map((paddy) => {
          const x = (paddy.hotSpot?.x ?? 0.5) * 100;
          const y = (paddy.hotSpot?.y ?? 0.5) * 100;
          const formattedDate = new Date(paddy._createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <Link
              key={paddy._id}
              href={`/paddyfield/paddy/${paddy._id}`}
              className="flex items-center gap-4 bg-[#f0fdf4] p-3 rounded-xl border border-[#dcfce7] hover:border-[#86efac] hover:shadow-md transition-all [transition-duration:300ms] group"
            >
              <div className="relative w-24 h-24 flex-shrink-0 rounded-[5px] overflow-hidden bg-[#134e2a]">
                {paddy.mainImage ? (
                  <Image
                    src={paddy.mainImage}
                    alt={paddy.title}
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
                  {paddy.title}
                </h3>
                {paddy.description && (
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {paddy.description}
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
