// 用户上传数据 ifshow 默认为 false；经由管理员改为 true
// https://blog.csdn.net/w1418899532/article/details/100052959

// 经过测试，问题的出现与云端 _openid 的值有关 
var that
const app = getApp()
Page({

// https://www.sunzhongwei.com/wechat-mini-app-for-ugc-content-words-not-filter-audit-is-not-passed
// 不要再做 ugc 1!!!!
// 先存活！！！统一由管理员审核并发布！！
// 只有管理员有写权限，用户只能申请发布
// 最后在审核时写清楚，此非 ugc 程序。可以理解为管路员产生内容吗？

// ifshow 字段即为 admin 应筛选字段
// 接下来的任务是，去掉评论功能；并且开发一个管理员的客户端 done


  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    topics: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    wx.cloud.init({
      env: app.globalData.evn
    })
  },

  onShow: function() {
    that.getData();
  },
  /**
   * 获取列表数据
   * 
   * 获取列表数据
   */
  getData: function() {
    const db = wx.cloud.database();

    db.collection('topic')
    .orderBy('date', 'desc')  
      .where({   // 判断问题解决，注意查看官方文档 https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/database/collection.where.html
        'ifshow':true
      }) // 此处为 admin 人工对内容进行审核，每晚定时审查并发布
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          // res.data  经过真机调试分析，其为 home 页面每条记录对象的属组
          // 此时，问题出在每个用户打开的页面不一样
          // https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/database/collection.get.html
          console.log("数据：" + res.data)
          that.data.topics = res.data;
          that.setData({
            topics: that.data.topics,
          })
          wx.hideNavigationBarLoading(); //隐藏加载
          wx.stopPullDownRefresh();

        },
        fail: function(event) {
          wx.hideNavigationBarLoading(); //隐藏加载
          wx.stopPullDownRefresh();
        }
      })

  },
  /**
   * item 点击
   */
  onItemClick: function(event) {
    var id = event.currentTarget.dataset.topicid;
    var openid = event.currentTarget.dataset.openid;
    console.log(id);
    console.log(openid);
    wx.navigateTo({
      url: "../homeDetail/homeDetail?id=" + id + "&openid=" + openid
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var temp = [];
    // 获取后面十条
    if (this.data.topics.length < this.data.totalCount) {
      const db = wx.cloud.database();
      db.collection('topic').get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          if (res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
              var tempTopic = res.data[i];
              console.log(tempTopic);
              temp.push(tempTopic);
            }

            var totalTopic = {};
            totalTopic = that.data.topics.concat(temp);

            console.log(totalTopic);
            that.setData({
              topics: totalTopic,
            })
          } else {
            wx.showToast({
              title: '没有更多数据了',
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '没有更多数据了',
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})