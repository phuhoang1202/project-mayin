import React, { useEffect, useState } from 'react'
import IconRight from '@assets/images/IconRight.svg'
import IconArrowDown from '@assets/images/IconArrowDown.svg'
import CloseIcon from '@assets/icons/CloseIcon'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AllMenu({ setAllMenuVisible, isAllMenuVisible }) {
  const [activeMenus, setActiveMenus] = useState([])
  const [activeSubMenus, setActiveSubMenus] = useState([])
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [unit, setUnit] = useState('KRW')

  const items = [
    {
      key: 'sub1',
      label: `Tất cả sản phẩm`,
      href: 'all-product',
    },
    {
      key: 'sub2',
      label: `Bài viết`,
      href: 'news-page',
    },
    {
      key: 'sub3',
      label: `Chính sách`,
      href: '#',
      children: [
        { key: 'g3-1-1', label: `Điều khoản sử dụng`, href: '/chinh-sach/dieu-khoan-su-dung' },
        { key: 'g3-1-2', label: `Phương thức thanh toán`, href: '/chinh-sach/phuong-thuc-thanh-toan' },
        { key: 'g3-1-3', label: `Chính sách vận chuyển`, href: '/chinh-sach/chinh-sach-van-chuyen' },
        { key: 'g3-1-4', label: `Chính sách bảo hành`, href: '/chinh-sach/chinh-sach-bao-hanh' },
        { key: 'g3-1-5', label: `Chính sách bảo hành 3M`, href: '/chinh-sach/chinh-sach-bao-hanh-3M' },
        { key: 'g3-1-6', label: `Chính sách đổi trả`, href: '/chinh-sach/chinh-sach-doi-tra' },
        { key: 'g3-1-7', label: `Chính sách bảo mật`, href: '/chinh-sach/chinh-sach-bao-mat' },
      ],
    },

    {
      key: 'sub4',
      label: `Hỗ trợ khách hàng`,
      href: '#',
      children: [
        { key: 'g4-1-1', label: `Tư vấn khách hàng`, href: '/ho-tro-khach-hang/tu-van-khach-hang' },
        { key: 'g4-1-2', label: `Câu hỏi thường gặp`, href: '/ho-tro-khach-hang/cau-hoi-thuong-gap' },
        { key: 'g4-1-3', label: `Hỗ trợ 1:1`, href: '/ho-tro-khach-hang/ho-tro-1-1' },
        { key: 'g4-1-4', label: `Phản ánh dịch vụ`, href: '/ho-tro-khach-hang/phan-anh-dich-vu' },
      ],
    },
    {
      key: 'sub5',
      label: `Giới thiệu`,
      href: 'news-page',
    },
    {
      key: 'sub6',
      label: `Liên hệ`,
      href: 'news-page',
    },
  ]

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    setUnit(getUnitLocal)
  }, [unit])

  const toggleSubMenu = (key) => {
    setActiveMenus(
      (prevActiveMenus) =>
        prevActiveMenus.includes(key)
          ? prevActiveMenus.filter((menuKey) => menuKey !== key) // Xóa key nếu đã tồn tại
          : [...prevActiveMenus, key], // Thêm key nếu chưa tồn tại
    )
  }

  return (
    <div
      className={`w-[22rem] bg-white lg:p-6 p-4 shadow-lg rounded-lg lg:max-w-lg overflow-y-auto h-[90vh]`}
      style={{
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.1)',
        height: '',
      }}
    >
      <div className='relative p-2'>
        <div className='absolute top-[-10px] right-[-10px]'>
          <CloseIcon className='cursor-pointer' onClick={() => setAllMenuVisible(false)} />
        </div>
      </div>

      {/* 4 */}
      <div className='mt-2'>
        {items.map((item) => (
          <div key={item.key}>
            <button
              className='text-left w-full p-2 text-normal font-semibold border-b border-gray-200 hover:bg-gray-100 mt-2'
              onClick={() => {
                if (item.children) {
                  toggleSubMenu(item.key)
                } else {
                  // Chuyển hướng nếu không có children
                  setAllMenuVisible(!isAllMenuVisible)
                  navigate(item.href)
                }
              }}
            >
              {item.label}
              {item.children && (
                <span className='float-right'>
                  {activeMenus.includes(item.key) ? (
                    <img src={IconRight} alt='icon' />
                  ) : (
                    <img src={IconArrowDown} alt='icon' />
                  )}
                </span>
              )}
            </button>
            {item.children && (
              <div className='pl-2'>
                {item.children.map((subItem) => (
                  <Link
                    key={subItem.key}
                    to={subItem.href}
                    className='block py-2 px-4 text-normal font-medium text-[#282828] bg-[#F8F8F8] hover:underline'
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
