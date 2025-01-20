import { useEffect, useState } from 'react'
import { Button, Modal, Pagination, Tag, message } from 'antd'
import moment from 'moment'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import Card from '@pages/admin/components/card'
import IconAddProduct from '@assets/icons/admin/IconAddProduct.svg'
import { Toast } from '@utils/toast'
import IconEdit from '@assets/icons/admin/IconEdit.jsx'
import IconTrash from '@assets/images/admin/IconTrash.svg'
import { useLocation, useNavigate } from 'react-router-dom'
const { confirm } = Modal
import Loading from '@components/loadingCommon/Loading'
import { board } from '@services/admin/board'
import { getColorStatusBoard, getColorTypeBoard } from '@utils/index'

const ManagerBoard = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTextTranslate, setSearchTextTranslate] = useState('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [dataBoard, setDataBoard] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteBoardId, setDeleteBoardId] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Add pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  })

  const location = useLocation()

  const fetchDataBoard = async (pageNumber = pagination.current - 1, pageSize = 8) => {
    try {
      setLoading(true)
      const bodyPayload = {
        pageNumber,
        pageSize: pageSize,
        sort: 'desc',
        // status: 'archived',
        // type: 'event',
      }
      const response = await board.getBoard(bodyPayload)
      setDataBoard(response.data.content)
      setPagination((prev) => ({
        ...prev,
        total: response.data.totalElements,
      }))
    } catch (error) {
      Toast.error('Get Data Failed !')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const page = parseInt(queryParams.get('page'), 10) || 1
    const pageSize = parseInt(queryParams.get('pageSize'), 10) || 8

    fetchDataBoard(page - 1, pageSize)
    setPagination((prev) => ({ ...prev, current: page, pageSize }))
  }, [location.search])

  const handlePageChange = (page) => {
    navigate(`/admin/manager-board?page=${page}`)
  }

  const handleDelete = async (id) => {
    try {
      await board.deleteBoard(id)
      Toast.success('Banner image deleted successfully!')
      fetchDataBoard()
    } catch (error) {
      Toast.error(error)
    }
  }

  const showDeleteModal = (boardId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      okText: 'Yes, delete it',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => handleDelete(boardId),
      onCancel: () => {
        console.log('Delete action cancelled')
      },
    })
  }

  const columnsTable = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      align: 'center',
      width: 80,
      render: (_, __, index) => {
        const pageIndex = pagination.current
        const pageSize = pagination.pageSize
        return (pageIndex - 1) * pageSize + index + 1
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      // width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text) => {
        return (
          <Tag color={getColorStatusBoard(text)} className='capitalize'>
            {text}
          </Tag>
        )
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      render: (text) => {
        return (
          <Tag color={getColorTypeBoard(text)} className='capitalize'>
            {text}
          </Tag>
        )
      },
    },

    {
      title: 'Create Date',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      align: 'center',
      width: 180,
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },

    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <div className='flex items-center justify-center'>
          <div>
            <Button
              type='button'
              className='hover:bg-[#EAF4FE] hover:border-[#A4CAFA]'
              onClick={() => navigate(`/admin/manager-board/edit-board/${record.id}?page=${pagination.current}`)}
            >
              <IconEdit />
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

  return (
    <div>
      <Card extra={'w-full h-[87vh] p-4'}>
        <div>
          <div className='flex justify-between m-6'>
            <div className='flex justify-between'>
              <Button
                type='button'
                onClick={() => navigate('/admin/manager-board/add-board')}
                className='text-[#5B4DFB] bg-[#EFEEFF] font-medium text-normal h-9 rounded-lg flex items-center justify-center gap-0'
              >
                <img src={IconAddProduct} alt='icon' />
                Add Board
              </Button>
            </div>
          </div>
        </div>

        <div className='h-full  mt-4'>
          {loading && <Loading />}
          <TableAdmin columns={columnsTable} dataSource={dataBoard} pagination={false} />
          <div className='flex justify-end'>
            <Pagination
              className='mt-6'
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ManagerBoard
