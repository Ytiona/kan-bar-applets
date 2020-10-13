// pages/person/person.js
import { getUserInfo, updateUserInfo } from '../../api/user';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  gotUserInfo(e) {
    const { userInfo } = this.data;
    userInfo.avatar = e.detail.userInfo.avatarUrl;
    userInfo.nickname = e.detail.userInfo.nickName;
    this.setData({ userInfo });
    wx.setStorageSync('userInfo', userInfo);
    updateUserInfo({
      avatar: userInfo.avatar,
      nickname: userInfo.nickname
    });
  },
  _getUserInfo() {
    getUserInfo().then(res => {
      if(res.code === 0) {
        wx.setStorageSync('userInfo', res.result);
        this.setData({ userInfo: res.result });
      }
      wx.stopPullDownRefresh();
    })
  },
  gotoPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.param}/${e.currentTarget.dataset.param}`,
    })
  },

  lookFriends(e) {
    wx.navigateTo({
      url: `/pages/user_friends/user_friends?openId=${this.data.userInfo.open_id}&param=${e.currentTarget.dataset.param}&isOwn=${1}`,
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
    this.setData({
      userInfo: wx.getStorageSync('userInfo') || {}
    })
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
    this._getUserInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})