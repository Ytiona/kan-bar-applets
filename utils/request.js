import config from '../api/config';
import {
  loginApi
} from '../api/user.js';

const { timeout, baseUrl } = config;

//各类请求最终进入该方法，可以在此方法内做一些拦截操作
export function request(options) {
  const isConnected = getApp().globalData.isConnected;
  if (!isConnected) {
    showNetworkErr();
  } else {
    const {
      url,
      method,
      header,
      data,
      successCallBack,
      failCallBack
    } = options;
    const token = wx.getStorageSync('token');
    wx.request({
      timeout,
      method,
      data: deleteInvalidKey(data),
      header: {
        'Authorization': `Bearer ${token}`,
        ...header
      },
      url: `${baseUrl}${url}`,
      success: res => {
        const { statusCode, data } = res;
        //处理401（ticket不对）、400(未传ticket)情况
        if(statusCode === 401 || statusCode === 400) {
          login();//重新登录
          return;
        }
        //以下状态码和后端约定做对应的处理
        let message = '';
        switch (data.code) {
          //-1状态码需要弹出提示
          case -1:
            message = data.msg || '未知错误';
            break;
            //500状态码即为后端报错,弹出未知错误
          case 500:
            message = '未知错误';
            break;
        }
        if (message !== '') {
          wx.showModal({
            title: '提示',
            content: message,
            showCancel: false,
            mask: true
          })
        }
        successCallBack(data);
      },
      fail: err => {
        console.log(err);
        //如果是在网络正常的情况下，则重新登录获取ticket
        if(isConnected) {
          login();
        } else {
          showNetworkErr();
        }
        failCallBack(err);
      }
    })
  }
}

//get请求
export const getRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'GET',
      data: params,
      successCallBack: res => {
        resolve(res);
      },
      failCallBack: err => {
        reject(err);
      }
    })
  })
}

//post请求
export const postRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'POST',
      data: params,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      successCallBack: res => {
        resolve(res);
      },
      failCallBack: err => {
        reject(err);
      }
    })
  })
}

//postjson请求
export const postJsonRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'POST',
      data: params,
      successCallBack: res => {
        resolve(res);
      },
      failCallBack: err => {
        reject(err);
      }
    })
  })
}

//不带ticket的请求，如：登录接口
export const postNotTicketRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      timeout,
      method: "POST",
      data: deleteInvalidKey(params),
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: `${baseUrl}${url}`,
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

//上传文件
export const uploadRequest = (url, {file, name = 'file', maxSize = -1}) => {
  const token = wx.getStorageSync('token');
  return new Promise((resolve, reject) => {
    if(maxSize > 0 && file.size > maxSize * 1000) {
      wx.showModal({
        title: `请上传${maxSize/1000}M以内的文件`,
        showCancel: false
      })
      reject({ name: 'THE FILE SIZE IS TOO LARGE', msg: '文件体积过大！' })
      return;
    }
    const filePath = file.path;
    wx.uploadFile({
      filePath,
      name,
      url: `${baseUrl}${url}`,
      header: {
        'Authorization': `Bearer ${token}`,
      },
      success: res => {
        resolve(JSON.parse(res.data));
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

//上传并压缩文件
export const compressUploadRequest = (url, {file, name = 'file', quality = 80, maxSize = -1}) => {
  const token = wx.getStorageSync('token');
  return new Promise((resolve, reject) => {
    if(maxSize > 0 && file.size > maxSize * 1000) {
      wx.showModal({
        title: `请上传${maxSize/1000}M以内的文件`,
        showCancel: false
      })
      reject({ name: 'THE FILE SIZE IS TOO LARGE', msg: '文件体积过大！' })
      return;
    }
    const filePath = file.path;
    wx.compressImage({
      quality,
      src: filePath,
      success: compressRes => {
        wx.uploadFile({
          name,
          filePath: compressRes.tempFilePath,
          url: `${baseUrl}${url}`,
          header: {
            'Authorization': `Bearer ${token}`,
          },
          success: res => {
            resolve(JSON.parse(res.data));
          },
          fail: err => {
            reject(err);
          }
        })
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

//断网的提示
function showNetworkErr() {
  const pages = getCurrentPages();
  const curPage = pages[pages.length - 1];
  if(!curPage.networkErrFlag) {
    wx.showModal({
      title: '您的网络好像出现了问题',
      showCancel: false,
      mask: true,
      confirmText: '重试',
      success: res => {
        if (res.confirm) {
          curPage.networkErrFlag = false;
          curPage.onLoad(curPage.options);
        }
      }
    })
    curPage.networkErrFlag = true;
  }
}

//登录
function login() {
  wx.showLoading({
    title: '正在登录',
    mask: true
  });
  wx.login({
    success: res => {
      loginApi({ code: res.code })
      .then(res => {
        wx.setStorageSync('token', res.result);
        wx.hideLoading();
        reloadPage();
      }).catch(err => {
        console.log(err);
      })
    },
    fail: err => {
      console.log(err);
    }
  })
}

//重新加载页面
function reloadPage() {
  const pages = getCurrentPages();
  const curPage = pages[pages.length - 1];
  curPage.onLoad(curPage.options);
}

//去除params中的undefined和null字段
function deleteInvalidKey(obj) {
  const result = {};
  for(let prop in obj) {
    if(obj[prop] !== null && obj[prop] !== undefined) {
      result[prop] = obj[prop];
    }
  }
  return result;
}
