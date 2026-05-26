"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type PaginationUtilProps = {
  count: number;
};

const PaginationUtil = ({ count }: PaginationUtilProps) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const pageNumber = parseInt(page);
  const ITEMS_PER_PAGE = 10;
  const numberOfPages = count / ITEMS_PER_PAGE;

  const rows = [];
  for (let i = 0; i < numberOfPages; i++) {
    rows.push(i + 1);
  }

  const hasPrev = ITEMS_PER_PAGE * (pageNumber - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (pageNumber - 1) + ITEMS_PER_PAGE < count;

  return (
    <nav className="flex justify-center">
      <ul className="flex items-center gap-1 text-gray-500">
        <li>
          <Link
            href={`/profile?page=${pageNumber - 1}`}
            className={`px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
              !hasPrev ? "pointer-events-none opacity-60" : ""
            }`}
          >
            Previous
          </Link>
        </li>

        {rows.map((row, index) => (
          <li key={index}>
            <Link
              href={`/profile?page=${row}`}
              className={`px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
                row === pageNumber ? "font-semibold text-gray-700" : ""
              }`}
            >
              {row}
            </Link>
          </li>
        ))}
        <li>
          <span className="px-3 py-2 text-sm">...</span>
        </li>
        <li>
          <Link
            href={`/profile?page=${pageNumber + 1}`}
            className={`px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
              !hasNext ? "pointer-events-none opacity-60" : ""
            }`}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationUtil;
