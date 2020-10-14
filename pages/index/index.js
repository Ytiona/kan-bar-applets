// pages/index/index.js
import { getRecommendArticle } from '../../api/article';
import { LoadByPage } from '../../utils/util';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight * 2 + 20 ,
    recommendList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadByPage = new LoadByPage({
      vm: this,
      apiFn: getRecommendArticle,
      dataFileid: 'recommendList',
      getDataFnName: 'getArticle'
    });
    this.getArticle();
  },

  getArticle() {
    this.loadByPage.getData();
  },

  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  goRankList(e) {
    wx.navigateTo({
      url: `/pages/rank_list/rank_list?param=${e.currentTarget.dataset.param}`,
    })
  },

  lookMore() {
    getApp().globalData.findPgTabValue = 'article';
    wx.switchTab({
      url: '/pages/find/find'
    })
  },

  gotoSignin() {
    wx.navigateTo({
      url: `/pages/sign_in/sign_in`,
    })
  },

  gotoRank() {
    wx.navigateTo({
      url: `/pages/rank_list/rank_list?param=laud`,
    })
  },

  gotoFollow() {
    getApp().globalData.findPgTabValue = 'follow';
    wx.switchTab({
      url: `/pages/find/find`
    })
  },

  gotoRelease() {
    wx.navigateTo({
      url: `/pages/add_article/add_article?type=0`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadByPage.refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadByPage.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})