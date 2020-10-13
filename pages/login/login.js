import { loginApi, getUserInfo } from '../../api/user';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.init();
  },

  init() {
    wx.showLoading({
      title: '正在登录',
    })
    this.checkSession();
  },

  checkSession() {
    wx.checkSession({
      success: res => {
        if (!wx.getStorageSync('token') || !wx.getStorageSync('userInfo')) {
          this._login();
        } else {
          wx.hideLoading();
          this._getUserInfo().then(() => {
            wx.switchTab({
              url: '../index/index',
            })
          })
        }
      },
      fail: res => {
        this._login();
      }
    })
  },

  _login() {
    wx.login({
      success: res => {
        loginApi({ code: res.code }).then(res =>{
          wx.hideLoading();
          if(res.code === 0) {
            wx.setStorageSync('token', res.result);
            this._getUserInfo().then(() => {
              wx.switchTab({
                url: '../index/index',
              })
            })
          } else {
            wx.showModal({
              title: '未知错误',
              content: '请检查您的网络设置',
              showCancel: false,
              mask: true
            })
          }
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  _getUserInfo() {
    return getUserInfo().then(res => {
      if(res.code === 0) {
        wx.setStorageSync('userInfo', res.result);
      }
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