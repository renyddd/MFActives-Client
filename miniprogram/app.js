//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      // https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/init.html
      wx.cloud.init({
        traceUser: false,
      })
    }

    this.globalData = {
      openid: 'wxaf17ace400e958e6',
      evn: 'renyddd-a12d4'
    }
  }
})