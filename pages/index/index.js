//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data:{
    curDate:new Date(),
    preDate:new Date(),
    top_stories:[],
    articleList:[],
  },
  onLoad:function(options){
    var that = this;
    // 生命周期函数--监听页面加载
    wx.request({
      url: app.globalData.zhihuApiUrl+ '4/stories/latest',
      method: 'GET', 
      success: function(res){
        that.setData({
          articleList:res.data.stories,
          top_stories:res.data.top_stories
          });

      },
      fail: function() {
        console.log("数据拉取失败");
      },
      complete: function() {
        // complete
      }
    })
  },
  onReachBottom: function(res) {
    // 页面上拉触底事件的处理函数
    var that =this;
    var curDate  = new Date(that.data.preDate);
    console.log(curDate)
    var preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
    that.setData({
      preDate:preDate
    })
    var dateNum = '' + curDate.getFullYear() + ((curDate.getMonth()+1)<10?'0'+(curDate.getMonth()+1):(curDate.getMonth()+1)) + (curDate.getDate()<10?'0'+curDate.getDate():curDate.getDate())
    console.log(dateNum)
    wx.request({
      url: app.globalData.zhihuApiUrl+ '4/stories/before/' + dateNum,
      method: 'GET',
      success: function(res){
        that.data.articleList.push(util.getFormatDate(dateNum));
        for(var i=0 ;i<res.data.stories.length;i++){
          that.data.articleList.push(res.data.stories[i])
        }
        console.log("articleList")
        console.log(that.data.articleList)
        that.setData({
          articleList:that.data.articleList
        })
        console.log("下拉后")
        console.log(that.data.articleList)
        
      },
      fail: function() {
        // fail
      }
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '知乎日报-畅览版', // 分享标题
      desc: '知乎日报-畅览版', // 分享描述
      path: 'pages/index/index' // 分享路径
    }
  }
})
