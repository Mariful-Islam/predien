import Link from "next/link";
import React, { useState } from "react";
import Modal from "../common/Modal";
import { GrDocumentPdf } from "react-icons/gr";
import { BsDownload } from "react-icons/bs";

function Document() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }
  return (
    <div className="bg-white dark:bg-black">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-20 py-20 relative">
        <div
          data-aos="fade-down"
        >
          <div className="text-blue-500 font-bold text-lg">Pitch Deck</div>
          <h3 className="text-gray-800 dark:text-slate-300 text-5xl font-semibold pt-4">
            A quick overview of our agency
          </h3>
        </div>

        <div className="mt-16">

          <button 
            onClick={handleOpen}
            className=" relative group py-2 px-8 bg-blue-600 text-white font-bold rounded-md flex gap-2 items-center hover:bg-blue-800 duration-200 overflow-hidden"
          >
            Dowload
            <BsDownload className={`stroke-1 group-hover:translate-y-12 duration-200`}/>
            <BsDownload className={`stroke-1 translate-y-[-30px] group-hover:translate-y-0 duration-200 absolute right-8`}/>
          </button>

          <Modal
            isOpen={isOpen}
            onClose={()=>setIsOpen(!isOpen)}
          >
            <div className="p-6">
              <div className="text-center my-8 text-green-600 text-xl flex flex-col items-center gap-8 font-bold">
                Are your want to download this document?
                <GrDocumentPdf className="w-12 h-12"/>
              </div>
              <div className="bg-gray-50 sm:flex sm:flex-row-reverse ">
                <Link
                  href="/dummy.pdf" 
                  download 
                  target="_black"
                  type="button"
                  onClick={()=>setIsOpen(!isOpen)}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Download
                </Link>
                <button
                  data-autofocus
                  onClick={()=>setIsOpen(!isOpen)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>
        
      </div>
    </div>
  );
}

export default Document;
