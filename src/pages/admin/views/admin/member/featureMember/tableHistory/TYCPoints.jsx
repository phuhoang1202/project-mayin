import React, { useEffect, useState } from 'react'
import { Flex, Pagination } from 'antd'
import TablleAdmin from '@pages/admin/components/common/TableAdmin'
import moment from 'moment'
import Loading from '@components/loadingCommon/Loading'
import { Toast } from '@utils/toast'
import { findAllTransaction } from '@services/admin/member'
import { useNavigate } from 'react-router-dom'
import TableAdmin from '@pages/admin/components/common/TableAdmin'

const TYCPoints = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9, total: 0 })
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])

  const fetchDataTransaction = async () => {
    setLoading(true)
    try {
      const bodyPayload = {
        pageNumber: 0,
        pageSize: 8,
        userId: id,
      }
      const response = await findAllTransaction(bodyPayload)
      setFilteredData(response.data.content)
    } catch (error) {
      console.log(error)

      Toast.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataTransaction()
  }, [])

  // Phân trang
  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize,
    }))
    fetchDataTransaction(page, pageSize)
  }

  const columns = [
    {
      title: '일시',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: '구분',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: '거래 포인트',
      dataIndex: 'balanceFluctuation',
      key: 'balanceFluctuation',
    },
    {
      title: '현재 포인트',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '거래번호',
      dataIndex: 'transactionCode',
      key: 'transactionCode',
    },
    {
      title: '상세내역보기',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: () => <button className='text-[#5B4DFB] font-medium text-small'>상세내역</button>,
    },
  ]

  return (
    <div>
      <div className='h-full mt-4'>
        {loading && <Loading />}
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

export default TYCPoints
