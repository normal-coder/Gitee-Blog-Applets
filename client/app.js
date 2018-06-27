import { checkNetwork, userLogin } from './libs/wext/wext.js';
App({
    globalData: {
        userinfo: "",
        sysInfo: null,
        mimeList:null,

    },
    onLaunch: function () {
        console.log('App onLaunch');
        checkNetwork();
        var that = this; 
        userLogin({ done: (res) => {
            console.log(res.data.data);
            wx.setStorageSync('oscbind', res.data.data.bind);
            // wx.setStorageSync('token', res.data.data.token);
            if (res.data.data.bind==1){
                wx.setStorageSync('oscuid', res.data.data.oscuid);
            }
        } });
        
    },

    onShow: function (options) {
        checkNetwork();
    },
})