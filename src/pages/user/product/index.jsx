import React, { useEffect, useState } from 'react'
import IconRight from '@assets/images/IconRight.svg'
import IconLeft from '@assets/images/IconLeft.svg'
import IconShoppingCart from '@assets/images/IconShoppingCart.svg'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import IconFreeShip from '@assets/images/IconFreeShip.svg'
import IconMoney from '@assets/images/IconMoney.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { Menu, Rate, Image, Modal } from 'antd'
import CollapseComponent from '@components/collapse/CollapseComponent'
// import Feedback from '@components/feedback/Feedback'
import BestProduct from '@components/bestProduct/BestProduct'
import ProductNew from '@components/product/ProductNew'
import { product } from '@services/user/product'
import { constants as c } from '@constants'
import Loading from '@components/loading/Loading'
import ReduceIcon from '@assets/icons/ReduceIcon.jsx'
import IncreaseIcon from '@assets/icons/IncreaseIcon.jsx'
import { cart } from '@services/user/cart'
import { formatPrice, formatPriceMultilingual, multilingualProperties } from '@utils/index'
import { useTranslation } from 'react-i18next'
import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconHeart from '@assets/images/IconHeart.svg'
import ImageError from '@assets/images/ImageError.svg'
import { getToken, getUserInfor } from '@utils/auth'
import { Toast } from '@utils/toast'

