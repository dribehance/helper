// pages/me/address/create_address/create_address.js
Page({
  data:{
    provinces:["北京","天津","上海","重庆"],
    cities:["北京","天津","上海","重庆"],
    districts:["北京","天津","上海","重庆"]
  },
  onProvinceChange:function(e){
    var current_value = e.detail.value;
    this.setData({
      p_value:current_value
    });
  },
  onCityChange:function(e){
    var current_value = e.detail.value;
    this.setData({
      c_value:current_value
    });
  },
  onDistrictChange:function(e){
    var current_value = e.detail.value;
    this.setData({
      d_value:current_value
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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