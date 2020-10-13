// pages/user_friends/user_friends.js
import { getFollowList, getFansList } from '../../api/user';
import { LoadByPage } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        label: 'Ta的关注',
        value: 'follow'
      },
      {
        label: 'Ta的粉丝',
        value: 'fans'
      }
    ],
    followUserList: [],
    fansUserList: [],
    curUid: '',
    currentTabIdx: 0,
    isOwn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isOwn == 1) {
      const { tabList } = this.data;
      tabList[0].label = '我的关注';
      tabList[1].label = '我的粉丝';
      this.setData({ tabList });
      wx.setNavigationBarTitle({
        title: '我的好友',
      })
    }
    this.setData({ isOwn: Boolean(options.isOwn) });
    if(options.param == 'fans') {
      this.setData({ currentTabIdx: 1 });
    }
    this.data.curUid = options.openId;
    this.loadFollowList = new LoadByPage({
      vm: this,
      apiFn: getFollowList,
      dataFileid: 'followUserList',
      fileidPre: 'fo_',
      getDataFnName: 'getFollowUserList'
    });
    this.loadFansList = new LoadByPage({
      vm: this,
      apiFn: getFansList,
      dataFileid: 'fansUserList',
      fileidPre: 'fa_',
      getDataFnName: 'getfansUserList'
    })
    this.getFollowUserList();
    this.getfansUserList();
  },
  getFollowUserList() {
    this.loadFollowList.getData({ openId: this.data.curUid });
  },
  getfansUserList() {
    this.loadFansList.getData({ openId: this.data.curUid });
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