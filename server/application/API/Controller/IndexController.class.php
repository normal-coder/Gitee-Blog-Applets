<?php

namespace API\Controller;


class IndexController extends WebController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {

    }

    public function BulletType()
    {
        $response['scroll'] = false;
        $list[] = ['id' => 'weekly', 'title' => '码云周刊', 'url' => '/Blog/category?category=weekly', 'data' => []];
        $list[] = ['id' => 'tips', 'title' => '用户故事', 'url' => '/Blog/category?category=tips', 'data' => []];
        $list[] = ['id' => 'cases', 'title' => '企业案例', 'url' => '/Blog/category?category=cases', 'data' => []];
        $list[] = ['id' => 'updates', 'title' => '产品动态', 'url' => '/Blog/category?category=updates', 'data' => []];
        $response['list'] = $list;
        $response['selectedId'] = 0;
        $this->SuccessResponse($response);
    }
}