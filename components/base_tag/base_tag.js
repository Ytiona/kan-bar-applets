// components/base_tag/base_tag.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    closable: {
      type: Boolean,
      value: false
    },
    checkable: {
      type: Boolean,
      value: false
    },
    checked: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: 'default'
    },
    icon: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    colorEnum: {
      default: {
        bgc: '#eee'
      },
      primary: {
        bgc: '#2d8cf0'
      },
      success: {
        bgc: '#19be6b'
      },
      warning: {
        bgc: '#f90'
      },
      error: {
        bgc: '#ed4014'
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange() {
      if(this.data.checkable) {
        this.setData({ checked: !this.data.checked });
        this.triggerEvent('onChange', this.data.checked);
      }
    },
    onClose() {
      this.triggerEvent('onClose');
    }
  }
})
