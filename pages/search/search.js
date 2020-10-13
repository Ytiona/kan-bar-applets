// pages/search/search.js
import {
  LoadByPage
} from '../../utils/util';
import {
  searchArticle
} from '../../api/article';
import {
  getHotSearch
} from '../../api/index';
import {
  searchUser
} from '../../api/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showSearchRes: false,
    searchFocus: true,
    dbmList: [{
        label: '帖  子',
        value: 'article'
      },
      {
        label: '用  户',
        value: 'user'
      }
    ],
    articleList: [],
    userList: [],
    searchContent: '',
    searchHistory: [],
    hotSearchList: [],
    searchBy: 'article'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchHistory: wx.getStorageSync('searchHistory') || []
    });
    this.loadArticle = new LoadByPage({
      vm: this,
      apiFn: searchArticle,
      dataFileid: 'articleList',
      fileidPre: 'a_',
      getDataFnName: 'getSearchResult'
    });
    this.loadUser = new LoadByPage({
      vm: this,
      apiFn: searchUser,
      dataFileid: 'userList',
      fileidPre: 'u_',
      getDataFnName: 'getSearchResult'
    });
    this._getHotSearch();
  },
  _getHotSearch() {
    getHotSearch({
      rows: 10
    }).then(res => {
      if (res.code === 0) {
        this.setData({
          hotSearchList: res.result || []
        })
      }
    })
  },
  search() {
    if (this.data.searchBy == 'article') {
      this.loadArticle.refresh();
    } else {
      this.loadUser.refresh();
    }
  },
  getSearchResult() {
    if (this.data.searchContent) {
      let {
        searchContent,
        searchHistory,
        searchBy
      } = this.data;
      if (searchBy == 'article') {
        this.loadArticle.getData({
          content: searchContent
        });
      } else {
        this.loadUser.getData({
          userName: searchContent
        });
      }
      if (!searchHistory.find(item => item == searchContent)) {
        searchHistory.push(searchContent);
        wx.setStorageSync('searchHistory', searchHistory);
        this.setData({
          searchHistory
        });
      }
      this.setData({
        showSearchRes: true
      });
    }
  },
  onFocusSearch() {
    this._getHotSearch();
    this.setData({
      showSearchRes: false
    });
  },
  onChangeSearchBy(e) {
    this.setData({
      searchBy: this.data.dbmList[e.detail].value
    });
    if(this.data.searchContent !== '') {
      this.search();
    }
  },
  tapSearchHistoryItem(e) {
    this.setData({
      searchContent: e.currentTarget.dataset.content
    })
    this.search();
  },
  clearSearchHistory() {
    wx.showModal({
      title: '提示',
      content: '确定清除搜索历史？',
      success: res => {
        if (res.confirm) {
          wx.setStorageSync('searchHistory', []);
          this.setData({
            searchHistory: []
          });
        }
      }
    })
  },
  clearSearchContent() {
    this.setData({
      searchContent: '',
      searchFocus: true
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