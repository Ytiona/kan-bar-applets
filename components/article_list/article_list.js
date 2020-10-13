// components/article_list/article_list.js
import { deleteArticle } from '../../api/article';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String,
    articleList: Array,
    haveMore: Boolean,
    loadingMore: Boolean
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
    onTapMenu(e) {
      wx.showActionSheet({
        itemList: ['编辑', '删除'],
        success: res => {
          if(res.tapIndex == 0) {
            wx.navigateTo({
              url: `/pages/add_article/add_article?isEdit=true&type=${e.detail.article_type}`,
              success: res => {
                res.eventChannel.emit('transferArticle', e.detail)
              }
            })
          } else if(res.tapIndex == 1) {
            wx.showModal({
              title: '提示',
              content: '确定删除当前帖子？',
              confirmText: '确定删除',
              confirmColor: 'red',
              success: res => {
                if(res.confirm) {
                  deleteArticle({ id: e.detail.id }).then(res => {
                    if(res.code === 0) {
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success'
                      })
                      this.triggerEvent('onDeleteArticle');
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  }
})
