import {
  getRequest,
  postRequest,
  postJsonRequest,
  postNotTicketRequest,
  uploadRequest,
  compressUploadRequest
} from '../utils/request.js';

//登录
export const loginApi = params => {
  return postNotTicketRequest('/user/login', params);
}

//获取用户信息
export const getUserInfo = params => {
  return getRequest('/user/getUserInfo', params);
}

//更新用户信息
export const updateUserInfo = params => {
  return postJsonRequest('/user/updateUserInfo', params);
}

//上传头像
export const uploadAvatar = (file) => {
  return compressUploadRequest('/user/uploadAvatar', {
    file,
    name: 'avatar',
    quality: 50,
    maxSize: 5000
  });
}

//检查用户名是否已存在
export const checkNickname = params => {
  return postJsonRequest('/user/checkNickname', params);
}

//搜索用户
export const searchUser = params => {
  return getRequest('/user/search', params);
}

//关注/取消关注 用户
export const followUser = params => {
  return postJsonRequest('/user/follow', params);
}

//获取关注用户列表
export const getFollowList = params => {
  return getRequest('/user/getFollowList', params);
}

//获取粉丝列表
export const getFansList = params => {
  return getRequest('/user/getFansList', params);
}