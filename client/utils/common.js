/**
 * 业务模块
 * @module getBulletType -
 * @module getMineList -
 * @module bingOSCUser -
 * @module getSourcePlatformName - 
 * @author 诺墨 <normal@normalcoder.com>
 */

import { urls } from './urls.js';
import { wxRequest } from '../libs/wext/request.js';
import { sha1 } from '../libs/wext/encrypt.js';

const getTabList = (obj) => {
    wxRequest({
        url: urls.BulletType,
        success: (res) => {
            obj.success(res)
        },
        error: function(res) { console.log(res); },
        fail: function(res) { console.log(res); },
        complete: function(res) {},
    });
}

const getMineList = (obj) => {
    wxRequest({
        url: urls.mineList,
        success: (res) => {
            obj.success(res)
        },
        fail: function(res) { console.log(res); },
        complete: function(res) {},
    });
}


module.exports = {
    getTabList,
    getMineList,
}