import {
  getRequest,
  postRequest,
  postJsonRequest,
  postNotTicketRequest,
  uploadRequest,
  compressUploadRequest
} from '../utils/request.js';

//发布文章
export const addArticle = params => {
  return postJsonRequest('/article/add', params);
}

//获取推荐帖子，分页
export const getRecommendArticle = params => {
  return getRequest('/article/getRecommend', params);
}

//获取排行榜帖子
export const getRankListArticle = params => {
  return getRequest('/article/getRankList', params);
}

//获取所有帖子，分页
export const getAllArticle = params => {
  return getRequest('/article/getAll', params);
}

//获取我的帖子，分页
export const getSelfArticle = params => {
  return getRequest('/article/getSelf', params);
}

//新增帖子访问量
export const addArticleViewCount = params => {
  return postJsonRequest('/article/addViewCount', params);
}

//搜索帖子
export const searchArticle = params => {
  return getRequest('/article/search', params);
}

//删除帖子
export const deleteArticle = params => {
  return postJsonRequest('/article/delete', params);
}

//更新帖子
export const updateArticle = params => {
  return postJsonRequest('/article/update', params);
}

//获取指定用户帖子
export const getUserArticle = params => {
  return getRequest('/article/getByUser', params);
}

//获取关注用户的帖子
export const getFollowArticle = params => {
  return getRequest('/article/getByFollow', params);
}