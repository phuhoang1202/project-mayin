import Loading from '@components/loadingCommon/Loading'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Image, Input, message, Upload } from 'antd'
import { question } from '@services/user/question'
import { getUserInfor } from '@utils/auth'
import { PlusOutlined } from '@ant-design/icons'
const { TextArea } = Input

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default function AddQuestion() {
  const [loading, setLoading] = useState(false)
  let getInfonUser = null
  const navigate = useNavigate()
  // image state
  const [images, setImages] = useState([])
  const [previewImage, setPreviewImage] = useState([])
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)

  const [dataInput, setDataInput] = useState({
    title: '',
    content: '',
  })

  const { title, content } = dataInput

  try {
    const userInfo = getUserInfor()
    if (userInfo) {
      getInfonUser = JSON.parse(userInfo)
    } else {
      getInfonUser = {}
    }
  } catch (error) {
    console.error('Error parsing user information:', error)
    getInfonUser = {}
  }

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

  const handleUploadImage = async (questionId) => {
    const formData = new FormData()
    formData.append('messageConsultationId', questionId)
    images.forEach((file) => {
      formData.append('files', file)
    })

    try {
      await question.uploadQuestionImgs(formData)
    } catch (error) {
      message.error('Upload failed')
    }
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setDataInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateQuestion = async () => {
    try {
      setLoading(true)
      const bodyPayload = {
        isPrivate: true,
        messageConsultationReqs: [
          {
            content: content,
            senderId: getInfonUser.id,
          },
        ],
        subject: title,
      }

      const response = await question.createQuestion(bodyPayload)
      navigate('/menu/question')
      const questionId = response.data.messages[0].id

      if (images && images.length > 0) {
        await handleUploadImage(questionId)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full'>
      {loading && <Loading />}

      <div>
        <h3 className='font-medium'>궁금하신 사항에 대해 1:1 문의를 할 수 있습니다.</h3>
      </div>

      <div className='mt-6'>
        <div className='flex items-center gap-1'>
          <div className='font-semibold'>작성자:</div>
          <div className='text-[#8C8C8C] font-medium'>{getInfonUser?.name}</div>
        </div>

        <div className='flex items-center gap-1'>
          <div className='font-semibold'>Email:</div>
          <div className='text-[#8C8C8C] font-medium'>{getInfonUser?.email}</div>
        </div>

        {getInfonUser?.phoneNumber && (
          <div className='flex items-center gap-1'>
            <div className='font-semibold'>Tel:</div>
            <div className='text-[#8C8C8C] font-medium'>{getInfonUser?.email}</div>
          </div>
        )}
      </div>

      <Form className='mt-6 bg-[#F8F8F8] p-4 rounded-lg' onFinish={handleCreateQuestion}>
        <div className='flex flex-col gap-2'>
          <div>
            <label className='font-medium'>제목</label>
            <Form.Item
              name='title'
              rules={[
                { required: true, message: 'Please enter the title.' },
                { max: 50, message: 'Title must be 50 characters or less.' },
              ]}
            >
              <TextArea
                rows={2}
                placeholder='제목 내용(최대 50자)'
                maxLength={50}
                name='title'
                value={title}
                onChange={handleChangeInput}
              />
            </Form.Item>
          </div>

          <div>
            <label className='font-medium'>콘텐츠</label>
            <Form.Item
              name='content'
              rules={[
                { required: true, message: 'Please enter the content.' },
                { max: 100, message: 'Content must be 100 characters or less.' },
              ]}
            >
              <TextArea
                rows={6}
                placeholder='제목 내용(최대 100자)'
                maxLength={100}
                name='content'
                value={content}
                onChange={handleChangeInput}
              />
            </Form.Item>
          </div>

          <div>
            <label className='font-medium'>첨부파일: (JPG, JPEG, PNG) (건당 30MB 이내) (3장까지 가능)</label>
            <div className='mt-1'>
              <Form.Item
                name='images'
                valuePropName='fileList'
                getValueFromEvent={(e) => e && e.fileList}
                className='flex text-left'
                // rules={[
                //   {
                //     validator: (_, value) => {
                //       const hasSVGFile = value.some((file) => file.name.toLowerCase().endsWith('.svg'))

                //       if (hasSVGFile) {
                //         return Promise.reject(new Error('SVG files are not allowed'))
                //       }

                //       if (!value || value.length === 0) {
                //         return Promise.reject(new Error('Please upload at least one image'))
                //       }
                //       // Check if any file has a .svg extension

                //       return Promise.resolve()
                //     },
                //   },
                // ]}
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
        </div>

        <div className='mt-2 flex justify-end gap-4'>
          <button className='font-semibold bg-[#D3D2D2] px-2 min-w-44 h-11 rounded-lg' onClick={() => navigate(-1)}>
            이전
          </button>
          <button className='font-semibold text-white bg-[#D1B584] px-2 min-w-44 h-11 rounded-lg' type='submit'>
            등록하기
          </button>
        </div>
      </Form>
    </div>
  )
}
