// components/comment_card/comment_card.js
import { debounce } from '../../utils/util';
import { giveLaud } from '../../api/index';
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    comment: Object,
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
    },
    isOrigin: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    commentOptionVisible: false
  },
  lifetimes: {
    attached() {
      this.laudCommentByDb = debounce(giveLaud, 500, 1);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLaud() {
      let { comment } = this.data;
      comment.lauded = !comment.lauded;
      if(comment.lauded) comment.laud_count ++;
      else comment.laud_count --;
      this.setData({ comment });
      this.laudCommentByDb({
        type: 1,
        status: comment.lauded,
        id: comment.id
      })
      if(this.data.isOrigin) {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('onLaudOrigin', comment.lauded, comment.laud_count);
      }
    },
    goCommentReply() {
      wx.navigateTo({
        url: '/pages/comment_reply/comment_reply',
        success: res => {
          res.eventChannel.emit('transferComment', this.data.comment);
        },
        events: {
          onLaudOrigin: (lauded, laud_count) => {
            this.data.comment.lauded = lauded;
            this.data.comment.laud_count = laud_count;
            this.setData({ comment: this.data.comment });
          }
        }
      })
    },
    onTapComment() {
      this.setData({
        commentOptionVisible: true
      })
    },
    onTapAdopte() {
      this.triggerEvent('onTapAdopte');
    },
    previewImage(e) {
      const images = this.data.comment.images;
      const index = e.currentTarget.dataset.index;
      wx.previewImage({
        urls: images,
        current: images[index]
      })
    },
    onTapUserAvatar() {
      wx.navigateTo({
        url: `/pages/user_home/user_home?openId=${this.data.comment.open_id}`
      })
    },
  }
})
