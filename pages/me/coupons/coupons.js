// pages/me/coupons/coupons.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.options = options;
    this.getCoupons();
  },
  getCoupons: function () {
    if (this.options.from == "payment") {
      this.getAvailableCoupons();
      return;
    }
    this.getAllCoupons();
  },
  getAllCoupons: function () {
    App.HttpService.getAllCoupons().then(data => {
      this.setData(data.UserVancersResponse);
    }, error => {
      this.setData(error)
    })
  },
  getAvailableCoupons: function () {
    App.HttpService.getAvailableCoupons({
      shopping_car_ids:this.options.ids
    }).then(data => {
      this.setData(data.AvailableVancherResponse);
    }, error => {
      this.setData(error)
    })
  },
  selectCoupon: function (e) {
    if (!this.options.from) return;
    var coupon = this.data.vanchers.filter(function (c) {
      return c.vancher_id == e.currentTarget.dataset.id;
    })
    App.WxService.setStorage({
      key: "cache_coupon",
      data: coupon[0]
    });
    App.WxService.navigateBack();
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