import React from "react";

function Introduction() {
  return (
    <div>
      <h1 className="text-green-500 font-bold text-2xl">Introduction</h1>
      <div className="text-slate-500 dark:text-slate-300 mt-2">
        We crafted scaled, efficient, clean coded and robust mobile applications
        and also api development. We use react native and expo tools to develop
        mobile application development for it's cross platform and django and
        Django Rest Framework for scalable and reliable backend API development.
        <ol className=" list-decimal ml-4 mt-4">
          <li>
            <b>Quality-first development</b>
            <ul className="list-disc mt-2 ml-2">
              <li>
                We follow industry coding standard so that it is easy to
                maintain, modify and integrate new features. Bacause quality
                code is a indecator of a good software.
              </li>
              <li>
                We stick to modern coding standards and always peer-review every
                single line of code.{" "}
              </li>
              <li>
                We implement Test Driven Development(TTD) to our working
                process, so that the software reliable, efficient and bug free.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Introduction;
