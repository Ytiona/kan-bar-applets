import { PAGE_SIZE } from './constants';
/**
 * 分页获取
 * params(构造器参数): {
 *  参数名                 类型        默认值         是否必填   描述
 *  apiFn:                Function    无              是          接口方法
 *  vm:                   Object      无              是          实例
 *  dataFileid:           String      无              是         实例中存放数据的字段名
 *  fileidPre:            String      ''              否          三个固定属性(currentPage、haveMore、loadingMore)的前缀名
 *  getDataFnName         String      'getData'       否          实例上获取数据的方法名
 * }  
 */
export class LoadByPage {
  static pageSize = PAGE_SIZE;//静态变量，每次获取多少条
  constructor({ apiFn, vm, dataFileid, fileidPre = '', getDataFnName = 'getData' }) {
    this.apiFn = apiFn;
    this.vm = vm;
    //初始化三个固定属性
    this.vm.data[fileidPre + 'currentPage'] = 1;
    this.vm.data[fileidPre + 'haveMore'] = true;
    this.vm.data[fileidPre + 'loadingMore'] = false;
    this.dataFileid = dataFileid;
    this.fileidPre = fileidPre;
    this.getDataFnName = getDataFnName;
  }

  //获取数据
  getData(apiParams) {
    const { fileidPre } = this;
    let { [fileidPre + 'currentPage']: currentPage, [fileidPre + 'haveMore']: haveMore, [this.dataFileid]: data } = this.vm.data;
    if(!haveMore) {
      this.vm.setData({
        [fileidPre + 'loadingMore']: false
      })
      return false;
    }
    return new Promise((resolve, reject) => {
      return this.apiFn({
        ...apiParams,
        currentPage,
        pageSize: LoadByPage.pageSize
      }).then(res => {
        resolve(res);
        if(res.code === 0) {
          if(res.total <= currentPage * LoadByPage.pageSize) {
            haveMore = false;
          }
          this.vm.setData({ 
            [fileidPre + 'haveMore']: haveMore,
            [fileidPre + 'loadingMore']: false,
            [this.dataFileid]: currentPage == 1 ? res.result : data.concat(res.result)
          })
        }
        wx.stopPullDownRefresh();
      }).catch(err => {
        reject(err);
      })
    })
  }

  //刷新
  refresh () {
    const { fileidPre } = this;
    this.vm.setData({
      [fileidPre + 'currentPage']: 1,
      [fileidPre + 'haveMore']: true
    })
    //通过调用实例上的getData方法，对比调用类自身的getData，好处在于不用重复传相同的参数
    this.vm[this.getDataFnName]();
  }
  
  //加载更多
  loadMore() {
    const { fileidPre, vm, getDataFnName } = this;
    if(vm.data[fileidPre + 'haveMore']) {
      vm.data[fileidPre + 'currentPage'] ++;
      //通过调用实例上的getData方法，对比调用类自身的getData，好处在于不用重复传相同的参数
      vm[getDataFnName]();
    }
  }

}

//防抖，连续操作只取最后一次，最后一次判断标准为多久(参数wait)后没有操作了
export function debounce(fn, wait, immediate) {
  let timeout;
  let isFirst = true;
  return args => {
    if(immediate && isFirst) {
      fn(args);
      isFirst = false;
    } else {
      if(timeout) clearTimeout(timeout);
      timeout = setTimeout(() => { 
        fn(args);
        isFirst = true;
      }, wait);
    }
  }
}

//节流，在时长(参数delay)内，多次执行只取一次
export function throttle (fn, delay) {
  let prev = Date.now();
  return args => {
    if(Date.now() - delay >= prev) {
      prev = Date.now();
      fn(args);
    }
  }
}
