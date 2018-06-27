<?php
/**
 * Project: think-monolog
 * Author: ZhangShX <normal@normalcoder.com>:
 * Time: 2017/11/8 下午11:12
 * Discript:
 */

namespace Common\Behavior;

use Think\Behavior;
use normalcoder\Think\Logger;

class MonologBehavior extends Behavior
{

    public function run(&$params)
    {
        $logger = Logger::getLogger();
        $stream_handler = $logger->popHandler();  // 取出 StreamHandler 对象
        $logger->pushHandler($stream_handler);    // 注册修改后的StreamHandler 对象
    }
}