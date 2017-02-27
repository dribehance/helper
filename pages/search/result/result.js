// pages/search/result/result.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData(options);
    // type=10-默认综合排序，20-销量从低到高，21-销量从高到低，30-价格从低到高，31-价格从高到低
    this.setData({
      page: {
        pn: 1,
        type: 10,
        kw: options.keyword
      }
    });
    // 查询产品数据
    this.getProducts();
    this.getKeywordsFromCache();
  },
  getProducts: function () {
    this.loading = true;
    App.HttpService.getProductsByKeyword(this.data.page).then(data => {
      var response = data.CatalogResponse;
      if (this.data.page.pn == 1) {
        this.setData({
          "goods.list": []
        })
      }
      response.goods.list = this.data.goods.list.concat(response.goods.list);
      this.setData(response);
      this.loading = false
    }, error => {
      this.setData(error)
    });
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
  getKeywordsFromCache: function () {
    App.WxService.getStorage({
      key: "cache_history_keywords"
    }).then(function (response) {
      this.setData({
        history_keywords: response.data
      });
    }.bind(this), function (error) {
      this.setData({
        history_keywords: []
      })
    }.bind(this));
  },
  formSubmit: function (e) {
    if (!App.Tools.trim(e.detail.value.keyword)) return;
    var history_keywords = this.data.history_keywords;
    // 去重
    if (!App.Tools.includes(history_keywords, e.detail.value.keyword)) {
      history_keywords.unshift(e.detail.value.keyword);
    }
    // 保留10个
    history_keywords = history_keywords.slice(0, 10);
    App.WxService.setStorage({
      key: "cache_history_keywords",
      data: history_keywords
    }).then(function (response) {
      App.WxService.redirectTo("/pages/search/result/result?keyword=" + e.detail.value.keyword);
    });
  },
  loadMore: function () {
    if (this.loading) return;
    if (!this.data.noMore && this.data.goods.totalRow == this.data.goods.list.length) {
      App.WxService.showToast({
        title: "已经加载完数据",
        icon: "success",
        duration: 2000
      });
      this.setData({
        noMore: true,
        noMoreMessage: "加载完成，共" + this.data.goods.list.length + "条记录"
      });
    }
    if (this.data.goods.totalRow == 0) {
      this.setData({
        noMoreMessage: "暂无数据"
      })
    }
    if (this.data.goods.totalRow > this.data.goods.list.length) {
      var pn = this.data.page.pn;
      this.setData({
        "page.pn": pn + 1,
        noMore: false
      });
      this.getProducts();
    }
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