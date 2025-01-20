import { callApi, callApiImage } from '../../apis'

const getBoard = (payloadBody) => {
  return callApi(`/api/v1/un-auth/find-by-condition`, 'post', payloadBody)
}

const getBoardById = (id) => {
  return callApi(`/api/v1/un-auth/news/find-by-id/${id}`, 'post', null)
}

const createBoard = (payloadBody) => {
  return callApi(`/api/v1/news/create`, 'post', payloadBody)
}

const updateBoard = (payloadBody) => {
  return callApi(`/api/v1/news/update`, 'post', payloadBody)
}

const uploadBoardImgsDetail = (form) => {
  return callApiImage(`/api/v1/news/upload-file-content`, 'post', form)
}

const uploadDescriptionBoard = (form) => {
  return callApi(`/api/v1/news/update-content`, 'post', form)
}

const updateImageBoard = (payloadBody) => {
  return callApiImage(`/api/v1/news/upload-file`, 'post', payloadBody)
}

const deleteBoard = (id) => {
  return callApi(`/api/v1/news/delete/${id}`, 'post', null)
}

const deleteListBoard = (payloadBody) => {
  return callApi(`/api/v1/banner/delete-list`, 'post', payloadBody)
}

export const board = {
  getBoard,
  getBoardById,
  createBoard,
  updateBoard,
  uploadBoardImgsDetail,
  uploadDescriptionBoard,
  updateImageBoard,
  deleteBoard,
  deleteListBoard,
}
