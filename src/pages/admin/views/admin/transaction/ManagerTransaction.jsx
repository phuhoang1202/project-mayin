import React, { useEffect, useState } from 'react'
import { Flex, Input, Modal, Pagination, Tooltip, Select, Tag } from 'antd'
import { Toast } from '@utils/toast'
import IconSearch from '@assets/icons/admin/IconSearch.svg'
import Card from '@pages/admin/components/card'
import { getAllTransaction, updateStatus } from '@services/admin/transaction.js'
import DetailTransaction from './detailTransaction/DetailTransaction'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import { exportService } from '@services/admin/exportService'
import { getToken } from '@utils/auth'
import { Link, useNavigate } from 'react-router-dom'
import { constants as c } from '@constants'
import { converntChannel, getColorStatusOrderText, getStatusById, paymentMethod } from '@utils/index'
import Loading from '@components/loadingCommon/Loading'

const ManagerTranction = () => {
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [idItem, setIdItem] = useState(null)
  const [itemSelect, setItemSelect] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [searchType, setSearchType] = useState('buyerId')
  const [searchText, setSearchText] = useState('')

  const accessToken = getToken('token') || ''
  // pagination
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8, total: 0 })

  const formatDateTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')} ${date.toLocaleTimeString('en-GB', { hour12: false })}`
  }

  const handleChange = (value) => {
    setSearchType(value)
  }

  const handleInputChange = (event) => {
    setSearchText(event.target.value)
  }

  const fetchAllTransaction = async (page = 1) => {
    setLoading(true)
    try {
      const bodyPayload = {
        buyerId: searchType === 'buyerId' ? searchText : null,
        buyerName: searchType === 'buyerName' ? searchText : null,
        buyerPhoneNumber: searchType === 'buyerPhone' ? searchText : null,
        orderNumber: searchType === 'orderNumber' ? searchText : null,
        pageNumber: page - 1,
        pageSize: 8,
        sort: 'desc',
      }
      const response = await getAllTransaction(bodyPayload)
      setFilteredData(response.data.content)
      setPagination((prev) => ({
        ...prev,
        total: response.data.totalElements, // Update total items from API response
      }))
    } catch (error) {
      Toast.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllTransaction(pagination.current, pagination.pageSize)
  }, [])

  const handleSearchTable = async () => {
    try {
      fetchAllTransaction(1)
      setSearchText('')
    } catch (error) {
      console.error('Error translating text:', error)
    }
  }

  const handleCancel = () => {
    setOpenModal(false)
  }

  const handleOk = async () => {
    try {
      setLoading(true)
      const bodyPayload = {
        orderId: itemSelect.orderId,
        statusOrder: '1',
      }

      await updateStatus(bodyPayload)
      setOpenModal(false)
      Toast.success('Status updated successfully')
    } catch (error) {
      Toast.error('Failed to change status')
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      fixed: 'left',
      render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Channel',
      dataIndex: 'chanel',
      key: 'chanel',
      align: 'center',
      fixed: 'left',
      width: 120,
      render: (text) => <div className='uppercase'>{converntChannel(text)}</div>,
    },
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: '150px',
      fixed: 'left',
      render: (text, record) => {
        return (
          <Tooltip title={text}>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px' }}>
              <div
                style={{ textDecoration: 'underline', color: 'blue' }}
                className='cursor-pointer'
                onClick={() => navigate(`detail-transaction/${record.orderId}`)}
              >
                {text}
              </div>
            </div>
          </Tooltip>
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, record) => {
        const statusText = getStatusById(record.status)
        const textUpperCase = statusText.toUpperCase()

        return (
          <div
            className='h-8 flex items-center justify-center rounded-md px-2 capitalize font-medium'
            style={{
              color: getColorStatusOrderText(textUpperCase).color,
              backgroundColor: getColorStatusOrderText(textUpperCase).bgColor,
            }}
          >
            {statusText}
          </div>
        )
      },
    },
    {
      title: 'Buyer ID',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Buyer Name',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: 'Buyer Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Standard Price(KRW)',
      dataIndex: 'standardPrice',
      key: 'standardPrice',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Payment Currency',
      dataIndex: 'paymentCurrency',
      key: 'paymentCurrency',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (text) => (
        <Tag color={paymentMethod(text)} className='capitalize'>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Coupon Y/N',
      dataIndex: 'coupon',
      key: 'coupon',
    },
    {
      title: 'Main Product Name',
      dataIndex: 'productNames',
      key: 'productNames',
      width: '50px',
      render: (text) => (
        <Tooltip title={text}>
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '150px' }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Buy Date',
      dataIndex: 'buyDate',
      key: 'buyDate',
      render: (text) => formatDateTime(text),
    },
    {
      title: 'Cancel Date',
      dataIndex: 'cancelDate',
      key: 'cancelDate',
      render: (text) => formatDateTime(text),
    },
    {
      title: 'Detail',
      key: 'detail',
      align: 'center',
      width: '60px',
      fixed: 'right',
      render: (text, record) => (
        <div>
          <button
            type='button'
            className='w-20 text-[#1E8422] font-medium text-small'
            onClick={() => navigate(`detail-transaction/${record.orderId}`)}
          >
            상세내역
          </button>
        </div>
      ),
    },
    {
      title: 'Payment Confirm',
      key: 'Payment Confirm',
      fixed: 'right',
      width: '80px',
      render: (text, record) => (
        <div>
          {record.status === '0' && (
            <button
              type='button'
              className='rounded-lg hover:bg-[#5B4DFB] hover:text-white text-[#5B4DFB] font-medium text-small px-2 h-[26px]'
              onClick={() => {
                setOpenModal(true)
                setItemSelect(record)
              }}
            >
              Check
            </button>
          )}
        </div>
      ),
    },
  ]

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchTable()
    }
  }

  // Phân trang
  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }))
    fetchAllTransaction(page, pageSize)
  }

  function exportExcelFile() {
    exportService.exportExcelTransaction().then((res) => {
      window.open(`${c.DOMAIN_DOWNLOAD_FILE}${res.data}` + `?access_token=${accessToken}`, '_blank')
    })
  }

  return (
    <div>
      <Card extra={'w-full h-[87vh] overflow-y-auto py-6 px-4 '}>
        {loading && <Loading />}
        <div>
          <div className='flex justify-end'>
            <div className='flex flex-col lg:flex-row justify-end gap-4 lg:mt-0 mt-4 w-full'>
              <div>
                <Select
                  defaultValue='buyerId'
                  className='h-9 min-w-44'
                  onChange={handleChange}
                  options={[
                    {
                      value: 'buyerId',
                      label: 'Buyer ID',
                    },
                    {
                      value: 'buyerName',
                      label: 'Buyer Name',
                    },
                    {
                      value: 'buyerPhone',
                      label: 'Buyer Phone Number',
                    },
                    {
                      value: 'orderNumber',
                      label: 'Order number',
                    },
                  ]}
                />
              </div>

              <div className='flex flex-col md:flex-row items-center w-full md:w-auto relative '>
                <Input
                  placeholder='찾다'
                  onKey={handleKeyPress}
                  onChange={handleInputChange}
                  className='lg:w-[400px] w-full h-9'
                  value={searchText}
                />
                <img
                  src={IconSearch}
                  alt='icon'
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={handleSearchTable}
                />
              </div>

              <div>
                <div
                  onClick={exportExcelFile}
                  className='bg-[#E6F9E7] text-[#2DC033] h-9 flex items-center justify-center px-3 rounded-lg font-medium text-normal cursor-pointer'
                >
                  Excel Download
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='h-full  mt-4'>
          <Flex gap='middle'>
            <TableAdmin columns={columns} dataSource={filteredData} pagination={false} />
          </Flex>

          <Pagination
            className='mt-10'
            align='end'
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>
      </Card>

      {/* <DetailTransaction setCurrentStep={setCurrentStep} idItem={idItem} /> */}
      <Modal open={openModal} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false} centered>
        <div className='mt-4'>
          {loading && <Loading />}
          <div className='flex flex-col gap-3 items-center'>
            {/* <div>{t('loginText1')} </div> */}

            <div className='font-medium text-[#3B3B3B] text-primaryPrdName'>{itemSelect.orderNumber}</div>
            <div className='font-medium text-normal'>
              Total price: <span className='font-bold text-textPrd text-[#5B4DFB]'>{itemSelect.totalPrice}</span>
            </div>
            <div className='font-medium text-[#3B3B3B] text-primaryPrdName'>입금을 확인했습니다.</div>
          </div>
        </div>

        <div className='flex items-center justify-between gap-6 mt-8'>
          <button
            className='font-semibold bg-[#EFEEFF] text-normal h-11 w-full rounded-lg border'
            onClick={handleCancel}
          >
            아니오
          </button>
          <button
            className='text-white bg-[#5B4DFB] font-semibold text-normal h-11 w-full rounded-lg'
            onClick={handleOk}
          >
            입금확인
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ManagerTranction
