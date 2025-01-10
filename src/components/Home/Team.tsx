import React from "react";
import { TeamMembers } from "./teamMembers";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import animation from '@/assets/team-anim.gif'

function Team() {
  return (
    <div className="bg-white dark:bg-black">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-20 py-20 relative">
        <div
          className="z-50"
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="500"
          style={{zIndex: 20}}
        >
          <h1 className="text-blue-500 font-bold ">
            Core Team Members
          </h1>
          <h3 
            className="text-slate-500 dark:text-slate-300 text-5xl font-semibold"
          >
            Members of our excellence team
          </h3>
          <ul className="mt-8 flex gap-12">
            {TeamMembers.map((item) => (
              <li key={item.id} className="group">
                <Link href={`#`}>
                  <Image
                    src={item.image || ""}
                    alt=""
                    className="h-[150px] w-[150px] rounded-full aspect-square object-cover"
                  />
                  <div className="text-xl text-gray-700 dark:text-white font-bold group-hover:text-blue-600 mt-2 flex justify-center">
                    {item.name}
                  </div>
                  <span className="text-slate-400 text-sm font-semibold flex justify-center">{item.role}</span>
                </Link>
                <div className="mt-2 flex justify-center gap-2">
                  <Link href={item.connect.linkedin} target="_blank">
                    <FaLinkedin className="hover:text-blue-500"/>
                  </Link>

                  <Link href={`mailto:${item.connect.email}`} target="_blank">
                    <MdEmail className="hover:text-blue-500" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div 
          className="absolute top-0 right-0 z-10 h-[500px] w-[500px] ml:block hidden"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
          style={{zIndex: 0}}
        >
          <Image 
            src={animation}
            alt=""
            className="mix-blend-plus-darker z-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Team;
