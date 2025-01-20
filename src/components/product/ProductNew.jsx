import React, { useEffect, useState } from 'react'
import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconHeart from '@assets/images/IconHeart.svg'
import IconStar from '@assets/images/IconStar.svg'
import IconLeft from '@assets/images/IconLeft.svg'
import IconRight from '@assets/images/IconRight.svg'
import { constants as c } from '@constants'
import { product } from '@services/user/product'
import { Link, useNavigate } from 'react-router-dom'
import { getToken, getUserInfor } from '@utils/auth'
import { Modal, Skeleton, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { formatPrice, formatPriceMultilingual } from '@utils/index'
import ImageError from '@assets/images/ImageError.svg'
import Loading from '@components/loadingCommon/Loading'

export default function ProductNew() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  const [items, setItems] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [dataCategory, setDataCategory] = useState([])
  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)
  const getUserId = JSON.parse(getUserInfor() || null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 375)
  const navigate = useNavigate()
  // const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')

  const { t } = useTranslation()

  // Modal navigate login
  const [openModal, setOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)

    setOpenModal(false)
    setConfirmLoading(false)

    navigate('/login')
  }
  const handleCancel = () => {
    setOpenModal(false)
  }

  const [unit, setUnit] = useState('KRW')

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    // const getLanguage = JSON.parse(localStorage.getItem('language')) || ''
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [])

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await product.getProductByAllParent()
      const result = await Promise.all(
        response.data.map(async (cate) => {
          cate.name = cate.name.charAt(0).toUpperCase() + cate.name.slice(1)
          return cate
        }),
      )
      setCategory(response.data[0].id)
      setDataCategory(result)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProductsNew = async (categoryId) => {
    try {
      setLoading(true)
      const response = await product.getProductByType({
        type: 'new_product',
        currency: unit,
        pageNumber: pageNumber,
        pageSize: 4,
        userId: getUserId?.id,
        sort: 'id',
        sortBy: 'desc',
        // language,
        categoryId: categoryId,
      })
      const result = await Promise.all(
        response.data.content.map(async (product) => {
          product.imageMain = product?.productImages.find((el) => el.main) || product.productImages[0]
          return product
        }),
      )
      setItems(result)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    if (category !== 0) {
      fetchProductsNew(category)
    }
  }, [category, pageNumber])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmallMobile(window.innerWidth < 375)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // const handlePrev = () => {
  //   const newItems = [...items]
  //   const lastItem = newItems.pop()
  //   newItems.unshift(lastItem)
  //   setCurrentIndex(0)
  //   setItems(newItems)
  // }

  // const handleNext = () => {
  //   const newItems = [...items]
  //   const firstItem = newItems.shift()
  //   newItems.push(firstItem)
  //   setCurrentIndex(0)
  //   setItems(newItems)
  // }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    } else if (pageNumber > 0) {
      setPageNumber((prevPage) => prevPage - 1)
      setCurrentIndex(3) // Chuyển đến sản phẩm cuối của trang trước
    } else {
      const newItems = [...items]
      const lastItem = newItems.pop() // Lấy phần tử cuối cùng
      newItems.unshift(lastItem) // Đưa phần tử cuối lên đầu
      setItems(newItems)
      setCurrentIndex(0) // Đặt lại index là 0
    }
  }

  const handleNext = () => {
    if (currentIndex < 3) {
      // Chỉ số hiện tại nhỏ hơn số lượng sản phẩm hiển thị trên trang
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else {
      // Khi next hết 4 sản phẩm thì chuyển sang trang mới
      if (items.length === 4) {
        setPageNumber((prevPage) => prevPage + 1)
        setCurrentIndex(0) // Reset lại index ở trang mới
      } else {
        const newItems = [...items]
        const firstItem = newItems.shift() // Lấy phần tử đầu tiên
        newItems.push(firstItem) // Đưa phần tử đầu xuống cuối
        setItems(newItems)
        setCurrentIndex(0) // Đặt lại index là 0
      }
    }
  }

  const handleCategoryClick = (index, categoryId) => {
    setActiveCategory(index)
    setCategory(categoryId)
    setPageNumber(0)
  }

  return (
    <div className='lg:mt-10 mt-7 py-2 bg-[#F7F7F1] lg:px-0 px-4 relative'>
      <div className='font-bold lg:text-bigPrdName text-largerPrdName text-[#3B3B3B] mt-5 lg:max-w-7xl mx-auto'>
        {t('titleNew')}
      </div>

      <div className='max-w-6xl mx-auto'>
        {loading && <Loading />}
        div
      </div>
      {/* Modal navigate login */}
      <Modal open={openModal} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false} centered>
        <div>
          <div className='font-semibold text-textPrd flex flex-col justify-center items-center mt-4 gap-2'>
            {/* <div>{t('loginText1')} </div> */}
            <div>{t('loginText2')}</div>
          </div>
        </div>

        <div className='flex items-center justify-center gap-6 mt-8'>
          <div>
            <button
              className='font-semibold text-normal h-11 min-w-36 rounded-lg'
              style={{ border: '2px solid black' }}
              onClick={handleCancel}
            >
              {t('btnCancel')}
            </button>
          </div>
          <div>
            <button
              className='text-white bg-[#D1B584] font-semibold text-normal h-11 min-w-36 rounded-lg'
              onClick={handleOk}
            >
              {t('loginBtn')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
