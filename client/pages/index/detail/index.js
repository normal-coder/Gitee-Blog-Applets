// pages/index/detail/index.js
import {
    wxRequest,
    checkNetwork,
    urls,
    showModal,
    userLogin,
    validateURL,
    getDateVisible,
    showToast
} from '../../../libs/wext/wext.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        forwardButton: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.warn(options);
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    clientHeight: res.windowHeight
                });
            }
        });

        //从原型链判断页面启动来源（扫码/小程序）
        if (options.hasOwnProperty('q')) {
            //扫码
            let path = decodeURIComponent(options.q);
            let pathArray = path.split("/"); //各个参数放到数组里
            console.warn(pathArray);
            if (pathArray.length <= 3 || pathArray[3] == '') { //博客根目录
                wx.switchTab({
                    url: '/pages/index/index/index',
                })
            } else {
                this.setData({
                    path: path,
                });
            }
        } else {
            that.setData({
                path: options.path,
                cover: encodeURI(options.cover)
            });
        }

        // 是否转发处理
        if (options.hasOwnProperty('forward')) {
            that.setData({forward: options.forward,});
        }else{
            that.setData({ forward: 0 });
        }

        this.refresh(); //请求数据

        setTimeout(function() {
            wx.hideLoading()
        }, 2000);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.showLoading({
            title: '正在加载中',
            mask: true
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.refresh();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        if (this.data.cover == '') {
            return {
                title: this.data.title,
                path: '/pages/index/detail/index?path=' + this.data.path + "&cover=" + this.data.cover + "&forward=1"
            }
        } else {
            return {
                title: this.data.title,
                path: '/pages/index/detail/index?path=' + this.data.path + "&cover=" + this.data.cover + "&forward=1",
                imageUrl: this.data.cover
            }
        }
    },

    refresh: function(){
        var that = this;
        wxRequest({
            url: urls.blogDetail,
            data: {
                path: this.data.path
            },
            success: (res) => {
                //wx.showLoading({ title: '即将完成', mask: true });
                console.warn(res);
                that.setData({
                    title: res.title,
                    category: res.category + "　|　",
                    date: res.date,
                });
                if (this.data.forward != 1) {
                    wx.setNavigationBarTitle({
                        title: res.title
                    })
                    that.setData({
                        forwardButton: true
                    });
                } else {
                    wx.setNavigationBarTitle({
                        title: "码云博客"
                    })
                    that.setData({
                        forwardButton: false
                    });
                }
                that.setData({
                    content: res.content,
                });
            },
            fail: function (res) { console.log(res.code + "====>" + res.error); },
            error: function (res) { console.log(res); },
            complete: function (res) { },
        });
    },
    
    
    tapToIndex: function () {
        wx.switchTab({
            url: '/pages/index/index/index',
        })
    },
    goto:function(e){
        wx.setClipboardData({
            data: e.detail.href,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        console.log(res.data) // data
                        if (res.data == e.detail.href){
                            console.log("OK");
                            showToast({
                                title:'目标链接已复制，请通过浏览器打开'
                            })
                        }
                    }
                })
            }
        })
    }
})