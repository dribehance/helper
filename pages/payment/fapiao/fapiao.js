// pages/payment/fapiao/fapiao.js
const App = getApp();
Page({
  data: {
    fapiao: {
      type: "detail",
      name: ""
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  getFapiaoFromCache: function () {
    App.WxService.getStorage({
      key: "cache_fapiao"
    }).then(function (response) {
      this.setData({
        fapiao: response.data
      })
    }.bind(this));
  },
  selectFapiao: function (e) {
    this.setData({
      "fapiao.type": e.currentTarget.dataset.type
    })
  },
  formSubmit: function (e) {
    if (this.data.fapiao.type == "detail" && !e.detail.value.name) {
      App.WxService.showModal({
        title: '友情提示',
        content: `请填写发票抬头`,
        showCancel: !1,
      })
      return;
    };
    App.WxService.setStorage({
      key: "cache_fapiao",
      data: {
        type: this.data.fapiao.type,
        name: e.detail.value.name
      }
    }).then(function () {
      App.WxService.navigateBack();
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getFapiaoFromCache();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})