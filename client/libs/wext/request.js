/**
 * 网络请求模块
 * @module wxRequest
 * @author 诺墨 <normal@normalcoder.com>
 */
import { checkNetwork } from './checkNetwork.js';
import { userLogin } from './userLogin.js';
/**
 * 网络请求方法
 * @function wxRequest
 * @param {Object} obj - 请求对象
 * @property {string} url - 请求地址
 * @property {array} [data={}] - 请求的数据内容
 * @property {boolean} [force=false] - 是否需要在header中带上cookie（如为true且本地不存在cookie，将休眠1s后重新执行）
 * @property {string} [method='GET'] - 请求方法，默认为GET请求
 * @property {string} [dataType='json'] - 请求的数据类型
 * @property {function} [success] - 请求成功，返回期望返回的结果时执行的函数
 * @property {function} [fail] - 请求成功，返回的内容为警告/提示类型时执行的函数
 * @property {function} [error] - 请求失败时执行的函数，相当于wx.request中的fail
 * @property {function} [complete] - 请求完成时执行的函数
 */
const wxRequest = (obj) => {
    checkNetwork();
    if (obj.force) { //是否使用Cookie方案进行请求
        console.warn("===请求数据（无会话）===", obj);
        wx.request({
            url: obj.url,
            data: obj.data || {},
            method: obj.method || 'GET',
            dataType: "json",
            responseType: '',
            header: { "content-type": "application/x-www-form-urlencoded" },
            success: function (res) {
                wx.hideLoading();
                if (res.data.ret == '1') { //不考虑会话超时问题
                    obj.success(res.data.data)
                } else {
                    obj.fail(res.data);
                }
            },
            fail: function (res) {
                wx.hideLoading();
                obj.error(res)
            },
            complete: function (res) { if (obj.complete) { obj.complete(res) } },
        })
    } else {
        console.info("===请求数据（带会话）===", obj);
        if (wx.getStorageSync('cookie-done') == "") { // 此处请求cookie-done为空说明启动时未完成请求cookie，请求休眠处理Í
            console.warn("userLogin未完成，休眠中");
            setTimeout(function () { wxRequest(obj); }, 1000)
        } else {
            wx.request({
                url: obj.url,
                data: obj.data || {},
                method: obj.method || 'GET',
                dataType: "json",
                responseType: '',
                header: {
                    cookie: wx.getStorageSync('cookie'),
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                    if (res.data['code'] == '01') { //会话超时
                        console.warn('会话超时');
                        userLogin({ done: (res) => {
                            wxRequest(obj); //重新请求数据
                        } }); // TODO 需确认校验会话超时后缓存和实际数据不一致问题
                    } else {
                        wx.hideLoading();
                        if (res.data.ret == '1') { //不考虑会话超时问题
                            obj.success(res.data.data)
                        } else {
                            obj.fail(res.data);
                        }
                    }
                },
                fail: function (res) {
                    wx.hideLoading();
                    obj.fail(res)
                },
                complete: function (res) { if (obj.complete) { obj.complete(res) } },
            })
        }
    }
}


module.exports = {
    wxRequest
};