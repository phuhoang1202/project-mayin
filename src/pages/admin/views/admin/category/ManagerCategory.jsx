import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal } from 'antd'
import Card from '@pages/admin/components/card'
import IconAddProduct from '@assets/icons/admin/IconAddProduct.svg'
import IconDelete from '@assets/icons/admin/IconDelete.svg'
import IconAdd from '@assets/icons/admin/IconAdd.svg'
import IconSearch from '@assets/icons/admin/IconSearch.svg'
import ModalAdmin from '@pages/admin/components/common/ModalAdmin'
import { getCategory, postCategory, updateCategory, deleteCategory, uploadIconCategory } from '@services/admin/category'
import { Toast } from '@utils/toast'
import IconEdit from '@assets/icons/admin/IconEdit'
import TableAdmin from '@pages/admin/components/common/TableAdmin'

const ManagerCategory = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 })
  const [loading, setLoading] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isEditChildModalVisible, setIsEditChildModalVisible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isAddModalVisibleChil, setIsAddModalVisibleChil] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState(null)
  const [attributesParent, setAttribuleParent] = useState(null)
  const [listAttributeChil, setListAttribuleChil] = useState([])

  const [form] = Form.useForm()
  const [addForm] = Form.useForm()

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  // img
  const [images, setImages] = useState([])
  const [previewImage, setPreviewImage] = useState([])
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getCategory()
      const categoryData = response.data.map((category) => ({
        ...category,
        children: category.categories,
      }))
      setData(categoryData)
      setFilteredData(categoryData)
    } catch (error) {
      Toast.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTableChange = (pagination) => {
    setPagination(pagination)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = (value) => {
    setSearchText(value)
    if (value === '') {
      setFilteredData(data)
    } else {
      const filteredData = data.filter((category) => category.name.toLowerCase().includes(value.toLowerCase()))
      setFilteredData(filteredData)
    }
  }

  const showEditModal = (category) => {
    setCurrentCategory(category)
    form.setFieldsValue(category)
    setIsEditModalVisible(true)
  }

  const handleEditChil = (category) => {
    // setCurrentCategory(category)
    // form.setFieldsValue(category)
    // setIsEditModalVisible(true)
  }

  const handleEdit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const updatedCategory = { ...currentCategory, ...values }
      await updateCategory(updatedCategory)
      const updatedData = data.map((item) => (item.id === currentCategory.id ? updatedCategory : item))
      setData(updatedData)
      setFilteredData(updatedData)
      setIsEditModalVisible(false)
      fetchData()
      message.success('Category updated successfully')
    } catch (error) {
      message.error('Failed to update category')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await deleteCategory(id)
      const updatedData = data.filter((item) => item.id !== id)
      setData(updatedData)
      setFilteredData(updatedData)
      setIsDeleteModalVisible(false)
      fetchData()
      Toast.success('Category deleted successfully')
    } catch (error) {
      Toast.error('Failed to delete category')
    } finally {
      setLoading(false)
    }
  }

  const showDeleteModal = (id) => {
    setDeleteCategoryId(id)
    setIsDeleteModalVisible(true)
  }
  // Cha
  const showAddModal = () => {
    addForm.resetFields()
    setIsAddModalVisible(true)
  }

  // Con
  const showAddModalChil = (record) => {
    addForm.resetFields()
    setIsAddModalVisibleChil(true)
    setAttribuleParent(record)
  }

  // Upload ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  // Xử lý thay đổi danh sách file
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  // Xử lý upload ảnh
  const handleUploadImage = async (categoryId) => {
    const formData = new FormData()
    formData.append('categoryId', categoryId)
    fileList.forEach((file) => {
      formData.append('files', file.originFileObj)
    })

    try {
      await uploadIconCategory(formData)
      Toast.success('Upload successful!')
    } catch (error) {
      Toast.error('Upload failed')
    }
  }

  const handleAdd = async () => {
    setLoading(true)
    try {
      const values = await addForm.validateFields()
      const response = await postCategory(values)
      const categoriesId = response.data.data.id
      await handleUploadImage(categoriesId)

      const newData = [...data, response.data]
      setData(newData)
      setFilteredData(newData)
      setIsAddModalVisible(false)
      Toast.success('Category added successfully')
    } catch (error) {
      Toast.error(error.response.data.message || 'Failed to add category')
    } finally {
      setLoading(false)
    }
  }

  const handleAddChildAttribule = async (values) => {
    setLoading(true)
    try {
      if (attributesParent) {
        const bodyPayload = {
          description: values.description,
          name: values.attribuleName,
          parentId: attributesParent.id,
        }
        const response = await postCategory(bodyPayload)

        // Thêm thuộc tính con vào danh sách con của danh mục cha
        const updatedData = data.map((category) => {
          if (category.id === attributesParent.id) {
            return {
              ...category,
              children: [...(category.children || []), response.data],
            }
          }
          return category
        })

        setData(updatedData)
        setFilteredData(updatedData)
        form.resetFields()
        Toast.success('Category added successfully')
      }
    } catch (error) {
      Toast.error(error.response.data.message || 'Failed to add category')
    } finally {
      setLoading(false)
    }
    setIsAddModalVisibleChil(false)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      align: 'start',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '200px',
      render: (text, record) => (
        <div className='flex items-center justify-end'>
          {!record.parentId && (
            <Button type='button' onClick={() => showAddModalChil(record)} className='hover:bg-[#EFEEFF]'>
              <img src={IconAdd} alt='icon' />
            </Button>
          )}

          <Button
            type='button'
            onClick={!record.parentId ? () => showEditModal(record) : () => handleEditChil(record)}
            className='hover:bg-[#bac9ff]'
          >
            <IconEdit />
          </Button>

          <Button type='button' onClick={() => showDeleteModal(record.id)} className='hover:bg-[#fdcbcb]'>
            <img src={IconDelete} alt='icon' />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Card extra={'w-full h-[85vh] p-4'}>
        <div>
          <div className='flex justify-between m-6'>
            <Button
              type='button'
              onClick={showAddModal}
              className='text-[#5B4DFB] bg-[#EFEEFF] font-medium text-normal h-9 rounded-lg flex items-center justify-center gap-0'
            >
              <img src={IconAddProduct} alt='icon' />
              Add New Category
            </Button>

            <div className='flex items-center flex-col lg:flex-row gap-4 lg:mt-0 mt-4'>
              <div className='flex flex-col md:flex-row items-center w-full md:w-auto relative '>
                <Input
                  placeholder='검색 카테고리'
                  onKey={handleKeyPress}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className='lg:w-[400px] w-full h-9'
                />
                <img
                  src={IconSearch}
                  alt='icon'
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-4'>
          <TableAdmin
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            pagination={pagination}
            onTableChange={handleTableChange}
          />
        </div>
      </Card>

      <ModalAdmin
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEdit}
        form={form}
        initialValues={currentCategory}
        currentCategory={currentCategory}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'categories', label: 'Categories' },
          { name: 'description', label: 'Description' },
        ]}
        title='Edit Category'
      />

      {/* Cha */}
      <ModalAdmin
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={handleAdd}
        form={addForm}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'description', label: 'Description' },
          // { name: 'uploadImage', label: 'Image' },
        ]}
        uploadProps={{
          fileList,
          handlePreview,
          handleChange,
          previewImage,
          previewOpen,
          setPreviewOpen,
        }}
        title='Add Category'
      />

      <Modal
        visible={isAddModalVisibleChil}
        onCancel={() => setIsAddModalVisibleChil(false)}
        onOk={() => form.submit()}
        width={1000}
      >
        <Form form={form} onFinish={handleAddChildAttribule}>
          <div>
            <div className='flex items-center gap-6 mt-4'>
              <label className='font-semibold text-[#3B3B3B] text-normal'>Category Name: </label>
              <div className='font-bold text-[#3B3B3B] text-normal'>{attributesParent && attributesParent.name}</div>
            </div>

            <div className='mt-4'>
              <div className='flex flex-col gap-1'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>Attribule name:</label>
                  <Form.Item
                    name='attribuleName'
                    rules={[{ required: true, message: 'Please enter the attribute name' }]}
                  >
                    <Input placeholder='Attribule' className='border px-2 rounded-lg h-11' />
                  </Form.Item>
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>Description:</label>
                  <Form.Item name='description' rules={[{ required: true, message: 'Please enter the description' }]}>
                    <Input placeholder='Description' className='border px-2 rounded-lg h-11' />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal>

      <Modal
        title='Delete Category'
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={() => handleDelete(deleteCategoryId)}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  )
}

export default ManagerCategory
