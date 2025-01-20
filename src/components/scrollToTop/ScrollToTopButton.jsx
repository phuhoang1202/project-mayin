import { ArrowUpOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import IconFB from '@assets/icons/user/IconFB.png'
import IconZL from '@assets/icons/user/IconZL.svg'
import IconPhone from '@assets/icons/user/IconPhone.svg'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Function to handle scroll
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Function to scroll to top
  const ScrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div>
      <div className='fixed bottom-28 right-10 flex justify-center items-center rounded-full z-50 duration-300 ease-in-out'>
        <div className='flex flex-col gap-4'>
          <div className='relative cursor-pointer'>
            <img
              src={IconPhone}
              alt='icon'
              className='w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shake-stop'
            />
            <div className='pulse'></div>
          </div>

          <button className='h-12 w-12 rounded-full' style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 10px' }}>
            <img src={IconFB} alt='icon' className='w-full h-full object-cover' />
          </button>

          <button className='h-12 w-12 rounded-full' style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 10px' }}>
            <img src={IconZL} alt='icon' className='w-full h-full object-cover' />
          </button>

          {isVisible && (
            <button
              onClick={ScrollToTopButton}
              className='flex justify-center items-center rounded-full bg-white h-12 w-12 duration-300 ease-in-out'
              style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 10px' }}
            >
              <ArrowUpOutlined style={{ color: 'black' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
