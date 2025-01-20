import React, { useCallback, useEffect, useState } from 'react'
import Card from '@pages/admin/components/card'
import IconAsterisk from '@assets/images/admin/IconAsterisk.svg'
import { Form, Input, Image, Upload, Radio, Space, TreeSelect, Select, message } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { PlusOutlined } from '@ant-design/icons'
import { getCategory } from '@services/admin/category'
import { getPromotion } from '@services/admin/promotion'
import IconBack from '@assets/images/IconBack.svg'
import { product } from '@services/admin/product'
import { constants as c } from '@constants'
import { useNavigate } from 'react-router-dom'
import Loading from '@components/loadingCommon/Loading'
import { Toast } from '@utils/toast'
import { board } from '@services/admin/board'
const { TextArea } = Input

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default function AddBoard() {
  const [categoryTreeData, setCategoryTreeData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  // validate
  const [form] = Form.useForm()

  // image state
  const [images, setImages] = useState([])
  const [previewImage, setPreviewImage] = useState([])
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)

  const [dataInput, setDataInput] = useState({
    categoryId: '',
    title: '',
    content: '',
  })

  const { categoryId, title, content } = dataInput

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )

  // Lấy dữ liệu vào input
  // Category
  const convertToTreeData = (categories) => {
    return categories.map((category) => ({
      title: category.name,
      value: category.id,
      children: category.categories ? convertToTreeData(category.categories) : [],
    }))
  }

  const fetchCategory = async () => {
    try {
      const response = await getCategory()
      const treeData = convertToTreeData(response.data)
      setCategoryTreeData(treeData)
    } catch (error) {
      message.error('Failed to fetch categories')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  // Upload ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const newImages = newFileList.map((file) => file.originFileObj)
    setImages(newImages)
  }

  const handleUploadImage = async (boardId) => {
    const formData = new FormData()
    formData.append('boardId', boardId)
    images.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('list', [])

    try {
      await board.updateImageBoard(formData)
    } catch (error) {
      message.error('Upload failed')
    }
  }

  // Submit form
  const handleChangeInput = (e) => {
    setDataInput({ ...dataInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await board.createBoard(dataInput)
      const boardId = res.data.data.id

      // Kiểm tra và tải lên hình ảnh nếu cần thiết
      if (images && images.length > 0) {
        await handleUploadImage(boardId)
      }
      Toast.success('Product created successfully!')
      setDataInput({
        categoryId: '',
        title: '',
        content: '',
      })
      navigate('/admin/manager-board')
    } catch (error) {
      Toast.error('Failed to create board')
    } finally {
      setLoading(false)
    }
  }

  // const handleFormValidation = () => {
  //   form
  //     .validateFields()
  //     .then(() => {
  //       // Handle valid form case
  //     })
  //     .catch((errorInfo) => {
  //       // Handle error case
  //     })
  // }

  return (
    <Card extra={'w-full h-[85vh] overflow-y-auto lg:px-40 md:px-20 sm:px-14 py-10'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate('/admin/manager-board')}>
        <img src={IconBack} alt='icon' />
      </div>
      {loading && <Loading />}
      <div className='flex flex-col gap-8'>
        <div>
          <Form form={form} onFinish={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                  Category <img src={IconAsterisk} alt='icon' />
                </label>
                <Form.Item name='categoriesId' rules={[{ required: true, message: 'Please select a category!' }]}>
                  <TreeSelect
                    placeholder='Select a category'
                    treeData={categoryTreeData}
                    className='rounded-lg h-11 w-full'
                    allowClear
                    treeDefaultExpandAll
                    value={categoryId}
                    onChange={(value) => setDataInput({ ...dataInput, categoryId: value })}
                  />
                </Form.Item>
              </div>

              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                  Title <img src={IconAsterisk} alt='icon' />
                </label>
                <Form.Item name='title' rules={[{ required: true, message: 'Please input the stock quantity!' }]}>
                  <Input
                    placeholder='AAAAAAA'
                    className='border px-2 rounded-lg h-11'
                    value={title}
                    type='text'
                    name='title'
                    onChange={handleChangeInput}
                  />
                </Form.Item>
              </div>

              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                  Content <img src={IconAsterisk} alt='icon' />
                </label>
                <Form.Item name='content' rules={[{ required: true, message: 'Please input the content!' }]}>
                  <TextArea
                    rows={4}
                    placeholder='AAAAAAA'
                    className='border p-2 rounded-lg h-28 w-full'
                    value={content}
                    name='content'
                    onChange={handleChangeInput}
                  />
                </Form.Item>
              </div>
            </div>

            <div className='mt-8'>
              <div className='font-semibold text-normal text-[#3B3B3B]'>
                Image Product: (JPG, JPEG, PNG) (건당 30MB 이내) (10장까지 가능)
              </div>

              <div className='mt-1'>
                <Form.Item
                  name='images'
                  valuePropName='fileList'
                  getValueFromEvent={(e) => e && e.fileList}
                  className='flex text-left'
                  rules={[
                    {
                      validator: (_, value) => {
                        const hasSVGFile = value.some((file) => file.name.toLowerCase().endsWith('.svg'))

                        if (hasSVGFile) {
                          return Promise.reject(new Error('SVG files are not allowed'))
                        }

                        if (!value || value.length === 0) {
                          return Promise.reject(new Error('Please upload at least one image'))
                        }
                        // Check if any file has a .svg extension

                        return Promise.resolve()
                      },
                    },
                  ]}
                >
                  <Upload
                    listType='picture-card'
                    fileList={fileList}
                    multiple
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={() => false}
                    maxCount={6}
                  >
                    {fileList.length >= 10 ? null : uploadButton}
                  </Upload>
                </Form.Item>

                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: 'none',
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-end'>
                <button
                  className='bg-[#5B4DFB] text-white h-11 rounded-lg w-52 font-semibold text-normal flex items-center justify-center'
                  // onClick={handleSubmit}
                  type='submit'
                  // disabled={
                  //   !form.isFieldsTouched(true) ||
                  //   form.getFieldsError().some(({ errors }) => errors.length > 0 || images.length === 0)
                  // }
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Card>
  )
}
