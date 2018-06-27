<?php

namespace API\Controller;

use Think\Controller;

/**
 * 空控制器，负责处理无效的请求
 * Class EmptyController
 * @package API\Controller
 */
class EmptyController extends Controller
{
    /**
     * EmptyController constructor.
     */
    public function __construct()
    {

    }

    /**
     * 空方法
     */
    public function _empty()
    {
        $logid = getID();
        $extraData = I('param.');
        A('Common/MonologPlus')->log('warning', $logid,'0', 'no services', $extraData);
        echo "no services";
    }
}