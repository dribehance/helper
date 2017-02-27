// pages/category/filter/filter.js
const App = getApp();
Page({
  data: {
    type: "category"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getFilterInfo();
    this.getFilterInfoFromCache();
  },
  getFilterInfo: function () {
    App.HttpService.getFilterInfo().then(data => {
      this.setData(data.FilterResponse)
    });
  },
  getFilterInfoFromCache: function () {
    App.WxService.getStorage({
      key: "cache_filter"
    }).then(response => {
      this.setData(response.data)
    });
  },
  collapse: function (e) {
    var type = e.currentTarget.dataset.type;
    if (type == this.data.type) {
      type = "";
    }
    this.setData({
      type: type
    });
  },
  selectCategory: function (e) {
    this.setData({
      selectedCategory: e.currentTarget.dataset.selectedCategory
    })
  },
  selectBrand: function (e) {
    this.setData({
      selectedBrand: e.currentTarget.dataset.selectedBrand
    })
  },
  minPrice: function (e) {
    this.setData({
      minPrice: e.detail.value
    });
  },
  maxPrice: function (e) {
    this.setData({
      maxPrice: e.detail.value
    });
  },
  confirm: function () {
    var that = this,
      minPrice = Math.min(that.data.minPrice, that.data.maxPrice) || 0,
      maxPrice = Math.max(that.data.minPrice, that.data.maxPrice) || 10000;
    App.WxService.setStorage({
      key: "cache_filter",
      data: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        selectedBrand: that.data.selectedBrand,
        selectedCategory: that.data.selectedCategory
      }
    }).then(data => {
      App.WxService.setStorage({
        key: "info",
        data: "filterChange"
      });
      App.WxService.navigateBack();
    });
  },
  reset: function () {
    this.setData({
      minPrice: "",
      maxPrice: "",
      selectedBrand: "",
      selectedCategory: ""
    })
    App.WxService.removeStorage({
      key: "cache_filter"
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