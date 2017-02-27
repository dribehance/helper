// pages/product/product.js
var WxParse = require('../../wxParse/wxParse.js');
const App = getApp();
Page({
  data: {
    activeTab: "1",
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getProduct(options.id);
  },
  getProduct: function (id) {
    App.HttpService.getProduct({ goods_id: id }).then(data => {
      this.setData(data.GoodsDetailResponse);
      this.setData({
        "goods.amount": 1,
        "goods.goods_id": id,
        "goods.status": 1
      })
      // 原数据格式不对
      WxParse.wxMoreParse("description", "html", this.data.goods.description, this);
      WxParse.wxMoreParse("spec", "html", this.data.goods.spec, this);
      WxParse.wxMoreParse("service", "html", this.data.goods.service, this);
    }, error => {
      this.setData(error)
    });
  },
  save: function () {
    if (this.data.goods.is_collect == 1) {
      this.cancelSaveGoods();
      return;
    }
    if (this.data.goods.is_collect == 0) {
      this.saveGoods();
      return;
    }
  },
  saveGoods: function () {
    App.HttpService.save({
      goods_id: this.data.goods.goods_id
    }).then(data => {
      this.setData({
        "goods.is_collect": 1
      })
      setTimeout(() => {
        App.WxService.showToast({
          title: data.CollectResponse.message,
          icon: "success",
          duration: 2000
        });
      }, 1000);
    });
  },
  cancelSaveGoods: function () {
    App.HttpService.cancelSave({
      goods_id: this.data.goods.goods_id
    }).then(data => {
      this.setData({
        "goods.is_collect": 0
      });
      setTimeout(() => {
        App.WxService.showToast({
          title: data.CollectResponse.message,
          icon: "success",
          duration: 2000
        });
      }, 1000);
    });
  },
  selectNature: function (e) {
    var index = e.currentTarget.dataset.index,
      name = e.target.dataset.name,
      selected = {};
    if (name) {
      var key = "goods.nature[" + index + "].selected";
      selected[key] = name;
      this.setData(selected);
      this.getNature();
    }
  },
  getNature: function () {
    var nature = this.data.goods.nature.map(n => {
      return n.name + ":" + n.selected;
    }).join("、");
    App.HttpService.getNature({
      goods_id: this.data.goods.goods_id,
      nature: nature
    }).then(data => {
      this.setData({
        "goods.show_price": data.NatureResponse.price,
        "goods.status": data.NatureResponse.status,
        "goods.goods_nature_single_group": data.NatureResponse.single_group
      });
    });
  },
  minus: function (e) {
    var amount = this.data.goods.amount - 1;
    if (amount < 1) {
      amount = 1;
    }
    this.setData({
      "goods.amount": amount
    })
  },
  plus: function (e) {
    var amount = this.data.goods.amount + 1;
    this.setData({
      "goods.amount": amount
    })
  },
  switchTab: function (e) {
    var current_index = e.target.dataset.index;
    this.setData({
      activeTab: current_index,
    });
  },
  postToCart: function () {
    var that = this;
    App.HttpService.postTocart({
      goods_id: that.data.goods.goods_id,
      single_group: that.data.goods.goods_nature_single_group,
      amount: that.data.goods.amount
    }).then(function (data) {
      // 延迟，防止手机中弹不出toast
      setTimeout(function () {
        App.WxService.showToast({
          title: data.AddToShoppingCarResponse.message,
          icon: "success",
          duration: 2000,
        });
        App.WxService.setStorage({
          key: "info",
          data: "shoppingcartUpdate"
        })
      }, 1000);
    })
  },
  fillInOrder: function () {
    var goods = [];
    App.WxService.setStorage({
      key: "cache_goods",
      data: [this.data.goods]
    });
    App.WxService.navigateTo("/pages/payment/payment");
  },
  wxParseImgTap: function (e) {
    var that = this
    WxParse.wxParseImgTap(e, that)
  },
  wxParseImgLoad: function (e) {
    var that = this
    WxParse.wxParseImgLoad(e, that)
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
  }
})