//index.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.reload();
  },
  getIndex: function () {
    App.HttpService.getIndex().then(function (data) {
      this.setData(data.HomeResponse);
    }.bind(this));
  },
  selectCoupon: function (e) {
    var coupon_id = e.currentTarget.dataset.id;
    App.HttpService.selectCoupon({
      vancher_id: coupon_id
    }).then(data => {
      App.WxService.showToast({
        title: `${data.PickUpVancherResponse.message}`,
        icon: "success",
        duration: 2000
      });
      var conpuons = this.data.vanchers.map(v => {
        if (v.id == coupon_id) {
          v.status_info = "领取成功"
          return v;
        }
        return v;
      });
      this.setData({
        vanchers: conpuons
      })
    });
  },
  postTocart: function (e) {
    App.HttpService.postTocart({
      goods_id: e.currentTarget.dataset.productId,
      amount: 1,
      // single_group: 1
    }).then(function (data) {
      App.WxService.showToast({
        title: data.AddToShoppingCarResponse.message,
        icon: "success",
        duration: 2000
      });
    })
  },
  reload: function () {
    this.getIndex();
    App.getUserInfo();
  },
  onImageLoadError: function (e) {
    var that = this;
    App.Utils.onImageLoadError(e, that);
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