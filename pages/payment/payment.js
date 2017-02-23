// pages/payment/payment.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  getAddressFromCache: function () {
    App.WxService.getStorage({
      key: "cache_address"
    }).then(function (response) {
      this.setData({
        address: response.data
      })
    }.bind(this), function (error) {
      this.getAddress();
    }.bind(this));
  },
  getAddress: function () {
    App.HttpService.getAddress({ id: 1 }).then(function (data) {
      var address = data.AddressesResponse.addresses.filter(function (g) {
        return g.is_default == 1;
      })
      if (address[0]) {
        this.setData(address[0]);
      }
    }.bind(this))
  },
  getGoodsFromCache: function () {
    App.WxService.getStorage({
      key: "cache_goods",
    }).then(function (response) {
      this.setData({
        goods: response.data
      });
      this.calculateTotalMoney();
    }.bind(this))
  },
  getCouponFromCache: function () {
    return App.WxService.getStorageSync("cache_coupon");
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
  calculateTotalMoney: function () {
    var total_money = 0,
      coupon = this.getCouponFromCache(),
      traffic_cost = this.getTrafficCost();
    this.data.goods.forEach(function (g) {
      total_money += g.show_price * g.amount;
    });
    if (coupon) {
      total_money = total_money - coupon.price + traffic_cost;
    }
    total_money = Math.max(0,total_money);
    this.setData({
      total_money: total_money,
      coupon: coupon,
      traffic_cost: traffic_cost
    })
  },
  getTrafficCost: function () {
    var traffic_cost = 0;
    return traffic_cost;
  },
  formSubmit:function(e){
    console.log(e)
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
    this.getGoodsFromCache();
    this.getAddressFromCache();
    this.getFapiaoFromCache();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})