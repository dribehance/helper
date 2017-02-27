// pages/webview/webview.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.options = options;
    this.getBanner();
  },
  getBanner: function () {
    App.HttpService.getBanner({
      id: this.options.id
    }).then(data => {
      this.setData(data.BannerDetailResponse);
    });
  },
  jump: function () {
    if (this.data.banner.target != "#") {
      App.WxService.redirectTo("/pages/product/product?id=" + this.data.banner.target);
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})