import React from "react";
import coreTech from "@/assets/GIS/Core GIS Technologies_ - visual selection.svg";
import mapVisualization from "@/assets/GIS/Mapping & Visualization Technologies.svg";
import SpatialAnalysis from "@/assets/GIS/Spatial Analysis and Modeling Tools.svg";
import DataCollection from "@/assets/GIS/Data Collection and Remote Sensing Technologies.svg";
import Collaboration from "@/assets/GIS/Collaboration and Data Sharing Platforms.svg";
import Image from "next/image";

function TechStack() {
  return (
    <div className="mt-4">
      <h1 className="text-green-500 font-bold text-2xl">
        Core GIS Technologies:
      </h1>

      {/* <div className=" flex flex-col items-center ">
      
        <Image
          src={mapVisualization}
          alt="map-visualization"
          className="w-[700px] "
        />
        <Image
          src={DataCollection}
          alt="data-analysis-gis"
          className="w-[700px] "
        />
        <Image
          src={SpatialAnalysis}
          alt="spatial-analysis-gis"
          className=" w-[700px] "
        />
        <Image
          src={Collaboration}
          alt="collaboration-cloud"
          className="w-[700px] "
        />

      </div> */}
      <ul className=" list-disc ml-5 mt-4 text-slate-500">
        <li>
          We use GIS software such as ArcGIS, QGIS, PostGIS, MapInfo
          Professional, . These are used ArcGIS for data editing, spatial
          analysis, visualization and 2D 3D mapping, web mapping. QGIS for
          customize GIS solution which helps for powerful mapping, spatial
          analysis, and editing capabilities. PostGIS is a postgresql database
          where store, query and manipulate large amount of spatial data for
          faster processing. MapInfo Professional is a robust analytical tools
          that helps to analysis and reporting of spatial data. FME (Feature
          Manipulation Engine) is highly effective in bridging gaps between
          various GIS formats and applications.
          <div className=" flex flex-col items-center ">
            <Image src={coreTech} alt="core-tech-gis" className="w-[700px] " />
          </div>
        </li>

        <li>
          We use Leaflet.js, Deck.gl, CesiumJS, D3.js, Power BI for interactive
          mapping, visualization which helps to represent spatial data in
          variant platform easily. Leaflet.js is a open-source JavaScript
          library for creating interactive maps on web platforms. It is ideal
          for embedding simple, fast, and responsive maps. Deck.gl is a
          high-performance visualization framework designed to handle
          large-scale datasets, enabling users to visualize complex geospatial
          information effectively on web browsers. CesiumJS A JavaScript library
          for 3D globe visualization. CesiumJS excels at rendering geospatial
          data in three dimensions, ideal for urban planning, terrain analysis,
          and geospatial modeling.D3.js is a JavaScript library used for
          creating interactive, data-driven visualizations. D3.js allows to
          create graph, different type of maps in web browser for geospatial
          data visualization. Maps are heatmaps, choropleth maps, and more.
          Power BI Integrating GIS where users can create interactive dashboards
          and geographic visualizations to enhance data-driven decision-making.
          <div className=" flex flex-col items-center ">
            <Image
              src={mapVisualization}
              alt="map-visualization"
              className="w-[700px] "
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TechStack;
