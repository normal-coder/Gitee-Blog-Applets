<?php
/**
 * Created by PhpStorm.
 * User: normal
 * Date: 2016/9/11
 * Time: 上午4:13
 */

namespace API\Controller;

use Think\Controller\RestController;
use normalcoder\Think\Logger;

/**
 * API接口基础控制器
 * Class BaseController
 * @package API\Controller
 */
class BaseController extends RestController
{
    /**
     * @var logid 日志编码
     */
    private $logid;

    /**
     * @var logindex 日志索引
     */
    private $logindex;

    /**
     * @param string $level
     * @param null   $tip
     * @param null   $extraData
     * @param null   $SessionInfo
     * @return bool
     */
    protected function log($level = 'info', $tip = null, $extraData = null, $SessionInfo = null)
    {
        $this->logindex = $this->logindex >= 0 ? $this->logindex + 1 : $this->logindex;
        A('Common/MonologPlus')->log($level, $this->logid, $this->logindex, $tip, $extraData, $SessionInfo);
        return true;
    }

    /**
     * BaseController constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->logid = getID();
        $extraData = I('param.');
        $this->log('info', '', $extraData);
    }


    /**
     * =============================== 接口响应单元 ===============================
     */

    /**
     * 在线检测
     * @return bool
     */
    public function checkOnline()
    {
        if (empty($_SESSION['openid'])) {
            $this->ErrorResponse('01');
        } else {
            return true;
        }
    }

    /**
     * 参数检查
     * @param $type
     * @param $ParamsName
     * @param $notice
     */
    public function checkParams($type, $ParamsName, $notice, $isRequired = true, $allowNull = false)
    {
        if ($isRequired) { //必填参数
            if (!I($type . '.' . $ParamsName) && I($type . '.' . $ParamsName) != 0) { //参数错误，请求缺少参数
                $this->ErrorResponse('', $notice);
            }
        }
        if (empty(trim(I($type . '.' . $ParamsName)))) {
            if ($allowNull) {
                return trim(I($type . '.' . $ParamsName));//返回响应的数据
            } else {
                $this->ErrorResponse('', $notice);
            }
        } else {
            return trim(I($type . '.' . $ParamsName));//返回响应的数据
        }
    }

    /**
     * 成功返回消息函数
     * @param $data
     * @param $DataFormat
     */
    public function SuccessResponse($data = '')
    {
        $result['ret'] = 1;
        $result['data'] = $data;
        $this->response($result, "json");
        exit();
    }

    /**
     * 失败返回消息函数
     * @param $errorInfo
     * @param $DataFormat
     */
    public function ErrorResponse($code = '', $errorInfo = '')
    {
        $result['ret'] = 0;
        $result['code'] = $code;
        switch ($code) {
            case "01": //未登录
                $result['error'] = "账号未登录，请授权登陆后使用";
                break;
            case "02": //系统接口异常
                $result['error'] = "系统异常:" . $errorInfo;
                break;
            case "03": //日志异常
                $result['error'] = "系统异常:" . $errorInfo;
                break;
            case "04": //参数解析异常
                $result['error'] = "参数异常:" . $errorInfo;
                break;
            case "05": //参数解析异常
                $result['error'] = "参数错误:" . $errorInfo;
                break;
            case "06": //业务类错误
                $result['error'] = $errorInfo;
                break;
            default:
                $result['error'] = $errorInfo;
                break;
        }
        $this->response($result, 'json');
        exit();
    }

    /**
     * 网络请求
     * @param      $uri
     * @param      $queryType
     * @param null $data
     * @return bool|string
     */
    public function httppost($url, $queryType, $data = null)
    {
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $queryType);
        if (!empty($data)) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
        }
        curl_setopt_array($curl, [
            CURLOPT_URL            => $url,
            CURLOPT_CUSTOMREQUEST  => $queryType,
            CURLOPT_RETURNTRANSFER => true,  //将curl_exec()获取的信息以字符串返回，而不是直接输出。
            CURLOPT_HEADER         => true,  //需要response header 头部信息
            CURLOPT_NOBODY         => false, //需要response body
            CURLINFO_HEADER_OUT    => true,  //允许查看请求header
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_IPRESOLVE      => CURL_IPRESOLVE_V4,
            CURLOPT_ENCODING       => "",
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPHEADER     => [
                "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
            ], //设置请求头
        ]);
        $curl_response = curl_exec($curl); //响应消息体
        $curl_response_code = curl_getinfo($curl, CURLINFO_HTTP_CODE); // 获取HTTP响应状态码
        $curl_header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE); // 获得响应头大小
        $curl_header = substr($curl_response, 0, $curl_header_size); // 获取头信息内容
        $curl_body = substr($curl_response, $curl_header_size);
        if (false === $curl_response) { // CURL异常错误
            $curl_error = curl_error($curl);
            $this->ErrorResponse('',$curl_error);
        }
        curl_close($curl);
        $curl_response_code_type = substr($curl_response_code, 0, 1);
        switch (strval($curl_response_code_type)) { //根据HTTP响应状态码决定返回信息方式
            case '1': //消息
                break;
            case '2': //成功
                return $curl_body;
                break;
            case '3': //重定向
                //TODO Fix
                break;
            case '4': //请求错误
                $this->ErrorResponse($curl_response_code,'系统异常');
                break;
            case '5': //服务器错误
                $this->ErrorResponse($curl_response_code,'系统异常');
                break;
            case '6': //服务器错误
                $this->ErrorResponse($curl_response_code,'系统异常');
                break;
        }
        // TODO 处理异常情况
    }

}