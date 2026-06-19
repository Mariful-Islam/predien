import React, { useState } from "react";
import Form from "../../Form";
import Modal from "../../Modal";

const API_URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000"


interface ProjectForm {
  isOpen: boolean;
  onClose: VoidFunction;
  title: string;
  refresh: VoidFunction;
}

export default function ProjectForm({
  isOpen,
  onClose,
  title,
  refresh,
}: ProjectForm) {
  
  const [formData, setFormData] = useState<any>();


  const handleProjectCreate = (e:any) => {
    e.preventDefault()

    fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: 'no-cache'
    }).then((res)=>{
      onClose()
      refresh()
    }).catch((e)=>console.log(e))

  };

  const fields = [
    "project_name",
    "slug",
    "brief",
    "description",
    "type*select>web,gis,desktop,mobile,data,wordpress,uiux",
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Create ${title}`}>
      <Form
        onClose={onClose}
        fields={fields}
        onChangeFields={(data) =>
          setFormData((prev: any) => ({ ...prev, ...data }))
        }
        onSubmit={handleProjectCreate}
        submitBtnName="Create"
      />
    </Modal>
  );
}
