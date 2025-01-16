import Image from "next/image";
import React from "react";
import techStack from "@/assets/Mobile application development  tect stack.svg"



function TechStack() {
  return (
    <div className="mt-6">
      <h1 className="text-green-500 font-bold text-2xl">Technologies We Use</h1>
      <div className="flex justify-center">
        <Image
            src={techStack}
            alt="technolgy-stack-mobile-app-development"
            className="mt-4 w-[600px] h-[600px]"
        />
      </div>
      <div className="ml-6 mt-2 text-slate-500 dark:text-slate-300">
        <ul className="list-disc">
          <li className="mt-2">
            <b>Mobile Development</b>
            <ul className="list-disc ml-4">
              <li>Expo</li>
              <li>React Native</li>
            </ul>
          </li>
          <li className="mt-2">
            <b>API Development</b>
            <ul className="list-disc ml-4">
              <li>Django</li>
              <li>Django Rest Framework</li>
              <li>Celery</li>
              <li>Expressjs</li>
            </ul>
          </li>

          <li className="mt-2">
            <b>Database</b>
            <ul className="list-disc ml-4">
              <li>PostgreSQL</li>
              <li>MySQL</li>
              <li>Sqlite</li>
              <li>Realm</li>
              <li>Firebase</li>
            </ul>
          </li>

          <li className="mt-2">
            <b>DevOps and CI/CD</b>
            <ul className="list-disc ml-4">
              <li>Git</li>
              <li>GitHub Actions</li>
              <li>Jenkins</li>
              <li>Docker</li>
              <li>Kubernetes</li>
            </ul>
          </li>

          <li className="mt-2">
            <b>Deployment</b>
            <ul className="list-disc ml-4">
              <li>Google play store</li>
              <li>App store</li>
              <li>AWS</li>
              <li>GCP</li>
              <li>Azure</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TechStack;
