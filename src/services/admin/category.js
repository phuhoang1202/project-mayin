import { callApi, callApiAuthen, callApiImage, callApiNoAuthen } from '../../apis'

const getAllCategory = () => {
  return callApiNoAuthen(`/api/v1/un-auth/find-all-category`, 'get', null)
}

export const getCategory = async () => {
  return callApiAuthen(`/api/v1/un-auth/find-all-category`, 'get', null)
}

export const postCategory = async (payloadBody) => {
  return callApiAuthen(`/api/v1/category/create`, 'post', payloadBody)
}

export const updateCategory = async (payloadBody) => {
  return callApiAuthen(`/api/v1/category/update`, 'post', payloadBody)
}

export const deleteCategory = async (id, payloadBody) => {
  return callApiAuthen(`/api/v1/category/delete/${id}`, 'post', payloadBody)
}

export const uploadIconCategory = async (payloadBody) => {
  return callApiImage(`/api/v1/banner/upload-icon-category`, 'post', payloadBody)
}

export const category = {
  getAllCategory,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
  uploadIconCategory,
}
