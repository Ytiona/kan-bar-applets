// components/article_card/article_card.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    article: Object
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
      })
    }
  }
})
