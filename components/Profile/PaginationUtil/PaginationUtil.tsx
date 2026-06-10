"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import styles from "./PaginationUtil.module.css";

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
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link
            href={hasPrev ? buildHref(pageNumber - 1) : "#"}
            className={hasPrev ? styles.prevNext : styles.prevNextDisabled}
            aria-disabled={!hasPrev}
            tabIndex={!hasPrev ? -1 : undefined}
          >
            <IoChevronBack className={styles.icon} />
            Previous
          </Link>
        </li>

        {visiblePages.map((item) =>
          typeof item === "string" ? (
            <li key={item}>
              <span className={styles.ellipsis}>&hellip;</span>
            </li>
          ) : (
            <li key={item}>
              <Link
                href={buildHref(item)}
                className={item === pageNumber ? styles.pageLinkActive : styles.pageLinkInactive}
              >
                {item}
              </Link>
            </li>
          )
        )}

        <li>
          <Link
            href={hasNext ? buildHref(pageNumber + 1) : "#"}
            className={hasNext ? styles.prevNext : styles.prevNextDisabled}
            aria-disabled={!hasNext}
            tabIndex={!hasNext ? -1 : undefined}
          >
            Next
            <IoChevronForward className={styles.icon} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationUtil;
