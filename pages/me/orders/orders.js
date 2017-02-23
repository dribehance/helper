// pages/me/orders/orders.js
const App = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      params:options
    });
    if (options.type == "pay") {
      this.getPayOrders();
    }
    if (options.type == "unpay") {
      this.getUnpayOrders();
    }
  },
  getPayOrders:function(){
    App.HttpService.getPayOrders().then(function(data){
      this.setData(data.topayOrdersResponse)
    }.bind(this))
  },
  getUnpayOrders:function(){
    App.HttpService.getUnpayOrders().then(function(data){
      this.setData(data.topayOrdersResponse)
    }.bind(this))
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})