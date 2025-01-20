import Card from '@pages/admin/components/card'
import React, { useState } from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import IconBack from '@assets/images/IconBack.svg'
import { Dropdown, Menu, Radio, DatePicker, Select, Space, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { phoneNumberData } from '@utils/international_phone_number.js'
import { Toast } from '@utils/toast'
import moment from 'moment'
import { createUsers } from '@services/admin/member'

export default function AddNewMember() {
  const navigate = useNavigate()
  const [dataInput, setDataInput] = useState({
    name: '홍길동',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    phoneNumber: '',
    state: '',
  })

  const { email, password, gender, birthday, phoneNumber, state } = dataInput

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
      const payload = {
        ...dataInput,
        username: email,
      }

      const response = await createUsers(payload)
      if (response.status === 208) {
        Toast.error(response.data.message || 'Add user failed.')
        return
      }

      Toast.success('Added user successfully!')
      navigate(`/admin/manager-member`)
    } catch (error) {
      Toast.error('Add user failed')
    }
  }

  return (
    <Card extra={'w-full h-[87vh]'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate(-1)}>
        <img src={IconBack} alt='icon' />
      </div>

      <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-8 mb-20 '>
        <div className='lg:mx-40 md:mx-20 sm:mx-20 mx-14'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-[60px] h-[60px] rounded-full'>
                <img src={DefaultAvatar} alt='image' className='w-full h-full object-cover' />
              </div>

              <div className='flex flex-col'>
                <div className='text-[#3B3B3B] font-bold text-textPrd'>진선미</div>
                <div className='text-[#8C8C8C] font-medium text-small'>회원등급</div>
              </div>
            </div>
          </div>

          <div className='mt-10'>
            <Form onFinish={handleSubmit}>
              {/* Row 1 */}
              <div className='flex lg:flex-row flex-col gap-6 items-center justify-between w-full'>
                <div className='flex flex-col gap-1 w-full lg:flex-1'>
                  <label htmlFor='memberKey' className='text-[#3B3B3B] font-medium text-normal'>
                    ID
                  </label>
                  <Form.Item
                    name='email'
                    rules={[
                      { required: true, message: 'ID is required!' },
                      { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                  >
                    <Input
                      id='email'
                      value={email}
                      name='email'
                      onChange={handleChangeInput}
                      placeholder='진선미@naver.com'
                      className='border px-2 rounded-lg h-11 w-full'
                    />
                  </Form.Item>
                </div>

                <div className='flex flex-col gap-1 w-full lg:flex-1'>
                  <label htmlFor='password' className='text-[#3B3B3B] font-medium text-normal'>
                    Password
                  </label>
                  <Form.Item
                    name='password'
                    rules={[
                      { required: true, message: 'Password is required!' },
                      { min: 8, message: 'Password must be at least 8 characters!' },
                    ]}
                  >
                    <Input.Password
                      id='password'
                      value={password}
                      name='password'
                      onChange={handleChangeInput}
                      placeholder='비밀번호'
                      className='border px-2 rounded-lg h-11'
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </div>

                <div className='flex flex-col gap-1 w-full lg:flex-1'>
                  <label htmlFor='password' className='text-[#3B3B3B] font-medium text-normal'>
                    Password Check
                  </label>
                  <Form.Item
                    name='passwordCheck'
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Passwords do not match!'))
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      id='passwordCheck'
                      placeholder='비밀번호 확인'
                      className='border px-2 rounded-lg h-11'
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Row 2 */}
              <div className='flex gap-6 mt-6 justify-between items-center'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                    Name
                  </label>
                  <Form.Item name='name' rules={[{ required: true, message: '이름을 입력하세요!' }]}>
                    <Input
                      id='name'
                      placeholder='홍길동'
                      value={name}
                      name='name'
                      className='border px-2 rounded-lg h-11 '
                    />
                  </Form.Item>
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='gender' className='text-[#3B3B3B] font-medium text-normal'>
                    성별
                  </label>
                  <Form.Item
                    name='gender'
                    rules={[{ required: true, message: '성별을 선택해주세요!' }]}
                    value={gender}
                    onChange={handleChangeInput}
                  >
                    <Radio.Group onChange={handleChangeInput} value={gender} name='gender'>
                      <Radio value={'male'}>남</Radio>
                      <Radio value={'female'}>여</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>

              {/* Row 3 */}
              <div className='lg:mt-6 mt-2'>
                <div className='flex lg:flex-row flex-col lg:gap-6 gap-2 items-center justify-between'>
                  <div className='flex flex-col gap-1 w-full lg:flex-1'>
                    {/* Birth */}
                    <label htmlFor='Birthday' className='text-[#3B3B3B] font-medium text-normal'>
                      Birthday
                    </label>
                    <Form.Item name='birthday' rules={[{ required: true, message: 'Birthday is required!' }]}>
                      <DatePicker
                        value={birthday ? moment(birthday) : null}
                        onChange={(date) =>
                          handleChangeInput({ target: { name: 'birthday', value: date ? date.toISOString() : '' } })
                        }
                        placeholder='Select your birth date'
                        style={{ height: '44px', width: '100%' }}
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

                  <div className='flex flex-col gap-1 w-full lg:flex-1'>
                    <Form.Item
                      name='phoneNumber'
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const cleanedValue = phoneNumber?.replace(/\s+/g, '')
                            const selectedCountry = phoneNumberData.find((item) => item.country === nation)
                            const regex = selectedCountry?.regex ? new RegExp(selectedCountry.regex) : null

                            if (!cleanedValue) {
                              return Promise.reject('전화번호를 입력해주세요.')
                            }
                            if (!regex || regex.test(cleanedValue)) {
                              return Promise.resolve()
                            }
                            return Promise.reject(
                              `잘못된 전화번호 형식입니다 ${selectedCountry?.countryName || '선택된 국가'}!`,
                            )
                          },
                        }),
                      ]}
                    >
                      <div className='flex flex-col gap-1'>
                        <label className='text-[#3B3B3B] font-medium text-normal'>Phone number</label>
                        <Input
                          id='phoneNumber'
                          value={phoneNumber}
                          name='phoneNumber'
                          onChange={handleChangeInput}
                          placeholder='01012345678'
                          className='h-11 w-full border rounded-lg px-2'
                        />
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className='mt-8 text-end'>
                <button
                  className='bg-[#5B4DFB] lg:w-[360px] px-2 w-full font-semibold text-normal text-[#FFFFFF] h-11 rounded-lg'
                  type='submit'
                >
                  가입 완료
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Card>
  )
}
