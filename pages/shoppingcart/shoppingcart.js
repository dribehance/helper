// pages/shoppingcart/shoppingcart.js
const App = getApp();
Page({
  data: {
    shoppingcartList: [{
      name: " Apple Iphone 7 A1660移动联通电信三合一",
      color: "黑色",
      price: "5220",
      amount: 1,
      imageUrl: "/images/example.png",
      check: true,
      touchstartData: {},
      touchmoveData: {},
      touchendData: {},
      animateData: {}
    }, {
      name: " Apple Iphone 6 A1660移动联通电信三合一",
      color: "黑色",
      price: "5220",
      amount: 1,
      imageUrl: "/images/example.png",
      check: true,
      touchstartData: {},
      touchmoveData: {},
      touchendData: {},
      animateData: {}
    }, {
      name: " Apple Iphone 5 A1660移动联通电信三合一",
      color: "黑色",
      price: "5220",
      amount: 1,
      imageUrl: "/images/example.png",
      check: true,
      touchstartData: {},
      touchmoveData: {},
      touchendData: {},
      animateData: {}
    }, {
      name: " Apple Iphone 7 A1660移动联通电信三合一",
      color: "黑色",
      price: "5692",
      amount: 1,
      imageUrl: "/images/example.png",
      check: true,
      touchstartData: {},
      touchmoveData: {},
      touchendData: {},
      animateData: {}
    }, {
      name: " Apple Iphone 7 A1660移动联通电信三合一",
      color: "黑色",
      price: "5220",
      amount: 1,
      imageUrl: "/images/example.png",
      check: true,
      touchstartData: {},
      touchmoveData: {},
      touchendData: {},
      animateData: {}
    }],
    checkAll: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.deleteShoppingcart();
  },
  getShoppingcart: function () {
    App.HttpService.getShoppingcart().then(function (data) {
      console.log(data)
    })
  },
  deleteShoppingcart: function () {
    App.HttpService.deleteShoppingcart({
      shopping_car_id: 2
    }).then(function (data) {
      App.WxService.showToast({
        title: "删除成功",
        icon: "success",
        duration: 2000
      })
    })
  },
  translateX: function (index, x) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation;

    animation.translateX(x).step();

    var shoppingcartList = this.data.shoppingcartList;
    for (var i = 0; i < shoppingcartList.length; i++) {
      if (i == index) {
        shoppingcartList[i].animateData = animation;
      }
    }

    this.setData({
      shoppingcartList: shoppingcartList
    })
  },
  ontouchstart: function (e) {
    var current_index = e.currentTarget.dataset.index,
      shoppingcartList = this.data.shoppingcartList;
    for (var i = 0; i < shoppingcartList.length; i++) {
      if (i == current_index) {
        shoppingcartList[i].touchstartData = e.changedTouches[0];
      }
    }
    this.setData({
      shoppingcartList: shoppingcartList
    })
  },
  ontouchmove: function (e) {
    var current_index = e.currentTarget.dataset.index,
      deltaX = e.changedTouches[0].clientX - e.currentTarget.dataset.touchstart.clientX,
      deltaY = e.changedTouches[0].clientY - e.currentTarget.dataset.touchstart.clientY;
    // 竖向滚动 大于30度度 忽略
    if (Math.abs(deltaY) / Math.abs(deltaX) > Math.tan(15 * Math.PI / 180)) {
      return;
    }
    deltaX = Math.min(deltaX, 0);
    deltaX = Math.max(-100, deltaX);
    this.translateX(current_index, deltaX);
  },
  ontouchend: function (e) {
    var current_index = e.currentTarget.dataset.index,
      deltaX = e.changedTouches[0].clientX - e.currentTarget.dataset.touchstart.clientX,
      deltaY = e.changedTouches[0].clientY - e.currentTarget.dataset.touchstart.clientY;
    // 竖向滚动 大于30度度 忽略
    if (Math.abs(deltaY) / Math.abs(deltaX) > Math.tan(15 * Math.PI / 180)) {
      this.translateX(current_index, 0);
      return;
    }
    deltaX = deltaX < -50 ? -100 : 0;
    this.translateX(current_index, deltaX);
  },
  check: function (e) {
    var current_index = e.currentTarget.dataset.index, uncheck_size = 0, shoppingcartList = this.data.shoppingcartList;
    for (var i = 0; i < shoppingcartList.length; i++) {
      if (current_index == i) {
        shoppingcartList[i].check = !shoppingcartList[i].check;
      }
      if (!shoppingcartList[i].check) {
        uncheck_size++;
      }
    }
    this.setData({
      shoppingcartList: shoppingcartList,
      checkAll: uncheck_size > 0 ? false : true
    })
  },
  checkAll: function (e) {
    var shoppingcartList = this.data.shoppingcartList,
      checkAll = !this.data.checkAll;
    for (var i = 0; i < shoppingcartList.length; i++) {
      shoppingcartList[i].check = checkAll;
    }
    this.setData({
      shoppingcartList: shoppingcartList,
      checkAll: checkAll
    })
  },
  minus: function (e) {
    var shoppingcartList = this.data.shoppingcartList,
      current_index = e.currentTarget.dataset.index;
    for (var i = 0; i < shoppingcartList.length; i++) {
      if (i == current_index) {
        shoppingcartList[i].amount = Math.max(1, --shoppingcartList[i].amount);
      }
    }
    this.setData({
      shoppingcartList: shoppingcartList
    })
  },
  plus: function (e) {
    var shoppingcartList = this.data.shoppingcartList,
      current_index = e.currentTarget.dataset.index;
    for (var i = 0; i < shoppingcartList.length; i++) {
      if (i == current_index) {
        shoppingcartList[i].amount++;
      }
    }
    this.setData({
      shoppingcartList: shoppingcartList
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
  }
})