// pages/comment_reply/comment_reply.js
import {
  getComments,
  addComment,
  deleteComment
} from '../../api/comment';
import {
  LoadByPage
} from '../../utils/util';
import {
  uploadFile
} from '../../api/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originComment: {},
    replyList: [],
    commentType: 1,
    commentFocus: false,
    commentOptionVisible: false,
    curSelComment: {},
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
    this.loadReplyComment = new LoadByPage({
      vm: this,
      apiFn: getComments,
      dataFileid: 'replyList',
      getDataFnName: 'getReply'
    })
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('transferComment', comment => {
      this.setData({
        originComment: comment,
        curSelComment: comment
      });
      this.getReply();
    })
  },
  getReply() {
    this.loadReplyComment.getData({
      id: this.data.originComment.id,
      type: 1
    });
  },
  onWriteComment() {
    this.setData({
      commentType: 1
    });
  },

  onTapComment(e) {
    this.setData({
      curSelComment: e.currentTarget.dataset.comment,
      commentOptionVisible: true,
      commentType: e.currentTarget.dataset.type
    })
  },
  replyComment() {
    this.setData({
      writeCommentFocus: true,
      commentType: 2
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
  onDeleteComment() {
    const {
      curSelComment,
      originComment
    } = this.data;
    deleteComment({
      id: this.data.curSelComment.id,
      type: 1,
      replyId: this.data.originComment.id
    }).then(res => {
      if (res.code === 0) {
        this.setPrevPgCommentList(-1);
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
        if (originComment.id == curSelComment.id) {
          const pages = getCurrentPages();
          const beforePage = pages[pages.length - 2];
          beforePage.loadComent.refresh();
          setTimeout(() => {
            wx.navigateBack();
          }, 800);
        } else {
          this.loadReplyComment.refresh();
        }
      }
    })
  },

  onReleaseComment(e) {
    const {
      commentType,
      curSelComment,
      originComment,
      commentContent,
      commentImages
    } = this.data;
    if (!commentContent && !commentImages.length) return;
    const requestData = {
      type: commentType,
      content: commentContent,
      reply_id: curSelComment.id
    };
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
      requestData.images = commentImagesUrl.toString();
      if (commentType == 2) {
        requestData.origin_comment_id = originComment.id;
      }
      addComment(requestData).then(res => {
        wx.hideLoading();
        if (res.code === 0) {
          this.setPrevPgCommentList(1);
          wx.showToast({
            title: '发表评论成功',
            icon: 'none'
          })
          this.setData({
            commentImages: [],
            commentContent: ''
          });
          this.loadReplyComment.refresh();
        }
      })
    })
  },
  onWriteComment() {
    this.setData({
      commentType: 1,
      writeCommentFocus: true
    });
  },
  onFocusWriteComment(e) {
    this.setData({
      operationBottom: e.detail.height
    });
  },
  onBlurWriteComment() {
    this.setData({
      writeCommentFocus: false,
      operationBottom: 0
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

  setPrevPgCommentList(diffVal) {
    const pages = getCurrentPages();
    const beforePage = pages[pages.length - 2];
    const {
      commentList
    } = beforePage.data;
    commentList.forEach(item => {
      if (item.id == this.data.originComment.id) {
        item.reply_count += diffVal;
      }
    })
    beforePage.setData({
      commentList
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