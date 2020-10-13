import { debounce, throttle } from './utils/util';

//app.js
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.navHeight = res.statusBarHeight;
      }
    }),
    //获取行政区,(高德api)
    wx.request({
      url: 'https://restapi.amap.com/v3/config/district?parameters&key=39db46a25b52d0a2ceb332de87ac67e6&subdistrict=2',
      success: (res) => {
        this.globalData.region = res.data.districts[0].districts;
      }
    })
  },
  globalData: {
    navHeight: 0,                     //设备顶部高度
    region: [],                       //行政区,
    isConnected: true,               //网络是否断开
  }
})