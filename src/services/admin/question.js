import { callApi, callApiImage } from '../../apis'

const getAllQuestion = (payload) => {
  return callApi(`/api/v1/consultation/find-by-condition`, 'post', payload)
}

const getQuestionId = (id) => {
  return callApi(`/api/v1/consultation/find-by-id/${id}`, 'post', null)
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

const replyMessage = (payload) => {
  return callApi(`/api/v1/consultation/reply-message`, 'post', payload)
}

const editMessage = (payload) => {
  return callApi(`/api/v1/consultation/edit-message`, 'post', payload)
}

export const question = {
  getAllQuestion,
  getQuestion,
  createQuestion,
  uploadQuestionImgs,
  deleteQuestionId,
  getQuestionId,
  replyMessage,
  editMessage,
}
