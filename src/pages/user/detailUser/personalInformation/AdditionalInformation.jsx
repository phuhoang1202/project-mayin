import React, { useEffect, useState } from 'react'
import { DatePicker, Radio, Select, Input, Form } from 'antd'
import 'react-phone-input-2/lib/style.css'
import { phoneNumberData } from '@utils/international_phone_number.js'
import { user } from '@services/user/user'
import Loading from '@components/loadingCommon/Loading'
import { Toast } from '@utils/toast'
import { getUserInfor, setUserInfor } from '@utils/auth'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

export default function AdditionalInformation() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [countryKr, setCountryKr] = useState('kr')
  const { t } = useTranslation()

  // Lấy địa chỉ
  const [dataInput, setDataInput] = useState({
    birthday: '',
    gender: '',
    state: '',
    clearanceNumber: '',
    phoneNumber: '',
    address: '',
    referralCode: '',
  })

  const { birthday, gender, state, clearanceNumber, phoneNumber, address, referralCode } = dataInput

  // get Data
  useEffect(() => {
    try {
      const userInfo = getUserInfor()

      if (userInfo) {
        const parsedInfo = JSON.parse(userInfo)
        // console.log(parsedInfo)

        const formattedBirthday = parsedInfo.birthday ? moment(parsedInfo.birthday).format('YYYY-MM-DD') : null
        setDataInput({
          birthday: formattedBirthday || null,
          gender: parsedInfo.gender || '',
          state: parsedInfo.state || 'ko',
          clearanceNumber: parsedInfo.clearanceNumber || '',
          phoneNumber: parsedInfo.phoneNumber || '',
          address: parsedInfo.address || '',
          referralCode: parsedInfo.referralCode || '',
        })
        setCountryPhone(parsedInfo.countryPhone || 'kr')
        setCountryKr(parsedInfo.state)
        // setPhone(parsedInfo.phoneNumber || '')
      }
    } catch (error) {
      console.log('Failed to fetch user data')
    }
  }, [form])

  // const mapToCountryCode = (value) => {
  //   const mapping = {
  //     ko: 'kr', // Korea
  //     cn: 'cn', // China
  //     ja: 'jp', // Japan
  //     vi: 'vn', // Việt Nam
  //     en: 'us', // Global
  //   }

  //   return mapping[value] || value
  // }

  const handleChangeInput = (e) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? Number(value) : value

    // Cập nhật cả [name] và promotions với giá trị của filteredPromotions
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      [name]: parsedValue,
    }))
  }

  const handleAdditionalInfo = async () => {
    try {
      setLoading(true)
      const formattedBirthday = birthday ? new Date(birthday).toISOString() : null
      const updatedData = {
        ...dataInput,
        birthday: formattedBirthday,
        gender,
        state,
        clearanceNumber,
        phoneNumber,
        address,
        referralCode,
      }

      await user.postFormUser(updatedData).then((res) => {
        setUserInfor(JSON.stringify(res.data.data))
      })

      Toast.success('Information updated successfully!')
    } catch (error) {
      Toast.error('Information updated failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Form form={form} onFinish={handleAdditionalInfo} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='text-[#3B3B3B] font-medium text-normal'>{t('birthdate')}:</label>
          <Input
            id='birthday'
            type='date'
            name='birthday'
            value={birthday}
            onChange={handleChangeInput}
            placeholder='Enter your date of birth'
            className='border px-2 rounded-lg h-11'
          />
        </div>

        <div className='flex items-center mb-2 mt-2 gap-10'>
          <label className='text-[#3B3B3B] font-medium text-normal'>{t('gender')}:</label>
          <Radio.Group className='flex items-center gap-10' name='gender' value={gender} onChange={handleChangeInput}>
            <Radio value='male'>{t('male')}</Radio>
            <Radio value='female'>{t('female')}</Radio>
          </Radio.Group>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-[#3B3B3B] font-medium text-normal'>{t('nation')}: </label>
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
              setCountryKr(value)
              // setCountryPhone(mapToCountryCode(value))
            }}
          />
        </div>

        {countryKr === 'kr' && (
          <div>
            <label className='text-[#3B3B3B] font-medium text-normal'>{t('clearanceNumber')}</label>
            <div className='flex items-center justify-between gap-4'>
              <div className='flex flex-col flex-1 gap-1'>
                <Input
                  type='text'
                  placeholder='Please fill in the clearance number'
                  className='border px-2 rounded-lg h-11'
                  name='clearanceNumber'
                  value={clearanceNumber}
                  onChange={handleChangeInput}
                />
              </div>
              <button
                className='border px-2 rounded-lg h-11 bg-[#D3D2D2]'
                onClick={() => window.open('https://unipass.customs.go.kr/csp/persIndex.do?search_put=', '_blank')}
              >
                {t('issue')}
              </button>
            </div>
          </div>
        )}

        <div className='flex flex-col gap-1'>
          <label className='text-[#3B3B3B] font-medium text-normal'>{t('address')}</label>
          <Input
            id='address'
            type='text'
            placeholder='Enter your address'
            className='border px-2 rounded-lg h-11'
            name='address'
            value={address}
            onChange={handleChangeInput}
          />
        </div>

        {/* <div className='flex flex-col gap-1'>
          <label className='text-[#3B3B3B] font-medium text-normal'>{t('referralCode')}</label>
          <Input
            type='text'
            placeholder='Fill in the offer code'
            className='border px-2 rounded-lg h-11'
            name='referralCode'
            value={referralCode}
            onChange={handleChangeInput}
          />
        </div> */}

        <Form.Item
          name='phoneNumber'
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const cleanedValue = phoneNumber?.replace(/\s+/g, '')

                const selectedCountry = phoneNumberData.find((item) => item.country === countryKr)

                const regex = selectedCountry?.regex ? new RegExp(selectedCountry.regex) : null

                if (!cleanedValue) {
                  return Promise.reject('전화번호를 입력해주세요.')
                }
                if (!regex || regex.test(cleanedValue)) {
                  return Promise.resolve()
                }
                return Promise.reject(`잘못된 전화번호 형식입니다 ${selectedCountry?.countryName || '선택된 국가'}!`)
              },
            }),
          ]}
        >
          <div className='flex flex-col gap-1'>
            <label className='text-[#3B3B3B] font-medium text-normal'>{t('phoneNumber')}</label>
            <Input
              type='text'
              placeholder='Please enter your phone number'
              className='border px-2 rounded-lg h-11'
              name='phoneNumber'
              value={phoneNumber}
              onChange={handleChangeInput}
            />
          </div>
        </Form.Item>

        <button
          className={`h-11 font-semibold text-normal text-white rounded-lg w-full bg-[#D1B584]`}
          // disabled={!isFormFilled}
          // type='submit'
        >
          {t('save')}
        </button>
      </Form>
    </>
  )
}
