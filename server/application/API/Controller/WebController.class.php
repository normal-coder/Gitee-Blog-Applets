<?php

namespace API\Controller;

class WebController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        if (I('get.token')){
            //$userinfo
            $user = D('User')->checkUserByToken(I('get.token'));
            if ($user){
                $_SESSION=$user;
            }
        }
    }
}