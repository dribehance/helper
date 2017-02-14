// pages/products/products.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // type=10-默认综合排序，20-销量从低到高，21-销量从高到低，30-价格从低到高，31-价格从高到低
    this.setData({
      page: {
        pn: 1,
        type: 10,
        subcatalog_id: options.id
      }
    });
    // 查询产品数据
    this.getProducts();
  },
  getProducts: function () {
    this.loading = true;
    App.HttpService.getProducts(this.data.page).then(function (data) {
      var response = data.CatalogResponse;
      if (this.data.page.pn == 1) {
        this.setData({
          "goods.list": []
        })
      }
      response.goods.list = this.data.goods.list.concat(response.goods.list);
      this.setData(response);
      this.loading = false
    }.bind(this));
  },
  sort: function (e) {
    var type = e.target.dataset.type;
    if (type == 20 && this.data.page.type == type) {
      type = 21
    }
    if (type == 30 && this.data.page.type == type) {
      type = 31
    }
    this.setData({
      "page.type": type,
      "page.pn": 1
    })
    this.getProducts();
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
  },
  onReachBottom: function () {
    if (this.loading) return;
    if (this.data.goods.totalRow == this.data.goods.list.length) {
      App.WxService.showToast({
        title: "已经加载完数据",
        icon: "success",
        duration: 2000
      });
      return;
    }
    var pn = this.data.page.pn;
    this.setData({
      "page.pn": pn + 1
    });
    this.getProducts();
  }
})