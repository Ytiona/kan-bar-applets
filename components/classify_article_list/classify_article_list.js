import { getAllArticle } from '../../api/article';
import { LoadByPage } from '../../utils/util';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String,
    tag: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    articleList: []
  },

  lifetimes: {
    created() {
      this.loadByPage = new LoadByPage({
        vm: this,
        apiFn: getAllArticle,
        dataFileid: 'articleList'
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
      const { type, tag } = this.data;
      this.loadByPage.getData({ type, tag: type == 0 ? tag != '全部' ? tag : '' : '' });
    },
    refresh() {
      this.loadByPage.refresh();
    },
    loadMore() {
      this.loadByPage.loadMore();
    }
  }
})
