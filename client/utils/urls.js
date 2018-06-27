/**
 * 网络请求接口模块
 * @module urls
 * @author 诺墨 <normal@normalcoder.com>
 */
const HOST = 'https://gitee.normalcoder.com';
const urls = {
    host: HOST,
    index: HOST + '/Index/index',
    UserLogin: HOST + '/User/login', //小程序用户登陆模块
    UserUpdateInfo: HOST + '/User/UserUpdateInfo',
    BulletType: HOST + '/index/BulletType', //获取动弹类型列
    blogDetail: HOST + '/Blog/detail', //获取动弹类型列
    mineList: HOST + '/System/mineList', //我的列表
};
module.exports = {
    urls
};