import React, { use, useState } from "react";

import Form from "@/components/Form";
import { API_URL } from "@/pages/blog";
import { useRouter } from "next/router";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import AdminLayout from "../../_layout";


function Create() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>();


  const handleCreate = (e: any) => {
    e.preventDefault();

    fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    })
      .then((res) => {
        if (res.ok) {
          router.push("/admin/projects");
        }
      })
      .catch((e) => console.log(e));
  };
 
 
 
   const fields = [
     "project_name",
     "slug@project_name",
     "brief",
     "description",
     "type*select>web,gis,desktop,mobile,data,wordpress,uiux",
   ];

  
  return (
    <AdminLayout>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="text-blue-500 ring-blue-500 hover:ring-b flex items-center gap-2"
        >
          <FaArrowLeft />


        </button>

        <h3 >Create Project</h3>
      </div>

      <Form
        fields={fields}
        onChangeFields={(data) =>
          setFormData((prev: any) => ({ ...prev, ...data }))
        }
        onSubmit={handleCreate}
        submitBtnName="Create"
      />





    </AdminLayout>
  );
}

export default Create;
