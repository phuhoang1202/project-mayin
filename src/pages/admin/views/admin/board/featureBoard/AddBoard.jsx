import React, { useEffect, useState } from 'react'
import Card from '@pages/admin/components/card'
import IconAsterisk from '@assets/images/admin/IconAsterisk.svg'
import { Form, Input, Image, Upload, Select, message, Radio } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { PlusOutlined } from '@ant-design/icons'
import IconBack from '@assets/images/IconBack.svg'
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

export default function AddBoard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  // validate
  const [form] = Form.useForm()

  // image state
  const [images, setImages] = useState([])
  const [previewImage, setPreviewImage] = useState([])
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)

  // Update img main
  let isPathMain = ''
  const [imagesMain, setImagesMain] = useState('')
  const [fileListMain, setFileListMain] = useState([])
  const [previewImageMain, setPreviewImageMain] = useState([])
  const [previewOpenMain, setPreviewOpenMain] = useState(false)

  // CKEditor
  const [editorData, setEditorData] = useState()
  const [temporaryUploads, setTemporaryUploads] = useState([])

  const [dataInput, setDataInput] = useState({
    type: 'notification',
    title: '',
    status: 'draft',
  })

  const { title, status } = dataInput

  // CKEditor
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

    const uploadPromises = temporaryUploads.map(async (upload, index) => {
      const formData = new FormData()
      formData.append('file', upload.file)
      formData.append('position', index + 1)
      formData.append('newsId', newsId)
      formData.append('list', [])

      // Call API
      return await board.uploadBoardImgsDetail(formData).then((res) => {
        const urlImg = `${c.DOMAIN_IMG}${res.data.url}`
        contentCopy = contentCopy.replace(upload.url, urlImg)
        return urlImg
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

  const handleUploadImage = async (newsId) => {
    const formData = new FormData()
    const arrMerge = [...images, ...imagesMain]

    arrMerge.forEach((file) => {
      formData.append('files', file)
    })

    formData.append('newsId', newsId)
    formData.append('list', [])
    formData.append('isMain', isPathMain)

    try {
      await board.updateImageBoard(formData)
    } catch (error) {
      message.error('Upload failed')
    }
  }

  // Update img main ***************
  const handlePreviewMain = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImageMain(file.url || file.preview)
    setPreviewOpenMain(true)
  }

  const handleChangeMain = ({ fileList: newFileListMain }) => {
    setFileListMain(newFileListMain)
    const newImages = newFileListMain.map((file) => file.originFileObj)
    setImagesMain(newImages)
  }

  const handleUploadImageMain = async (newsId) => {
    let nameImg = ''
    if (imagesMain && imagesMain.length > 0) {
      nameImg = imagesMain[0]?.name?.substring(0, imagesMain[0]?.name?.lastIndexOf('.'))
      console.log(nameImg)

      isPathMain = `news/${newsId}/${nameImg}.jpeg`
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

      const newsId = res.data.id

      // Gọi tiếp hàm xử lý mô tả và đợi phản hồi
      await handleSubmitDescription(newsId)

      await handleUploadImageMain(newsId)
      // Kiểm tra và tải lên hình ảnh nếu cần thiết
      await handleUploadImage(newsId)
      Toast.success('Board created successfully!')
      setDataInput({
        type: '',
        title: '',
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
    <Card extra={'w-full h-[85vh] overflow-y-auto'}>
      <div
        className='sticky lg:top-8 top-4 lg:ml-8 ml-2 cursor-pointer z-30'
        onClick={() => navigate('/admin/manager-board')}
      >
        <img src={IconBack} alt='icon' />
      </div>
      {loading && <Loading />}
      <div className='flex flex-col gap-8  lg:px-40 md:px-20 sm:px-14 py-10'>
        <div>
          <Form onFinish={handleSubmit}>
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

              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                  Content <img src={IconAsterisk} alt='icon' />
                </label>
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
                      // required: true,
                      // message: 'Please upload at least one image!',
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

            <div className='mt-8'>
              <div className='font-semibold text-normal text-[#3B3B3B]'>
                Image Main: (JPG, JPEG, PNG) (건당 30MB 이내)
              </div>
              <div className='mt-1'>
                <Form.Item
                  name='imagesMain'
                  valuePropName='fileList'
                  getValueFromEvent={(e) => e && e.fileList}
                  className='flex text-left'
                  // rules={[
                  //   {
                  //     // required: true,
                  //     // message: 'Please upload at least one main image!',
                  //     validator: (_, value) => {
                  //       const hasSVGFile = value.some((file) => file.name.toLowerCase().endsWith('.svg'))

                  //       if (hasSVGFile) {
                  //         return Promise.reject(new Error('SVG files are not allowed'))
                  //       }

                  //       if (!value || value.length === 0) {
                  //         return Promise.reject(new Error('Please upload at least one main image'))
                  //       }
                  //       return Promise.resolve()
                  //     },
                  //   },
                  // ]}
                >
                  <Upload
                    listType='picture-card'
                    fileList={fileListMain}
                    multiple
                    onPreview={handlePreviewMain}
                    onChange={handleChangeMain}
                    beforeUpload={() => false}
                    maxCount={6}
                  >
                    {fileListMain.length == 1 ? null : uploadButton}
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
