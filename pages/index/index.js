//index.js
const App = getApp();
Page({
  data: {},
  select_coupon: function (e) {
    var current_index = e.currentTarget.dataset.index;
    wx.showToast({
      title: "领取成功",
      icon: "success",
      duration: 2000
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getIndex();
    App.getUserInfo();
  },
  getIndex: function () {
    App.HttpService.getIndex().then(function (data) {
      this.setData(data.HomeResponse);
    }.bind(this));
  },
  postTocart: function (e) {
    App.HttpService.postTocart({
      goods_id: e.currentTarget.dataset.productId,
      amount: 1,
      user_id: 1,
      single_group: 1
    }).then(function (data) {
      App.WxService.showToast({
        title: data.AddToShoppingCarResponse.message,
        icon: "success",
        duration: 2000
      });
    })
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
  },
  onReachBottom: function () {

  }
})