export default function DetailProduct() {
  const [selectedImage, setSelectedImage] = useState('')
  const [dataDetail, setDataDetail] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [exChangeRate, setExChangeRate] = useState(0)
  const param = useParams()
  const { id } = param
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const navigate = useNavigate()
  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')
  const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')

  const { t } = useTranslation()
  const token = getToken()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 375)

  // img
  const [listImg, setListImg] = useState([])
  const [listImgProduct, setListImgProduct] = useState([])

  // description
  const [dataDescription, setDataDescription] = useState('')

  // Modal check login
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

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [unit])

  let getInfonUser = null

  try {
    const userInfo = getUserInfor()
    if (userInfo) {
      getInfonUser = JSON.parse(userInfo)
    } else {
      getInfonUser = {}
    }
  } catch (error) {
    console.error('Error parsing user information:', error)
    getInfonUser = {}
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const bodyPayload = {
        currency: unit,
        userId: getInfonUser.id,
        productId: id,
        // language,
      }
      const response = await product.getProductByIdAndUserId(bodyPayload)
      const result = response.data

      result.imageMain = result?.productImages.find((el) => el.main) || result.productImages[0]
      setDataDetail(result)
      setListImg(response?.data.productImages)
      setDataDescription(response?.data.description)
      setExChangeRate(response?.data.exChangeRate)
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

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

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1)
    }
  }

  const shippingFee =
    dataDetail?.categories?.description === '명품' ||
    dataDetail?.promotions?.some((promotion) => promotion.type === 'ship')
      ? 0
      : 5000

  const earnPoint = dataDetail?.promotions?.some((promotion) => promotion.type === 'earn_points')

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    const basePrice = dataDetail?.price || 0
    const promotions = dataDetail?.promotions || []
    let finalPrice = basePrice

    promotions.forEach((promo) => {
      if (promo.type === 'sale') {
        finalPrice = Math.floor(finalPrice * (1 - promo.discountPercent / 100))
      }
    })

    return finalPrice * quantity // Total price based on quantity
  }

  const MAX_IMAGES = 4 // Số lượng ảnh tối đa hiển thị mỗi lần

  // Giả sử đoạn mã này nằm trong component của bạn

  // Xử lý để di chuyển đến slide tiếp theo
  const handleNext = () => {
    if (currentIndex + MAX_IMAGES < listImgProduct.length) {
      setCurrentIndex(currentIndex + MAX_IMAGES)
    }
  }

  // Xử lý để di chuyển đến slide trước
  const handlePrev = () => {
    if (currentIndex - MAX_IMAGES >= 0) {
      setCurrentIndex(currentIndex - MAX_IMAGES)
    }
  }

  // Hàm xử lý yêu thích
  const addToWishList = async (productId) => {
    try {
      const bodyPayload = {
        userId: getInfonUser.id,
        productId: productId,
      }
      await product.wishListPrd(bodyPayload)
      fetchData()

      Toast.success('찜 목록에 추가했습니다.')
    } catch (error) {
      console.error('위시리스트에 추가 실패')
    }
  }

  // Call API
  const handleCreateOrder = async () => {
    if (!token) {
      setOpenModal(true)
    } else {
      sessionStorage.removeItem('infoOrder')
      const bodyPayload = {
        productId: Number(id),
        quantity: quantity,
      }

      try {
        await cart.createCartOrder(bodyPayload)
        setQuantity(0)
        setIsLoading(true)
      } catch (error) {
        console.error('Error creating order:', error)
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }
  }

  // Function to handle order creation for 지금 구매

  const handleInfoOrder = () => {
    if (!token) {
      setOpenModal(true)
    } else {
      const arrInfoOrder = [
        {
          cartItemAttributeOptions: [],
          product: dataDetail,
          quantity: quantity,
        },
      ]

      setQuantity(0)
      sessionStorage.removeItem('infoOrder')
      sessionStorage.removeItem('orderId')
      sessionStorage.removeItem('checkCategory')
      sessionStorage.setItem('infoOrder', JSON.stringify(arrInfoOrder))
      sessionStorage.setItem('checkCategory', JSON.stringify(shippingFee))
      // sessionStorage.setItem('orderId', JSON.stringify(arrInfoOrder))

      navigate('/order-confimation')
    }
  }

  useEffect(() => {
    const productImagesFiltered = listImg.filter((image) => image.imageType === 'product')
    setListImgProduct(productImagesFiltered)
  }, [listImg])

  return (
    <>
      <div className='py-6 lg:px-0 mt-16'>
        {isLoading && <Loading />}
        <div>
          {dataDetail ? (
            <>
              {/* Detail Product */}
              <div className='lg:max-w-7xl mx-auto mt-10'>
                <div className='flex lg:gap-10 gap-4 flex-col lg:flex-row justify-between'>
                  {/* Phần hiển thị ảnh chính */}
                  <div className='relative flex lg:flex-row gap-8 lg:px-0 px-4 lg:w-1/2'>
                    {/* Ảnh nhỏ bên dưới */}
                    <div className='flex justify-between relative'>
                      <div>
                        <div className='flex flex-col gap-8'>
                          {listImgProduct &&
                            listImgProduct.length > 0 &&
                            listImgProduct?.slice(currentIndex, currentIndex + MAX_IMAGES).map((image, index) => {
                              const arrCheck = ['detail', 'product']
                              const isImageMatched = arrCheck.some((prefix) => image?.imageUrl?.startsWith(prefix))
                              const finalImageUrl = isImageMatched
                                ? `${c.DOMAIN_IMG}${image?.imageUrl}`
                                : image?.imageUrl
                              return (
                                <div key={index}>
                                  <div
                                    className={`cursor-pointer border-2 rounded-lg ${
                                      selectedImage === image ? 'border-gray-300' : 'border-none'
                                    } lg:h-[110px] lg:w-[110px] w-14 h-14 `}
                                    onClick={() => setSelectedImage(image)}
                                  >
                                    <img
                                      src={finalImageUrl}
                                      alt={`Product ${index + currentIndex + 1}`}
                                      className='object-cover object-center rounded-lg h-full w-full'
                                      loading='lazy'
                                      onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = ImageError
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                    {/* Ảnh main */}
                    <div>
                      <div className='rounded-lg'>
                        {dataDetail?.productImages?.length > 0 && (
                          <div className='relative'>
                            <Image
                              // width={514}
                              height={isSmallMobile ? 200 : isMobile ? 300 : 514}
                              src={(() => {
                                const arrCheck = ['detail', 'product']
                                const mainImage = selectedImage || dataDetail?.imageMain
                                const isImageMatched = arrCheck.some((prefix) =>
                                  mainImage?.imageUrl?.startsWith(prefix),
                                )
                                return isImageMatched ? `${c.DOMAIN_IMG}${mainImage?.imageUrl}` : mainImage?.imageUrl
                              })()}
                              alt='Selected Product'
                              className='rounded-lg object-conver w-full h-full'
                              loading='lazy'
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = ImageError
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Hết phần 1 */}
                  </div>

                  {/* Phần chi tiết sản phẩm */}
                  <div className='lg:w-[481px] w-full mx-auto px-4'>
                    <h2 className='mb-2 tracking-tight font-bold text-bigPrdName'>{dataDetail.productName}</h2>
                  </div>
                </div>
              </div>
              {/* Detail Product */}

              <div className='lg:max-w-7xl mx-auto mt-6 px-2'>
                {/* Collapse */}
                <CollapseComponent dataDescription={dataDescription} className='mx-auto' />
                {/* Collapse */}

                {/* Feedback */}
                {/* <Feedback /> */}
                {/* Feedback */}
              </div>
            </>
          ) : (
            <div className='flex justify-center items-center font-medium text-primaryPrdName'>{t('productExist')}</div>
          )}
        </div>

        {/* <BestProduct /> */}
        {/* Best */}
      </div>
    </>
  )
}
