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
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@components/loadingCommon/Loading'
import { Toast } from '@utils/toast'
import { board } from '@services/admin/board'
import IconClose from '@assets/images/IconClose.svg'
import ImageError from '@assets/images/ImageError.svg'
const { TextArea } = Input

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default function EditBoard() {
  const [categoryTreeData, setCategoryTreeData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  // validate
  const [form] = Form.useForm()
  const param = useParams()
  const { id } = param

  // image state
  const [images, setImages] = useState([])
  const [previewImage, setPreviewImage] = useState([])
  const [fileList, setFileList] = useState([])
  const [listImage, setListImage] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)

  const [dataInput, setDataInput] = useState({
    categoryId: '',
    title: '',
    content: '',
    banners: [],
  })

  const { categoryId, title, content, banners } = dataInput

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

  // useEffect(() => {
  //   const arrCheck = ['detail', 'product']

  //   const productImagesFiltered = productImages.filter((image) => image.imageType === 'product')
  //   const DescriptionPrd = productImages.filter((image) => image.imageType === 'description')
  //   const productImgMainData = productImages.filter((image) => image.main === true)

  //   const productImgMain = productImages
  //     .filter((image) => image.main === true)
  //     .map((image) => {
  //       // Kiểm tra nếu image.imageUrl bắt đầu bằng 'detail' hoặc 'product'
  //       const startsWithCheck = arrCheck.some((prefix) => image.imageUrl.startsWith(prefix))

  //       return {
  //         uid: image.uid || image.id,
  //         name: image.imageUrl.split('/').pop(),
  //         status: 'done',
  //         url: startsWithCheck
  //           ? `${c.DOMAIN_IMG}${image.imageUrl}` // Nếu bắt đầu bằng 'detail' hoặc 'product'
  //           : image.imageUrl, // Nếu không
  //       }
  //     })

  //   setboardImages(productImagesFiltered)
  //   setListImgDescription(DescriptionPrd)
  // }, [productImages])

  // Lấy dữ liệu vào input
  // Category
  const convertToTreeData = (categories) => {
    return categories.map((category) => ({
      title: category.name,
      value: category.id,
      children: category.categories ? convertToTreeData(category.categories) : [],
    }))
  }

  const findNameById = (id, categories) => {
    for (const category of categories) {
      if (category.value === id) {
        return category.title
      }
      if (category.children?.length > 0) {
        const found = findNameById(id, category.children)
        if (found) {
          return found
        }
      }
    }
    return null
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

  const fetchDataBoardId = async () => {
    try {
      if (id) {
        const response = await board.getBoardById(id)
        const boardData = response.data

        setDataInput((prevData) => ({
          ...prevData,
          categoryId: boardData.categoryId || '',
          content: boardData.content || '',
          createdBy: boardData.createdBy || '',
          createdDate: boardData.createdDate || '',
          id: boardData.id || '',
          lastModifiedBy: boardData.lastModifiedBy || '',
          lastModifiedDate: boardData.lastModifiedDate || '',
          title: boardData.title || '',
          banners: boardData.banners || [],
        }))
        setPreviewImage(boardData.banners)
        setListImage(boardData.banners)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
    fetchDataBoardId()
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

  const handleDeleteId = (id) => {
    const updatedBanners = dataInput.banners.filter((item) => item.id !== id)
    const updatedListImage = listImage.filter((item) => item.id !== id)
    const updatedFileList = fileList.filter((file) => file.uid !== id)

    setDataInput((prevData) => ({
      ...prevData,
      banners: updatedBanners,
    }))
    setListImage(updatedListImage)
    setFileList(updatedFileList)
  }

  const handleUploadImage = async (boardId) => {
    const arrImg = banners.map((el) => el.id)

    const formData = new FormData()
    formData.append('boardId', boardId)
    images.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('list', arrImg)

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
      const res = await board.updateBoard({ ...dataInput, id })
      const boardId = res.data.data.id

      // Kiểm tra và tải lên hình ảnh nếu cần thiết
      await handleUploadImage(boardId)

      Toast.success('Product created successfully!')
      setDataInput({
        categoryId: '',
        title: '',
        content: '',
        banners: [],
      })
      navigate('/admin/manager-board')
    } catch (error) {
      Toast.error('Failed to update board')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card extra={'w-full h-[85vh] overflow-y-auto lg:px-40 md:px-20 sm:px-14 py-10'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate('/admin/manager-board')}>
        <img src={IconBack} alt='icon' />
      </div>

      {loading && <Loading />}
      <div className='flex flex-col gap-8'>
        {dataInput?.content ? (
          <div>
            <Form initialValues={{ categoryId, title, content, banners }}>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                    Category <img src={IconAsterisk} alt='icon' />
                  </label>
                  {/* <Form.Item name='categoriesId' rules={[{ required: true, message: 'Please select a category!' }]}> */}
                  <TreeSelect
                    placeholder='Select a category'
                    treeData={categoryTreeData}
                    className='rounded-lg h-11 w-full'
                    allowClear
                    treeDefaultExpandAll
                    value={findNameById(categoryId, categoryTreeData)}
                    onChange={(value) => setDataInput({ ...dataInput, categoryId: value })}
                  />
                  {/* </Form.Item> */}
                </div>

                <div className='flex flex-col gap-1 flex-1 mt-4'>
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

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>
                    Image banner: (JPG, JPEG, PNG) (건당 30MB 이내) (10장까지 가능)
                  </div>
                  <div className='mt-1'>
                    <Upload
                      listType='picture-card'
                      fileList={fileList}
                      multiple
                      onPreview={handlePreview}
                      onChange={handleChange}
                      beforeUpload={() => false}
                    >
                      {fileList.length + banners.length >= 10 ? null : uploadButton}
                    </Upload>

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
                    <div className='flex items-center gap-2'>
                      {listImage &&
                        listImage.length > 0 &&
                        listImage.map((img, index) => {
                          return (
                            <div key={index} className='mt-2'>
                              <div className='w-[120px] h-[120px] mt-2 border p-2 rounded-lg relative flex justify-center items-center'>
                                <Image
                                  src={`${c.DOMAIN_IMG}${img.imageUrl}`}
                                  style={{ height: '90px', width: '90px' }}
                                  className='rounded-lg w-full h-full object-cover'
                                  loading='lazy'
                                  onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = ImageError
                                  }}
                                />
                                <button className='absolute top-0 right-0 z-30' onClick={() => handleDeleteId(img.id)}>
                                  <img src={IconClose} alt='icon' className='w-4 h-4' />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className='flex items-center justify-end'>
                  <button
                    className='bg-[#5B4DFB] text-white h-11 rounded-lg w-52 font-semibold text-normal flex items-center justify-center'
                    type='submit'
                    onClick={handleSubmit}
                    // disabled={!form.isFieldsTouched(false)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </Form>
          </div>
        ) : (
          ''
        )}
      </div>
    </Card>
  )
}
