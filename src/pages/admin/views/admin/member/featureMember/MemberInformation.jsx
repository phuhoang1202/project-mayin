import Card from '@pages/admin/components/card'
import React, { useEffect, useState } from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import { Form, Input, Select, Radio, DatePicker, Modal, Tabs } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import IconBack from '@assets/images/IconBack.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailUsers, resetPassword, updateBalance, updateUsers } from '@services/admin/member'
import Loading from '@components/loadingCommon/Loading'
import moment from 'moment'
import { Toast } from '@utils/toast'

export default function MemberInformation() {
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param
  const [openModal, setOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [numberPoint, setNumberPoint] = useState(0)

  const [dataInput, setDataInput] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    phoneNumber: '',
    state: '',
    numberOfPurchases: '',
    totalPurchasePrice: '',
    lastTimeOfPurchase: '',
    createdDate: '',
    coupon: 0,
    balance: '',
    tycPoint: '',
    enabled: '',
  })

  const {
    name,
    email,
    password,
    gender,
    birthday,
    phoneNumber,
    state,
    numberOfPurchases,
    totalPurchasePrice,
    lastTimeOfPurchase,
    createdDate,
    coupon,
    balance,
    tycPoint,
    enabled,
  } = dataInput

  const getDataUser = async () => {
    try {
      if (id) {
        const response = await getDetailUsers(id)
        const userData = response.data
        setDataInput({
          ...userData,
          name: userData.name,
          email: userData.email,
          password: userData.password || '',
          gender: userData.gender || 'male',
          birthday: userData.birthday ? moment(userData.birthday) : null,
          phoneNumber: userData.phoneNumber || '',
          state: userData.state || 'kr',
          numberOfPurchases: userData.numberOfPurchases || 0,
          totalPurchasePrice: userData.totalPurchasePrice || 0,
          lastTimeOfPurchase: userData.lastTimeOfPurchase || 0,
          createdDate: userData.createdDate,
          tycPoint: userData.tycPoint,
          enabled: userData.enabled,
        })
      }
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    getDataUser()
  }, [])

  const handleDateChange = (date, dateString) => {
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      birthday: dateString,
    }))
  }

  const handleChangePoint = async (type) => {
    try {
      const payload = {
        balance: Number(numberPoint),
        transactionType: type,
        userId: Number(id),
      }
      await updateBalance(payload)
      getDataUser()
      Toast.success('Change point successful!')
      setOpenModal(false)
    } catch (error) {
      Toast.success('change point failed!')
    }
  }

  const handleChangeInput = (e) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? Number(value) : value

    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      [name]: parsedValue,
    }))
  }

  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...dataInput,
        birthday: dataInput.birthday ? moment(dataInput.birthday, 'YYYY-MM-DD').toISOString() : null,
      }

      await updateUsers(formattedData)
      Toast.success('Member update successfully!')
      navigate(`/admin/manager-member`)
    } catch (error) {
      console.log('Failed to Member update')
    }
  }

  const handleCancel = () => {
    setOpenModal(false)
  }

  const handleResetPassword = async () => {
    try {
      await resetPassword(id)
      Toast.success('Password reset successful')
    } catch (error) {
      Toast.success('Reset password failed')
    }
  }

  const showModalConfirm = () => {
    Modal.confirm({
      title: 'Reset Password?',
      content: 'Are you sure you want to reset your password?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      // okType: 'danger',
      onOk: () => handleResetPassword(),
    })
  }

  // Tabs
  const items = [
    {
      key: '1',
      label: <div>지급하기</div>,
      children: (
        <div>
          <label className='font-medium'>지급</label>
          <div className='relative'>
            <input
              type='text'
              value={numberPoint}
              onChange={(e) => setNumberPoint(e.target.value)}
              className='h-11 border rounded-lg w-full bg-[#EFEFEF] px-4'
              placeholder='1000'
            />
            <button
              className='bg-[#5B4DFB] h-11 rounded-r-lg min-w-24 absolute right-0 font-medium text-white'
              onClick={() => handleChangePoint('cashIn')}
            >
              적용
            </button>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: <div>차감하기</div>,
      children: (
        <div>
          <label className='font-medium'>차감</label>
          <div className='relative'>
            <input
              type='text'
              value={numberPoint}
              onChange={(e) => setNumberPoint(e.target.value)}
              className='h-11 border rounded-lg w-full bg-[#EFEFEF] px-4'
              placeholder='1000'
            />
            <button
              className='bg-[#5B4DFB] h-11 rounded-r-lg min-w-24 absolute right-0 font-medium text-white'
              onClick={() => handleChangePoint('cashOut')}
            >
              적용
            </button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Card extra={'w-full h-full'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate(-1)}>
        <img src={IconBack} alt='icon' />
      </div>
      <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-10 mb-8 relative'>
        <div className='lg:mx-32 mx-20'>
          <div className='mt-10'>
            {dataInput?.email ? (
              <Form
                initialValues={{
                  name,
                  email,
                  password,
                  gender,
                  birthday,
                  phoneNumber,
                  state,
                  numberOfPurchases,
                  totalPurchasePrice,
                  lastTimeOfPurchase,
                  createdDate,
                  coupon,
                  enabled,
                  balance,
                }}
              >
                {/* Row 1 */}
                <div className='flex lg:flex-row flex-col gap-6 items-center justify-between'>
                  <div className='flex flex-col gap-1 w-full lg:flex-1'>
                    <label htmlFor='email' className='text-[#3B3B3B] font-medium text-normal'>
                      Member Key
                    </label>
                    <Form.Item name='email'>
                      <Input
                        id='email'
                        placeholder='진선미@naver.com'
                        className='border px-2 rounded-lg h-11 bg-[#EFEFEF]'
                        disabled
                      />
                    </Form.Item>
                  </div>

                  <div className='w-full lg:flex-1 flex items-center gap-4'>
                    <div className='flex flex-col gap-1 w-full lg:flex-1'>
                      <label htmlFor='password' className='text-[#3B3B3B] font-medium text-normal'>
                        Password Fix
                      </label>

                      <Form.Item
                        name='password'
                        rules={[
                          { required: true, message: 'Password is required!' },
                          {
                            min: 8,
                            message: 'Password must be at least 8 characters long!',
                          },
                          {
                            pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
                            message: 'Password must contain at least one uppercase letter and one number!',
                          },
                        ]}
                      >
                        <Input.Password
                          id='password'
                          placeholder='비밀번호'
                          className='border px-2 rounded-lg h-11'
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <button
                        className='bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'
                        // onClick={handleResetPassword}
                        onClick={() => showModalConfirm()}
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className='flex lg:flex-row flex-col gap-6 mt-4 items-center justify-between'>
                  <div className='flex flex-col gap-1 w-full lg:flex-1'>
                    <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                      이름
                    </label>
                    <Form.Item name='name' rules={[{ required: true, message: 'Name is required!' }]}>
                      <Input
                        id='name'
                        value={name}
                        name='name'
                        onChange={handleChangeInput}
                        placeholder='홍길동'
                        className='border px-2 rounded-lg h-11'
                        style={{ border: '1px solid #EFEFEF' }}
                      />
                    </Form.Item>
                  </div>

                  <div className='flex flex-col gap-1 w-full lg:flex-1'>
                    <label htmlFor='birthday' className='text-[#3B3B3B] font-medium text-normal'>
                      생년월일
                    </label>

                    <Form.Item name='birthday' rules={[{ required: true, message: 'Birthday is required!' }]}>
                      <DatePicker
                        id='birthday'
                        name='birthday'
                        value={birthday ? moment(birthday, 'YYYY-MM-DD') : null}
                        onChange={handleDateChange}
                        format='YYYY-MM-DD'
                        placeholder='yyyy-mm-dd'
                        className='border px-2 rounded-lg h-11 w-full'
                      />
                    </Form.Item>
                  </div>

                  <div className='flex flex-col gap-1 w-full lg:flex-1'>
                    {/* Nation */}
                    <label htmlFor='nation' className='text-[#3B3B3B] font-medium text-normal'>
                      Nation
                    </label>
                    <Form.Item name='state' rules={[{ required: true, message: 'Nation is required!' }]}>
                      <Select
                        placeholder='Korea'
                        className='h-11'
                        options={[
                          { value: 'kr', label: 'Korea' },
                          { value: 'cn', label: 'China' },
                          { value: 'jp', label: 'Japan' },
                          { value: 'vn', label: 'Việt Nam' },
                          { value: 'us', label: 'Global' },
                        ]}
                        value={state}
                        name='state'
                        onChange={(value) => {
                          handleChangeInput({ target: { name: 'state', value } })
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Row 3 */}
                <div className='flex gap-6 mt-4'>
                  <div className='flex flex-col gap-1 w-full lg:flex-1'>
                    <label htmlFor='phoneNumber' className='text-[#3B3B3B] font-medium text-normal'>
                      전화번호
                    </label>
                    <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Phone number is required!' }]}>
                      <Input
                        id='phoneNumber'
                        value={phoneNumber || 0}
                        name='phoneNumber'
                        onChange={handleChangeInput}
                        placeholder='01012345678'
                        className='h-11 w-full border rounded-lg px-2'
                      />
                    </Form.Item>
                  </div>

                  <div className='flex flex-col gap-1 w-full lg:flex-1'>
                    <label htmlFor='gender' className='text-[#3B3B3B] font-medium text-normal'>
                      성별
                    </label>
                    <Form.Item name='gender' rules={[{ required: true, message: '성별을 선택해주세요!' }]}>
                      <Radio.Group name='gender' value={gender} onChange={handleChangeInput}>
                        <Radio value='male'>남</Radio>
                        <Radio value='female'>여</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  <div className='flex-1'></div>
                </div>

                {/* Row 4 */}
                <div className='mt-4'>
                  <div className='flex lg:flex-row flex-col gap-6 mt-6 items-center justify-between'>
                    <div className='flex flex-col gap-1 w-full lg:flex-1'>
                      <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                        Number Of Purchases
                      </label>
                      <Input
                        placeholder='12'
                        name='numberOfPurchases'
                        value={numberOfPurchases}
                        className='border px-2 rounded-lg h-11 bg-[#EFEFEF]'
                        disabled
                      />
                    </div>

                    <div className='flex flex-col gap-1 w-full lg:flex-1'>
                      <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                        Total purchase price
                      </label>
                      <Input
                        placeholder='5.000.000'
                        name='totalPurchasePrice'
                        value={totalPurchasePrice}
                        className='border px-2 rounded-lg h-11 bg-[#EFEFEF] '
                        disabled
                      />
                    </div>

                    <div className='flex flex-col gap-1 w-full lg:flex-1'>
                      <label htmlFor='address' className='text-[#3B3B3B] font-medium text-normal'>
                        Last time Of Purchase
                      </label>
                      <Input
                        placeholder='20240920'
                        name='lastTimeOfPurchase'
                        value={lastTimeOfPurchase}
                        className='border px-2 rounded-lg h-11 bg-[#EFEFEF] '
                        style={{ border: '1px solid #EFEFEF' }}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Row 5 */}
                <div className='lg:mt-10 mt-4'>
                  <div className='flex lg:flex-row flex-col gap-6 mt-6 justify-between items-center'>
                    <div className='flex flex-col gap-1 w-full lg:flex-1'>
                      <label htmlFor='createdDate' className='text-[#3B3B3B] font-medium text-normal'>
                        Join Date
                      </label>
                      <Input
                        id='createdDate'
                        placeholder='2024-07-20'
                        value={createdDate ? moment(createdDate).format('YYYY-MM-DD') : ''}
                        name='createdDate'
                        className='border px-2 rounded-lg h-11 bg-[#EFEFEF]'
                        style={{ border: '1px solid #EFEFEF' }}
                        disabled
                      />
                    </div>

                    <div className='flex flex-col gap-1 w-full lg:flex-1'>
                      <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                        TYC Point
                      </label>
                      <div className='flex items-center gap-3'>
                        <Input
                          // placeholder='0'
                          value={tycPoint}
                          name='tycPoint'
                          className='border px-2 rounded-lg h-11 bg-[#EFEFEF] flex-1'
                          disabled
                        />

                        <button
                          className='bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'
                          onClick={() => setOpenModal(true)}
                        >
                          지급/차감하기
                        </button>
                        <button
                          className='bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'
                          onClick={() => navigate('history-member')}
                        >
                          내역보기
                        </button>
                      </div>
                    </div>

                    <div className='flex flex-col gap-1 w-full lg:flex-1'>
                      <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                        Coupon
                      </label>
                      <div className='flex items-center gap-3'>
                        <Input
                          placeholder='3'
                          value={coupon}
                          name='coupon'
                          className='border px-2 rounded-lg h-11 bg-[#EFEFEF] flex-1'
                          disabled
                        />
                        <button className='bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center '>
                          지급/차감하기
                        </button>
                        <button
                          className=' bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'
                          onClick={() => navigate('history-member')}
                        >
                          내역보기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 6 */}
                <div className='mt-10'>
                  <div className='flex flex-col gap-1 w-[382px]'>
                    <label htmlFor='birthdate' className='text-[#3B3B3B] font-medium text-normal'>
                      Status
                    </label>
                    <div className='mt-3'>
                      <Form.Item name='enabled'>
                        <Radio.Group onChange={handleChangeInput} name='enabled' value={enabled}>
                          <Radio value={true}>활성화</Radio>
                          <Radio value={false}>비활성화</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                </div>

                <div className='mt-2 text-end'>
                  <button
                    className='bg-[#5B4DFB] w-[360px] font-semibold text-normal text-[#FFFFFF] h-11 rounded-lg'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    회원정보 업데이트
                  </button>
                </div>
              </Form>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>

      <Modal open={openModal} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false} centered>
        <div className='mt-8 flex justify-center font-medium text-primaryPrdName text-[#3B3B3B]'>
          {dataInput.email} {dataInput.phoneNumber}
        </div>
        <div className='mt-4'>
          <Tabs
            defaultActiveKey='1'
            items={items}
            centered
            tabBarStyle={{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '600',
              color: '#5B4DFB',
            }}
            className='custom-tabs-admin'
          />
        </div>
      </Modal>
    </Card>
  )
}
