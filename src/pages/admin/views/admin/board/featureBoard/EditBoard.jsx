import React, { useEffect, useState } from 'react'
import Card from '@pages/admin/components/card'
import IconAsterisk from '@assets/images/admin/IconAsterisk.svg'
import { Form, Input, Image, Upload, Select, message } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { PlusOutlined } from '@ant-design/icons'
import IconBack from '@assets/images/IconBack.svg'
import { constants as c } from '@constants'
import IconClose from '@assets/images/IconClose.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from '@components/loadingCommon/Loading'
import ImageError from '@assets/images/ImageError.svg'
import { board } from '@services/admin/board'
import { Toast } from '@utils/toast'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

class MyUploadAdapter {
  constructor(loader, saveTemporaryUpload) {
    this.loader = loader
    this.saveTemporaryUpload = saveTemporaryUpload
  }

  upload() {
    return this.loader.file.then((file) => {
      const fileReader = new FileReader()

      return new Promise((resolve, reject) => {
        fileReader.onload = () => {
          // Lưu file dưới dạng blob vào bộ nhớ tạm thời
          this.saveTemporaryUpload({
            file,
            url: fileReader.result,
          })
          resolve({ default: fileReader.result })
        }
        fileReader.onerror = (error) => reject(error)
        fileReader.readAsDataURL(file)
      })
    })
  }

  abort() {
    // Xử lý khi upload bị hủy nếu cần
  }
}

