import React from 'react'
import Img1 from '@assets/images/blog/blog-01.jpg'

export default function RelatedArticles() {
  return (
    <div className='mb-4 wow fadeInUp group' data-wow-delay='.1s'>
      <div className='mb-8 overflow-hidden rounded-[5px]'>
        <a href='#' className='block'>
          <img src={Img1} alt='image' className='w-full transition group-hover:rotate-6 group-hover:scale-125' />
        </a>
      </div>
      <div>
        <span className='mb-4 inline-block rounded-[5px] bg-primary px-4 text-center font-medium leading-loose bg-[#F7F7F1]'>
          Dec 22, 2023
        </span>
        <h3>
          <a href='#' className='inline-block mb-4 text-xl font-semibold text-dark hover:text-primary text-textPrd'>
            Meet AutoManage, the best AI management tools
          </a>
        </h3>
        <p className='text-base text-body-color dark:text-dark-6'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
    </div>
  )
}
