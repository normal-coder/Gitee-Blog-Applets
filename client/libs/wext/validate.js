/**
 * 数据校验模块
 * @module validateURL - 网址格式校验
 * @author 诺墨 <normal@normalcoder.com>
 */
/**
 * 网址格式校验方法
 * @function validateURL
 * @property {string} url - 网址
 * @return {bollean}
 */
const validateURL = (url) => {
    var v = new RegExp();
    v.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
    if (!v.test(decodeURIComponent(url))) {
        return false;
    } else {
        return true;
    }
}

const validateEmail = (email) => {
    let v = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!v.test(decodeURIComponent(email))) {
        return false;
    } else {
        return true;
    }
}



const validateTelephone = (telephone) => {
    let v = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!v.test(telephone)) {
        return false;
    } else {
        return true;
    }
}

const validateNull = (exp) => {
    if (exp.length>0) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    validateURL, validateEmail, validateTelephone, validateNull
}