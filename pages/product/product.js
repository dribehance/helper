// pages/product/product.js
var WxParse = require('../../wxParse/wxParse.js');
const App = getApp();
Page({
  data:{
    activeTab:"1",
  },
  save:function(){},
  switchTab:function(e){
    var current_index = e.target.dataset.index;
    this.setData({
      activeTab:current_index,
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getProduct(options.id);
  },
  onReady:function(){
    // 页面渲染完成
  },
  getProduct:function(id){
    App.HttpService.getProduct({goods_id:id}).then(function(data){
      this.setData(data.GoodsDetailResponse);
      // 原数据格式不对
      WxParse.wxMoreParse("description","html", "<div>你好</div>", this);
      WxParse.wxMoreParse("spec","html", this.data.goods.spec, this);
      WxParse.wxMoreParse("service","html", this.data.goods.service, this);
    }.bind(this));
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})