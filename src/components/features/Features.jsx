import React from 'react'
import IconTransport from '@assets/icons/user/IconTransport.svg'
import IconSavingsDollar from '@assets/icons/user/IconSavingsDollar.svg'
import Icon24Hours from '@assets/icons/user/Icon24Hours.svg'

export default function Features() {
  const dataCategory = [
    { id: 1, image: IconTransport, text: 'Vận chuyển nhanh chóng' },
    { id: 1, image: IconSavingsDollar, text: 'Tiết kiệm chi phí' },
    { id: 1, image: Icon24Hours, text: 'Hỗ trợ 24/7' },
  ]
  return (
    <div
      className='container wow fadeInUp mt-2 lg:max-w-7xl mx-auto lg:px-0 px-4 w-full bg-[#F7F7F1] py-10 '
      data-wow-delay='.1s'
    >
      <div className='flex lg:flex-row flex-col items-center gap-4 justify-center'>
        {dataCategory.map((category, index) => {
          return (
            <div
              key={index}
              className='flex items-center justify-center cursor-pointer gap-4 border rounded-lg px-4 h-24 w-[320px] bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:bg-[#E9D2A9] hover:text-white'
            >
              <img src={category.image} alt='image' className='w-10 h-10 object-contain' />
              <div>
                <h4 className='font-medium  text-lg uppercase'>{category.text}</h4>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
