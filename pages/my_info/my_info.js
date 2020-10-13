// pages/my_info/my_info.js
import {
  uploadAvatar,
  updateUserInfo,
  checkNickname
} from '../../api/user';
import { debounce } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nameModalVisible: false,
    declarationModalVisible: false,
    sexModalVisible: false,
    regionModalVisible: false,
    QQModalVisible: false,
    region: [],
    currentRegions: [],
    selectedRegionIdx: [0, 0],
    userInfoForm: {},
    nickname: '',
    nicknameUsable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },

  init() {
    this.checkNicknameByDb = debounce((nickname) => {
      checkNickname({ nickname }).then(res => {
        if(res.code === 0) {
          this.setData({
            nicknameUsable: res.result
          })
        }
      })
    }, 800);
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo,
      userInfoForm: userInfo
    });
    const timer = setInterval(() => {
      const region = getApp().globalData.region;
      if (region) {
        this.setData({
          region,
          currentRegions: region[0].districts
        });
        clearInterval(timer);
      }
    }, 200)
  },

  chooseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: res => {
        console.log(res);
        uploadAvatar(res.tempFiles[0]).then(res => {
          if (res.code === 0) {
            const {
              userInfo
            } = this.data;
            userInfo.avatar = res.result;
            this.setData({
              userInfo
            });
            wx.setStorageSync('userInfo', userInfo);
          }
        })
      }
    })
  },

  showEditModal(e) {
    const {
      param
    } = e.currentTarget.dataset;
    this.setData({
      [param + 'ModalVisible']: true
    })
    if (param == 'region') {
      const {
        region,
        userInfo
      } = this.data;
      if (userInfo.region) {
        const currentRegion = userInfo.region.split(' ');
        const provinceIdx = region.findIndex(item => item.name == currentRegion[0]);
        if (provinceIdx !== -1) {
          const cityIdx = region[provinceIdx].districts.findIndex(item => item.name == currentRegion[1]);
          this.setData({
            currentRegions: region[provinceIdx].districts,
            selectedRegionIdx: [provinceIdx, cityIdx]
          });
        }
      }
    }
  },

  regionPickerChange(e) {
    if (e.currentTarget.dataset.flag) {
      if (this.data.selectedRegionIdx[0] !== e.detail.value[0]) {
        this.setData({
          currentRegions: this.data.region[e.detail.value[0]].districts,
          selectedRegionIdx: [e.detail.value[0], 0]
        })
      } else {
        this.setData({
          selectedRegionIdx: [e.detail.value[0], e.detail.value[1]]
        })
      }
    }
  },

  updateUserInfoFrom(e) {
    const value = e.detail.value;
    const {
      key
    } = e.currentTarget.dataset;
    const {
      userInfoForm
    } = this.data;
    userInfoForm[key] = value;
    this.setData({
      userInfoForm
    });
    if(key == 'nickname' && value !== '') {
      this.checkNicknameByDb(value);
    }
  },

  clearInput(e) {
    console.log(e);
    const {
      userInfoForm
    } = this.data;
    userInfoForm[e.currentTarget.dataset.key] = '';
    this.setData({
      userInfoForm
    });
  },

  async _updateUserInfo(e) {
    let {
      key,
      value
    } = e.currentTarget.dataset;
    if(key == 'nickname') {
      value = this.data.userInfoForm.nickname;
      if(value === '' || value === null || value === undefined) {
        return;
      }
      const checkRes = await checkNickname({ nickname: value });
      if(checkRes.result) {
        this.hideEditNickname();
      } else {
        return;
      }
    } else {
      this.hideEditNickname();
    }
    const {
      userInfoForm,
      userInfo,
      region,
      selectedRegionIdx
    } = this.data;
    if (key == 'sex') {
      userInfoForm.sex = value;
      this.setData({
        userInfoForm
      });
    } else if (key == 'region') {
      const province = region[selectedRegionIdx[0]];
      userInfoForm.region = `${province.name} ${province.districts[selectedRegionIdx[1]].name}`;
    }
    updateUserInfo({
      [key]: userInfoForm[key]
    }).then(res => {
      if (key == 'sex') {
        this.setData({
          sexModalVisible: false
        });
      }
      if (res.code === 0) {
        userInfo[key] = userInfoForm[key];
        this.setData({
          userInfo
        });
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        })
        wx.setStorageSync('userInfo', userInfo);
      }
    })
  },
  hideEditNickname() {
    this.setData({
      nameModalVisible: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})