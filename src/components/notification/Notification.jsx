import React, { useState, useEffect } from 'react'
import IconNotificationHome from '@assets/images/IconNotificationHome.svg'
import IconSubtract from '@assets/images/IconSubtract.svg'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import CloseIcon from '@assets/icons/CloseIcon'
import { useNavigate } from 'react-router-dom'

export default function Notification() {
  const [isVisible, setIsVisible] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Kiểm tra xem người dùng đã tích checkbox chưa
    const hideNotification = localStorage.getItem('hideNotification')
    if (hideNotification) {
      setIsVisible(false)
    } else {
      // Đóng modal tự động sau 5 giây
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleClose = () => {
    if (isChecked) {
      localStorage.setItem('hideNotification', 'true') // Lưu vào localStorage khi checkbox được tích
    }
    setIsVisible(false)
  }

  return (
    <>
      {isVisible && (
        <div className='modal-overlay'>
          <div className='modal-container'>
            <div className='relative'>
              {/* img */}
              <img src={IconSubtract} alt='image' />
              <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
                <img src={IconNotificationHome} alt='icon' />
              </div>

              {/* content */}
              <div className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 min-w-[250px]'>
                <div className='flex flex-col items-center w-full gap-3'>
                  <h3 className='font-bold text-textPrd'>TYC마켓 그랜드 오픈!</h3>
                  <p className='text-[#AFAEAE] font-medium text-normal'>이용방법 및 유의사항을 확인해주세요</p>
                  <button
                    onClick={() => navigate('news-page')}
                    className='bg-[#D1B584] font-bold text-small w-full flex items-center justify-center h-11 rounded-lg text-white'
                  >
                    공지사항 바로가기 <img src={IconChevronRight} alt='icon' />
                  </button>
                </div>
              </div>

              {/* Button */}
              <div className='absolute -bottom-6 left-0 h-8 bg-[#EFEFEF] w-full flex items-center rounded-b-lg'>
                <div className='flex items-center gap-2 px-4 text-[#707070] text-min'>
                  <input
                    type='checkbox'
                    className='w-5 h-5 border-[#707070]'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  메시지창을 다시 표시하지 않음
                </div>
              </div>

              {/* Close button */}
              <div className='absolute top-2 right-2'>
                <button onClick={handleClose} className='close-btn'>
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
