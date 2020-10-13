// components/comment_option/comment_option.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: Boolean,
    showDeleteBtn: Boolean
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
    hiddenCommentOption() {
      this.setData({
        visible: false
      })
    },
    replyComment() {
      this.hiddenCommentOption();
      this.triggerEvent('onReplyComment');
    },
    copyComment() {
      this.hiddenCommentOption();
      this.triggerEvent('onCopyComment');
    },
    deleteComment() {
      this.hiddenCommentOption();
      this.triggerEvent('onDeleteComment');
    }
  }
})
