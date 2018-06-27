/**
 * 小程序登陆/会话cookie模块
 * @module userLogin
 * @author 诺墨 <normal@normalcoder.com>
 */
/**
 * 小程序登陆/会话cookie模块请求方法
 * @function userLogin
 * @param {Object} obj - 请求对象
 * @property {function} [done] - 请求成功后执行的方法
 */
import { checkNetwork } from './checkNetwork.js';
import { urls } from '../../utils/urls.js';
const userLogin = (obj) => {
    wx.login({ // 直接登陆，无需授权
        success: (loginres) => {
            console.warn("获取OpenID OK" + JSON.stringify(loginres));
            wx.request({
                url: urls.UserLogin,
                data: { code: loginres.code },
                method: "GET",
                header: { "content-type": "application/x-www-form-urlencoded" },
                dataType: 'json',
                responseType: 'text',
                success: function (res) {
                    wx.setStorageSync('cookie', res.header["Set-Cookie"]);
                    wx.setStorageSync('cookie-done', 'done');
                    obj.done(res);
                },
                fail: function (res) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '小程序请求失败，请检查您的网络链接，或关闭小程序后打开重试',
                        confirmText: '重试',
                        success: function (res) {
                            if (res.confirm) {
                                userLogin();
                            } else if (res.cancel) {
                                checkNetwork({ pass: () => { userLogin(); } });
                            }
                        },
                    })
                }, //TODO 请求登陆后应给予提示
                complete: function (res) { },
            })
        },
        fail: (res) => { //获取OpenID失败 - 基本就是致命错误，应给予提示
            console.warn("获取OpenID失败 - 基本就是致命错误" + JSON.stringify(res));
            wx.showModal({
                title: '温馨提示',
                content: '小程序获取用户信息失败，请尝试关闭/删除小程序后再次打开，或升级微信到最新版本后重试',
                confirmText: '重试',
                success: function (res) {
                    if (res.confirm) {
                        userLogin();
                    } else if (res.cancel) {
                        checkNetwork();
                    }
                },
            })
        }
    })
}
module.exports = {
    userLogin
}