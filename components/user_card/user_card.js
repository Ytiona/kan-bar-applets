// components/user_card/user_card.js
import { followUser } from '../../api/user';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user: Object
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
    _followUser(e) {
      const {
        user
      } = e.currentTarget.dataset;
      if (user.followed) {
        wx.showModal({
          title: '提示！',
          content: '取消关注该用户？',
          success: res => {
            if (res.confirm) {
              followUser({
                targetId: user.open_id,
                status: 0
              }).then(res => {
                if (res.code === 0) {
                  wx.showToast({
                    title: '已取消关注',
                    icon: 'none'
                  })
                  user.followed = 0;
                  this.setData({ user });
                }
              })
            }
          }
        })
      } else {
        followUser({
          targetId: user.open_id,
          status: 1
        }).then(res => {
          if (res.code === 0) {
            wx.showToast({
              title: '关注成功！',
              icon: 'none'
            })
            user.followed = 1;
            this.setData({ user });
          }
        })
      }
    },
    onTapUserAvatar() {
      wx.navigateTo({
        url: `/pages/user_home/user_home?openId=${this.data.user.open_id}`
      })
    },
  }
})
