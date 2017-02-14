// pages/category/sub_category/sub_category.js
Page({
  data:{
    categorys:[{
      id:"1",
      name:"二级精选",
      type:2,
      icon:"/images/index_1_normal.png"
    },{
      id:"2",
      name:"二级热门",
      type:2,
      icon:"/images/index_2_normal.png"
    }]
  },
  selected_category:function(e){
    wx.navigateTo({
        url: '/pages/products/products?category_id=5',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
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