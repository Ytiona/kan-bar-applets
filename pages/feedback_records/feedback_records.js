// pages/feedback_records/feedback_records.js
import { getUserIdea } from '../../api/index';
import { LoadByPage } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusMap: ['已收到', '处理中', '已处理'],
    feedbackRecords: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadByPage = new LoadByPage({
      vm: this,
      apiFn: getUserIdea,
      dataFileid: 'feedbackRecords'
    })
    this.getData();
  },

  getData() {
    this.loadByPage.getData();
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