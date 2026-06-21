import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import AdminLayout from "../_layout";
import Table, { ColumnsProps } from "@/components/Table";
import Button from "@/components/Button";
import DeleteConsent from "@/components/admin/deleteConsent";
import ContentView from "@/components/admin/contentView";
import PaginatorNext from "@/components/PaginatorNext";

// Better: use environment variable instead of importing BASE_URL from another page
const BASE_URL = process.env.API_BASE_URL || "";

export default function Keyword() {
  const router = useRouter();

  const [keywords, setKeywords] = useState<any>(null);
  const [view, setView] = useState<string | null>(null);
  const [dlt, setDlt] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<any>(null);
  const {page} = router.query



  const fetchKeywords = async (queryObj?: Record<string, any>) => {
    // 1. Properly serialize the object into a query string
    const queryString = new URLSearchParams(queryObj).toString();
    console.log(queryString, "queryString")

    try {
      const res = await fetch(`${BASE_URL}/api/keywords?${queryString}`);
      const data = await res.json();

      if (!data) {
        return { notFound: true };
      }
      setKeywords(data);
    } catch (error) {
      console.log("Error fetching keywords:", error);
    }
  };

  useEffect(() => {
    // 2. Create a fresh copy of the router query inside the effect
    const combinedQuery = { ...router.query };

    // 3. Merge the local search state into the query object
    if (search) {
      combinedQuery.search = search;
    } else {
      delete combinedQuery.search;
    }

    // 4. Pass the updated query object directly to the fetch function
    fetchKeywords(combinedQuery);

    // 5. Added 'search' to dependencies so it refetches when the search input changes
  }, [search, router.isReady, page]);



  const handleCreate = () => {
    router.push("/admin/keywords/create");
  };


  const columns: ColumnsProps[] = [
    {
      label: "Name",
      accessor: "name",
      render: (item: any) => <div>{item.name || "-"}</div>,
    },
    {
      label: "Slug",
      accessor: "slug",
      render: (item: any) => <div>{item.slug || "-"}</div>,
    },
    {
      label: "Date",
      accessor: "date",
      render: (item: any) => (
        <div>
          {item.date ? moment(item.date).format("hh:mm A, DD MMM YYYY") : "-"}
        </div>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      render: (item: any) => (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            title="View"
            className="transition hover:text-blue-500"
            onClick={() => setView(item.slug)}
          >
            <IoEyeOutline size={18} />
          </button>

          <button
            type="button"
            title="Edit"
            className="transition hover:text-blue-500"
            onClick={() => router.push(`/admin/keywords/${item.slug}/edit`)}
          >
            <CiEdit size={20} />
          </button>

          <button
            type="button"
            title="Delete"
            className="transition hover:text-red-500"
            onClick={() => setDlt(item)}
          >
            <MdDelete size={18} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Keywords</h2>

        <Button type="Normal" onClick={handleCreate}>
          Add Keyword
        </Button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-sm text-slate-500">
          Loading keywords...
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            data={keywords?.data || []}
            searchable
            onSearchChange={(value) => setSearch(value)}
          />

          <PaginatorNext
            pagination={
              keywords?.pagination || {
                totalItems: 0,
                currentPage: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPreviousPage: false,
              }
            }
          />
        </>
      )}

      {view && (
        <ContentView
          isOpen={Boolean(view)}
          onClose={() => setView(null)}
          id={view as any}
          name="keywords"
        />
      )}

      {dlt && (
        <DeleteConsent
          isOpen={Boolean(dlt)}
          onClose={() => setDlt(null)}
          item={dlt}
          name="keyword"
          refresh={fetchKeywords}
        />
      )}
    </AdminLayout>
  );
}
