import React, { useEffect, useState } from "react";
import AdminLayout from "../_layout";
import Table, { ColumnsProps } from "@/components/Table";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BASE_URL } from "@/pages/services/custom-software-development";
import ContentView from "@/components/admin/contentView";
import Button from "@/components/Button";
import JobForm from "@/components/admin/career/JobForm";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import DeleteConsent from "@/components/admin/deleteConsent";

export default function Clients() {
  const router = useRouter();
  const [careers, setCareers] = useState<any>();
  const [view, setView] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);
  const [dlt, setDlt] = useState<any>(null)

  const handleJobCreateForm = () => {
    router.push("/admin/reviews/create")
  };

  const columns: ColumnsProps[] = [

    {
      label: "Name",
      accessor: "name",
    },
    {
      label: "Position",
      accessor: "position",
    },

    {
      label: "Location",
      accessor: "location",
    },

    {
      label: "",
      accessor: "",
      render: (item: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-blue-500"
            onClick={() => setView(item._id)}
          >
            <IoEyeOutline />
          </button>

          <button
              className=" hover:text-blue-500"
              onClick={() => router.push(`/admin/reviews/${item._id}/edit`)}
            >
            <CiEdit />
          </button>

          <button
            className=" hover:text-blue-500"
            onClick={() => setDlt(item)}
          >
            <MdDelete className="text-red-500"/>
          </button>
        </div>
      ),
    },
  ];

  const keys = columns.map((col) => col.accessor);
  keys.pop();
  keys.push("description");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/reviews`);
      const data = await res.json();
      setCareers(data);
    } catch {
      console.log("Error fetch Careers!");
    }
  };


  return (
    <AdminLayout>
      <div className="flex justify-end mb-6">
        <Button type="Normal" onClick={handleJobCreateForm}>
          Add Review       
        </Button>
      </div>
      <Table columns={columns} data={careers} />

      {view && (
        <ContentView
          isOpen={view ? true : false }
          onClose={() => setView(null)}
          id={view}
          name="reviews"
        />
      )}




      {dlt && (
        <DeleteConsent
          isOpen={dlt ? true : false}
          onClose={()=>setDlt(null)}
          item={dlt}
          name="review"
          refresh={fetchReviews}
        />
      )}
    </AdminLayout>
  );
}
