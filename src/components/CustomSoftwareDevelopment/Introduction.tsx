import React from "react";

function Introduction() {
  return (
    <div id="intro" className=" scroll-mt-32">
      <h1
        className="text-green-500 font-bold text-2xl"
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
        data-aos-delay="500"
      >
        Introducing Custom Software Development, one of the most popular
        services on the market right now for developing a special software
        solution that will automate, protect, and grow your business. If you are
        a startup or sole proprietor trying to market your products and services
        to your customers, you will need software, which could be a web
        application or a mobile application. One of the key components of
        software that draws clients in and encourages them to learn more about
        your company is design. Here, we excel at creating engaging user
        interfaces and user experiences. The data of your products and services
        must be protected when creating software. Additionally, we provide data
        security for your products and services. The write and read speeds of
        the software should be dependable and quick after your customer uses it.
        Therefore, in order to speed up and optimize your application, we are
        using faster databases like MySQL, PostgreSQL, MongoDB, etc., optimizing
        database queries, cache, optimizing middleware, asynchronous processing
        (celery, channel), connection pooling, log rotation, avoiding excessive
        logging, load balancing, and database sharding or replication.
      </div>
    </div>
  );
}

export default Introduction;
