import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import IconBack from '@assets/images/IconBack.svg'
import Card from '@pages/admin/components/card'
import { getDetailUsers } from '@services/admin/member'
import { Toast } from '@utils/toast'
import moment from 'moment'
import Loading from '@components/loadingCommon/Loading'

export default function DetailMember() {
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param
  const [dataInput, setDataInput] = useState({})
  const [loading, setLoading] = useState(false)

  const getDataUser = async () => {
    try {
      if (id) {
        setLoading(true)
        const response = await getDetailUsers(id)
        setDataInput(response.data)
        // Toast.success('Get member data successfully!')
      }
    } catch (error) {
      Toast.error('get member data failed!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDataUser()
  }, [])

  return (
    <Card extra={'w-full h-[84vh]'}>
      {loading && <Loading />}
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate(-1)}>
        <img src={IconBack} alt='icon' />
      </div>

      <div className='mt-20 lg:mx-20 mx-10 bg-[#F8F8F8] rounded-lg p-8 flex lg:flex-row flex-col lg:gap-40 gap-0'>
        <div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Member Key:</div>
            <div className='font-normal'>{dataInput.email}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>ID:</div>
            <div className='font-normal'>{dataInput.id}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Name:</div>
            <div className='font-normal'>{dataInput.name}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Birthdate:</div>
            <div className='font-normal'>{moment(dataInput.birthday).format('YYYY-MM-DD hh:mm:ss')}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Phone Number:</div>
            <div className='font-normal'>{dataInput.phoneNumber}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Gender:</div>
            <div className='font-normal'>{dataInput.gender}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Number Of Purchases:</div>
            <div className='font-normal capitalize'>{dataInput.numberOfPurchases || 0}</div>
          </div>
        </div>
        <div>
          <div className='flex  items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Total purchase price:</div>
            <div className='font-normal capitalize'>{dataInput.totalPurchasePrice || 0}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Last time Of Purchase:</div>
            <div className='font-normal capitalize'>{dataInput.lastTimeOfPurchase}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Join Date:</div>
            <div className='font-normal capitalize'>{moment(dataInput.createdDate).format('YYYY-MM-DD hh:mm:ss')}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>TYC Point:</div>
            <div className='font-normal capitalize'>{dataInput.tycPoint}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Coupon:</div>
            <div className='font-normal capitalize'>{dataInput.coupon || 0}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-[#3B3B3B]'>Status:</div>
            <div className='font-normal capitalize'>{dataInput.enabled ? 'True' : 'False'}</div>
          </div>
        </div>
      </div>

      <div className='flex justify-end mx-20 mt-10'>
        <button
          className='h-11 border px-2 rounded-lg min-w-40 bg-[#5B4DFB] font-semibold text-white'
          onClick={() => navigate('/admin/manager-member')}
        >
          Back
        </button>
      </div>
    </Card>
  )
}
