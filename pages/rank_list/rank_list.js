// pages/rank_list/rank_list.js
const typeMap = {
  hot: ['排行榜', '原来大家都在看这些！', 'view_count'],
  laud: ['排行榜', '原来大家都在看这些！', 'laud_count'],
  comment: ['评论榜', '震惊！原来大家都在议论这些！', 'comment_count']
};
import { LoadByPage } from '../../utils/util';
import { getRankListArticle } from '../../api/article';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: [],
    rankList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ text: typeMap[options.param] });
    this.sortBy = typeMap[options.param][2];
    this.loadByPage = new LoadByPage({
      apiFn: getRankListArticle,
      vm: this,
      dataFileid: 'rankList'
    })
    this.getData();
  },

  getData() {
    this.loadByPage.getData({
      sortBy: this.sortBy
    });
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
    this.loadByPage.refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadByPage.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})