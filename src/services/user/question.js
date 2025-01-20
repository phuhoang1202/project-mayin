import { callApi, callApiImage } from '../../apis'

const getAllQuestion = (payload) => {
  return callApi(`/api/v1/consultation/find-by-condition`, 'post', payload)
}

const getQuestion = (id) => {
  return callApi(`/api/v1/consultation/find-by-id/${id}`, 'post', null)
}

const createQuestion = (payload) => {
  return callApi(`/api/v1/consultation/create`, 'post', payload)
}

const uploadQuestionImgs = (form) => {
  return callApiImage(`/api/v1/consultation/upload-image`, 'post', form)
}

const deleteQuestionId = (id) => {
  return callApi(`/api/v1/consultation/delete/${id}`, 'post', null)
}

export const question = {
  getAllQuestion,
  getQuestion,
  createQuestion,
  uploadQuestionImgs,
  deleteQuestionId,
}
