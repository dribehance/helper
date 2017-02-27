// pages/me/favorite/favorite.js
const App = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  getSaveList: function () {
    this.loading = true
    App.HttpService.getSaveList().then(data => {
      var response = data.CollectResponse;
      if (this.data.page.pn == 1) {
        this.setData({
          "collect.list": []
        })
      }
      response.collect.list = this.data.collect.list.concat(response.collect.list);
      this.setData(response);
      this.loading = false
    }, error => {
      this.setData(error)
    })
  },
  loadMore: function () {
    if (this.loading) return;
    if (!this.data.noMore && this.data.collect.totalRow == this.data.collect.list.length) {
      App.WxService.showToast({
        title: "已经加载完数据",
        icon: "success",
        duration: 2000
      });
      this.setData({
        noMore: true,
        noMoreMessage: "加载完成，共" + this.data.collect.list.length + "条记录"
      });
    }
    if (this.data.collect.totalRow == 0) {
      this.setData({
        noMoreMessage: "暂无数据"
      })
    }
    if (this.data.collect.totalRow > this.data.collect.list.length) {
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
    this.setData({
      page: {
        pn: 1,
      }
    });
    this.getSaveList();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})