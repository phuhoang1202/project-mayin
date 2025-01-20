import { useEffect, useState } from 'react'
import { Button, Modal, Pagination, Tag, Input, Tooltip } from 'antd'
import moment from 'moment'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import Card from '@pages/admin/components/card'
import IconAddProduct from '@assets/icons/admin/IconAddProduct.svg'
import { Toast } from '@utils/toast'
import IconEdit from '@assets/icons/admin/IconEdit.jsx'
import IconReply from '@assets/icons/admin/IconReply.svg'
import IconTrash from '@assets/images/admin/IconTrash.svg'
import { useLocation, useNavigate } from 'react-router-dom'
const { confirm } = Modal
import Loading from '@components/loadingCommon/Loading'
import { board } from '@services/admin/board'
import { booleanText, getColorStatusBoard, getColorTypeBoard } from '@utils/index'
import { question } from '@services/admin/question'
import IconSearch from '@assets/icons/admin/IconSearch.svg'

const ManagerQuestionAdmin = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTextTranslate, setSearchTextTranslate] = useState('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [dataQuestion, setdataQuestion] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletequestionId, setDeletequestionId] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Add pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  })

  const location = useLocation()

  const fetchDataQuestion = async (pageNumber = pagination.current - 1, pageSize = 8) => {
    try {
      setLoading(true)
      const bodyPayload = {
        pageNumber,
        pageSize: pageSize,
        sort: 'desc',
        // status: 'archived',
        // type: 'event',
      }
      const response = await question.getAllQuestion(bodyPayload)
      setdataQuestion(response.data.content)
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

    fetchDataQuestion(page - 1, pageSize)
    setPagination((prev) => ({ ...prev, current: page, pageSize }))
  }, [location.search])

  const handlePageChange = (page) => {
    navigate(`/admin/manager-question?page=${page}`)
  }

  const handleSearchTable = async () => {
    try {
      setSearchTextTranslate(searchText)
      fetchDataProduct(0, 6, searchText)
    } catch (error) {
      console.error('Error translating text:', error)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchTable()
    }
  }

  const handleDelete = async (questionId) => {
    try {
      await question.deleteQuestionId(questionId)
      Toast.success('Question deleted successfully!')
      fetchDataQuestion()
    } catch (error) {
      Toast.error(error.response.data.message || 'Question deleted failed !')
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
    // {
    //   title: 'STT',
    //   dataIndex: 'STT',
    //   key: 'STT',
    //   align: 'center',
    //   width: 80,
    //   render: (_, __, index) => {
    //     const pageIndex = pagination.current
    //     const pageSize = pagination.pageSize
    //     return (pageIndex - 1) * pageSize + index + 1
    //   },
    // },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      // width: 80,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      align: 'center',
      width: 250,
      render: (text, record) => (
        <Tooltip
          title={text}
          onClick={() => navigate(`detail-question/${record.id}`)}
          className='cursor-pointer flex justify-start truncate w-[250px]'
        >
          {text}
        </Tooltip>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      width: 250,
      render: (text, record) => (
        <div className='cursor-pointer flex justify-start truncate w-[250px]'>
          {record.messageConsultation?.senderId === 1 && (
            <Tooltip title={record.messageConsultation.content}>{record.messageConsultation.content}</Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'SenderId',
      dataIndex: 'senderId',
      key: 'senderId',
      align: 'center',
    },
    {
      title: 'RecipientId',
      dataIndex: 'recipientId',
      key: 'recipientId',
      align: 'center',
    },
    {
      title: 'Private',
      dataIndex: 'private',
      key: 'private',
      align: 'center',
      render: (text) => {
        return (
          <Tag className='capitalize' color={booleanText(text ? 'true' : 'false')}>
            {text ? 'True' : 'False'}
          </Tag>
        )
      },
    },
    {
      title: 'UnSeen',
      dataIndex: 'unSeen',
      key: 'unSeen',
      align: 'center',
      render: (text) => {
        return (
          <Tag className='capitalize' color={booleanText(text ? 'true' : 'false')}>
            {text ? 'True' : 'False'}
          </Tag>
        )
      },
    },

    {
      title: 'Create Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 180,
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },

    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (text, record) => (
        <div className='flex items-center justify-end'>
          <div>
            {record.messageConsultation?.senderId !== 1 && (
              <Button
                type='button'
                className='hover:bg-[#F8FEEE] hover:border-[#69BB4A]'
                onClick={() => navigate(`/admin/manager-question/reply-question/${record.id}`)}
              >
                <img src={IconReply} alt='icon' />
              </Button>
            )}
          </div>
          <div>
            <Button
              type='button'
              className='hover:bg-[#EAF4FE] hover:border-[#A4CAFA]'
              onClick={() => navigate(`/admin/manager-question/edit-question/${record.id}?page=${pagination.current}`)}
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
          <div className='flex justify-end items-center w-full relative '>
            <Input
              placeholder='검색 프로모션'
              onKeyDown={handleKeyPress}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className='lg:w-[400px] w-full h-9'
            />
            <img
              src={IconSearch}
              alt='icon'
              onClick={handleSearchTable}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
            />
          </div>
        </div>

        <div className='h-full  mt-4'>
          {loading && <Loading />}
          <TableAdmin columns={columnsTable} dataSource={dataQuestion} pagination={false} />
        </div>
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
      </Card>
    </div>
  )
}

export default ManagerQuestionAdmin
