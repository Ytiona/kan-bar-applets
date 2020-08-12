// components/base_tabs/base_tabs.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true,
    styleIsolation: 'apply-shared'
  },

  properties: {
    tabList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleNav(e) {
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      });
      this.triggerEvent('on-change', e.currentTarget.dataset.index);
    }
  }
})
