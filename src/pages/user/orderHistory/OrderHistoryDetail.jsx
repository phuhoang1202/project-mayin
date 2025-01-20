import React, { useEffect, useState } from 'react'
import IconInvoice from '@assets/images/IconInvoice.svg'
import IconTruck from '@assets/images/IconTruck.svg'
import IconUserOrder from '@assets/images/IconUserOrder.svg'
import IconShippingArrow from '@assets/images/IconShippingArrow.svg'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconArrowUpFill from '@assets/images/IconArrowUpFill.svg'
import IconTicketSale from '@assets/images/IconTicketSale.svg'
import { constants as c } from '@constants'
import { useParams } from 'react-router-dom'
import { cart } from '@services/user/cart'
import { Toast } from '@utils/toast'
import {
  formatOrderDate,
  formatOrderDateExpected,
  formatPrice,
  formatPriceMultilingual,
  getColorStatusOrder,
  getStatusByName,
  multilingualProperties,
} from '@utils/index'
import { useTranslation } from 'react-i18next'
import { Tooltip, message } from 'antd'
import ImageError from '@assets/images/ImageError.svg'
import Loading from '@components/loadingCommon/Loading'

export default function OrderHistoryDetail() {
  const [orderDetail, setOrderDetail] = useState({})
  const param = useParams()
  const { id } = param
  const { t } = useTranslation()
  const [saleType, setSaleType] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Tiền tệ
  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')
  const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    const getLanguage = JSON.parse(localStorage.getItem('language'))
    setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [])

  const getOrderDetail = async () => {
    try {
      setIsLoading(true)
      const bodyPayload = {
        orderId: Number(id),
        currency: unit,
      }
      const response = await cart.orderDetail(bodyPayload)
      const data = response.data

      // Tính tổng giá trị sản phẩm
      const salePromotion = data.orderItems[0].product.promotions.find((promotion) => promotion.type === 'sale')

      setSaleType(salePromotion)

      setOrderDetail(response.data)
      // Toast.success('주문 데이터를 성공적으로 검색했습니다.')
    } catch (error) {
      Toast.error('주문 데이터 검색에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getOrderDetail()
  }, [])

  const handleCopyOrder = (numberOrder) => {
    navigator.clipboard
      .writeText(numberOrder)
      .then(() => {
        message.success('복사되었습니다!')
      })
      .catch((error) => {
        message.error('복사에 실패했습니다')
      })
  }

  return (
    <div className='max-w-7xl mx-auto lg:mt-24 mt-20 lg:px-0 px-2'>
      {isLoading && <Loading />}
      <div className='lg:w-[952px] w-full mt-6'>
        <div>
          <div className='flex items-center justify-between'>
            <div className='font-semibold text-primaryPrdName text-[#3B3B3B]'>{t('successfullyDelivered')}</div>
            <div className='flex items-center gap-1 font-medium text-normal'>
              <img src={IconInvoice} alt='icon' /> {t('invoiceIssuance')}
            </div>
          </div>
        </div>

        <div className='mt-4'>
          {orderDetail?.orderItems && orderDetail?.orderItems?.length > 0 ? (
            <div className='bg-[#F8F8F8] rounded-lg'>
              {orderDetail.orderItems.map((order, index) => {
                const product = order.product
                const arrCheck = ['detail', 'product']
                const mainImage = product?.productImages?.find((image) => image.main)?.imageUrl
                const fallbackImage = product?.productImages?.[0]?.imageUrl
                const imageToCheck = mainImage || fallbackImage || 'URL_OF_DEFAULT_IMAGE'
                const isImageMatched = arrCheck.some((prefix) => imageToCheck?.startsWith(prefix))
                const imageUrl = isImageMatched ? `${c.DOMAIN_IMG}${imageToCheck}` : imageToCheck
                return (
                  <div style={{ borderBottom: '1px solid #EFEFEF' }} key={index}>
                    <div className='flex lg:flex-row flex-col justify-between lg:gap-4 gap-2 mt-4 p-4 '>
                      <div className='flex items-start gap-4 flex-1'>
                        <div className='lg:w-[200px] lg:h-[146px] w-[140px] h-[116px]'>
                          <img
                            src={imageUrl}
                            alt={`image`}
                            className='w-full h-full object-cover rounded-lg'
                            loading='lazy'
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = ImageError
                            }}
                          />
                        </div>

                        <div className='font-medium text-normal text-[#3B3B3B] flex flex-col gap-2 w-full '>
                          <div className='flex flex-col gap-1'>
                            <h3 className='font-semibold lg:text-primaryPrdName text-normal'>
                              <Tooltip title={order.product.productName}>
                                <div>
                                  {order.product.productName.length > 40
                                    ? `${order.product.productName.substring(0, 40)}...`
                                    : order.product.productName}
                                </div>
                              </Tooltip>
                            </h3>
                            <div>
                              <div className='text-normal font-medium flex items-center gap-2'>
                                {order.product.promotions && order.product.promotions.some((e) => e.type === 'sale') ? (
                                  order.product.promotions.map((e) => {
                                    if (e.type === 'sale') {
                                      const discountedPrice = Math.floor(
                                        order.product.price * (1 - e.discountPercent / 100),
                                      )

                                      return (
                                        <div key={e.id} className='flex items-center gap-2'>
                                          <span className='font-medium lg:text-primaryPrdName'>
                                            {formatPrice(discountedPrice)}
                                          </span>
                                          <span className='text-[#8C8C8C] text-small line-through'>
                                            {formatPrice(order.product.price)}
                                          </span>
                                          <div className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center'>
                                            -{e.discountPercent}%
                                          </div>
                                        </div>
                                      )
                                    }
                                    return null
                                  })
                                ) : (
                                  <div className='font-medium lg:text-primaryPrdName'>
                                    {formatPrice(order?.price)}
                                    <span className='text-small'>
                                      {unit !== 'KRW'
                                        ? '/' +
                                          ' ' +
                                          formatPriceMultilingual(order?.price * orderDetail.exchangeRate, unit)
                                        : null}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div>
                            {orderDetail.orderItems[index].orderItemAttributes &&
                            orderDetail.orderItems[index].orderItemAttributes.length > 0 ? (
                              <div className='flex flex-col gap-1 w-full'>
                                {orderDetail.orderItems[index].orderItemAttributes.map((attributes, index) => {
                                  return (
                                    <div key={index}>
                                      {attributes.productSku.attributes.map((el, index) => (
                                        <div key={index} className='lg:text-normal text-small'>
                                          {multilingualProperties(el.type, language)} : {el.attributeName}
                                        </div>
                                      ))}

                                      {/* <div className='bg-[#EFEFEF] p-2 rounded-md flex justify-between' key={index}>
                                        <div>
                                          {attributes.productSku.attributes.map((el, index) => (
                                            <div key={index}>
                                              <div className='lg:text-normal text-small'>
                                                {multilingualProperties(el.type, language)} : {el.attributeName}
                                              </div>
                                            </div>
                                          ))}
                                          <div className='text-[#8C8C8C] font-medium text-small'>
                                            수량: {attributes.quantityOrder}
                                          </div>
                                        </div>

                                        <div className='flex flex-col items-end'>
                                          <div className='font-bold lg:text-primaryPrdName'>
                                            {formatPrice(attributes.price)}
                                          </div>
                                          <div>
                                            <div className='text-small text-[#8C8C8C] font-bold'>
                                              {unit !== 'KRW'
                                                ? formatPriceMultilingual(
                                                    attributes.price * orderDetail.exchangeRate,
                                                    unit,
                                                  )
                                                : null}
                                            </div>
                                          </div>
                                        </div>
                                      </div> */}
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (
                              <div>
                                {t('quantity')}: {orderDetail.orderItems[index].quantity}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {index === 0 && (
                        <div className='flex flex-col items-end lg:gap-8 gap-4 '>
                          <div
                            className='font-semibold lg:text-normal text-small h-9 flex justify-center items-center rounded px-4 capitalize'
                            style={{
                              color: getColorStatusOrder(orderDetail.status).color,
                              backgroundColor: getColorStatusOrder(orderDetail.status).bgColor,
                            }}
                          >
                            {getStatusByName(orderDetail.status)}
                          </div>

                          <div className='flex flex-col items-end gap-2'>
                            <div className='flex flex-col items-end gap-1 w-full'>
                              <div className='font-bold text-small '>
                                {t('orderNumber')}: {orderDetail.orderCode}
                              </div>
                              <button
                                className='bg-[#EFEFEF] flex justify-center items-center rounded-md text-min px-2 py-1 '
                                onClick={() => handleCopyOrder(orderDetail.orderCode)}
                              >
                                {t('copyText')}
                              </button>
                            </div>
                            <div className='text-[#8C8C8C] text-min'>
                              {t('orderDate')}: {formatOrderDate(orderDetail.orderDate)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            ''
          )}
          <div>
            {/* Bill */}
            {orderDetail?.orderItems && orderDetail?.orderItems?.length > 0 && (
              <>
                <div className='bg-[#F7F7F1] px-4'>
                  <div className='py-3' style={{ borderBottom: '1px solid #EFEFEF' }}>
                    <div>
                      <h3 className='font-bold text-normal text-[#282828]'>{t('productBillText')}</h3>
                      {orderDetail.orderItems.map((order, index) => {
                        return (
                          <div className='mt-2 font-medium text-normal text-[#3B3B3B]' key={index}>
                            <div className='w-full'>
                              {order.orderItemAttributes.map((product, index) => {
                                const attributes = product.productSku.attributes
                                  .map(
                                    (attr) => `${multilingualProperties(attr.type, language)}: ${attr.attributeName}`,
                                  )
                                  .join(', ')

                                return (
                                  <div key={index} className='flex items-center justify-between gap-4'>
                                    <Tooltip title={product.productName}>
                                      <div className='block truncate '>
                                        {order.product.productName} ({product.quantityOrder}) ({attributes})
                                      </div>
                                    </Tooltip>
                                    <div className='font-semibold text-normal text-[#3B3B3B]'>
                                      {formatPrice(product.price)}
                                      <span className='font-semibold text-small'>
                                        {unit !== 'KRW'
                                          ? ' ' +
                                            '/' +
                                            ' ' +
                                            formatPriceMultilingual(product.price * orderDetail.exchangeRate, unit)
                                          : null}
                                      </span>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>

                            {/* Tổng tiền */}
                            <div className='mt-2'>
                              <div className='flex items-center justify-between mt-2 font-medium text-normal gap-4 text-[#333333]'>
                                <div>
                                  {t('totalBill')} ({t('productBillText')} {order.quantity} {t('개')})
                                </div>
                                <div className='font-bold text-normal text-[#3B3B3B]'>
                                  {formatPrice(order.beforeDiscountPrice)}
                                  <span className='font-bold text-small'>
                                    {unit !== 'KRW'
                                      ? ' ' +
                                        '/' +
                                        ' ' +
                                        formatPriceMultilingual(order.totalPrice * orderDetail.exchangeRate, unit)
                                      : null}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* giảm giá */}
                  <div className='py-3' style={{ borderBottom: '1px solid #EFEFEF' }}>
                    <h3 className='font-bold text-normal text-[#282828]'>{t('productBillText')}</h3>

                    {/* Sale */}
                    <div className='mt-2'>
                      <div className='flex items-center justify-between mt-2 font-medium text-normal text-[#333333]'>
                        <div>{t('discount')}</div>
                        <div className='font-semibold lg:text-primaryPrdName text-normal'>
                          -{saleType.discountPercent}%
                        </div>
                      </div>
                    </div>

                    {/* prePaymentAmount */}
                    <div className='mt-2'>
                      <div className='flex items-center justify-between mt-2 font-medium text-normal text-[#333333]'>
                        <div>{t('paymentPoint')}</div>
                        <div className='font-semibold lg:text-primaryPrdName text-normal'>
                          -{formatPrice(orderDetail?.prePaymentAmount)}
                          <span className='font-semibold lg:text-primaryPrdName md:text-normal text-small'>
                            {unit !== 'KRW'
                              ? ' ' +
                                '/' +
                                ' ' +
                                formatPriceMultilingual(orderDetail?.prePaymentAmount * orderDetail?.exchangeRate, unit)
                              : null}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Phí ship */}
                    <div className='mt-2'>
                      <div className='flex items-center justify-between mt-2 font-medium text-normal text-[#333333]'>
                        <div>
                          {t('shippingFee')} ({t('Total')})
                        </div>
                        <div className='font-semibold lg:text-primaryPrdName text-normal'>
                          {formatPrice(
                            orderDetail?.shippingList?.reduce(
                              (total, shipping) => total + (shipping.shippingCost || 0),
                              0,
                            ),
                          )}

                          <span className='font-semibold lg:text-primaryPrdName md:text-normal text-small'>
                            {unit !== 'KRW'
                              ? ' ' +
                                '/' +
                                ' ' +
                                formatPriceMultilingual(
                                  orderDetail?.shippingList?.reduce(
                                    (total, shipping) => total + (shipping.shippingCost || 0),
                                    0,
                                  ) * orderDetail?.exchangeRate,
                                  unit,
                                )
                              : null}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between py-4 font-bold lg:text-textPrd md:text-primaryPrdName gap-2 text-[#3B3B3B] '>
                    <div className='flex-1'>
                      {t('totalBill')} ({t('productBillText')} {orderDetail?.orderItems.length} {t('개')})
                    </div>
                    <div className='flex flex-col items-end flex-1'>
                      <div className='lg:text-largerPrdName md:text-textPrd '>
                        {formatPrice(orderDetail.totalAmount)}
                        <span className='font-semibold lg:text-textPrd md:text-normal text-small'>
                          {unit !== 'KRW'
                            ? ' ' +
                              '/' +
                              ' ' +
                              formatPriceMultilingual(orderDetail.totalAmount * orderDetail.exchangeRate, unit)
                            : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className='bg-[#F8F8F8] p-4 rounded-lg lg:mt-6 mt-2'>
          <h3 className='font-bold lg:text-primaryPrdName'>{t('shippingInformation')}</h3>
          <div className='mt-4'>
            <div className='flex items-center justify-between text-[#3B3B3B]'>
              <div className='flex items-center gap-1 lg:text-normal text-small font-medium'>
                <img src={IconTruck} alt='icon' />
                {t('orderDate')}: {formatOrderDate(orderDetail?.orderDate)}
              </div>

              {/* <div className='flex items-center gap-1 text-normal font-medium'>
                배송 세부정보 보기 <img src={IconArrowDownFill} alt='icon' />
              </div> */}
            </div>

            <div>
              <img src={IconShippingArrow} alt='icon' />
            </div>

            {orderDetail?.shippingList?.length > 0 && (
              <div>
                <div className='flex items-center text-[#3B3B3B]'>
                  <div className='flex items-center gap-1 lg:text-normal text-small font-medium'>
                    <img src={IconUserOrder} alt='icon' />
                    {t('expectedDate')}: {formatOrderDateExpected(orderDetail?.shippingList[0]?.estimatedDeliveryDate)}{' '}
                    - {formatOrderDateExpected(orderDetail?.shippingList[0]?.actualDeliveryDate)}
                  </div>
                </div>
                <div className='mt-2 text-[#707070] font-medium lg:text-normal text-small'>
                  <div>{orderDetail.shippingList[0]?.shippingAddress?.recipientName}</div>
                  <p>
                    {orderDetail.shippingList[0]?.shippingAddress?.recipientPhone}{' '}
                    {orderDetail.shippingList[0]?.shippingAddress?.address}{' '}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
