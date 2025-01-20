import { callApi } from '../../apis'

export const statistical = () => {
  return callApi(`/api/v1/admin/statistical`, 'get', null)
}

export const revenueStatistical = (bodyPayload) => {
  return callApi(`/api/v1/admin/revenue-statistical`, 'post', bodyPayload)
}

export const revenueStatisticalCategory = () => {
  return callApi(`/api/v1/admin/revenue-statistical-category`, 'get', null)
}

export const dashboard = { statistical, revenueStatistical, revenueStatisticalCategory }
