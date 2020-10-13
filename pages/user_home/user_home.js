// pages/user_home/user_home.js
import { getUserInfo, followUser } from '../../api/user';
import { getUserArticle } from '../../api/article';
import { LoadByPage } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOwn: false,
    followed: false,
    userInfo: {},
    articleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.openId = options.openId;
    wx.showLoading({
      title: '加载中',
    })
    getUserInfo({ openId: options.openId }).then(res => {
      if(res.code === 0) {
        this.setData({ userInfo: res.result, followed: res.followed, isOwn: res.isOwn });
      }
      wx.hideLoading();
    })
    this.loadArticle = new LoadByPage({
      vm: this,
      dataFileid: 'articleList',
      apiFn: getUserArticle,
      getDataFnName: 'getArticle'
    })
    this.getArticle();
  },

  getArticle() {
    this.loadArticle.getData({ openId: this.data.openId });
  },


  _followUser() {
    const { followed, openId } = this.data;
    if (followed) {
      wx.showModal({
        title: '提示！',
        content: '取消关注该用户？',
        success: res => {
          if (res.confirm) {
            followUser({
              targetId: openId,
              status: 0
            }).then(res => {
              if (res.code === 0) {
                wx.showToast({
                  title: '已取消关注',
                  icon: 'none'
                })
                this.setData({
                  followed: false
                });
              }
            })
          }
        }
      })
    } else {
      followUser({
        targetId: openId,
        status: 1
      }).then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: '关注成功！',
            icon: 'none'
          })
          this.setData({
            followed: true
          });
        }
      })
    }
  },

  lookFriends(e) {
    wx.navigateTo({
      url: `/pages/user_friends/user_friends?openId=${this.data.userInfo.open_id}&param=${e.currentTarget.dataset.param}&isOwn=${this.data.isOwn ? 1 : 0}`,
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