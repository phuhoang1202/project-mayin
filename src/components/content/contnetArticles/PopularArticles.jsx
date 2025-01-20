import React from "react";

export default function PopularArticles() {
  return (
    <div className="flex flex-wrap mb-8 -mx-4">
      <div className="w-full px-4">
        <h2
          className="wow fadeInUp relative capitalize pb-5 text-2xl font-semibold text-dark dark:text-white sm:text-[28px]"
          data-wow-delay=".1s
"
        >
          Bài viết nổi bật
        </h2>
        <span className="mb-10 inline-block h-[2px] w-20 bg-primary" />
      </div>
      <div className="w-full px-4 md:w-1/2 lg:w-full">
        <div
          className="flex items-center w-full pb-5 mb-5 border-b wow fadeInUp border-stroke dark:border-dark-3"
          data-wow-delay=".1s
"
        >
          <div className="mr-5 h-20 w-full max-w-[80px] overflow-hidden rounded-full">
            <img
              src="assets/images/blog/article-author-01.png"
              alt="image"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <h4>
              <a
                href="javascript:void(0)"
                className="inline-block mb-1 text-lg font-medium leading-snug text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary lg:text-base xl:text-lg"
              >
                Create engaging online courses your student…
              </a>
            </h4>
            <p className="text-sm text-body-color dark:text-dark-6">
              Glomiya Lucy
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:w-1/2 lg:w-full">
        <div
          className="flex items-center w-full pb-5 mb-5 border-b wow fadeInUp border-stroke dark:border-dark-3"
          data-wow-delay=".1s
"
        >
          <div className="mr-5 h-20 w-full max-w-[80px] overflow-hidden rounded-full">
            <img
              src="assets/images/blog/article-author-02.png"
              alt="image"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <h4>
              <a
                href="javascript:void(0)"
                className="inline-block mb-1 text-lg font-medium leading-snug text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary lg:text-base xl:text-lg"
              >
                The ultimate formula for launching online course
              </a>
            </h4>
            <p className="text-sm text-body-color dark:text-dark-6">
              Andrio jeson
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:w-1/2 lg:w-full">
        <div
          className="flex items-center w-full pb-5 mb-5 border-b wow fadeInUp border-stroke dark:border-dark-3"
          data-wow-delay=".1s
"
        >
          <div className="mr-5 h-20 w-full max-w-[80px] overflow-hidden rounded-full">
            <img
              src="assets/images/blog/article-author-03.png"
              alt="image"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <h4>
              <a
                href="javascript:void(0)"
                className="inline-block mb-1 text-lg font-medium leading-snug text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary lg:text-base xl:text-lg"
              >
                50 Best web design tips &amp; tricks that will help you
              </a>
            </h4>
            <p className="text-sm text-body-color dark:text-dark-6">
              Samoyel Dayno
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:w-1/2 lg:w-full">
        <div
          className="flex items-center w-full pb-5 mb-5 border-0 wow fadeInUp border-stroke dark:border-dark-3 md:border-b lg:border-0"
          data-wow-delay=".1s
"
        >
          <div className="mr-5 h-20 w-full max-w-[80px] overflow-hidden rounded-full">
            <img
              src="assets/images/blog/article-author-04.png"
              alt="image"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <h4>
              <a
                href="javascript:void(0)"
                className="inline-block mb-1 text-lg font-medium leading-snug text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary lg:text-base xl:text-lg"
              >
                The 8 best landing page builders, reviewed
              </a>
            </h4>
            <p className="text-sm text-body-color dark:text-dark-6">
              Andrio Glori
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
