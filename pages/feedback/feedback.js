// pages/feedback/feedback.js
import { addUserIdea } from '../../api/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit() {
    const { title, content } = this.data;
    if(title === '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
      })
      return;
    }
    if(content === '') {
      wx.showToast({
        title: '请输入详细反馈内容',
        icon: 'none',
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确定提交反馈？',
      success: res => {
        if(res.confirm) {
          addUserIdea({ title, content }).then(res => {
            if(res.code === 0) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                mask: true
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/feedback_records/feedback_records',
                })
                this.setData({ title: '', content: '' });
              }, 1000)
            }
          })
        }
      }
    })
  },

  goMyFeedback() {
    wx.navigateTo({
      url: '/pages/feedback_records/feedback_records',
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