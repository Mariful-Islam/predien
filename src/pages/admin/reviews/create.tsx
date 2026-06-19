import React, { use, useState } from "react";
import AdminLayout from "../_layout";
import Form from "@/components/Form";
import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";

const API_URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000"



function Create() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>();

  const handleCreate = (e: any) => {
    e.preventDefault();

    fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    })
      .then((res) => {
        if (res.ok) {
          router.push("/admin/reviews");
        }
      })
      .catch((e) => console.log(e));
  };

  const fields = ["name", "position", "review", "star", "location", "meta{title,description,keywords}"];

  return (
    <AdminLayout>
      <button
        onClick={() => router.push("/admin/reviews")}
        className="text-blue-500 ring-blue-500 hover:ring-b flex items-center gap-2 mb-4"
      >
        <FaChevronLeft /> Back
      </button>

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
