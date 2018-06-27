<?php

namespace API\Controller;

use GuzzleHttp\Client;
use PHPHtmlParser\Curl;
use PHPHtmlParser\Dom;
use Think\Exception;

class BlogController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function category()
    {
        $category = I('get.category');
        if (empty(I('get.page')) or I('get.page') == 1) {
            $url = 'https://blog.gitee.com/category/' . $category . '/';
        } else {
            $url = 'https://blog.gitee.com/category/' . $category . '/page/' . I('get.page') . '/';
        }
        $pageData = $this->httppost($url, 'GET');
        $dom = new Dom;
        $dom->load($pageData);
        $article = $dom->find('article');
        $categoryData = [];
        foreach ($article as $singleArticle) {
            try {
                $data['thumbnail'] = $singleArticle->find('img')->getAttribute('src');
            } catch (\Exception $e) {
                $data['thumbnail'] = 'https://blog.gitee.com/wp-content/uploads/2018/06/cropped-logo-3.jpg';
            }
            $data['title'] = $singleArticle->find('.entry-title')->find('a')->text;
            $data['href'] = $singleArticle->find('.entry-title')->find('a')->getAttribute('href');
            $data['category'] = $singleArticle->find('.entry-meta')->find('a')->text;
            $data['date'] = $singleArticle->find('.entry-meta')->find('.date')->text;
            $categoryData['list'][] = $data;
        }

        try {
            $page = [];
            $navLink = $dom->find('.nav-links')->find('.page-numbers');
            foreach ($navLink as $singleNavLink) {
                $page[] = $singleNavLink->text;
            }
            if (empty($page[count($page) - 1])) {
                $categoryData['pagecount'] = $page[count($page) - 2];
            } else {
                $categoryData['pagecount'] = $page[count($page) - 1];
            }
        } catch (\Exception $e) {
            $categoryData['pagecount'] = 1;
        }
        $this->SuccessResponse($categoryData);
    }


    public function detail()
    {
        $path= I('get.path');
//        $path = 'https://blog.gitee.com/2018/06/11/gitee_pages_news/';
        $pageData = $this->httppost($path, 'GET');
        $dom = new Dom;
        $dom->load($pageData);
        $data['title'] = $dom->find('.entry-title')->text;
        $data['category'] = $dom->find('.entry-meta')->find('a')->text;
        $data['date'] = $dom->find('.entry-meta')->find('.date')->text;
        $data['content'] = $dom->find('.entry-content')->innerhtml;
        $this->SuccessResponse($data);
    }
}