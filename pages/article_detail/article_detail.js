// pages/article_detail/article_detail.js
import {
  getComments,
  addComment,
  adopteComment,
  deleteComment
} from '../../api/comment';
import {
  addArticleViewCount
} from '../../api/article';
import {
  uploadFile,
  giveLaud
} from '../../api/index';
import {
  LoadByPage,
  debounce
} from '../../utils/util';
import {
  VIEW_COUNT_BY_TIME,
  POPULAR_TAGS
} from '../../utils/constants';
import { followUser } from '../../api/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    tags: [],
    commentTotal: 0,
    commentList: [],
    commentSortRule: [{
        label: '最多点赞',
        value: 'laud'
      },
      {
        label: '最多回复',
        value: 'reply'
      },
      {
        label: '最新评论',
        value: 'comment'
      },
    ],
    commentSortBy: 'laud',
    commentOptionVisible: false,
    curSelComment: {},
    commentType: 0, //0：回复帖子，1：回复评论
    addedViewCount: false,
    operationBottom: 0,
    writeCommentFocus: false,
    commentContent: '',
    commentImages: [],
    MAX_IMG_NUM: 9
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._addArticleViewCount();
    //点赞时发送请求做防抖
    this.laudArticleByDb = debounce(giveLaud, 500, true);
    this.loadComent = new LoadByPage({
      apiFn: getComments,
      dataFileid: 'commentList',
      vm: this,
      getDataFnName: 'getComments'
    });
    this.eventChannel = this.getOpenerEventChannel();
    //获取上个页面传来的帖子数据
    this.eventChannel.on('transferData', article => {
      let tags = [];
      if (article.tags) {
        tags = article.tags.split(',').map(item => {
          return POPULAR_TAGS.find(popItem => popItem.text == item) || {
            text: item,
            icon: 'tag'
          };
        })
      }
      this.setData({
        article,
        tags,
      });
      this.getComments();
    })
  },
  getComments() {
    this.loadComent.getData({
      id: this.data.article.id,
      type: 0,
      sortBy: this.data.commentSortBy
    }).then(res => {
      if (res.code === 0) {
        this.setData({
          commentTotal: res.total
        });
        //获取评论后更新评论数到原有页面上
        this.eventChannel.emit('onReleaseComment', res.total);
      }
    })
  },
  previewImage(e) {
    const images = this.data.article.images;
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      urls: images,
      current: images[index]
    })
  },
  onLaudArticle() {
    let {
      article
    } = this.data;
    article.lauded = !article.lauded;
    if (article.lauded) article.laud_count++;
    else article.laud_count--;
    this.setData({
      article
    });
    //点赞后更新赞数和状态到原有页面上
    this.eventChannel.emit('onLaudArticle', article.laud_count, article.lauded);
    this.laudArticleByDb({
      id: article.id,
      status: article.lauded,
      type: 0
    })
  },
  
  onChangeSortBy(e) {
    const map = ['laud', 'reply', 'time']
    this.data.commentSortBy = map[e.detail];
    this.loadComent.refresh();
  },
  onTapComment(e) {
    this.setData({
      curSelComment: e.currentTarget.dataset.comment,
      commentOptionVisible: true
    })
  },
  replyComment() {
    this.setData({
      writeCommentFocus: true,
      commentType: 1
    });
  },
  copyComment() {
    wx.setClipboardData({
      data: this.data.curSelComment.content,
      success: () => {
        wx.showToast({
          title: '评论已复制',
          icon: 'none'
        })
      }
    })
  },
  _addArticleViewCount() {
    if (this.data.addedViewCount) return;
    //阅读时间超过3s 加1访问量
    this.data.addedViewCount = true;
    this.viewCountTimer = setTimeout(() => {
      addArticleViewCount({
        id: this.data.article.id
      }).then(res => {
        if (res.code === 0) {
          this.data.article.view_count++;
          this.setData({
            article: this.data.article
          })
        }
      })
    }, VIEW_COUNT_BY_TIME)
  },
  onTapAdopte(e) {
    wx.showModal({
      title: '提示',
      content: '确定采纳改回答？',
      success: res => {
        if (res.confirm) {
          const {
            id
          } = e.currentTarget.dataset;
          adopteComment({
            id,
            articleId: this.data.article.id
          }).then(res => {
            if (res.code === 0) {
              const {
                article
              } = this.data;
              article.adopte_target_id = id;
              this.setData({
                article
              });
              wx.showToast({
                title: '采纳成功！',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  onDeleteComment() {
    deleteComment({
      type: 0,
      id: this.data.curSelComment.id,
      replyId: this.data.article.id
    }).then(res => {
      if (res.code === 0) {
        const { article } = this.data;
        article.comment_count --;
        this.setData({ article });
        this.loadComent.refresh();
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    })
  },


  onReleaseComment(e) {
    const { commentContent, commentImages } = this.data;
    if(!commentContent && !commentImages.length) return;
    const {
      commentType,
      article,
      curSelComment
    } = this.data;
    wx.showLoading({
      title: '正在发布...'
    })
    const uploadTask = [];
    for (let i = 0; i < commentImages.length; i++) {
      //如果已经是服务端的图片链接，则不需重新上传
      uploadTask.push(uploadFile({
        file: commentImages[i]
      }))
    }
    Promise.all(uploadTask).then(imgRes => {
      const commentImagesUrl = [];
      imgRes.forEach(item => {
        commentImagesUrl.push(item.result || '');
      })
      addComment({
        type: commentType,
        content: commentContent,
        images: commentImagesUrl.toString(),
        reply_id: commentType == 0 ? article.id : curSelComment.id
      }).then(res => {
        wx.hideLoading();
        if (res.code === 0) {
          wx.showToast({
            title: '发表评论成功',
            icon: 'none'
          })
          this.setData({ commentContent: '', commentImages: [] })
          this.loadComent.refresh();
        }
      })
    })
  },
  onWriteComment() {
    this.setData({ commentType: 0, writeCommentFocus: true });
  },
  onFocusWriteComment(e) {
    this.setData({
      operationBottom: e.detail.height
    });
  },
  onBlurWriteComment() {
    this.setData({
      operationBottom: 0,
      writeCommentFocus: false
    });
  },
  onChooseImg() {
    // this.data.focusFlag = true;
    const {
      commentImages,
      MAX_IMG_NUM
    } = this.data;
    const max = MAX_IMG_NUM - commentImages.length;
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
          commentImages: commentImages.length ? commentImages.concat(files) : files
        })
      },
      complete: () => {
        // this.data.focusFlag = false;
      }
    })
  },
  onDeleteImg(e) {
    const index = e.currentTarget.dataset.index;
    const {
      commentImages
    } = this.data;
    commentImages.splice(index, 1);
    this.setData({
      commentImages
    })
  },


  _followUser() {
    const { article } = this.data;
    if (article.followed) {
      wx.showModal({
        title: '提示！',
        content: '取消关注该用户？',
        success: res => {
          if (res.confirm) {
            followUser({
              targetId: article.open_id,
              status: 0
            }).then(res => {
              if (res.code === 0) {
                wx.showToast({
                  title: '已取消关注',
                  icon: 'none'
                })
                article.followed = 0;
                this.setData({
                  article
                });
              }
            })
          }
        }
      })
    } else {
      followUser({
        targetId: article.open_id,
        status: 1
      }).then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: '关注成功！',
            icon: 'none'
          })
          article.followed = 1;
          this.setData({
            article
          });
        }
      })
    }
  },

  onTapUserAvatar() {
    wx.navigateTo({
      url: `/pages/user_home/user_home?openId=${this.data.article.open_id}`
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
    if (!this.viewCountTimer) {
      this._addArticleViewCount();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearTimeout(this.viewCountTimer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearTimeout(this.viewCountTimer);
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
    this.loadComent.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})