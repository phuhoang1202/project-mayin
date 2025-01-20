import React, { useEffect, useState } from 'react'
import { Flex, Pagination } from 'antd'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import { useNavigate } from 'react-router-dom'
import { couponUser } from '@services/admin/member'
const CouponHistory = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9, total: 0 })
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])

  const fetchDataCoupon = async () => {
    setLoading(true)
    try {
      const bodyPayload = {
        pageNumber: 0,
        pageSize: 8,
        userId: id,
      }
      const response = await couponUser(bodyPayload)
      setFilteredData(response.data.content)
    } catch (error) {
      Toast.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataCoupon()
  }, [])

  // Phân trang
  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }))
    fetchAllTransaction(page, pageSize)
  }

  const columns = [
    {
      title: '구분',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '쿠폰번호',
      dataIndex: 'buyerID',
      key: 'buyerID',
    },
    {
      title: '쿠폰명',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: '쿠폰발행일',
      dataIndex: 'buyerPhoneNumber',
      key: 'buyerPhoneNumber',
    },
    {
      title: '쿠폰만료일',
      dataIndex: 'standardPrice',
      key: 'standardPrice',
    },
    {
      title: '쿠폰사용일',
      dataIndex: 'numberOfPurchases',
      key: 'numberOfPurchases',
      width: '90px',
    },
    {
      title: '쿠폰사용취소일',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: '거래번호',
      dataIndex: 'paymentCurrency',
      key: 'paymentCurrency',
    },
    {
      title: '상세내역보기',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: '쿠폰상태조정',
      key: 'Payment Confirm',
      fixed: 'right',
      render: (text, record) => (
        <div>
          <button type='button' className='text-[#5B4DFB] font-medium text-small px-2 h-[26px]'>
            조정하기
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-4'>
        <TableAdmin
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          // onTableChange={handleTableChange}
        />
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

export default CouponHistory
