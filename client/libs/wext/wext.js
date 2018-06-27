/**
 * 集成模块
 */
import { urls } from '../../utils/urls.js';
import { wxRequest } from './request.js';
import { checkNetwork } from './checkNetwork.js';
import { newDate, getDate, getDay, getDateVisible } from './time.js';
import { showModal, showToast } from './feedback.js';
import { userLogin } from './userLogin.js';
import { validateURL, validateEmail, validateTelephone, validateNull } from './validate.js';
import { sha1 } from './encrypt.js';



module.exports = {
    wxRequest,
    checkNetwork,
    urls,
    showModal,
    showToast,
    userLogin, //用户登录
    validateURL,
    validateEmail,
    validateTelephone,
    validateNull,
    getDateVisible,

};