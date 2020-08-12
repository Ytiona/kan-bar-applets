// components/base_modal/base_modal.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    title: String,
    visible: {
      type: Boolean,
      value: false
    },
    footerHide: {
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
    onCancel() {
      this.setData({ visible: false });
      this.triggerEvent('onCancel');
    },
    onOk() {
      this.setData({ visible: false });
      this.triggerEvent('onOk');
    }
  }
})
