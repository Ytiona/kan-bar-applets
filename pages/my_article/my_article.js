// pages/my_article/my_article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList: [
      {
        images: ["https://hbimg.huabanimg.com/a463f0f26ca7a360c8445b6b100825c4441fbe9b9fe50f-1Dwynq_fw658/format/webp"],
        title: "牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪",
        content: '我是一个牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪',
        authorAvatar: "https://hbimg.huabanimg.com/a463f0f26ca7a360c8445b6b100825c4441fbe9b9fe50f-1Dwynq_fw658/format/webp",
        authorName: "Shadow",
        viewCount: 200,
        laudCount: 1245,
        commentCount: 212
      },
      {
        images: ["https://hbimg.huabanimg.com/8cda8b01dd4f0359180d76e456ddcb501aa34ffb51311-1loUZx_fw658/format/webp"],
        title: "牛皮怪",
        content: '我是一个牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪',
        authorAvatar: "https://hbimg.huabanimg.com/8cda8b01dd4f0359180d76e456ddcb501aa34ffb51311-1loUZx_fw658/format/webp",
        authorName: "Shadow",
        viewCount: 200,
        laudCount: 1245,
        commentCount: 212
      },
      {
        images: [],
        title: "小张和小丽",
        content: '我是一个牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪',
        authorAvatar: "https://hbimg.huabanimg.com/ee2345274c8da98587df2ad4dfebecff837cea553a455-2qcviQ_fw658/format/webp",
        authorName: "Shadow",
        viewCount: 200,
        laudCount: 1245,
        commentCount: 212
      },
      {
        images: ["https://hbimg.huabanimg.com/8cda8b01dd4f0359180d76e456ddcb501aa34ffb51311-1loUZx_fw658/format/webp"],
        title: "牛皮怪",
        content: '我是一个牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪牛皮怪',
        authorAvatar: "https://hbimg.huabanimg.com/8cda8b01dd4f0359180d76e456ddcb501aa34ffb51311-1loUZx_fw658/format/webp",
        authorName: "Shadow",
        viewCount: 200,
        laudCount: 1245,
        commentCount: 212
      },
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