import React from 'react'
import { useNavigate } from 'react-router-dom'
import Bedroom from '@assets/images/category/category-1.jpg'
import Mattrass from '@assets/images/category/category-2.jpg'
import Outdoor from '@assets/images/category/category-3.jpg'
import Sofa from '@assets/images/category/category-4.jpg'

const categories = [
  {
    id: 1,
    img: Bedroom,
    title: 'MÁY IN QUẢNG CÁO',
    items: [
      'Máy In 2 Mặt',
      'Máy In Decal - PP',
      'Máy In UV Cuộn Hãng JHF-V398',
      'Máy In UV Cuộn 1704',
      'Máy In UV Cuộn 1704',
      'Máy In UV Hỗn Hợp 1800',
      'Máy In UV Hỗn Hợp 3200Z',
    ],
    category: 'may-in-quang-cao',
  },
  {
    id: 2,
    img: Mattrass,
    title: 'MÁY IN VẢI',
    items: [
      'Máy In YF Cuộn',
      'Máy In YF DTF',
      'Máy In YF Phẳng 1610',
      'Máy In YF Phẳng 2512',
      'Máy In YF Phẳng 3220',
      'Máy In YF Phẳng 7590',
      'Máy In UV Phẳng 2513-G5',
      'Máy In UV Phẳng 2513-G6',
      'Máy In UV Phẳng 3220-2330-G5',
      'Máy In UV Phẳng 7590',
    ],
    category: 'may-in-vai',
  },
  {
    id: 3,
    img: Outdoor,
    title: 'MÁY CẮT',
    items: ['Máy Cắt Hãng CNC', 'Máy Cắt Hãng Laser CO2'],
    category: 'may-cat',
  },
  {
    id: 4,
    img: Sofa,
    title: 'MÁY IN DTF',
    items: ['Máy In DTF Hãng JHF', 'Máy In DTF Hãng JHF-V398'],
    category: 'may-in-dtf',
  },
]

export default function Categories() {
  const navigate = useNavigate()

  // Hàm điều hướng
  const handleNavigate = (category) => {
    navigate(`/all-product?category=${category}`)
  }

  return (
    <div className='container wow fadeInUp lg:mt-10 mt-6 lg:max-w-7xl mx-auto lg:px-0 px-4 w-full' data-wow-delay='.1s'>
      <div className='font-bold lg:text-bigPrdName text-largerPrdName text-[#3B3B3B]'>Thể loại</div>
      <span className=' inline-block h-[2px] w-10 bg-[#F14646] mb-6' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {categories.map((category) => {
          // Kiểm tra nếu là id 2
          if (category.id === 1 || category.id === 2) {
            const leftItems = category.items.slice(0, Math.ceil(category.items.length / 2))
            const rightItems = category.items.slice(Math.ceil(category.items.length / 2))

            return (
              <div key={category.id} className='relative rounded-sm overflow-hidden group'>
                <img src={category.img} alt={`category ${category.id}`} className='w-full' />
                <div className='absolute inset-0 bg-[black] bg-opacity-40 transition group-hover:bg-opacity-60'>
                  <a
                    href='#'
                    className='absolute inset-0 flex flex-col justify-center items-center text-xl text-white font-roboto font-medium transition-transform duration-500 group-hover:-translate-y-28'
                  >
                    {category.title}
                  </a>
                  <div
                    className='lg:flex hidden absolute bottom-0 left-0 right-0 bg-none text-white text-base font-roboto font-normal p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500  items-center justify-center'
                    style={{ height: '80%' }}
                  >
                    <div className='flex justify-between w-full'>
                      <ul className='text-left'>
                        {leftItems.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleNavigate(category.category)}
                            className='cursor-pointer py-1 px-8'
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <ul className='text-left'>
                        {rightItems.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleNavigate(category.category)}
                            className='cursor-pointer py-1 px-8'
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          // Các danh mục khác vẫn hiển thị như bình thường
          return (
            <div key={category.id} className='relative rounded-sm overflow-hidden group'>
              <img src={category.img} alt={`category ${category.id}`} className='w-full' />
              <div className='absolute inset-0 bg-[black] bg-opacity-40 transition group-hover:bg-opacity-60'>
                <a
                  href='#'
                  className='absolute inset-0 flex flex-col justify-center items-center text-xl text-white font-roboto font-medium transition-transform duration-500 group-hover:-translate-y-28'
                >
                  {category.title}
                </a>
                <div
                  className='absolute bottom-0 left-0 right-0 bg-none text-white text-base font-roboto font-normal p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center'
                  style={{ height: '80%' }}
                >
                  <ul className='text-left flex flex-col justify-start items-start'>
                    {category.items.map((item, index) => (
                      <li key={index} onClick={() => handleNavigate(category.category)} className='cursor-pointer py-1'>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
