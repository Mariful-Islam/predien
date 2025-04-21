import React, { useEffect, useState } from "react";
import AdminLayout from "../_layout";
import Table, { ColumnsProps, TableProps } from "@/components/Table";
import { BASE_URL } from "@/pages/services/custom-software-development";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { ObjectId } from "mongodb";
import ContentView from "@/components/admin/contentView";
import { MdDelete } from "react-icons/md";
import DeleteConsent from "@/components/admin/deleteConsent";
import Button from "@/components/Button";

export default function Project() {
  const [projects, setProjects] = useState<any>();
  const [View, setView] = useState<any>(null);
  const [dlt, setDlt] = useState<any>(null)

  const columns: ColumnsProps[] = [
    {
      label: "ID",
      accessor: "_id",
      render: (item) => <div>{item._id}</div>,
    },
    {
      label: "Project name",
      accessor: "project_name",
    },
    {
      label: "Brief",
      accessor: "brief",
    },
    {
      label: "Type",
      accessor: "type",
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
            onClick={() => setDlt(item)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch {
      console.log("Error fetch projects!");
    }
  };

  return (
    <AdminLayout>

      <div className="flex justify-end mb-6">
        <Button type="Normal">
          Add Project
        </Button>
      </div>

      <Table columns={columns} data={projects} />

      {View && (
        <ContentView
          isOpen={View ? true : false}
          onClose={() => setView(null)}
          id={View}
          name="projects"
          keys={['project_name', 'slug', 'brief', 'description', 'type', 'post_date']}
        />
      )}

      {dlt && (
        <DeleteConsent
          isOpen={dlt ? true : false}
          onClose={()=>setDlt(null)}
          item={dlt}
          name="project"
        />
      )}

      

    </AdminLayout>
  );
}
