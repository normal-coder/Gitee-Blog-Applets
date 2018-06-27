<?php

namespace API\Controller;

use API\Controller\BaseController;

/**
 * 系统控制器
 * Class UserController
 * @package API\Controller
 */
class SystemController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }


    public function mineList()
    {
        $data = [];
        $this->SuccessResponse($data);
    }

    public function about()
    {
    }


}