import React, { useEffect, useState } from "react";
import AdminLayout from "../_layout";
import Table, { ColumnsProps } from "@/components/Table";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { BASE_URL } from "@/pages/services/custom-software-development";
import ContentView from "@/components/admin/contentView";
import Button from "@/components/Button";
import JobForm from "@/components/admin/career/JobForm";

export default function Career() {
  const [careers, setCareers] = useState<any>();
  const [view, setView] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);
  const [isOpenJobCreateForm, setIsOpenJobCreateForm] =
    useState<boolean>(false);

  const handleJobCreateForm = () => {
    setIsOpenJobCreateForm(!isOpenJobCreateForm);
  };

  const columns: ColumnsProps[] = [

    {
      label: "Job title",
      accessor: "job_title",
    },
    {
      label: "Salary",
      accessor: "salary_range",
    },
    {
      label: "Vacancy",
      accessor: "vacancy",
    },
    {
      label: "Location",
      accessor: "location",
    },
    {
      label: "Duration",
      accessor: "duration",
    },
    {
      label: "",
      accessor: "",
      render: (item: any) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className=" hover:text-blue-500"
            onClick={() => setView(item.slug)}
          >
            <IoEyeOutline />
          </button>
          <button
            className=" hover:text-blue-500"
            onClick={() => setEdit("ygyug")}
          >
            <CiEdit />
          </button>
        </div>
      ),
    },
  ];

  const keys = columns.map((col) => col.accessor);
  keys.pop();
  keys.push("description");

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/jobs`);
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
          Add Job
        </Button>
      </div>
      <Table columns={columns} data={careers} />

      {view && (
        <ContentView
          isOpen={view ? true : false}
          onClose={() => setView(null)}
          id={view}
          name="jobs"
          keys={keys}
        />
      )}


      {isOpenJobCreateForm && (
        <JobForm
          isOpen={isOpenJobCreateForm}
          onClose={handleJobCreateForm}
          title="Create Job"
          refresh={fetchCareers}
        />
      )}
    </AdminLayout>
  );
}
