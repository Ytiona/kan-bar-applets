// pages/find/find.js
import { POPULAR_TAGS } from '../../utils/constants';
import { getFollowArticle } from '../../api/article';
import { LoadByPage } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      { label: '关注', value: 'follow' },
      { label: '帖子', value: 'article' },
      { label: '求配图', value: 'seekPic' },
      { label: '找表情', value: 'lookExpression' }
    ],
    currentNav: 0,
    tags: [],
    currentTagIdx: 0,
    followArticleList: [],
    currentTabIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadFollowArticle = new LoadByPage({
      vm: this,
      apiFn: getFollowArticle,
      getDataFnName: 'getFollowArticle',
      dataFileid: 'followArticleList',
      fileidPre: 'f-'
    });
    this.loadFollowArticle.getData();
    this.setData({ tags: [{ text: '全部' }].concat(POPULAR_TAGS) });
    this.articleList = this.selectComponent('#article-list');
    this.seekPicList = this.selectComponent('#seekPic-list');
    this.lookExpressionList = this.selectComponent('#lookExpression-list');
  },

  toggelNav(e) {
    this.setData({ currentNav: e.detail, currentTabIndex: e.detail })
  },

  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  onTapTag(e) {
    this.setData({ currentTagIdx: e.currentTarget.dataset.index });
    this.articleList.refresh();
  },

  getFollowArticle() {
    this.loadFollowArticle.getData();
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
    const { findPgTabValue } = getApp().globalData
    if(findPgTabValue == 'follow') {
      this.setData({ currentTabIndex: 0 });
    } else if(findPgTabValue == 'article') {
      this.setData({ currentTabIndex: 1 });
    }
    getApp().globalData.findPgTabValue = '';
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
    const { currentNav, tabList } = this.data;
    if(currentNav == 0) {
      this.loadFollowArticle.refresh();
    } else {
      this[tabList[currentNav].value + 'List'].refresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { currentNav, tabList } = this.data;
    if(currentNav == 0) {
      this.loadFollowArticle.loadMore();
    } else {
      this[tabList[currentNav].value + 'List'].loadMore();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})