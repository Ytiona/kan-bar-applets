// components/write_coment_box/write_comment_box.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    focus: {
      type: Boolean,
      value: false
    },
    commentContent: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    MAX_IMG_NUM: 9,
    images: [],
    focusFlag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onWriteComment() {
      this.setData({ focus: true });
      this.triggerEvent('onWriteComment');
    },
    onBlurWriteComment() {
      this.setData({ focus: this.data.focusFlag });
      this.triggerEvent('onBlur');
    },
    onFocusWriteComment(e) {
      this.triggerEvent('onFocus', e.detail);
    },
    onChooseImg() {
      this.data.focusFlag = true;
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
        },
        complete: () => {
          this.data.focusFlag = false;
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
    onReleaseComment() {
      const { commentContent, images } = this.data;
      if(commentContent || images.length) {
        this.triggerEvent('onReleaseComment', { commentContent, images });
        this.setData({ commentContent: '' });
      }
    },
  }
})
