import React, { useEffect, useState } from 'react'
import { Pagination, Tooltip } from 'antd'
import { getAllUsers } from '@services/admin/member'
import { Toast } from '@utils/toast'
import { getAllTransaction } from '@services/admin/transaction'
import { useNavigate } from 'react-router-dom'
import Loading from '@components/loadingCommon/Loading'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import { getColorStatusOrderText, getStatusById } from '@utils/index'

const TransactionHistory = ({ id }) => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9, total: 0 })
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAllTransaction = async (page = 1, pageSize = 9) => {
    setLoading(true)
    try {
      const bodyPayload = {
        pageNumber: page - 1,
        pageSize: pageSize,
        sort: 'desc',
        orderId: id,
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
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
      rrender: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'Cancel Date',
      dataIndex: 'cancelDate',
      key: 'cancelDate',
      rrender: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'Detail',
      key: 'detail',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <div>
          <button
            type='button'
            className='w-20 text-[#1E8422] font-medium text-small'
            onClick={() => navigate(`/admin/manager-transaction/detail-transaction/${record.orderId}`)}
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

  // Phân trang
  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }))
    fetchAllTransaction(page, pageSize)
  }

  return (
    <div>
      <div className='h-full  mt-4'>
        {loading && <Loading />}
        <TableAdmin columns={columns} dataSource={filteredData} pagination={false} />
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
    </div>
  )
}

export default TransactionHistory
