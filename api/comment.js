import {
  getRequest,
  postRequest,
  postJsonRequest,
  postNotTicketRequest,
  uploadRequest,
  compressUploadRequest
} from '../utils/request.js';

//获取评论，分页
export const getComments = params => {
  return getRequest('/comment/get', params);
}

//新增评论
export const addComment = params => {
  return postJsonRequest('/comment/add', params);
}

//采纳评论
export const adopteComment = params => {
  return postJsonRequest('/comment/adopte', params);
}

//删除评论
export const deleteComment = params => {
  return postJsonRequest('/comment/delete', params);
}