// components/article_card/article_card.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    article: Object,
    showMenu: {
      type: Boolean,
      value: true
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
    lookDetail() {
      wx.navigateTo({
        url: '/pages/article_detail/article_detail',
        events: {
          onLaudArticle: (laud_count, lauded) => {
            const { article } = this.data;
            article.laud_count = laud_count;
            article.lauded = lauded;
            this.setData({ article })
          },
          onReleaseComment: (comment_count) => {
            const { article } = this.data;
            article.comment_count = comment_count;
            this.setData({ article })
          }
        },
        success: (res) => {
          res.eventChannel.emit('transferData', this.data.article);
        }
      })
    },
    onTapMenu() {
      this.triggerEvent('onTapMenu', this.data.article);
    }
  }
})