export default function EditProduct() {
  // validate
  const [form] = Form.useForm()
  const [previewOpen, setPreviewOpen] = useState(false)
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param

  // CKEditor
  const [editorData, setEditorData] = useState()
  const [temporaryUploads, setTemporaryUploads] = useState([])
  const [listImgDescription, setListImgDescription] = useState([])

  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(false)

  // image state
  const [images, setImages] = useState([])
  const [previewImage, setPreviewImage] = useState([])
  const [fileList, setFileList] = useState([])
  const [listImgProductId, setListImgProductId] = useState([])

  // state img main
  const [imagesMain, setImagesMain] = useState('')
  const [fileListMain, setFileListMain] = useState([])
  const [previewImageMain, setPreviewImageMain] = useState([])
  const [previewOpenMain, setPreviewOpenMain] = useState(false)

  let isPathMain = ''

  const [dataInput, setDataInput] = useState({
    type: 'notification',
    title: '',
    status: 'draft',
    content: '',
    id: id,
    views: '',
    newsImages: [],
  })

  const { type, title, status, content, views, newsImages } = dataInput

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

  // Call Dữ liệu
  const fetchDataProduct = async () => {
    try {
      if (id) {
        // setLoading(true)
        const response = await board.getBoardById(id)
        const productData = response.data
        setDataInput((prevData) => ({
          ...prevData,
          type: productData.type,
          title: productData.title,
          status: productData.status,
          content: productData.content,
          views: productData.views,
          newsImages: productData.newsImages,
        }))

        setEditorData(productData.content || '')
        setPreviewImage(productData.newsImages)
        setImages(productData.newsImages)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataProduct()
  }, [])

  // Lấy page
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get('page') || 1 // Mặc định là 1 nếu không có
  const pageSize = queryParams.get('pageSize') || 10 // Mặc định là 10 nếu không có

  // Sử dụng page và pageSize để gọi API hoặc hiển thị dữ liệu tương ứng

  // ckeditor
  // Lưu trữ upload tạm thời
  function saveTemporaryUpload(upload) {
    setTemporaryUploads((prev) => [...prev, upload])
  }

  // Plugin CKEditor cho upload
  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, saveTemporaryUpload)
    }
  }

  const handleSubmitDescription = async (newsId) => {
    let contentCopy = editorData
    let index = 0
    let arrPosition = []
    if (listImgDescription && listImgDescription.length > 0) {
      arrPosition = listImgDescription.map((el) => el.position)
      index = Math.max(...arrPosition)
    }

    const uploadPromises = temporaryUploads.map(async (upload, indexUpload) => {
      const formData = new FormData()
      formData.append('file', upload.file)
      formData.append('position', index + indexUpload + 1)
      formData.append('newsId', newsId)
      formData.append('list', arrPosition)

      // Call API
      return await board.uploadBoardImgsDetail(formData).then((res) => {
        const urlImg = `${c.DOMAIN_IMG}${res.data.url}`
        contentCopy = contentCopy.replace(upload.url, urlImg)
      })
    })

    // Xử lý submit với dữ liệu cuối cùng
    Promise.all(uploadPromises)
      .then(() => {
        const payload = {
          content: contentCopy,
          newsId: newsId,
        }
        return board.uploadDescriptionBoard(payload)
      })
      .then(() => {
        console.log('Form submitted successfully')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  // Upload ảnh

  useEffect(() => {
    const productImagesFiltered = newsImages.filter((image) => image.type === 'news')
    const DescriptionPrd = newsImages.filter((image) => image.type === 'content')
    const productImgMainData = newsImages.filter((image) => image.main === true)

    const productImgMain = newsImages
      .filter((image) => image.main === true)
      .map((image) => {
        return {
          uid: image.uid || image.id,
          name: image.imageUrl.split('/').pop(),
          status: 'done',
          url: `${c.DOMAIN_IMG}${image.imageUrl}`,
        }
      })

    setListImgProductId(productImagesFiltered)
    setListImgDescription(DescriptionPrd)
    setFileListMain(productImgMain)
    setImagesMain(productImgMainData)
  }, [newsImages])

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleDeleteId = (id) => {
    const newProductImages = newsImages.filter((item) => item.type !== 'news' || item.id !== id)

    setDataInput((prevData) => ({
      ...prevData,
      newsImages: newProductImages,
    }))
  }

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const newImages = newFileList.map((file) => file.originFileObj)
    setImages(newImages)
    setIsUpdate(true)
  }

  const handleUploadImage = async (newsId) => {
    const arrImgProduct = newsImages.filter((value) => value.type === 'news')
    const arrImg = arrImgProduct.map((el) => el.id)

    const formData = new FormData()
    if (isUpdate) {
      const arrMerge = [...images, ...imagesMain]
      arrMerge.forEach((file) => {
        formData.append('files', file)
      })

      formData.append('newsId', newsId)
      formData.append('list', arrImg)
      formData.append('isMain', isPathMain)
    } else {
      return null
    }

    try {
      await board.updateImageBoard(formData)
    } catch (error) {
      message.error('Upload failed')
    }
  }

  // Update img main ***************

  const handleRemoveFile = (imgMain) => {
    // Lọc phần tử khỏi mảng images dựa trên id
    const updatedImages = images.filter((image) => image.id !== imgMain.uid)

    // Cập nhật lại state
    setDataInput((prevData) => ({ ...prevData, newsImages: updatedImages }))
  }

  const handlePreviewMain = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImageMain(file.url || file.preview)
    setPreviewOpenMain(true)
  }

  const handleChangeMain = ({ fileList: newFileList }) => {
    setFileListMain(newFileList)
    const newImages = newFileList.map((file) => file.originFileObj)
    setImagesMain(newImages)
    setIsUpdate(true)
  }

  const handleUploadImageMain = async (newsId) => {
    let nameImg = ''
    if (imagesMain && imagesMain.length > 0) {
      nameImg = imagesMain[0]?.name?.substring(0, imagesMain[0]?.name?.lastIndexOf('.'))
      isPathMain = `news/${newsId}/${nameImg}.jpeg`
    }
  }

  // Submit form
  const handleChangeInput = (e) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? Number(value) : value

    // Cập nhật cả [name] và promotions với giá trị của filteredPromotions
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      [name]: parsedValue,
    }))
  }

  const handleSubmit = async () => {
    try {
      const res = await board.updateBoard(dataInput)
      const newsId = res.data.id
      // Gọi tiếp hàm xử lý mô tả và đợi phản hồi
      await handleSubmitDescription(newsId)

      await handleUploadImageMain(newsId)
      // Kiểm tra và tải lên hình ảnh nếu cần thiết
      if (imagesMain && imagesMain.length > 0) {
        await handleUploadImage(newsId)
      }
      Toast.success('Board created successfully!')
      navigate(`/admin/manager-board?page=${page}`)
    } catch (error) {
      console.log('Failed to create Board')
    }
  }

  return (
    <Card extra={'w-full h-[87vh] overflow-y-auto'}>
      <div
        className='sticky lg:top-8 top-4 lg:ml-8 ml-2 cursor-pointer z-30'
        onClick={() => navigate('/admin/manager-board')}
      >
        <img src={IconBack} alt='icon' />
      </div>
      <div className='flex flex-col gap-8 lg:mx-40 md:mx-20 sm:mx-14 mx-10 py-10'>
        <div>
          {dataInput?.title ? (
            <Form
              initialValues={{
                type,
                title,
                status,
                content,
                views,
                newsImages,
              }}
            >
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                    Title <img src={IconAsterisk} alt='icon' />
                  </label>
                  <Form.Item name='title' rules={[{ required: true, message: 'Please input the title!' }]}>
                    <Input
                      placeholder='AAAAAAA'
                      className='border px-2 rounded-lg h-11'
                      type='text'
                      value={title}
                      name='title'
                      onChange={handleChangeInput}
                    />
                  </Form.Item>
                </div>

                <div className='flex items-center gap-8'>
                  <div className='flex flex-col gap-1 flex-1'>
                    <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                      Category <img src={IconAsterisk} alt='icon' />
                    </label>
                    <Form.Item name='type' rules={[{ required: true, message: 'Please select a category!' }]}>
                      <Select
                        defaultValue='notification'
                        onChange={(value) => handleChangeInput({ target: { name: 'type', value } })}
                        className='h-11'
                        options={[
                          {
                            value: 'notification',
                            label: 'Notification',
                          },
                          {
                            value: 'event',
                            label: 'Event',
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>

                  {/* Status */}
                  <div className='flex flex-col gap-1 flex-1'>
                    <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                      Status <img src={IconAsterisk} alt='icon' />
                    </label>
                    <Form.Item name='status' rules={[{ required: true, message: 'Please select the status!' }]}>
                      <Select
                        defaultValue='draft'
                        className='h-11'
                        onChange={(value) => handleChangeInput({ target: { name: 'status', value } })}
                        options={[
                          {
                            value: 'draft',
                            label: 'Draft',
                          },
                          {
                            value: 'published',
                            label: 'Published',
                          },
                          {
                            value: 'archived',
                            label: 'Archived',
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className='mt-2'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>Description</label>
                  <div>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        extraPlugins: [CustomUploadAdapterPlugin],
                      }}
                      data={editorData}
                      onChange={(event, editor) => {
                        setEditorData(editor.getData())
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <div className='font-semibold text-normal text-[#3B3B3B]'>
                  Image Board: (JPG, JPEG, PNG) (건당 30MB 이내) (10장까지 가능)
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
                    {fileList.length + listImgProductId.length >= 10 ? null : uploadButton}
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
                    {listImgProductId &&
                      listImgProductId.length > 0 &&
                      listImgProductId
                        .filter((img) => img.main === false)
                        .map((img, index) => {
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

              <div className='mt-8'>
                <div className='font-semibold text-normal text-[#3B3B3B]'>
                  Image Board Main: (JPG, JPEG, PNG) (건당 30MB 이내)
                </div>
                <div className='mt-1'>
                  <Form.Item
                    name='imagesMain'
                    valuePropName='fileListMain'
                    getValueFromEvent={(e) => e && e.fileList}
                    className='flex text-left'
                    rules={[
                      {
                        required: true,
                        message: 'Please upload at least one main image!',
                        validator: () => {
                          if (fileListMain && fileListMain.length === 0) {
                            return Promise.reject(new Error('Please upload at least one main image'))
                          }
                          return Promise.resolve()
                        },
                      },
                    ]}
                  >
                    <Upload
                      listType='picture-card'
                      fileList={fileListMain}
                      onPreview={handlePreviewMain}
                      onChange={handleChangeMain}
                      beforeUpload={() => false}
                      onRemove={(file) => {
                        // Gọi hàm tùy chỉnh để set lại state
                        handleRemoveFile(file)
                      }}
                    >
                      {fileListMain.length || imagesMain.length === 1 ? null : uploadButton}
                    </Upload>
                  </Form.Item>

                  {previewImageMain && (
                    <Image
                      wrapperStyle={{
                        display: 'none',
                      }}
                      preview={{
                        visible: previewOpenMain,
                        onVisibleChange: (visible) => setPreviewOpenMain(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImageMain(''),
                      }}
                      src={previewImageMain}
                    />
                  )}
                </div>
              </div>

              <div className='mt-10'>
                <div className='flex items-center justify-end gap-6'>
                  <button
                    className='bg-[#EFEFEF] text-[#3B3B3B] h-11 rounded-lg w-[340px] font-semibold text-normal flex items-center justify-center'
                    onClick={() => navigate('/admin/manager-product')}
                  >
                    Cancel
                  </button>

                  <button
                    className='bg-[#5B4DFB] text-white h-11 rounded-lg w-[340px] font-semibold text-normal flex items-center justify-center'
                    type='submit'
                    onClick={handleSubmit}
                    disabled={
                      fileListMain.length === 0 && !form.isFieldsTouched(false)
                      // form.getFieldsError().some(({ errors }) => errors.length > 0)
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </Form>
          ) : (
            <>
              <Loading />
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
