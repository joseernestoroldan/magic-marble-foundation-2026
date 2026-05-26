"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

type PaginationUtilProps = {
  count: number;
};

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

const PaginationUtil = ({ count }: PaginationUtilProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";
  const pageNumber = parseInt(page);
  const numberOfPages = Math.ceil(count / ITEMS_PER_PAGE);

  const hasPrev = pageNumber > 1;
  const hasNext = pageNumber < numberOfPages;

  const buildHref = (targetPage: number): string => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(targetPage));
    return `${pathname}?${params}`;
  };

  // Calculate visible page range
  const getVisiblePages = (): (number | "ellipsis-start" | "ellipsis-end")[] => {
    if (numberOfPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: numberOfPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];
    let start = Math.max(1, pageNumber - Math.floor(MAX_VISIBLE_PAGES / 2));
    let end = start + MAX_VISIBLE_PAGES - 1;

    if (end > numberOfPages) {
      end = numberOfPages;
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("ellipsis-start");
    }

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (end < numberOfPages) {
      if (end < numberOfPages - 1) pages.push("ellipsis-end");
      if (!pages.includes(numberOfPages)) pages.push(numberOfPages);
    }

    return pages;
  };

  if (numberOfPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center py-4">
      <ul className="flex items-center gap-1 text-gray-500">
        <li>
          <Link
            href={hasPrev ? buildHref(pageNumber - 1) : "#"}
            className={`flex items-center gap-1 px-3 py-2 rounded-[5px] text-sm hover:bg-gray-100 transition-colors ${
              !hasPrev ? "opacity-40 pointer-events-none" : ""
            }`}
            aria-disabled={!hasPrev}
            tabIndex={!hasPrev ? -1 : undefined}
          >
            <IoChevronBack className="w-4 h-4" />
            Previous
          </Link>
        </li>

        {visiblePages.map((item) =>
          typeof item === "string" ? (
            <li key={item}>
              <span className="px-3 py-2 text-sm text-gray-400">…</span>
            </li>
          ) : (
            <li key={item}>
              <Link
                href={buildHref(item)}
                className={`px-3 py-2 rounded-[5px] text-sm transition-colors ${
                  item === pageNumber
                    ? "bg-cyan-600 text-white font-semibold"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item}
              </Link>
            </li>
          )
        )}

        <li>
          <Link
            href={hasNext ? buildHref(pageNumber + 1) : "#"}
            className={`flex items-center gap-1 px-3 py-2 rounded-[5px] text-sm hover:bg-gray-100 transition-colors ${
              !hasNext ? "opacity-40 pointer-events-none" : ""
            }`}
            aria-disabled={!hasNext}
            tabIndex={!hasNext ? -1 : undefined}
          >
            Next
            <IoChevronForward className="w-4 h-4" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationUtil;
