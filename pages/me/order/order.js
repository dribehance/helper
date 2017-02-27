// pages/me/order/order.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      group_id: options.id
    });
    this.getOrderById();
  },
  getOrderById: function (id) {
    App.HttpService.getOrderById({
      group_id: this.data.group_id
    }).then(data => {
      this.setData(data.payOrdersDetailsResponse);
    });
  },
  cancelOrder: function () {
    App.WxService.showModal({
      title: '友情提示',
      content: '是否取消订单',
      showCancel: 1,
    }).then(response => {
      App.HttpService.cancelOrder({
        group_id: this.data.group_id
      }).then(data => {
        return App.WxService.setStorage({
          key: "info",
          data: "orderChange"
        })
      }).then(response => {
        App.WxService.navigateBack();
      })
    });
  },
  payOrder: function (e) {
    var index = e.currentTarget.dataset.index
    App.HttpService.payOrder({
      order_group_id: this.data.group_id
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
          return App.WxService.setStorage({
            key: "info",
            data: "orderChange"
          })
        }).then(response => {
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
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})