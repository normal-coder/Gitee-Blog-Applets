import {
    wxRequest,
    checkNetwork,
    urls,
    showModal
} from '../../../libs/wext/wext.js';

import {
    getMineList
} from '../../../utils/common.js';
Page({
    data: {
        list: {},
    },

    onLoad: function(options) {

        var that = this;
        getMineList({
            success: (res) => {
                this.setData({
                    list: res
                });
            }
        })
    },
    onShow: function() {
        console.log('setting onShow');
        let oscbind = wx.getStorageSync('oscbind');
        if (oscbind == 1) {
            this.setData({
                beforeLoginArea: true,
                afterLoginArea: false,
            })
        } else {
            this.setData({
                beforeLoginArea: false,
                afterLoginArea: true,
            })
        }
    },
    onPullDownRefresh: function() {
        console.log("pull");
        wx.stopPullDownRefresh();
    },
    userInfoHandler: function(e) {
        //更新用户信息
        let userInfo = e.detail.userInfo;
        //updateUsersWeChatInfo(userInfo);
        this.setData({
            beforeLoginArea: true,
            afterLoginArea: false,
            userinfo: userInfo,
        });
        getApp().globalData.userinfo = userInfo;
    },



    openOSCWebAuth: function() {
        let token = wx.getStorageSync('token');
        wx.navigateTo({
            // url: '/pages/mine/webview/index?url=https://bullet.tingin.cn/Index/index/token/' + token
            url: '/pages/mine/login/index'
        })
    }
})