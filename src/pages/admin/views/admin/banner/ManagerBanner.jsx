import { useEffect, useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Pagination, message } from 'antd'
import moment from 'moment'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import Card from '@pages/admin/components/card'
import IconAddProduct from '@assets/icons/admin/IconAddProduct.svg'
import { useProductStore } from '@store/admin/productStore'
import { Toast } from '@utils/toast'
import IconEdit from '@assets/icons/admin/IconEdit.jsx'
import IconTrash from '@assets/images/admin/IconTrash.svg'
import { useLocation, useNavigate } from 'react-router-dom'
const { confirm } = Modal
import Loading from '@components/loadingCommon/Loading'
import { board } from '@services/admin/board'
import { getCategory } from '@services/admin/category'

const ManagerBoard = () => {
  const { deleteListPrd, findPrdByConditions, deletePrdById, loadingDeletePrdById } = useProductStore((state) => state)

  // const { allCategories } = useCategoryStore((state) => state)
  // const { allPromotions } = usePromotionStore()
  const [searchText, setSearchText] = useState('')
  const [searchTextTranslate, setSearchTextTranslate] = useState('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [dataBoard, setDataBoard] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [textCategory, setTextCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Add pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  })

  const location = useLocation()

  const fetchCategory = async () => {
    try {
      const response = await getCategory()
      setTextCategory(response.data)
    } catch (error) {
      message.error('Failed to fetch categories')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchDataBoard = async (pageNumber = 0, pageSize = 8, translatedText = searchTextTranslate) => {
    try {
      setLoading(true)
      const bodyPayload = {
        // categoryId: 0,
        pageNumber,
        pageSize: 8,
        sort: 'desc',
        // sortBy: 'string',
        // title: 'string',
      }
      const response = await board.getBoard(bodyPayload)
      setDataBoard(response.data.content)
      setPagination((prev) => ({
        ...prev,
        total: response.data.totalElements,
      }))
    } catch (error) {
      console.log(error)
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

    // setPagination((prev) => ({
    //   ...prev,
    //   current: page,
    //   pageSize,
    // }))
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
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <p className='text-[#333333] font-medium'>Do you want to delete this image banner?</p>,
      onOk() {
        handleDelete(boardId)
      },
      onCancel() {
        Modal.destroyAll()
      },
    })
  }

  const columnsTable = [
    {
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      render: (_, __, index) => {
        const pageIndex = pagination.current
        const pageSize = pagination.pageSize
        return (pageIndex - 1) * pageSize + index + 1
      },
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      align: 'center',
      width: '130px',
      render: (text) => {
        const findCategoryName = (categories, id) => {
          for (let category of categories) {
            if (category.id === id) {
              return category.name
            }
            if (category.categories && category.categories.length > 0) {
              const nestedName = findCategoryName(category.categories, id)
              if (nestedName) {
                return nestedName
              }
            }
          }
          return null
        }

        const categoryName = findCategoryName(textCategory, text)
        return categoryName || 'Unknown'
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: '200px',
    },
    // {
    //   title: 'Images',
    //   dataIndex: 'productImages',
    //   key: 'productImages',
    //   align: 'start',
    //   render: (text, record) => {
    //     console.log(record.banners)

    //     const arrCheck = ['detail', 'product']
    //     const mainImage = record.banners.find((image) => image.main === true)
    //     const productImage = record.banners.find((image) => image.imageType === 'product')
    //     const imageToShow = mainImage || productImage

    //     const imageUrl = imageToShow?.imageUrl || ''
    //     const isImageMatched = arrCheck.some((prefix) => imageUrl?.startsWith(prefix))
    //     const finalImageUrl = isImageMatched ? `${c.DOMAIN_IMG}${imageUrl}` : imageUrl

    //     return (
    //       <img
    //         className='w-[100px] h-[60px] object-cover'
    //         src={finalImageUrl}
    //         alt='images'
    //         loading='lazy'
    //         onError={(e) => {
    //           console.log('Image load failed:')
    //           e.target.onerror = null
    //           e.target.src = ImageError
    //         }}
    //       />
    //     )
    //   },
    // },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      width: '120px',
    },
    {
      title: 'Create Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center',
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'Update Date',
      dataIndex: 'updateDate',
      key: 'updateDate',
      align: 'center',
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
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

        <Modal
          loading={loadingDeletePrdById}
          title='Delete Product'
          visible={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
        >
          <p>Are you sure you want to delete this category?</p>
        </Modal>
      </Card>
    </div>
  )
}

export default ManagerBoard
