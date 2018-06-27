<?php
/**
 * Project:
 * Author: ZhangShX <normal@normalcoder.com>:
 * Time: 2017/1/16 下午8:42
 * Discript:全局函数库
 */

/**
 * 生成随机ID函数
 * @return string
 */
function getID($length = 5, $onlyID = false)
{
    $random_number = rand(1, 100000);
    $base_number = 100000;
    $new_num = $random_number + $base_number;
    $real_num = substr($new_num, 1, $length); //截取掉最前面的“1”,留下5位字符
    if ($onlyID) {
        return $real_num;
    } else {
        return time() . $real_num;
    }
}