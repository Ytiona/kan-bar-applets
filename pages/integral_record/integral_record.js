// pages/integral_record/integral_record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      { label: '全部', value: 'all' },
      { label: '支出', value: 'expend' },
      { label: '收入', value: 'income' }
    ],
    integralRecords: [
      {
        title: '签到',
        account: 3,
        time: '2020.08.03 18:06'
      },
      {
        title: '采纳回答',
        account: -50,
        time: '2020.08.03 18:06'
      },
      {
        title: '签到',
        account: 3,
        time: '2020.08.03 18:06'
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