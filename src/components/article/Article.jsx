import RelatedArticles from '@components/content/contnetArticles/RelatedArticles'
import SeeMore from '@components/seeMore/SeeMore'
import React from 'react'

export default function Article() {
  return (
    <div className='max-w-7xl mx-auto mt-4 lg:px-0 px-4 container wow fadeInUp' data-wow-delay='.2s'>
      <div className='font-bold lg:text-bigPrdName text-largerPrdName text-[#3B3B3B]'>Bài viết</div>

      <div className='flex lg:flex-row flex-col items-center gap-6 mt-4'>
        <RelatedArticles />
        <RelatedArticles />
        <RelatedArticles />
      </div>

      <div className='flex justify-center mt-4 border-b pb-4'>
        <SeeMore />
      </div>
    </div>
  )
}
