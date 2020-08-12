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
        // console.log(wx.getStorageSync('ticket'));
        if (!wx.getStorageSync('ticket')) {
          this._login();
        } else {
          wx.hideLoading();
          wx.switchTab({
            url: '../index/index',
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
        wx.setStorageSync('ticket', '666666');
        wx.hideLoading();
        wx.switchTab({
          url: '../index/index',
        })
      },
      fail: err => {
        console.log(err);
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