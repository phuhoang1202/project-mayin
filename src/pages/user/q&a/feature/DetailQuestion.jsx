import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { constants as c } from '@constants'
import ImageError from '@assets/images/ImageError.svg'
import Loading from '@components/loadingCommon/Loading'
import { question } from '@services/user/question'
import { Toast } from '@utils/toast'
import { Image } from 'antd'
import moment from 'moment'

export default function DetailQuestion() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param

  const [dataQuesiton, setDataQuesiton] = useState({})
  const [listImage, setListImage] = useState([])

  const fetchQuestion = async () => {
    try {
      setLoading(true)
      const response = await question.getQuestion(id)
      setDataQuesiton(response.data)
      setListImage(response.data?.messages[0]?.consultationImages)
      //   Toast.success('데이터를 성공적으로 검색했습니다.')
    } catch (error) {
      Toast.error('데이터 검색 실패')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  return (
    <div className='w-full'>
      {loading && <Loading />}

      <div>
        <h3 className='font-medium'>궁금하신 사항에 대해 1:1 문의를 할 수 있습니다.</h3>
      </div>

      {dataQuesiton.subject ? (
        <div className='mt-4 bg-[#F8F8F8] p-8'>
          <div className='bg-white p-4 rounded-lg flex gap-4'>
            {/* Avatar */}
            <div className='w-12 h-12'>
              <img
                src={`${c.DOMAIN_IMG}${dataQuesiton.urlImageSender}`}
                alt='image'
                className='w-full h-full object-cover rounded-full'
              />
            </div>

            {/* Content */}
            <div className='flex flex-col gap-2 flex-1'>
              <h3 className='font-semibold truncate'>{dataQuesiton?.subject}</h3>
              <p className='font-medium text-[#707070]'>{dataQuesiton?.messages[0]?.content}</p>
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
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className='text-[#8C8C8C] text-small font-medium'>
                {moment(dataQuesiton?.messages[0]?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
              </div>
            </div>
          </div>

          {dataQuesiton?.messages && dataQuesiton?.messages.length > 1 && (
            <div className='bg-[#F7F7F1] rounded-lg mt-8 flex flex-row-reverse gap-4 p-4'>
              <div className='w-12 h-12'>
                <img
                  src={`${c.DOMAIN_IMG}${dataQuesiton.urlImageRecipient}`}
                  alt='image'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>

              <div className='flex flex-col items-end gap-2 flex-1'>
                <h3 className='font-semibold text-[#B5955E]'>답변 제목</h3>
                <p className='font-medium text-[#707070] text-end'>{dataQuesiton?.messages[1]?.content}</p>
                <div className='text-[#8C8C8C] text-small font-medium'>
                  {moment(dataQuesiton?.messages[1]?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}

      <div className='flex justify-end mt-8'>
        <button className='font-semibold bg-[#D3D2D2] rounded-lg px-4 w-40 h-11' onClick={() => navigate(-1)}>
          이전
        </button>
      </div>
    </div>
  )
}
