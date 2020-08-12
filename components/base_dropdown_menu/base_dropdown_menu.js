// components/base_dropdown_menu/base_dropdown_menu.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },
  properties: {
    menuList: Array,
    toUp: {
      type: Boolean,
      value: false
    },
    isEmbed: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    open: false,
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle() {
      this.setData({ open: !this.data.open });
    },
    onChange(e) {
      this.setData({ currentIndex: e.currentTarget.dataset.index });
      this.triggerEvent('onChange', e.currentTarget.dataset.index);
      this.toggle();
    }
  }
})
