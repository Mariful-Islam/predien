import React from "react";

function Introduction() {
  return (
    <div id="intro" className=" scroll-mt-32">
      <h1 
        className="text-orange-500 font-bold text-2xl"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        Introduction
      </h1>
      <div 
        className="text-slate-500 dark:text-slate-300 mt-2 text-justify"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1000"
      >
        Predien provides cutting-edge Geographic Information System (GIS) solutions
        that analyze real-world data, including both location-based
        and attribute data into insightful maps. These Map represent a meaningful,
        insightful, relevant, detailed visualization of data that helps to understand
        business problem and easily get pick solutions also represent complex spatial 
        relationships and patterns

        We also provide ai and machine learning techniques in gis that helps to analyze 
        spatial data to predict trends, identify hidden patterns, and forecast future 
        spatial scenarios. It also helps to provide more accurate and dynamic insights, 
        helping businesses make proactive, data-driven decisions.
      </div>
      
    </div>
  );
}

export default Introduction;
