import React, { useState } from 'react'
import Form from '../Form'
import Modal from '../Modal'
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '@/pages/career/create';



interface ContentditProps {
    isOpen: boolean;
    onClose: VoidFunction;
    edit: any;
    name?: string;
    refresh: VoidFunction
}

export default function Contentdit({isOpen, onClose, edit, name, refresh}: ContentditProps) {

    const [formData, setFormData] = useState<any>(edit ? edit : {});

    const fields = edit && Object.keys(formData)

    const handleUpdate = () => {
        axios
          .put(`${API_URL}/api/${name}/${edit?.slug}`, formData)
          .then((response) => {
            toast.success(`Updated ${name}`)
            refresh()
            onClose()
          })
          .catch(() =>{
            toast.error(`Error updating ${name} !!`)

        });
      };

    
      
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${name}`}>
        <Form
            fields={fields}
            onChangeFields={(data)=>setFormData((prev:any)=>({...prev, ...data}))}
            edit={formData}
            onClose={onClose}
            
            onSubmit={handleUpdate}
            submitBtnName='Update'
        />
    </Modal>
  )
}
