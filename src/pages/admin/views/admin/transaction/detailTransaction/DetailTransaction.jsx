import React, { useEffect, useState } from 'react'
import Card from '@pages/admin/components/card'
import IconBack from '@assets/images/IconBack.svg'
import { Select, Tooltip } from 'antd'
import { getDetailTransaction, updateStatus } from '@services/admin/transaction'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from '@utils/toast'
import Loading from '@components/loadingCommon/Loading'
import { converntChannel, convertType, formatPrice } from '@utils/index'

export default function DetailTransaction() {
  const STATUS_OPTIONS = [
    { code: 0, label: 'Pending', value: 'PENDING' },
    { code: 1, label: 'Confirm payment', value: 'CONFIRM_PAYMENT' },
    { code: 2, label: 'Preparing delivery', value: 'PREPARING_DELIVERY' },
    { code: 3, label: 'In delivery', value: 'IN_DELIVERY' },
    { code: 4, label: 'Request cancel', value: 'REQUEST_CANCEL' },
    { code: 5, label: 'Cancelled', value: 'CANCELLED' },
    { code: 6, label: 'Completed', value: 'COMPLETED' },
    { code: 7, label: 'Request Return/Refund', value: 'REQUEST_RETURN_REFUND' },
    { code: 8, label: 'Return/Refund', value: 'RETURN_REFUND' },
  ]
  const param = useParams()
  const { id } = param

  const navagite = useNavigate()
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [idfilteredData, setIdfilteredData] = useState(0)

  const formatDateTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')} ${date.toLocaleTimeString('en-GB', { hour12: false })}`
  }

  const fetchDetailTransaction = async () => {
    setLoading(true)
    try {
      const response = await getDetailTransaction(id)
      setFilteredData(response.data)
      setSelectedStatus(response.data.status)
      setIdfilteredData(response.data.status)
    } catch (error) {
      Toast.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (id) {
      fetchDetailTransaction()
    }
  }, [id])

  useEffect(() => {
    // Set selectedStatus based on filteredData.status when it changes
    if (filteredData.status !== undefined) {
      setSelectedStatus(getStatusLabel(filteredData.status))
    }
  }, [filteredData])

  const getStatusLabel = (statusCode) => {
    const status = STATUS_OPTIONS.find((option) => option.code == statusCode)
    return status ? status.label : null
  }

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
  }

  const handleCheck = async () => {
    try {
      setLoading(true)
      const status = STATUS_OPTIONS.find((option) => option.code === selectedStatus)

      if (!status) {
        Toast.error('Selected status not found in STATUS_OPTIONS')
        return
      }

      const bodyPayload = {
        orderId: Number(id),
        statusOrder: status.value,
      }

      const response = await updateStatus(bodyPayload)
      if (response.data === false) {
        Toast.error('Failed to change status')
        return
      }

      await fetchDetailTransaction()
      Toast.success('Status updated successfully')
    } catch (error) {
      Toast.error('Failed to change status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex lg:flex-row flex-col lg:gap-8 gap-4'>
      <Card extra={'lg:w-1/3 w-full h-auto py-6'}>
        <div className='sticky top-32 cursor-pointer z-50' onClick={() => navagite(-1)}>
          <img src={IconBack} alt='icon' />
        </div>
        {loading && <Loading />}
        <div>
          <div className='mt-10 mx-8'>
            <div>
              <div className='flex flex-col gap-4 border-b pb-2'>
                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Order Number</div>
                  <div className='font-medium text-normal text-[#8C8C8C] truncate'>
                    <Tooltip title={filteredData.orderNumber || 'No order number available'}>
                      {filteredData.orderNumber}
                    </Tooltip>
                  </div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Buy Date</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{formatDateTime(filteredData.buyDate)}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Cancel Date</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>
                    {formatDateTime(filteredData.cancelDate)}
                  </div>
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Status</div>
                  <div>
                    <Select
                      placeholder='Select Status'
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      className='h-9 w-36'
                      options={STATUS_OPTIONS.map((status) => ({
                        value: status.code,
                        label: status.label,
                        // disabled: selectedStatus ? status.code <= idfilteredData : false,
                      }))}
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>
                    {filteredData?.status == '0' ? 'Payment Confirm' : 'Update Status'}
                  </div>
                  <div>
                    <button
                      className={`${
                        idfilteredData == selectedStatus ? 'cursor-not-allowed' : 'cursor-pointer'
                      } h-9 bg-[#D9D6FF] text-[#5B4DFB] w-[147px] rounded-md font-medium text-normal`}
                      disabled={idfilteredData == selectedStatus}
                      onClick={handleCheck}
                    >
                      {filteredData?.status == '0' ? 'Check' : 'Update'}
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex flex-col gap-4'>
                <h3 className='font-bold text-[#3B3B3B] text-textPrd'>Buyer Info</h3>

                <div className='flex items-center justify-between'>
                  <div>
                    <div className='font-semibold text-normal text-[#3B3B3B]'>ID</div>
                    <div className='font-medium text-normal text-[#5B4DFB] underline decoration-solid'>
                      {filteredData.username}
                    </div>
                  </div>

                  <div
                    className='font-medium text-min text-[#AFAEAE] cursor-pointer'
                    onClick={() => navagite(`/admin/manager-member/detail-member/${filteredData?.userDTO?.id}`)}
                  >
                    누르면 회원정보로 이동
                  </div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Name</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.buyerName}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Phone Number</div>
                  <div className='font-medium text-small text-[#8C8C8C]'>{filteredData.phoneNumber}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Member Key</div>
                  <div className='font-medium text-small text-[#8C8C8C]'>{filteredData?.userDTO?.keyMember}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card extra={'lg:w-2/3 w-full h-auto lg:py-6 lg:px-4 pb-20 '}>
        <div className='mt-10 mx-10'>
          <div>
            <h3 className='font-bold text-textPrd text-[#3B3B3B]'>Transaction Detail</h3>
            <div className='mt-3 bg-[#F8F8F8] p-4 rounded-lg'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Total Price</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{formatPrice(filteredData.totalPrice)}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Product Total</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>
                    {formatPrice(filteredData.standardPrice)}
                  </div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Payment Currency</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.paymentCurrency || 'KRW'}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Payment Method</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>
                    {filteredData.paymentMethod === 'wallet' ? 'Point' : filteredData.paymentMethod}
                  </div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Coupon Y/N</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.coupon === 0 ? 'N' : 'Y'}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Coupon Value (Discount)</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.coupon}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Transaction Detail</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>
                    {formatPrice(filteredData.prePaymentAmount)}
                  </div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Shipping fee</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>
                    {filteredData?.shippingDTOs && filteredData?.shippingDTOs[0]?.shippingCost}
                  </div>
                </div>
                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Tracking number</div>
                  <div className='font-medium text-normal text-[#8C8C8C] truncate'>
                    <Tooltip
                      title={
                        (filteredData?.shippingDTOs && filteredData?.shippingDTOs[0]?.trackingNumber) ||
                        'No tracking number available'
                      }
                    >
                      {filteredData?.shippingDTOs && filteredData?.shippingDTOs[0]?.trackingNumber}
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className='mt-3'>
                <div className='font-semibold text-normal text-[#3B3B3B]'>Address</div>
                {filteredData?.shippingDTOs &&
                  filteredData?.shippingDTOs.map((el, index) => (
                    <ul className='font-medium text-[#8C8C8C]' key={index}>
                      <li>{el.shippingAddress.recipientName}</li>
                      <li>{el.shippingAddress.recipientPhone}</li>
                      <li>
                        {el.shippingAddress.address}, {el.shippingAddress.city}, {el.shippingAddress.country}
                      </li>
                    </ul>
                  ))}
              </div>
            </div>
          </div>

          <div className='mt-10'>
            <div class='overflow-hidden border rounded-lg'>
              <table class='w-full'>
                <thead class='bg-[#EFEFEF] h-[60px]'>
                  <tr>
                    <th class='p-3 text-left text-small font-bold'>상품명</th>
                    <th class='p-3 text-left text-small font-bold'>옵션</th>
                    <th class='p-3 text-left text-small font-bold'>Platform Type</th>
                    <th class='p-3 text-left text-small font-bold'>수량</th>
                    <th class='p-3 text-left text-small font-bold'>가격</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.orderItemDTOs && filteredData.orderItemDTOs.length > 0 && (
                    <>
                      {filteredData.orderItemDTOs.map((item, index) => {
                        return (
                          <tr class='border-b hover:bg-gray-100' key={index}>
                            <td class='p-3 text-small font-medium'>{item.product.productName}</td>
                            {item.orderItemAttributes && item.orderItemAttributes.length > 0 ? (
                              <td class='p-3 text-small font-medium'>
                                {item.orderItemAttributes.map((attribute, index) => {
                                  const quantity = attribute.quantityOrder

                                  return (
                                    <div key={index}>
                                      {attribute.productSku.attributes.map((el, i) => {
                                        const type = el.type
                                        const attributeName = el.attributeName
                                        return (
                                          <span key={i}>
                                            {convertType(type)}: {attributeName}
                                          </span>
                                        )
                                      })}
                                    </div>
                                  )
                                })}
                              </td>
                            ) : (
                              <div></div>
                            )}
                            <td class='p-3 text-small font-medium uppercase'>{converntChannel(item.platformType)}</td>
                            <td class='p-3 text-small font-medium'>{item.quantity}</td>
                            <td class='p-3 text-small font-medium'>{formatPrice(item.totalPrice)}</td>
                          </tr>
                        )
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className='mt-8 flex lg:flex-row flex-col lg:items-center lg:gap-8 gap-1'>
            <div className='font-semibold text-normal text-[#3B3B3B]'>Tracking number:</div>
            <div className='font-medium text-normal text-[#8C8C8C] truncate'>
              <Tooltip
                title={
                  (filteredData?.shippingDTOs && filteredData?.shippingDTOs[0]?.trackingNumber) ||
                  'No tracking number available'
                }
              >
                {filteredData?.shippingDTOs && filteredData?.shippingDTOs[0]?.trackingNumber}
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
