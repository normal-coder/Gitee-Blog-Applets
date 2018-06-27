<?php
/**
 * Project: zqsi.gov.cn.financial
 * Author: ZhangShX <normal@normalcoder.com>:
 * Time: 2017/12/5 下午1:42
 * Discript:
 */

namespace Common\Controller;

use Think\Controller;
use normalcoder\Think\Logger;

/**
 * Class MonologLogPlus
 * @package Utils\Controller
 * Monolog增强
 */
class MonologPlusController
{

    /**
     * 获取HTTP请求数据
     * @return array
     */
    private function getHttpRequest()
    {
        return [
            'url'         => $_SERVER['REQUEST_URI'],
            'ip'          => $_SERVER['REMOTE_ADDR'],
            'http_method' => $_SERVER['REQUEST_METHOD'],
            'server'      => $_SERVER['SERVER_NAME'],
             //'referrer'    => $_SERVER['HTTP_REFERRER'],
            'user_agent'  => $_SERVER['HTTP_USER_AGENT'],
        ];
    }

    /**
     * 操作请求数据
     * @return string
     */
    private function getSessionInfo($SessionInfo = null)
    {
        if (!empty($SessionInfo)) {
            return $SessionInfo;
        } else {
            return $_SESSION;
        }
    }

    /**
     * 生成操作日志ID
     * @param null $logid
     * @return null|string
     */
    private function setLogid($logid = null)
    {
        if (!empty($logid)) {
            return $logid;
        } else {
            $random_number = rand(1, 10000);
            $new_num = $random_number + 10000;
            $real_num = substr($new_num, 1, 1); //截取掉最前面的“1”,留下5位字符
            return time() . $real_num;
        }

    }


    /**
     * 通用日志方法
     * @param      $level       日志级别
     *                          #debug     调试 调试信息
     *                          #info      信息 正常的日志记录
     *                          #notice    注意 正常操作结果，不影响业务结果，用于业务排查
     *                          #warning   警告 需要注意，但不影响系统运行
     *                          #error     错误 系统错误，因为某些已知原因导致了程序崩溃。需要技术介入恢复和排查
     *                          #critical  危急 系统错误，因为某些未知原因导致了程序崩溃。需要技术介入处理恢复。
     *                          #alert     警报
     *                          #emergency 紧急
     * @param null $logid       日志编号
     * @param null $logid       日志行为索引
     * @param null $tip         日志备注
     * @param      $extraData   操作数据
     * @param null $SessionInfo 当前请求/会话数据
     */
    public function log($level, $logid = null, $index = 0, $tip = null, $extraData, $SessionInfo = null)
    {
        //debug, info, notice, warning, error, critical, alert, emergency
        $Alllevel = array('debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency');
        if (in_array(strtolower($level), $Alllevel)) {
            $message_array = [
                'logid'        => self::setLogid($logid),
                'index'        => $index,
                'tip'          => $tip,                    //标注文本
                'http_request' => self::getHttpRequest(),//http请求数据
                'session_info' => self::getSessionInfo($SessionInfo),//当前会话信息
                'extra'        => $extraData                    //扩展字段，用于存储业务数据
            ];
            \normalcoder\Think\Logger::$level(str_replace("\\/", "/", json_encode($message_array, JSON_UNESCAPED_UNICODE)));
            return true;
        } else {
            $this->log('warning', $logid, $index, $tip, $extraData, $SessionInfo);
            return false;
        }
    }
}