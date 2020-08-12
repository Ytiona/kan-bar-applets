// components/comment_card/comment_card.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    showReplay: {
      type: Boolean,
      value: true
    },
    adopted: {
      type: Boolean,
      value: false
    },
    showAdoptBtn: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goCommentReply() {
      wx.navigateTo({
        url: '/pages/comment_reply/comment_reply',
      })
    }
  }
})
