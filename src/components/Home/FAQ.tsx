import Link from "next/link";
import React from "react";

function FAQ() {
  return (
    <div className="">
      <div className="max-w-[1200px] mx-auto w-full px-4 py-8 sm:px-20 mt-12 overflow-hidden">
        <div>
          <div 
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            <div className="text-blue-500 font-bold text-lg">Frequently Ask Question</div>
            <h3 className="text-gray-800 dark:text-slate-300 text-5xl font-semibold pt-4">
              To clarify about us, read these
            </h3>
          </div>
          <div className="flex flex-col ml:flex-row mt-12">
            <div 
              className="w-full ml:w-1/2 flex flex-col gap-4"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
            
              <div className="collapse bg-white dark:bg-gray-800">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  What is your project management process?
                </div>
                <div className="collapse-content">
                  <div className="text-slate-500">
                    We follow an agile development methodology, ensuring regular
                    updates and collaboration with you. We use tools like Jira,
                    Trello, or Asana for project management, so you can track
                    progress in real-time.
                  </div>
                </div>
              </div>

              <div className="collapse bg-white dark:bg-gray-800">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  How do you communicate during a project?
                </div>
                <div className="collapse-content">
                  <div className="text-slate-500">
                    We maintain regular communication through email, video
                    calls, and project management tools. You’ll receive weekly
                    or bi-weekly updates depending on the project’s needs.
                  </div>
                </div>
              </div>

              <div className="collapse bg-white dark:bg-gray-800">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  How much do your services cost?
                </div>
                <div className="collapse-content">
                  <div className="text-slate-500">
                    Costs vary depending on the project's scope, complexity, and
                    specific requirements. We offer competitive pricing and can
                    provide a custom quote after discussing your project in
                    detail.
                  </div>
                </div>
              </div>

              <div className="collapse bg-white dark:bg-gray-800">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  Do you provide ongoing support and maintenance?
                </div>
                <div className="collapse-content">
                  <div className="text-slate-500">
                    Yes, we offer ongoing support and maintenance packages to
                    ensure your software remains up-to-date, secure, and
                    functional. Our team is available for any post-launch
                    support needs.
                  </div>
                </div>
              </div>

              <div className="collapse bg-white dark:bg-gray-800">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  Do you integrate GIS data into other software?
                </div>
                <div className="collapse-content">
                  <div className="text-slate-500">
                    Yes, we can integrate GIS data into existing software
                    platforms such as CRM, ERP, or custom applications to
                    provide location-based insights and analysis.
                  </div>
                </div>
              </div>

              <div className="collapse bg-white dark:bg-gray-800">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  Do you provide training for the software you build?
                </div>
                <div className="collapse-content">
                  <div className="text-slate-500">
                    Yes, we offer training for clients to ensure they understand
                    how to use and manage the software we build, whether it’s a
                    website, app, or custom software solution.
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="w-full ml:w-1/2 ml-0 ml:ml-10 mt-6 text-xl"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              If you have another query let us know  <br />
              <Link href='#' className="font-bold text-green-500 hover:text-green-800 duration-200 ">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
