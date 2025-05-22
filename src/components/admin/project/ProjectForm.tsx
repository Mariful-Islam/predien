import React, { useState } from "react";
import Form from "../../Form";
import Modal from "../../Modal";
import { API_URL } from "@/pages/blog";

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
      console.log(res)
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
