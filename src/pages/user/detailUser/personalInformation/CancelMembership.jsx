import Loading from '@components/loadingCommon/Loading'
import { updateEnable } from '@services/admin/member'
import { getUserInfor } from '@utils/auth'
import { Toast } from '@utils/toast'
import { Checkbox, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const { TextArea } = Input

export default function CancelMembership() {
  let getInfonUser = null

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

  const checkboxes = [
    '원하는 상품이 부족해서',
    '상품 업데이트가 안되어서',
    '서비스 속도가 느려서',
    '접속불량이 싫어서',
    '아이디를 변경하기 위해서',
    '이용방법이 어려워서',
    '불친절하므로',
    '다른',
  ]

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
  const [loading, setLoading] = useState(false)
  const navagate = useNavigate()

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedCheckboxes((prev) => [...prev, value])
    } else {
      setSelectedCheckboxes((prev) => prev.filter((item) => item !== value))
    }
  }

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  const [confirmLoading1, setConfirmLoading1] = useState(false)
  const [confirmLoading2, setConfirmLoading2] = useState(false)

  const showModal1 = () => {
    setOpen1(true)
  }

  const handleOk1 = async () => {
    try {
      setLoading(true)
      setConfirmLoading1(true)
      const bodyPayload = {
        enable: true,
        reason: selectedCheckboxes.toString(),
        userId: getInfonUser.id,
      }

      const response = await updateEnable(bodyPayload)
      console.log(response.data.data)

      if (response.data.data === false) {
        setOpen2(true)
        setOpen1(false)
      } else {
        Toast.success('You have successfully left your membership, thank you for using our service !')
        setTimeout(() => {
          setOpen1(false)
          setConfirmLoading1(false)
        }, 2000)
      }
    } catch (error) {
      setOpen2(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel1 = () => {
    setOpen1(false)
  }

  const showModal2 = () => {
    setOpen2(true)
  }

  const handleOk2 = () => {
    setConfirmLoading2(true)
    setTimeout(() => {
      setOpen2(false)
      setConfirmLoading2(false)
    }, 2000)
  }

  const handleCancel2 = () => {
    console.log('Clicked cancel button')
    setOpen2(false)
  }

  const isDeactivationButtonDisabled = selectedCheckboxes.length === 0

  return (
    <div>
      {loading && <Loading />}
      <div className='flex flex-col gap-2'>
        <h3 className='font-bold'>회원탈퇴 안내문</h3>
        <div className='flex flex-col gap-2 font-medium text-small'>
          <p>
            탈퇴하면 보유하고 계신 혜택이 모두 사라집니다. (쿠폰, 포인트, 회원 등급 등) 본 서비스의 거래내역과 정보도
            모두 사라집니다. 사라진 정보들은 재가입 후에도 복구되지 않습니다.
          </p>
          <p className='text-[#F14646]'>*배송이 되지 않은 상품이나 미수금이 있는 경우 회원탈퇴가 불가능 합니다.</p>
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='font-bold'>탈퇴 사유 (중복 체크 가능)</h3>
        <div className='flex flex-col gap-4 mt-4'>
          {checkboxes.map((checkboxText, index) => (
            <Checkbox key={index} value={checkboxText} onChange={handleCheckboxChange}>
              {checkboxText}
            </Checkbox>
          ))}

          {selectedCheckboxes.includes('다른') && <TextArea rows={4} placeholder='텍스트 기재란' />}
        </div>

        <div className='flex items-center lg:gap-8 gap-4 mt-4'>
          <button className='h-11 bg-[#D1B584] text-white rounded-lg px-2 w-full' onClick={() => navagate('/')}>
            다시 서비스를 이용하기
          </button>
          <button
            className={`${
              isDeactivationButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
            } h-11 rounded-lg px-2 w-full`}
            style={{ border: '2px solid black' }}
            onClick={showModal1}
            disabled={isDeactivationButtonDisabled}
          >
            탈퇴하기
          </button>
        </div>
      </div>

      <Modal
        title={false}
        footer={false}
        centered
        open={open1}
        onOk={handleOk1}
        confirmLoading={confirmLoading1}
        onCancel={handleCancel1}
      >
        <div className='flex flex-col justify-center mt-8 gap-8'>
          <p className='font-medium text-center'>
            탈퇴하면 보유하고 계신 혜택이 모두 사라집니다. (쿠폰, 포인트, 회원 등급 등) 본 서비스의 거래내역과 정보도
            모두 사라집니다. 사라진 정보들은 재가입 후에도 복구되지 않습니다.
          </p>

          <p className='text-[#F14646] text-center'>*배송이 되지 않은 상품이나 미수금이 있는 경우 회원탈퇴 불가</p>

          <div className='flex items-center lg:gap-8 gap-4 mt-4'>
            <button className='h-11 bg-[#D1B584] text-white rounded-lg px-2 w-full' onClick={handleCancel1}>
              다시 서비스를 이용하기
            </button>
            <button
              className='h-11 rounded-lg px-2 w-full max-w-[187px]'
              style={{ border: '2px solid black' }}
              onClick={handleOk1}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title={false}
        footer={false}
        centered
        open={open2}
        width={430}
        onOk={handleOk2}
        confirmLoading={confirmLoading2}
        onCancel={handleCancel2}
      >
        <div className='flex flex-col justify-center mt-8 gap-8'>
          <p className='font-medium text-center'>
            현재 배송이 되지 않은 상품이 있거나 회원이 지급하지 않은 미수금이 있습니다.
          </p>
          <p className='font-medium text-center'>회원탈퇴가 불가하오니 확인을 부탁드립니다.</p>

          <div className='mt-4'>
            <button className='h-11 bg-[#D1B584] text-white rounded-lg px-2 w-full' onClick={handleCancel2}>
              확인
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
