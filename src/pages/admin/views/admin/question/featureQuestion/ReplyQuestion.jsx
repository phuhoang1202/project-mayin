import React, { useEffect, useState } from 'react'
import Card from '@pages/admin/components/card'
import IconBack from '@assets/images/IconBack.svg'
import Loading from '@components/loadingCommon/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { question } from '@services/admin/question'
import { Toast } from '@utils/toast'
import { constants as c } from '@constants'
import { Image, Input, Modal, Form, Button } from 'antd'
const { TextArea } = Input

export default function ReplyQuestion() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param
  const [dataQuestion, setSataQuestion] = useState([])
  const [textReply, setTextReply] = useState('')
  const [form] = Form.useForm()

  const fetchQuestionId = async () => {
    try {
      setLoading(true)
      const response = await question.getQuestionId(id)
      setSataQuestion(response.data)
    } catch (error) {
      Toast.error('Data fetch failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestionId()
  }, [])

  const handleDeleteQuestion = async () => {
    try {
      setLoading(true)
      await question.deleteQuestionId(id)
      Toast.success('Delete successful !')
      navigate('/admin/manager-question')
    } catch (error) {
      Toast.error('Delete failed !')
    } finally {
      setLoading(false)
    }
  }

  const showDeleteModal = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      okText: 'Yes, delete it',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => handleDeleteQuestion(),
    })
  }

  const handleReply = async () => {
    try {
      setLoading(true)
      const payload = {
        consultationId: id,
        content: textReply,
      }
      await question.replyMessage(payload)
      Toast.success('Reply successful !')
      navigate('/admin/manager-question')
    } catch (error) {
      Toast.error('Reply failed !')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card extra={'w-full h-[87vh] overflow-y-auto p-4'}>
        <div
          className='sticky lg:top-0 top-4 lg:ml-8 ml-2 cursor-pointer z-30'
          onClick={() => navigate('/admin/manager-question')}
        >
          <img src={IconBack} alt='icon' />
        </div>
        {loading && <Loading />}

        <div className='lg:mx-32 md:mx-20 sm:mx-14 mx-10'>
          <div className='flex items-center justify-between'>
            <h3 className='font-bold text-largerPrdName'>Reply Question</h3>
            <button className='h-11 bg-[#EFEFEF] min-w-40 rounded-lg font-medium' onClick={showDeleteModal}>
              Delete
            </button>
          </div>

          <div className='bg-[#FAF9FF] rounded-lg mt-4 p-4 flex gap-4'>
            <div className='w-[60px] h-[60px]'>
              <img
                src={`${c.DOMAIN_IMG}${dataQuestion.urlImageSender}`}
                alt='image'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div className='flex flex-col font-medium text-small text-[#8C8C8C]'>
              <div className='font-bold text-normal text-[#3B3B3B]'>진선미</div>
              <div>회원등급</div>
              <div>ID: {dataQuestion.senderId}</div>
              <div>Email: Hong@gmail.com</div>
            </div>
          </div>

          <div className='mt-4'>
            <h4 className='font-semibold'>Question content</h4>
            {dataQuestion.subject && (
              <div className='mt-4 bg-[#F8F8F8] p-4 rounded-lg flex flex-col gap-4'>
                <div>
                  <div className='font-semibold'>Title:</div>
                  <div className='bg-white p-4 rounded-lg mt-2'>{dataQuestion.subject}</div>
                </div>

                <div>
                  <div className='font-semibold'>Messages:</div>
                  <div className='bg-white p-4 rounded-lg mt-2'>{dataQuestion.messages[0].content}</div>
                </div>
                {dataQuestion?.messages[0]?.consultationImages.map((img, index) => {
                  return (
                    <div>
                      <div className='font-semibold'>Image:</div>
                      <div className='flex lg:flex-row flex-wrap items-center gap-4'>
                        <div key={index} className='w-40 h-40 '>
                          <Image
                            src={`${c.DOMAIN_IMG}${img.imageUrl}`}
                            alt='img'
                            height={150}
                            width={150}
                            className='object-cover rounded-lg'
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className='mt-4'>
            <h4 className='font-semibold'>Admin Reply</h4>
            <div className='mt-2'>
              <Form form={form} layout='vertical' onFinish={handleReply}>
                <Form.Item name='textReply' rules={[{ required: true, message: 'Please enter your reply!' }]}>
                  <TextArea
                    rows={4}
                    placeholder='Enter your reply here'
                    value={textReply}
                    onChange={(e) => {
                      setTextReply(e.target.value)
                    }}
                  />
                </Form.Item>

                <div className='flex items-center mt-4 justify-end gap-4'>
                  <Button type='default' className='h-11 min-w-56 font-semibold' onClick={() => form.resetFields()}>
                    Cancel
                  </Button>

                  <button htmlType='submit' className='h-11 min-w-56 text-white bg-[#5B4DFB] rounded-lg font-semibold'>
                    Reply
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
