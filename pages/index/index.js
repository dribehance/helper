//index.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.reload();
  },
  getIndex: function () {
    App.HttpService.getIndex().then(data => {
      this.setData(data.HomeResponse);
    }, error => {
      this.setData(error)
    });
  },
  selectCoupon: function (e) {
    var coupon_id = e.currentTarget.dataset.id;
    App.HttpService.selectCoupon({
      vancher_id: coupon_id
    }).then(data => {
      var conpuons = this.data.vanchers.map(v => {
        if (v.id == coupon_id) {
          v.status_info = "领取成功"
          return v;
        }
        return v;
      });
      this.setData({
        vanchers: conpuons
      });
      setTimeout(() => {
        App.WxService.showToast({
          title: `${data.PickUpVancherResponse.message}`,
          icon: "success",
          duration: 2000
        });
      }, 1000);
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
  preview:function(e){
    var index = e.currentTarget.dataset.index,
      banner = this.data.banners[index];
      if (banner.action == 0) {
        banner.target != "#" && App.WxService.navigateTo("/pages/product/product?id="+banner.target);
      }
      else {
        App.WxService.navigateTo("/pages/webview/webview?id="+banner.id);
      }
  },
  reload: function () {
    App.getUserInfo().then(data => {
      this.getIndex();
    },error => {
      this.getIndex();
    });
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