<?php
register_shutdown_function(function () {
    if (!empty(error_get_last())) {
        echo json_encode(error_get_last());
    }
});
date_default_timezone_set('PRC');  //设置中国时区
if (version_compare(PHP_VERSION, '5.4.0', '<')) die('require PHP > 5.4.0 !');  // 检测PHP环境
require_once '../vendor/autoload.php';  //加载Composer组件
define('APP_DEBUG', true);              //开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('BUILD_DIR_SECURE', false);      //关闭安全文件
define('BIND_MODULE', 'API');           //APP API模块,API Service //绑定应用
define('LOG_PATH', '../logs');          //应用日志目录 （默认为 RUNTIME_PATH.'Logs/'）
define('APP_PATH', '../application/');  //应用业务逻辑目录
require '../thinkphp/ThinkPHP.php';     //引入ThinkPHP入口文件
