import React from 'react'
import { Modal, Form, Input, Select, DatePicker, Button, Upload } from 'antd'
import moment from 'moment'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker
const { Option } = Select

const ModalAdmin = ({
  visible,
  onCancel,
  onOk,
  form,
  initialValues,
  fields,
  title,
  loading,
  uploadProps,
  currentCategory,
}) => {
  const validateDateRange = (_, value) => {
    if (!value || value.length < 2) {
      return Promise.reject(new Error('Please select a date range'))
    }
    const [startDate, endDate] = value
    if (dayjs(startDate).isBefore(dayjs().startOf('day'), 'day')) {
      return Promise.reject(new Error('Start date must be today or later'))
    }
    if (dayjs(endDate).isBefore(dayjs(startDate), 'day')) {
      return Promise.reject(new Error('End date must be after the start date'))
    }
    return Promise.resolve()
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      width={1000}
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={onOk} loading={loading}>
          {title.includes('Add') ? 'Create' : 'Update'}
        </Button>,
      ]}
    >
      <Form form={form} layout='vertical' initialValues={initialValues}>
        {fields.map((field) => {
          switch (field.name) {
            case 'description':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `Please input the ${field.label.toLowerCase()}!` }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              )
            case 'type':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `Please select the ${field.label.toLowerCase()}!` }]}
                >
                  <Select>
                    <Option value='sale'>Sale</Option>
                    <Option value='ship'>Ship</Option>
                    <Option value='event'>Event</Option>
                    <Option value='recommend'>Recommend</Option>
                    <Option value='new_product'>New Product</Option>
                    <Option value='best'>Best</Option>
                    <Option value='earn_points'>Earn points</Option>
                  </Select>
                </Form.Item>
              )
            case 'active':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `Please select the ${field.label.toLowerCase()}!` }]}
                >
                  <Select>
                    <Option value={true}>Active</Option>
                    <Option value={false}>Inactive</Option>
                  </Select>
                </Form.Item>
              )
            case 'dateRange':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[
                    { required: true, message: `Please select the ${field.label.toLowerCase()}!` },
                    { validator: validateDateRange },
                  ]}
                >
                  <RangePicker
                    format='YYYY-MM-DD'
                    showTime
                    className='w-full'
                    defaultValue={
                      initialValues?.dateRange ? [moment(initialValues.startDate), moment(initialValues.endDate)] : []
                    }
                  />
                </Form.Item>
              )

            case 'categories':
              return (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `Please select the ${field.label.toLowerCase()}!` }]}
                >
                  <Select
                    mode='multiple'
                    style={{
                      width: '100%',
                    }}
                    placeholder='Select categories'
                    defaultValue={currentCategory?.children?.map((child) => child.id)} // Giá trị mặc định
                    options={currentCategory?.children?.map((child) => ({
                      value: child.id,
                      label: child.name,
                    }))} // Mảng options
                  />
                </Form.Item>
              )

            case 'uploadImage':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  valuePropName='fileList'
                  getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                >
                  <Upload
                    listType='picture-card'
                    fileList={uploadProps.fileList}
                    onPreview={uploadProps.handlePreview}
                    onChange={uploadProps.handleChange}
                    beforeUpload={() => false}
                  >
                    {uploadProps.fileList.length >= 8 ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                  <Modal
                    visible={uploadProps.previewOpen}
                    footer={null}
                    onCancel={() => uploadProps.setPreviewOpen(false)}
                  >
                    <img alt='Preview' style={{ width: '100%' }} src={uploadProps.previewImage} />
                  </Modal>
                </Form.Item>
              )

            default:
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `Please input the ${field.label.toLowerCase()}!` }]}
                >
                  <Input />
                </Form.Item>
              )
          }
        })}
      </Form>
    </Modal>
  )
}

export default ModalAdmin
