/**
 * 交互反馈模块
 * @module showModal - Modal浮层交互
 * @module showToast - Toast交互
 * @author 诺墨 <normal@normalcoder.com>
 */
const showModal = (obj) => {
    if (obj.title == undefined) { obj.title = '温馨提示' }
    if (obj.content == undefined) { obj.content = '小程序本地缓存异常，请退出小程序后重新进入' }
    if (obj.confirm == undefined) { obj.confirm = () => { } }
    wx.showModal({
        title: obj.title,
        content: obj.content,
        showCancel: false,
        success: function (res) {
            if (res.confirm) { console.log('用户点击确定') }
            obj.confirm();
        }
    })
}


const showToast = (obj) => {
    var defaultIcon = ['success', 'loading', 'none'];
    var customizeIcon = ['about', 'complete-safety', 'complete', 'refresh', 'waiting', 'warning-second', 'warning'];
    var title = obj.title || ''; duration
    var duration = obj.duration || 1500;
    var mask = obj.mask || true;
    if (obj.icon == undefined) { obj.icon = 'none' }
    if (obj.success == undefined) { obj.success = () => { } }
    if (obj.fail == undefined) { obj.fail = () => { } }
    if (obj.complete == undefined) { obj.complete = () => { } }
    if (defaultIcon.indexOf(obj.icon) != -1) {
        wx.showToast({
            title: title,
            icon: obj.icon,
            duration: duration,
            mask: mask,
            success: function (res) { obj.success(res) },
            fail: function (res) { obj.fail(res) },
            complete: function (res) { obj.complete(res) },
        })
    } else {
        if (customizeIcon.indexOf(obj.icon) != -1) {
            var image = '/images/icons/toast/' + obj.icon + '.png';
            console.log(image);
            wx.showToast({
                title: title,
                image: image,
                duration: duration,
                mask: mask,
                success: function (res) { obj.success(res) },
                fail: function (res) { obj.fail(res) },
                complete: function (res) { obj.complete(res) },
            })
        } else {
            console.log('no icon');
        }
    }
}



module.exports = {
    showModal, showToast
};




