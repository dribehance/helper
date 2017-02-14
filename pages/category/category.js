// pages/category/category.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getCategorys();
  },
  getCategorys: function () {
    App.HttpService.getCategorys().then(function (data) {
      this.setData(data.CatalogResponse);
      this.setData({
        currentCategory:data.CatalogResponse.catalogs[0]
      })
    }.bind(this))
  },
  getSubCategorys: function () {
    this.data.catalogs.forEach(function(c,i){

    })
  },
  selectCategory: function (e) {
    var currentCategory = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: currentCategory
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