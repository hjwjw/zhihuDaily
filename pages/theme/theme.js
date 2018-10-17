// pages/theme/theme.js
var app = getApp();
Page({
  data:{
    themes:null,
    stories:null,
    themeSwiper:[]
  },
  onLoad:function(options){
    var that = this;
    var id  = options.id;
    console.log(id)
    wx.request({
      url: app.globalData.zhihuApiUrl + '4/theme/' + id,
      method: 'GET',
      success: function(res){
        console.log(res.data.stories)
        var newStories=[];
        for(var i=0;i<res.data.stories.length;i++){
          if(res.data.stories[i].type!=1){
            newStories.push(res.data.stories[i]);
          }
        }
        that.setData({
          themes:res.data,
          stories:newStories
        });
        var len = that.data.stories.length-1;
        var j=0;
        for(var i=len;i>=0;i--){
          if(that.data.stories[i].images!=null){
              that.data.themeSwiper.push(that.data.stories[i]);
              j++;
          }   
          if(j==5){
            break;
          }
        }
        that.setData({
          themeSwiper:that.data.themeSwiper
        });
        wx.setNavigationBarTitle({
        title: that.data.themes.name
      })
      },
      fail: function() {
        // fail
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