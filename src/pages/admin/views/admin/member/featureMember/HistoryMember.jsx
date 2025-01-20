import Card from '@pages/admin/components/card'
import React, { useEffect, useState } from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import IconBack from '@assets/images/IconBack.svg'
import IconSearch from '@assets/icons/admin/IconSearch.svg'
import { Select, Input, Tabs } from 'antd'
import TransactionHistory from './tableHistory/TransactionHistory'
import TYCPoints from './tableHistory/TYCPoints'
import CouponHistory from './tableHistory/CouponHistory'
import { useNavigate, useParams } from 'react-router-dom'

export default function HistoryMember() {
  const [activeTabKey, setActiveTabKey] = useState('1')
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  // Tabs
  const items = [
    {
      key: '1',
      label: (
        <div
          className={`${
            activeTabKey === '1' ? 'text-[#5B4DFB] bg-[#EFEEFF] font-semibold' : 'text-[#8C8C8C] font-medium'
          }  text-primaryPrdName px-8 py-1 rounded-full`}
        >
          거래내역
        </div>
      ),
      children: <TransactionHistory id={id} />,
    },
    {
      key: '2',
      label: (
        <div
          className={`${
            activeTabKey === '2' ? 'text-[#5B4DFB] bg-[#EFEEFF] font-semibold' : 'text-[#8C8C8C] font-medium'
          }  text-primaryPrdName px-8 py-1 rounded-full`}
        >
          TYC 포인트
        </div>
      ),
      children: <TYCPoints id={id} />,
    },
    {
      key: '3',
      label: (
        <div
          className={`${
            activeTabKey === '3' ? 'text-[#5B4DFB] bg-[#EFEEFF] font-semibold' : 'text-[#8C8C8C] font-medium'
          }  text-primaryPrdName px-8 py-1 rounded-full`}
        >
          쿠폰
        </div>
      ),
      children: <CouponHistory id={id} />,
    },
  ]

  const onChangeTab = (key) => {
    setActiveTabKey(key)
  }

  return (
    <Card extra={'w-full h-full'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate(-1)}>
        <img src={IconBack} alt='icon' />
      </div>

      <div className='h-full mt-8 mb-20'>
        <div className='mx-4'>
          <div className='flex justify-end ml-20'>
            <div className='flex items-center gap-4 '>
              <div className='flex flex-col md:flex-row items-center w-full md:w-auto relative'>
                <Input placeholder='찾다' onKeyDown={handleKeyPress} className='lg:w-[400px] w-full h-9' />
                <img
                  src={IconSearch}
                  alt='icon'
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                />
              </div>

              <div>
                <Select
                  labelInValue
                  defaultValue={{ value: '표시하다', label: '표시하다' }}
                  style={{ width: 147, height: 36 }}
                  options={[
                    { value: 'jack', label: 'Jack (100)' },
                    { value: '표시하다', label: '표시하다' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <Tabs defaultActiveKey='1' items={items} className='custom-tabs-history' onChange={onChangeTab} />
          </div>
        </div>
      </div>
    </Card>
  )
}
