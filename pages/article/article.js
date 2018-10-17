// pages/article/article.js

var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    articleJson: null,
    zanIcon: {
      status: 0,
      url: 'zan.png'
    },
    selIcon: {
      status: 0,
      url: 'selections.png'
    }
  },
  onLoad: function (options) {
    var that = this;
    var newbody;
    wx.request({
      url: app.globalData.zhihuApiUrl + '4/story/' + options.news_id,
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          articleJson: res.data
        })

        newbody = res.data.body;
        WxParse.wxParse('newbody', 'html', newbody, that, 5);

        wx.setNavigationBarTitle({
          title: that.data.articleJson.title
        })
        //改变收藏图标
        var collectData = [];
         collectData = wx.getStorageSync('selections'); 
        for (var i = 0; i < collectData.length; i++) {
          if (collectData[i].id == that.data.articleJson.id) {
            
            that.setData({
              selIcon: {
                status: 1,
                url: 'selections_press.png'
              }
            })
          }
        }
      },
      fail: function () {
        console.log("数据拉取失败")
      },
      complete: function () {
        // complete
      }
    })
  },
  zan: function (res) {
    var that = this;
    if (that.data.zanIcon.status == 0) {
      that.setData({
        zanIcon: {
          status: 1,
          url: 'zan_press.png'
        }
      })
    } else {
      that.setData({
        zanIcon: {
          status: 0,
          url: 'zan.png'
        }
      })
    }

  },
  selections: function (res) {
    console.log("收藏")
    console.log(res)
    var that = this;
    //改变图标状态
    if (that.data.selIcon.status == 0) {
      //写入收藏数据
      var collectData = {
        title: res.currentTarget.dataset.articledata.title,
        id: res.currentTarget.dataset.articledata.id,
        images: res.currentTarget.dataset.articledata.images
      }
      var collectArray = [];
      if(wx.getStorageSync(res.currentTarget.dataset.id) == ''){
         collectArray[0] = collectData;
      }else{
        // 要以数组的形式赋值
        collectArray = (wx.getStorageSync(res.currentTarget.dataset.id));
        collectArray.push(collectData);
      }

      wx.setStorageSync(res.currentTarget.dataset.id, collectArray);
      that.setData({
        selIcon: {
          status: 1,
          url: 'selections_press.png'
        }
      })
    } else {
      //取消收藏
      var id = res.currentTarget.dataset.articledata.id;
      var collectData = [];
      var newCollectData=[]
      collectData = wx.getStorageSync(res.currentTarget.dataset.id);
      for(var i =0 ;i<collectData.length;i++){
        if(collectData[i].id != id ){
          newCollectData.push(collectData[i])
        }
      }
      wx.setStorageSync(res.currentTarget.dataset.id, newCollectData);
      console.log("取消后")
      console.log(wx.getStorageSync(res.currentTarget.dataset.id))
      
      that.setData({
        selIcon: {
          status: 0,
          url: 'selections.png'
        }
      })
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
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: this.data.articleJson.title, // 分享标题
      desc: '知乎日报-畅览版', // 分享描述
      path: 'pages/article/article?news_id=' + this.data.articleJson.id // 分享路径
    }
  }
})