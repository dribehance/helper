// pages/me/address/address.js
Page({
  data:{
    addresses:[{
      name:"梁渝铭",
      telephone:"18520844021",
      province:"广东省",
      city:"深圳市",
      district:"宝安区",
      street:"水沟村12号 101室",
      check:true
    },{
      name:"梁渝铭",
      telephone:"18520844021",
      province:"广东省",
      city:"深圳市",
      district:"宝安区",
      street:"名优采购中心B座1区 129",
      check:false
    }],
    redirect:false
  },
  check:function(e){
    var current_index = e.currentTarget.dataset.index,
        addresses = this.data.addresses;
    for (var i = 0;i < addresses.length;i++) {
      if (i == current_index ) {
        wx.setStorage("cache_address",addresses[i]);
      }
    }
    wx.navigateBack();
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    if (options.redirect) {
      this.setData({
        redirect:true
      });
    }
  },
  onReady:function(){
    // 页面渲染完成
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