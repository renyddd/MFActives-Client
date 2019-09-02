# MFActives
[show](/gh_dfd949676ff5_258.jpg)
## 安装说明
0. 在微信小程序客户端创建一个云开发项目
1. 在云开发控制台页面，选择数据库，创建 `topic`,`collect`,`history`,`replay` 四个集合
2. 下载到本地 git clone https://github.com/dongxi346/doughnut.git 或者 下载 zip
3. 将 miniprogram 目录下的文件全部复制到你的 miniprogram
4. 修改 `app.js` 中的 `globalData` 字段修改
	```
	this.globalData = {
      openid: '你的openid',
      evn: '你的开发环境'
    }
    ```

## 下个阶段的开发
设计更加美观的 UI，可参考知识星球等应用
用户信息获取的提示，应该改至点发布按钮前，并且设计多处
输入框的输入量的提升，再加上图片大小的限制
