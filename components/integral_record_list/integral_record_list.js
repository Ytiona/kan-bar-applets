// components/integral_records_list/integral_records_list.js
import { getIntegralRecord } from '../../api/index';
import { LoadByPage } from '../../utils/util';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    recordTypeMap: ['签到', '发帖', '发布悬赏', '获得悬赏'],
    integralRecords: []
  },
  lifetimes: {
    created() {
      this.loadByPage = new LoadByPage({
        apiFn: getIntegralRecord,
        vm: this,
        dataFileid: 'integralRecords'
      });
    },
    attached() {
      this.getData();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      this.loadByPage.getData({ type: this.data.type });
    },
    //定义供父页面触底调用
    loadMore() {
      this.loadByPage.loadMore();
    },
    //定义供父页面下拉刷新调用
    refresh() {
      this.loadByPage.refresh();
    }
  }
})
