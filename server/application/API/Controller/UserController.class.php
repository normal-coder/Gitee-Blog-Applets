<?php

namespace API\Controller;

use API\Controller\BaseController;
use EasyWeChat\Factory;
use Common\Model\UserModel;
use normalcoder\EasyOSC\EasyOSC;


/**
 * 用户控制器
 * Class UserController
 * @package API\Controller
 */
class UserController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function login()
    {
        $config = [
            'app_id'        => C('miniapp.appid'),
            'secret'        => C('miniapp.secret'),
            'response_type' => 'array',
            //'log'           => ['level' => 'debug', 'file' => __DIR__ . '/wechat.log',],
        ];
        $app = Factory::miniProgram($config);
        $code = I('get.code');
        $wxUserInfo = $app->auth->session($code);
        if (empty($wxUserInfo['errcode']) && !empty($wxUserInfo['openid'])) {
            //正确解码
            if ($_SESSION['session_key'] !== $wxUserInfo['session_key']) {
                $_SESSION['session_key'] = $wxUserInfo['session_key'];
            }
            $User = D('User');
            $res = $User->checkUserByOpenID($wxUserInfo['openid']); //检查是否存在用户
            if ($res) { //存在微信用户
                $_SESSION = $res;
                if (!empty($res['account'])) { //已经绑定
                    $response = ['bind' => 1, 'oscuid' => $res['oscuid']];
                } else { //未绑定
                    $response = ['bind' => 0];
                }
                $this->SuccessResponse($response);
            } else { //不存在用户，创建用户
                $create_res = $User->addWxUser($wxUserInfo); //检查是否存在用户
                if ($create_res) {
                    $response = ['bind' => 0];
                    $this->SuccessResponse($response);
                } else {
                    $this->ErrorResponse('', '系统异常');
                }
            }
        } else {
            //异常情况，登陆所用code过期、或者是重复使用等
            $this->ErrorResponse('', $wxUserInfo['errmsg']);
        }
    }

    public function UserUpdateInfo()
    {
        $config = [
            'app_id'        => C('miniapp.appid'),
            'secret'        => C('miniapp.secret'),
            'response_type' => 'array',
            //'log'           => ['level' => 'debug', 'file' => __DIR__ . '/wechat.log',],
        ];
        $app = Factory::miniProgram($config);
        $iv = $this->checkParams("post", 'iv', '', false);
        $code = $this->checkParams("post", 'code', '', false);
        $encryptedData = $this->checkParams("post", 'encryptedData', '', false);
        $wxUserInfo = $app->auth->session($code);
        $wxUserInfo_decode = $app->encryptor->decryptData($wxUserInfo['session_key'], $iv, $encryptedData);
        $data = [
            'nickname'  => $wxUserInfo_decode["nickName"],
            'gender'    => $wxUserInfo_decode["gender"],
            'language'  => $wxUserInfo_decode["language"],
            'city'      => $wxUserInfo_decode["city"],
            'province'  => $wxUserInfo_decode["province"],
            'country'   => $wxUserInfo_decode["country"],
            'avatarurl' => $wxUserInfo_decode["avatarUrl"],
            'unionid'   => $wxUserInfo_decode["unionId"],
        ];
        $User = D('User');
        $res = $User->updateUsersWeChatInfo($_SESSION['openid'], $data);
        if ($res || $res == 0) {
            $this->SuccessResponse();
        } else {
            //$this->ErrorResponse('资料更新异常');
        }
    }
}