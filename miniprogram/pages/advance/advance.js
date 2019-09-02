// miniprogram/pages/advance/advance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: '',
    content: '',
    user: {},
    contents: '13709192532'
  },

/**
   * 复制微信号
   */
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    }),
      setTimeout(function () {
        //要延时执行的代码
        wx.navigateBack({
          url: '../home/home',
        })
      }, 1000) //延迟时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jugdeUserLogin();
  },
  /**
   * 判断用户是否登录
   */
  jugdeUserLogin: function (event) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {

              that.data.user = res.userInfo;
              console.log(that.data.user)
            }
          })
        }
      }
    })
  }
  
})