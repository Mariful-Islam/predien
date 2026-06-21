import React, { useEffect, useMemo, useState } from "react";

export interface ColumnsProps {
  label: string;
  accessor: string;
  render?: (item?: any) => React.ReactNode;
}

export interface TableProps {
  columns: ColumnsProps[];
  data: any;

  // Optional search props
  searchable?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  searchKeys?: string[];
  onSearchChange?: (value: string) => void;

  loading?: boolean;
  emptyMessage?: string;
}

function getValueByPath(object: any, path: string) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

const Table = ({
  columns,
  data,
  searchable = false,
  searchValue,
  searchPlaceholder = "Search...",
  searchKeys,
  onSearchChange,
  loading = false,
  emptyMessage = "No data found.",
}: TableProps) => {
  const [internalSearch, setInternalSearch] = useState(searchValue || "");

  useEffect(() => {
    if (typeof searchValue === "string") {
      setInternalSearch(searchValue);
    }
  }, [searchValue]);

  const searchTerm =
    typeof searchValue === "string" ? searchValue : internalSearch;

  const rows = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;

    return [];
  }, [data]);

  const filteredRows = useMemo(() => {
    // When onSearchChange exists, API handles filtering.
    if (onSearchChange || !searchable || !searchTerm.trim()) {
      return rows;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();

    const keysToSearch =
      searchKeys && searchKeys.length > 0
        ? searchKeys
        : columns
            .map((column) => column.accessor)
            .filter((accessor) => accessor);

    return rows.filter((row: any) =>
      keysToSearch.some((key) => {
        const value = getValueByPath(row, key);

        return String(value || "")
          .toLowerCase()
          .includes(normalizedSearch);
      }),
    );
  }, [
    rows,
    columns,
    searchable,
    searchTerm,
    searchKeys,
    onSearchChange,
  ]);

  const handleSearch = (value: string) => {
    setInternalSearch(value);

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex min-h-40 w-full items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-md bg-white text-sm dark:bg-black">
      {searchable && (
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-600">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full max-w-sm rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse border border-slate-200 text-slate-500 dark:border-slate-600 dark:text-slate-200">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`${column.accessor}-${index}`}
                  className="border-b border-slate-200 px-4 py-3 text-left text-nowrap font-medium dark:border-slate-600"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row: any, rowIndex: number) => (
                <tr
                  key={row?._id || row?.id || rowIndex}
                  className="border-b border-slate-200 transition duration-200 hover:bg-[#ebebeb] dark:border-slate-600 dark:hover:bg-slate-700"
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      key={`${column.accessor}-${columnIndex}`}
                      className="px-4 py-3 text-nowrap"
                    >
                      {column.render
                        ? column.render(row)
                        : getValueByPath(row, column.accessor) || "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-slate-400 dark:text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;