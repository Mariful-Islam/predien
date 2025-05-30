import React from "react";

function Introduction() {
  return (
    <div id="intro" className=" scroll-mt-32">
      <h1
        className="text-violet-500 font-bold text-2xl"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="100"
      >
        Introduction
      </h1>
      <div
        className="text-slate-700 dark:text-slate-300 mt-2"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="150"
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
