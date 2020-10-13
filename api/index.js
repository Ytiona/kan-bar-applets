import {
  getRequest,
  postRequest,
  postJsonRequest,
  postNotTicketRequest,
  uploadRequest,
  compressUploadRequest
} from '../utils/request.js';

//签到
export const signIn = params => {
  return postJsonRequest('/signIn', params);
}

//获取积分记录
export const getIntegralRecord = params => {
  return getRequest('/getIntegralRecord', params);
}

//公共文件上传接口
export const uploadFile = ({file, maxSize = -1}) => {
  return compressUploadRequest('/upload', {file, maxSize, quality: 50 });
}

//点赞
export const giveLaud = params => {
  return postJsonRequest('/laud', params);
}

//提交反馈
export const addUserIdea = params => {
  return postJsonRequest('/addUserIdea', params);
}

//获取反馈记录
export const getUserIdea = params => {
  return getRequest('/getUserIdea', params);
}

//获取热搜
export const getHotSearch = params => {
  return getRequest('/getHotSearch', params);
}