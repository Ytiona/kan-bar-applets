// pages/integral_record/integral_record.js
const listComponent = {};
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
    currentTabIdx: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    listComponent.all = this.selectComponent('#all-list');
    listComponent.expend = this.selectComponent('#expend-list');
    listComponent.income = this.selectComponent('#income-list');
  },

  onChangeNav(e) {
    if(e.detail !== this.data.currentTabIdx) {
      this.setData({
        currentTabIdx: e.detail,
      })
    }
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
    // const { currentTabIdx, tabList } = this.data;
    // listComponent[tabList[currentTabIdx].value].refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { currentTabIdx, tabList } = this.data;
    listComponent[tabList[currentTabIdx].value].loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})