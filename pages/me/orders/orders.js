// pages/me/orders/orders.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.options = options;
    this.getOrders();
  },
  getOrders: function () {
    this.setData({
      params: this.options
    });
    if (this.options.type == "all") {
      App.WxService.setNavigationBarTitle({
        title: '全部订单'
      });
      this.getAllOrders();
    }
    if (this.options.type == "pay") {
      App.WxService.setNavigationBarTitle({
        title: '待收货'
      });
      this.getPayOrders();
    }
    if (this.options.type == "unpay") {
      App.WxService.setNavigationBarTitle({
        title: '待付款'
      });
      this.getUnpayOrders();
    }
  },
  getAllOrders: function () {
    App.HttpService.getAllOrders().then(data => {
      this.setData(data.myPayOrdersResponse)
    }, error => {
      this.setData(error);
    })
  },
  getPayOrders: function () {
    App.HttpService.getPayOrders().then(data => {
      this.setData(data.payOrdersResponse)
    }, error => {
      this.setData(error);
    })
  },
  getUnpayOrders: function () {
    App.HttpService.getUnpayOrders().then(data => {
      this.setData(data.topayOrdersResponse)
    }, error => {
      this.setData(error)
    })
  },
  payOrder: function (e) {
    var index = e.currentTarget.dataset.index
    App.HttpService.payOrder({
      order_group_id: this.data.orders[index].group_id
    }).then(data => {
      this.invokeWxPay(data.PrepayResponse);
    });
  },
  invokeWxPay: function (params) {
    App.WxService.requestPayment({
      // appId:"wx784a22e93b5d5f3e",
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
      console.log(error)
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    App.WxService.getStorage({
      key: "info"
    }).then(response => {
      if (response.data == "orderUpdate") {
        this.getOrders();
        App.WxService.removeStorageSync("info");
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})