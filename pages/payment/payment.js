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
        this.setData({
          address: address[0]
        });
      }
    }.bind(this))
  },
  getGoodsFromCache: function () {
    App.WxService.getStorage({
      key: "cache_goods",
    }).then(response => {
      this.setData({
        goods: response.data
      });
      return App.HttpService.getPrepayPayOrderInfo({
        shopping_car_id: this.data.goods.map(g => {
          return g.shopping_car_id;
        }).join(",")
      });
    }).then(data => {
      this.setData({
        prepayPayOrderInfo: data.ToPayShoppingCarResponse
      });
      this.calculateTotalGoodsMoney();
    });
  },
  getCouponFromCache: function () {
    return App.WxService.getStorageSync("cache_coupon");
  },
  removeCouponFromCache: function () {
    return App.WxService.removeStorageSync("cache_coupon");
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
  calculateTotalGoodsMoney: function () {
    var total_money = 0,
      coupon = this.getCouponFromCache(),
      traffic_cost = this.data.prepayPayOrderInfo.transport_fee,
      price = this.data.prepayPayOrderInfo.goods_price;
    // 商品总价
    this.data.goods.forEach(function (g) {
      total_money += g.show_price * g.amount;
    });
    total_money = Math.max(0, total_money);
    // 是否包邮
    if (total_money > price) {
      traffic_cost = 0;
    }
    this.setData({
      total_money: total_money,
      coupon: coupon,
      traffic_cost: traffic_cost
    })
  },
  getAvailableCoupons: function () {
    var shopping_car_ids = this.data.goods.map(g => {
      return g.shopping_car_id;
    }).join(",");
    App.WxService.navigateTo("/pages/me/coupons/coupons?from=payment&ids=" + shopping_car_ids);
  },
  formSubmit: function (e) {
    if (!this.data.address) {
      App.WxService.showModal({
        title: '友情提示',
        content: '请选择收货地址',
        showCancel: !1,
      });
      return;
    }
    var params = {};
    this.setData({
      disabled: true
    });
    this.generateOrder(e);
  },
  generateOrder: function (e) {
    App.HttpService.fillinorder({
      shopping_car_id: this.data.goods.map(g => {
        return g.shopping_car_id;
      }).join("、"),
      note: e.detail.message || "",
      expense: this.data.traffic_cost,
      vancher_id: this.data.coupon.vancher_id,
      address_id: this.data.address.id
    }).then(data => {
      App.WxService.setStorage({
        key: "info",
        data: "shoppingcartUpdate"
      });
      this.removeCouponFromCache();
      return App.HttpService.payOrder({
        order_group_id: data.PrepayResponse.order_group_id
      });
    }, error => {
      App.WxService.setStorage({
        key: "info",
        data: "shoppingcartUpdate"
      });
      this.removeCouponFromCache();
    }).then(data => {
      this.invokeWxPay(data.PrepayResponse);
    });
  },
  invokeWxPay: function (params) {
    App.WxService.requestPayment({
      timeStamp: params.timestamp,
      nonceStr: params.noncestr,
      package: params.package,
      signType: "MD5",
      paySign: params.sign,
    }).then(data => {
      setTimeout(() => {
        App.WxService.showToast({
          title: "支付成功",
          icon: "success",
          duration: 2000
        }).then(() => {
          App.WxService.navigateBack();
        });
      }, 1000);
    }, error => {
      App.WxService.showModal({
        title: '友情提示',
        content: '已经加入订单，请到待支付订单完成支付',
        showCancel: !1,
      }).then(response => {
        App.WxService.navigateBack();
      })
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
    this.getGoodsFromCache();
    this.getAddressFromCache();
    this.getFapiaoFromCache();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    this.removeCouponFromCache();
  }
})