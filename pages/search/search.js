// pages/search/search.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // server host keyword
    this.getKeywords();
  },
  getKeywords: function () {
    App.HttpService.getKeywords().then(function (data) {
      this.setData(data.HotKeywordResponse);
    }.bind(this))
  },
  clear: function () {
    App.WxService.removeStorage({
      key: "cache_history_keywords"
    }).then(function () {
      this.setData({
        history_keywords: []
      });
    }.bind(this));
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
      App.WxService.navigateTo("/pages/search/result/result?keyword=" + e.detail.value.keyword);
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getKeywordsFromCache();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})