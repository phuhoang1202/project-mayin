import { callApi } from '../../apis'

export const getAllUsers = (bodyPayload) => {
  return callApi(`/api/v1/admin/user/get-all`, 'post', bodyPayload)
}

export const getDetailUsers = (id) => {
  return callApi(`/api/v1/user/find-by-id/${id}`, 'post', null)
}

export const createUsers = (bodyPayload) => {
  return callApi(`/api/v1/admin/create`, 'post', bodyPayload)
}

export const updateUsers = (bodyPayload) => {
  return callApi(`/api/v1/admin/update`, 'post', bodyPayload)
}

export const updateBalance = (bodyPayload) => {
  return callApi(`/api/v1/wallet/update-balance`, 'post', bodyPayload)
}

export const findAllTransaction = (bodyPayload) => {
  return callApi(`/api/v1/admin/find-all-transaction`, 'post', bodyPayload)
}

export const couponUser = (bodyPayload) => {
  return callApi(`/api/v1/admin/coupon/find-by-condition`, 'post', bodyPayload)
}

export const statusEnableUsers = (bodyPayload) => {
  return callApi(`/api/v1/admin/update-enable`, 'post', bodyPayload)
}

export const searchUser = (bodyPayload) => {
  return callApi(`/api/v1/admin/find-by-condition`, 'post', bodyPayload)
}

export const resetPassword = (id) => {
  return callApi(`/api/v1/user/reset-password/${id}`, 'post', null)
}

export const updateEnable = (bodyPayload) => {
  return callApi(`/api/v1/user/update-enable`, 'post', bodyPayload)
}

export const member = {
  getAllUsers,
  getDetailUsers,
  createUsers,
  updateUsers,
  updateBalance,
  statusEnableUsers,
  searchUser,
  couponUser,
  findAllTransaction,
  resetPassword,
  updateEnable,
}
