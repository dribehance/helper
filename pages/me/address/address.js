// pages/me/address/address.js
const App = getApp();
Page({
  data: {
    redirect: false,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.redirect) {
      this.setData({
        redirect: true
      });
    }
    this.getAddress();
  },
  getAddress: function () {
    App.HttpService.getAddress({ id: 1 }).then(function (data) {
      data.AddressesResponse.addresses.map(function (g) {
        g.touchstartData = {};
        g.touchmoveData = {};
        g.touchendData = {};
        g.animateData = {};
        g.check = true;
      })
      this.setData(data.AddressesResponse);
    }.bind(this))
  },
  postAddress: function () { },
  deleteAddress: function (e) {
    var id = e.currentTarget.dataset.id;
    App.HttpService.deleteAddress({
      address_id: id,
    }).then(function (data) {
      App.WxService.showToast({
        title: "删除成功",
        icon: "success",
        duration: 2000
      });
      var addresses = this.data.addresses.filter(function (a) {
        return a.id != id;
      })
      this.setData({
        addresses: addresses
      });
    }.bind(this))
  },
  check: function (e) {
    var current_index = e.currentTarget.dataset.index,
      addresses = this.data.addresses;
    App.WxService.setStorage({
      key: "cache_address",
      data: addresses[current_index]
    });
    App.WxService.navigateBack();
  },
  setDefault: function () {

  },
  edit: function (e) {
    var current_index = e.currentTarget.dataset.index,
      addresses = this.data.addresses;
    App.WxService.setStorage({
      key: "cache_address",
      data: addresses[current_index]
    });
    App.WxService.navigateTo("/pages/me/address/create_address/create_address?type=edit&address_id="+addresses[current_index].id);
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

    var addresses = this.data.addresses;
    for (var i = 0; i < addresses.length; i++) {
      if (i == index) {
        addresses[i].animateData = animation;
      }
      else {
        addresses[i].animateData = animation_reset;
      }
    }
    this.setData({
      addresses: addresses
    })
  },
  ontouchstart: function (e) {
    var current_index = e.currentTarget.dataset.index,
      addresses = this.data.addresses;
    for (var i = 0; i < addresses.length; i++) {
      if (i == current_index) {
        addresses[i].touchstartData = e.changedTouches[0];
      }
      else {
        addresses[i].touchstartData = {};
      }
    }
    this.setData({
      addresses: addresses
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    App.WxService.getStorage({
      key:"info"
    }).then(function(response){
      if (response.data == "addressUpdate") {
        this.getAddress();
      }
      App.WxService.removeStorageSync("info");
    }.bind(this))
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})