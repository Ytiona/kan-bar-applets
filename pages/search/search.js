// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchBy: ['帖子标题', '帖子标签', '用户'],
    searchContent: '',
    searchHistory: ['希望人没事', 'wdnmd'],
    hotSearchList: [
      {
        content: '希望人没事',
        searchCount: 13422
      },
      {
        content: 'wdnmd',
        searchCount: 1340
      },
      {
        content: 'wdnmd',
        searchCount: 1340
      },
      {
        content: 'wdnmd',
        searchCount: 1340
      },
      {
        content: 'wdnmd',
        searchCount: 1340
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