import { useRouter } from "next/router";
import React, { useMemo } from "react";
import {
  GoChevronLeft,
  GoChevronRight,

} from "react-icons/go";

type PaginationData = {
  totalItems?: number;
  currentPage?: number;
  totalPages?: number;
  limit?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};

type PaginatorProps = {
  pagination?: PaginationData;
};

function getPaginationPages(currentPage: number, totalPages: number) {
  const pages: Array<number | "ellipsis-left" | "ellipsis-right"> = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    return pages;
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push("ellipsis-left");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (currentPage < totalPages - 3) {
    pages.push("ellipsis-right");
  }

  pages.push(totalPages);

  return pages;
}

export default function PaginatorNext({ pagination }: PaginatorProps) {
  const router = useRouter();

  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.totalItems || 0;

  const pageList = useMemo(
    () => getPaginationPages(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    // Keep existing query params such as search, limit, sortBy, order
    const query = { ...router.query };

    if (page === 1) {
      delete query.page;
    } else {
      query.page = String(page);
    }

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { scroll: false },
    );
  };

  if (totalPages <= 1 && totalItems === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 px-4 py-4 dark:border-slate-700 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-slate-300">
          Total <span className="font-semibold">{totalItems}</span> results
        </p>

        {/* Mobile */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            disabled={!pagination?.hasPreviousPage}
            onClick={() => onPageChange(currentPage - 1)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600 dark:text-slate-300">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={!pagination?.hasNextPage}
            onClick={() => onPageChange(currentPage + 1)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            Next
          </button>
        </div>

        {/* Desktop */}
        <nav
          aria-label="Pagination"
          className="hidden isolate overflow-hidden rounded-md border border-gray-300 shadow-sm dark:border-slate-700 sm:inline-flex"
        >
          <button
            type="button"
            aria-label="Previous page"
            disabled={!pagination?.hasPreviousPage}
            onClick={() => onPageChange(currentPage - 1)}
            className="inline-flex items-center border-r border-gray-300 px-3 py-2 text-gray-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <GoChevronLeft className="h-5 w-5" />
          </button>

          {pageList.map((item, index) => {
            if (typeof item !== "number") {
              return (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center border-r border-gray-300 px-3 py-2 text-gray-500 dark:border-slate-700 dark:text-slate-400"
                >
                  {/* <GoEllipsis className="h-5 w-5" /> */}

                  Go
                </span>
              );
            }

            const isActive = item === currentPage;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={isActive ? "page" : undefined}
                className={`min-w-10 border-r border-gray-300 px-3 py-2 text-sm font-semibold transition dark:border-slate-700 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {item}
              </button>
            );
          })}

          <button
            type="button"
            aria-label="Next page"
            disabled={!pagination?.hasNextPage}
            onClick={() => onPageChange(currentPage + 1)}
            className="inline-flex items-center px-3 py-2 text-gray-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <GoChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}