import React, { useEffect, useState } from 'react'
import IconIncrease from '@assets/images/IconIncrease.svg'
import IconReply from '@assets/images/IconReply.svg'
import moment from 'moment'
import Loading from '@components/loadingCommon/Loading'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import { useNavigate } from 'react-router-dom'
import { question } from '@services/user/question'
import { Toast } from '@utils/toast'
import { Button, Modal, Pagination } from 'antd'
import CustomPagination from '@components/customPagination/CustomPagination'
import IconTrash from '@assets/images/admin/IconTrash.svg'
import IconEye from '@assets/images/IconEye.svg'

export default function ManagerQuestion() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [dataQuesiton, setDataQuesiton] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  })

  const fetchAllQuestion = async (pageNumber = 0, pageSize = 6) => {
    setLoading(true)
    try {
      const bodyPayload = {
        pageNumber: pageNumber,
        pageSize: pageSize,
        sort: 'desc',
      }
      const response = await question.getAllQuestion(bodyPayload)

      setDataQuesiton(response.data.content)
      setPagination((prev) => ({
        ...prev,
        total: response.data.totalElements,
      }))
    } catch (error) {
      Toast.error('Failed to fetch member:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllQuestion()
  }, [])

  const handleDelete = async (questionId) => {
    try {
      await question.deleteQuestionId(questionId)
      Toast.success('Question deleted successfully!')
      fetchAllQuestion()
    } catch (error) {
      console.log(error)

      Toast.error('Question deleted failed !')
    }
  }

  const showDeleteModal = (questionId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      okText: 'Yes, delete it',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => handleDelete(questionId),
    })
  }

  const columnsTable = [
    {
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 80,
      render: (_, __, index) => {
        const pageIndex = pagination.current
        const pageSize = pagination.pageSize
        return (pageIndex - 1) * pageSize + index + 1
      },
    },
    {
      title: '제목',
      dataIndex: 'subject',
      key: 'subject',
      align: 'start',
      render: (text, record) => (
        <div onClick={() => navigate(`detail-question/${record.id}`)} className='cursor-pointer'>
          <div className='font-bold'>{text}</div>
          <div className='flex items-center'>
            {record?.messageConsultation?.senderId === 1 && (
              <>
                <img src={IconReply} alt='icon' />
                <div className='font-medium text-small text-[#8C8C8C] '>
                  <span className='truncate'>{record.messageConsultation.content}</span>
                </div>
              </>
            )}
          </div>
        </div>
      ),
    },

    {
      title: '작성자',
      dataIndex: 'username',
      key: 'username',
      align: 'start',
      width: 200,
    },
    {
      title: '작성일자',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'start',
      width: 180,
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <div className='flex items-center justify-center gap-1'>
          <div>
            <Button
              type='button'
              className='hover:bg-[#D3D2D2] hover:border-[#D3D2D2] '
              onClick={() => navigate(`detail-question/${record.id}`)}
            >
              <img src={IconEye} alt='icon' />
            </Button>
          </div>
          <div>
            <Button
              type='button'
              className='hover:bg-[#FBF2F0] hover:border-[#ECA8A0]'
              onClick={() => showDeleteModal(record.id)}
            >
              <img src={IconTrash} alt='icon' />
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current: newPage }))
    fetchAllQuestion(newPage - 1, pagination.pageSize)
  }

  return (
    <div className='w-full'>
      <div className='flex lg:flex-row flex-col lg:items-center justify-between gap-2'>
        <h3 className='font-medium'>궁금하신 사항에 대해 1:1 문의를 할 수 있습니다.</h3>
        <button
          className='flex items-center h-11 max-w-36 rounded-lg bg-[#D3D2D2] font-semibold px-4'
          onClick={() => navigate('add-question')}
        >
          1:1 문의하기 <img src={IconIncrease} alt='icon' />
        </button>
      </div>

      <div>
        <div className='h-full mt-4'>
          {loading && <Loading />}
          <TableAdmin columns={columnsTable} dataSource={dataQuesiton} pagination={false} />
          <div className='flex justify-center'>
            <CustomPagination
              totalItems={pagination.total}
              currentPage={pagination.current}
              currentSize={pagination.pageSize}
              onPageChange={handlePageChange}
              align='center'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
