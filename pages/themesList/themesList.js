// pages/themesList/themesList.js
var app = getApp();
Page({
  data:{
    themesList:[]
  },
  onLoad:function(options){
    var that = this;
    wx.request({
      url: app.globalData.zhihuApiUrl + '4/themes',
      method: 'GET', 
      success: function(res){
        console.log(res.data.others);
        that.setData({
          themesList:res.data.others
        });
      },
      fail: function() {
        console.log("数据拉取失败")
      },
      complete: function() {
        // complete
      }
    })
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