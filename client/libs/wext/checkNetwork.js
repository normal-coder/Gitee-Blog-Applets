/**
 * 网络环境检查模块
 * @module checkNetwork
 * @author 诺墨 <normal@normalcoder.com>
 */
/**
 * 网络请求方法
 * @function checkNetwork
 * @param {Object} obj - 请求对象
 * @property {function} [pass] - 网络恢复后请求执行的函数
 * @property {function} [complete] - 请求完成时执行的函数
 */
const checkNetwork = (obj) => {
    wx.getNetworkType({
        success: function (res) {
            // 网络类型有效值：wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
            var networkType = res.networkType
            console.log(networkType);
            if (networkType == 'none') {
                wx.showModal({
                    title: '网络不可用',
                    content: '当前网络状态不可用，请检查网络设置后点击按钮以便继续使用',
                    showCancel: false,
                    confirmText: '继续使用',
                    success: function (res) {
                        if (res.confirm) {
                            checkNetwork();
                        } else if (res.cancel) {
                            checkNetwork();
                        }
                    },
                })
            } else {
                if (obj && obj.pass) {
                    obj.pass()
                }
            }
        }
    })
}

module.exports = {
    checkNetwork
};



