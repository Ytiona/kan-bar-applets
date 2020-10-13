// pages/add_article/add_article.js
import {
  addArticle,
  updateArticle
} from '../../api/article.js';
import {
  uploadFile
} from '../../api/index';
import { POPULAR_TAGS } from '../../utils/constants';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    type: '',
    title: '',
    content: '',
    images: [],
    offeredIntegral: 0,
    addTagVisible: false,
    selectedTagList: [],
    popularTags: [],
    customTagText: '',
    MAX_IMG_NUM: 9,
    isEdit: false,
    articleId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    
    eventChannel.on('transferArticle', article => {
      const popularTags = POPULAR_TAGS; 
      const {
        id,
        title,
        content,
        images,
        offered_integral,
        tags
      } = article;
      let selectedTagList = [];
      if (tags) {
        selectedTagList = tags.split(',').map(item => {
          return popularTags.find(popItem => {
            if (popItem.text == item) {
              popItem.checked = false;
              return true;
            }
          }) || {
            text: item,
            icon: 'tag'
          };
        })
      }
      this.setData({
        selectedTagList,
        title,
        content,
        popularTags,
        images: images.map(item => {
          return {
            path: item,
            isCloud: true
          };
        }),
        offeredIntegral: offered_integral,
        articleId: id
      })
    })
    this.setData({
      popularTags: POPULAR_TAGS.map(item => { item.checked = true; return item; }),
      userInfo: wx.getStorageSync('userInfo'),
      type: options.type,
      isEdit: Boolean(options.isEdit)
    })
  },

  release() {
    const {
      title,
      content,
      images,
      type,
      selectedTagList,
      offeredIntegral,
      isEdit,
      articleId
    } = this.data;
    if (title !== '' && content !== '') {
      if (type != 0 && offeredIntegral <= 0) {
        wx.showToast({
          title: '悬赏积分必须大于0',
          icon: 'none'
        });
        return;
      }
      wx.showLoading({
        title: '正在发布...'
      })
      const uploadTask = [];
      for (let i = 0; i < images.length; i++) {
        //如果已经是服务端的图片链接，则不需重新上传
        if (!images[i].isCloud) {
          uploadTask.push(uploadFile({
            file: images[i]
          }))
        }
      }
      Promise.all(uploadTask).then(res => {
        const imagesUrl = [];
        images.forEach(item => {
          if (item.isCloud) {
            imagesUrl.push(item.path);
          } else {
            imagesUrl.push(res.shift().result || '');
          }
        })
        const resolveHandle = res => {
          wx.hideLoading();
          if (res.code === 0) {
            const pages = getCurrentPages();
            const prePage = pages[pages.length - 2];
            prePage.onPullDownRefresh();
            wx.showToast({
              title: res.msg,
              icon: 'none',
              mask: true
            });
            setTimeout(() => {
              wx.navigateBack();
            }, 1000)
          }
        };
        if (isEdit) {
          updateArticle({
            title,
            content,
            type,
            images: imagesUrl.toString(),
            tags: selectedTagList.map(item => item.text).toString(),
            id: articleId
          }).then(res => {
            resolveHandle(res);
          })
        } else {
          addArticle({
            title,
            content,
            type,
            images: imagesUrl.toString(),
            tags: selectedTagList.map(item => item.text).toString(),
            offered_integral: type != 0 ? offeredIntegral : 0
          }).then(res => {
            resolveHandle(res);
          })
        }
      })
    }
  },

  onChooseImg() {
    const {
      images,
      MAX_IMG_NUM
    } = this.data;
    const max = MAX_IMG_NUM - images.length;
    wx.chooseImage({
      count: max,
      success: (res) => {
        let haveLargeSize = false;
        const files = res.tempFiles.filter(item => {
          if (item.size > 5000000) {
            haveLargeSize = true;
            return false;
          }
          return true;
        })
        if (haveLargeSize) {
          wx.showToast({
            title: '已过滤大于5M的图片',
            icon: 'none'
          })
        }
        this.setData({
          images: images.length ? images.concat(files) : files
        })
      }
    })
  },

  onDeleteImg(e) {
    const index = e.currentTarget.dataset.index;
    const {
      images
    } = this.data;
    images.splice(index, 1);
    this.setData({
      images
    })
  },

  onPreviewImage(e) {
    console.log(e);
    const imagesUrl = [];
    this.data.images.forEach(item => {
      imagesUrl.push(item.path);
    })
    wx.previewImage({
      urls: imagesUrl,
      current: e.currentTarget.dataset.imgsrc
    })
  },

  addTag() {
    this.setData({
      addTagVisible: true
    });
  },

  toggleSelectTag(e) {
    const index = e.currentTarget.dataset.index;
    const {
      selectedTagList,
      popularTags
    } = this.data;
    //更新popularTags，相当于双向绑定
    popularTags[index].checked = e.detail;
    if (!e.detail) {
      //如果变成未选中（灰色），则将其添加至selectedTagList中
      selectedTagList.push(popularTags[index]);
    } else {
      //否则，则将其从selectedTagList删除
      selectedTagList.splice(selectedTagList.findIndex(item => item.text == popularTags[index].text), 1);
    }
    //更新视图
    this.setData({
      selectedTagList,
      popularTags
    });
  },

  addCustomTag() {
    const {
      selectedTagList,
      popularTags,
      customTagText
    } = this.data;
    if (customTagText !== '') {
      //查看selectedTagList是否已经存在该标签
      const findRes = selectedTagList.findIndex(item => item.text == customTagText);
      if (findRes === -1) {
        //查看popularTags是否存在该标签
        const popularTagsFindRes = popularTags.findIndex(item => item.text == customTagText);
        if (popularTagsFindRes != -1) {
          //popularTags存在，则将popularTags中对应的数据添加至selectedTagList
          selectedTagList.push(popularTags[popularTagsFindRes]);
          //同时将popularTags对应的标签设置为灰色（代表已经添加过）
          popularTags[popularTagsFindRes].checked = false;
        } else {
          //否则直接设置文本和图标
          selectedTagList.push({
            text: customTagText,
            icon: 'tag'
          });
        }
      }
      //更新视图
      this.setData({
        selectedTagList,
        popularTags,
        customTagText: ''
      });
    }
  },

  deleteTag(e) {
    const {
      selectedTagList,
      popularTags
    } = this.data;
    const tagText = e.currentTarget.dataset.text;
    const findRes = selectedTagList.findIndex(item => item.text == tagText);
    selectedTagList.splice(findRes, 1);
    //删除标签时将其对应在popularTags中的状态也变更
    popularTags.forEach(item => {
      if (item.text == tagText) {
        item.checked = true;
      }
    })
    this.setData({
      selectedTagList,
      popularTags
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