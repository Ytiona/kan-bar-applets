// pages/feedback_records/feedback_records.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackRecords: [
      {
        title: '标题',
        status: '已收到',
        time: '2020.08.04 12:00'
      },
      {
        title: '标题',
        status: '处理中',
        time: '2020.08.04 12:00'
      },
      {
        title: '标题',
        status: '已处理',
        time: '2020.08.04 12:00',
        reply: '内容已做出更改，感谢您的支持！'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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