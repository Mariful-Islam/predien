import React from "react";

function Introduction() {
  return (
    <div id="intro" className=" scroll-mt-32">
      <h1
        className="text-yellow-500 font-bold text-2xl"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        Introduction
      </h1>
      <div
        className="text-slate-700 dark:text-slate-300 mt-2"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1000"
      >
        We crafted scaled, efficient, clean coded and robust mobile applications
        and also api development. We use react native and expo tools to develop
        mobile application development for it's cross platform and django and
        Django Rest Framework for scalable and reliable backend API development.
      </div>
    </div>
  );
}

export default Introduction;
