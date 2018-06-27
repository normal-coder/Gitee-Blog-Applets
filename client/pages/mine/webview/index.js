// pages/mine/webview/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        weblocation: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.url);
        var that = this;
        wx.showLoading({
            title: '正在加载中',
            mask: true
        });
        this.setData({
            weblocation: options.url
        })
        setTimeout(function () {
            wx.hideLoading()
        }, 2000);
    },
    callBackMessage: function (event) {
        console.log(event.detail.data[0]);
        let e = event.detail.data[0];
        if (e.action == 'showToast') {
            setTimeout(function(){
                wx.showToast({
                    title: e.title,
                    icon: e.icon,
                    duration: e.duration
                })
            },e.timeout);
        }
    }
})