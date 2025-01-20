import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal, Pagination, Select } from 'antd'
import Card from '@pages/admin/components/card'
import { getAllUsers, statusEnableUsers } from '@services/admin/member'
import dayjs from 'dayjs'
import { Toast } from '@utils/toast'
import IconAddProduct from '@assets/icons/admin/IconAddProduct.svg'
import IconSearch from '@assets/icons/admin/IconSearch.svg'
import IconEdit from '@assets/icons/admin/IconEdit.jsx'
import IconLock from '@assets/icons/admin/IconLock.svg'
import IconUnlock from '@assets/icons/admin/IconUnlock.svg'
import { exportService } from '@services/admin/exportService'
import { getToken } from '@utils/auth.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { constants as c } from '@constants'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import Loading from '@components/loading/Loading'
import { formatNumber } from '@utils/index'
import moment from 'moment'

const ManagerMember = () => {
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [member, setMember] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const accessToken = getToken('token') || ''
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 7,
    total: 0,
  })
  const [searchType, setSearchType] = useState('email')
  const [searchText, setSearchText] = useState('')
  const location = useLocation()

  const handleChange = (value) => {
    setSearchType(value)
  }

  const handleInputChange = (event) => {
    setSearchText(event.target.value)
  }

  const fetchAllUser = async (pageNumber = 0, pageSize = 7) => {
    setLoading(true)
    try {
      const bodyPayload = {
        // enable: true,
        email: searchType === 'email' ? searchText : null,
        phoneNumber: searchType === 'phoneNumber' ? searchText : null,
        username: searchType === 'username' ? searchText : null,
        pageNumber,
        pageSize,
      }
      const response = await getAllUsers(bodyPayload)

      setFilteredData(response.data.content)
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
    const queryParams = new URLSearchParams(location.search)
    const page = parseInt(queryParams.get('page'), 10) || 1
    const pageSize = parseInt(queryParams.get('pageSize'), 10) || 7

    fetchAllUser(page - 1, pageSize)
    setPagination((prev) => ({ ...prev, current: page, pageSize }))
  }, [location.search])

  const handleSearchTable = async () => {
    try {
      setPagination((prev) => ({ ...prev, current: 1 }))
      await fetchAllUser(0, pagination.pageSize)
      setSearchText('')
    } catch (error) {
      console.error('Error translating text:', error)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchTable()
    }
  }

  const handlePageChange = (page) => {
    navigate(`/admin/manager-member?page=${page}`)

    // setPagination((prev) => ({
    //   ...prev,
    //   current: page,
    //   pageSize,
    // }))
  }

  const handleChangeStatus = async (member) => {
    setLoading(true)
    try {
      const bodyPayload = {
        enable: !member.enabled,
        userId: member.id,
      }
      await statusEnableUsers(bodyPayload)
      fetchAllUser(pagination.current, pagination.pageSize)
      setIsDeleteModalVisible(false)
      message.success('Change status successful')
    } catch (error) {
      message.error('change failure state')
    } finally {
      setLoading(false)
    }
  }

  const showChangeStatus = (member) => {
    setMember(member)
    setIsDeleteModalVisible(true)
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
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
      width: '80px',
      fixed: 'left',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      fixed: 'left',
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      fixed: 'left',
      render: (text, record) => (
        <div
          className='text-start underline decoration-blue-500 text-blue-500 cursor-pointer'
          onClick={() => navigate(`detail-member/${record.id}`)}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: '80px',
      align: 'center',
    },
    {
      title: 'Birth',
      dataIndex: 'birthday',
      key: 'birthday',
      width: '120px',
      align: 'center',
      render: (birthday) => (birthday ? dayjs(birthday).format('YYYY/MM/DD') : ''),
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      key: 'nation',
      width: '80px',
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '140px',
      align: 'center',
    },
    {
      title: 'Number of purchases',
      dataIndex: 'numberOfPurchases',
      key: 'numberOfPurchases',
      width: '90px',
      align: 'center',
    },
    {
      title: 'Total purchase price',
      dataIndex: 'totalPurchasePrice',
      key: 'totalPurchasePrice',
      width: '130px',
      align: 'center',
    },
    {
      title: 'Last time of purchase',
      dataIndex: 'lastTimeOfPurchase',
      key: 'lastTimeOfPurchase',
      width: '130px',
      align: 'start',
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: '110px',
      align: 'start',
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'TYC Point',
      dataIndex: 'balance',
      key: 'balance',
      width: '110px',
      align: 'center',
      render: (text, record) => <div>{formatNumber(text)}</div>,
    },
    {
      title: 'Coupon',
      dataIndex: 'coupon',
      key: 'coupon',
      width: '80px',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <div className='flex lg:flex-row flex-col justify-center items-center gap-1'>
          <div>
            <Button
              type='button'
              className='hover:bg-[#EAF4FE] hover:border-[#A4CAFA]'
              onClick={() => navigate(`edit-member/${record.id}`)}
            >
              <IconEdit />
            </Button>
          </div>

          <div>
            <Button
              type='button'
              className='hover:bg-[#FBF2F0] hover:border-[#ECA8A0]'
              onClick={() => showChangeStatus(record)}
            >
              {record.enabled === true ? <img src={IconUnlock} alt='icon' /> : <img src={IconLock} alt='icon' />}
            </Button>
          </div>
        </div>
      ),
    },
  ]

  function exportExcelFile() {
    exportService.exportExcelUser().then((res) => {
      window.open(`${c.DOMAIN_DOWNLOAD_FILE}${res.data}` + `?access_token=${accessToken}`, '_blank')
    })
  }

  return (
    <div>
      <Card extra={'w-full h-[87vh] p-4'}>
        <div>
          <div className='flex flex-col md:flex-row justify-between'>
            <Button
              type='button'
              onClick={() => navigate('add-new-member')}
              className='text-[#5B4DFB] bg-[#EFEEFF] font-medium text-normal h-9 rounded-lg flex items-center justify-center gap-0'
            >
              <img src={IconAddProduct} alt='icon' />
              Add New Member
            </Button>

            {selectedRowKeys?.length > 0 && (
              <Button
                type='button'
                onClick={showDeleteListPrd}
                className='text-white  bg-[#F14646] hover:bg-[#f15b5b] font-medium text-normal rounded-lg px-4 h-9 ml-2'
              >
                Delete products
              </Button>
            )}

            <div className='flex items-end flex-col lg:flex-row gap-4 lg:mt-0 mt-4'>
              <div>
                <Select
                  defaultValue='email'
                  className='h-9 min-w-36'
                  onChange={handleChange}
                  options={[
                    {
                      value: 'email',
                      label: 'Email',
                    },
                    {
                      value: 'username',
                      label: 'Username',
                    },
                    {
                      value: 'phoneNumber',
                      label: 'Phone Number',
                    },
                  ]}
                />
              </div>
              <div className='flex flex-col md:flex-row items-center w-full md:w-auto relative '>
                <Input
                  placeholder='찾다'
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className='lg:w-[400px] w-full h-9'
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
                  className='bg-[#E6F9E7] text-[#2DC033] cursor-pointer h-9 flex items-center justify-center px-3 rounded-lg font-medium text-normal'
                >
                  Excel Download
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='h-full mt-4'>
          {loading && <Loading />}
          <TableAdmin columns={columns} dataSource={filteredData} pagination={false} />
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

      <Modal
        title='Status member'
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={() => handleChangeStatus(member)}
      >
        <p>Are you sure you want to change the member status?</p>
      </Modal>
    </div>
  )
}

export default ManagerMember
