// pages/sign_in/sign_in.js
import { signIn } from '../../api/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curMonth: '',
    curDay: '',
    todayMsg: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },

  init() {
    const date = new Date();
    this.setData({
      curMonth: String(date.getMonth() + 1).padStart(2, '0'),
      curDay: String(date.getDate()).padStart(2, '0')
    })
    const todayMsg = wx.getStorageSync('todayMsg');
    if(todayMsg) {
      this.setData({ todayMsg });
    }
    signIn().then(res => {
      if(res.code == 0) {
        wx.showToast({
          title: '签到成功，积分+5',
          icon: 'none'
        });
        this.setData({ todayMsg: res.result.feedback });
        wx.setStorageSync('todayMsg', res.result.feedback);
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