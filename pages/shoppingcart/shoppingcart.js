// pages/shoppingcart/shoppingcart.js
const App = getApp();
Page({
  data: {
    checkAll: true,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.reload();
  },
  getShoppingcart: function () {
    App.HttpService.getShoppingcart().then(data => {
      data.ShoppingCarResponse.goods.map(function (g) {
        g.touchstartData = {};
        g.touchmoveData = {};
        g.touchendData = {};
        g.animateData = {};
        g.check = true;
      })
      this.setData(data.ShoppingCarResponse);
      this.calculateTotalMoney();
    }, error => {
      this.setData(error)
    })
  },
  deleteShoppingcart: function (e) {
    var id = e.currentTarget.dataset.id;
    App.HttpService.deleteShoppingcart({
      shopping_car_id: id
    }).then(function (data) {
      App.WxService.showToast({
        title: "删除成功",
        icon: "success",
        duration: 2000
      });
      var goods = this.data.goods.filter(function (g) {
        return g.shopping_car_id != id;
      })
      this.setData({
        goods: goods
      });
      this.calculateTotalMoney();
    }.bind(this))
  },
  calculateTotalMoney: function () {
    var total_money = 0, settlable = false;
    this.data.goods.forEach(function (g) {
      if (g.check) {
        settlable = true;
        total_money += g.show_price * g.amount;
      }
    });
    this.setData({
      total_money: parseFloat(total_money).toFixed(1),
      settlable: settlable
    })
  },
  fillInOrder: function () {
    var goods = this.data.goods.filter(function (g) {
      return g.check
    })
    if (goods.length == 0) {
      return;
    }
    App.WxService.setStorage({
      key: "cache_goods",
      data: goods
    });
    App.WxService.navigateTo("/pages/payment/payment");
  },
  translateX: function (index, x) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation;
    animation.translateX(x).step();

    var animation_reset = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation_reset = animation_reset;

    animation_reset.translateX(0).step();

    var goods = this.data.goods;
    for (var i = 0; i < goods.length; i++) {
      if (i == index) {
        goods[i].animateData = animation;
      }
      else {
        goods[i].animateData = animation_reset;
      }
    }
    this.setData({
      goods: goods
    })
  },
  ontouchstart: function (e) {
    var current_index = e.currentTarget.dataset.index,
      goods = this.data.goods;
    for (var i = 0; i < goods.length; i++) {
      if (i == current_index) {
        goods[i].touchstartData = e.changedTouches[0];
      }
      else {
        goods[i].touchstartData = {};
      }
    }
    this.setData({
      goods: goods
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
    var current_index = e.currentTarget.dataset.index, uncheck_size = 0, goods = this.data.goods;
    for (var i = 0; i < goods.length; i++) {
      if (current_index == i) {
        goods[i].check = !goods[i].check;
      }
      if (!goods[i].check) {
        uncheck_size++;
      }
    }
    this.setData({
      goods: goods,
      checkAll: uncheck_size > 0 ? false : true
    })
    this.calculateTotalMoney();
  },
  checkAll: function (e) {
    var goods = this.data.goods,
      checkAll = !this.data.checkAll;
    for (var i = 0; i < goods.length; i++) {
      goods[i].check = checkAll;
    }
    this.setData({
      goods: goods,
      checkAll: checkAll
    })
    this.calculateTotalMoney();
  },
  minus: function (e) {
    var goods = this.data.goods, amount,
      current_index = e.currentTarget.dataset.index;
    for (var i = 0; i < goods.length; i++) {
      if (i == current_index) {
        goods[i].amount = Math.max(1, --goods[i].amount);
        amount = goods[i].amount;
      }
    }
    App.HttpService.changeShoppingcartAmount({
      shopping_car_id: this.data.goods[e.currentTarget.dataset.index].shopping_car_id,
      amount: amount,
    }).then(data => {
      this.setData({
        goods: goods
      })
      this.calculateTotalMoney();
    });
  },
  plus: function (e) {
    var goods = this.data.goods, amount,
      current_index = e.currentTarget.dataset.index;
    for (var i = 0; i < goods.length; i++) {
      if (i == current_index) {
        goods[i].amount++;
        amount = goods[i].amount;
      }
    }
    App.HttpService.changeShoppingcartAmount({
      shopping_car_id: this.data.goods[e.currentTarget.dataset.index].shopping_car_id,
      amount: amount,
    }).then(data => {
      this.setData({
        goods: goods
      })
      this.calculateTotalMoney();
    });
  },
  reload: function () {
    this.getShoppingcart();
  },
  onImageLoadError: function (e) {
    var that = this;
    App.Utils.onImageLoadError(e, that);
  },
  onReachBottom: function () {
    // this.getShoppingcart();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    App.WxService.getStorage({
      key: "info"
    }).then(function (response) {
      if (response.data == "shoppingcartUpdate") {
        this.getShoppingcart();
        App.WxService.removeStorageSync("info");
      }
    }.bind(this))
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})