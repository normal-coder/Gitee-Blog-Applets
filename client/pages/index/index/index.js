// pages/index/index/index.js
import {
    wxRequest,
    checkNetwork,
    urls,
    showModal,
    userLogin,
    validateURL,
    getDateVisible,
    showToast
} from '../../../libs/wext/wext.js';

import {
    getTabList,
    getMineList,
} from '../../../utils/common.js';

import { Tab, extend } from '../../../style/zan-ui/index.js';

Page(extend({}, Tab, {
    data: {
        categoryTab: {
            list: [],
            selectedId: '',
            selectedTabID: 0,
            scroll: false,
            height: 45,
            scrolling:false,
        },
    },

    handleZanTabChange(e) { //点击切换
        var componentId = e.componentId;
        var selectedId = e.selectedId;
        console.warn(e);
        var tabList = this.data.categoryTab.list;
        for (var i = 0; i < tabList.length; i++) {
            if (tabList[i]['id'] == selectedId) {
                var selectedTabID = i;
            }
        }
        this.setData({
            [`categoryTab.selectedId`]: selectedId,
            [`categoryTab.selectedTabID`]: selectedTabID,
        });
    },

    swiperTab: function(e) { //滑动切换
        var that = this;
        that.setData({
            [`categoryTab.selectedId`]: this.data.categoryTab.list[e.detail.current]['id'],
            [`categoryTab.selectedTabID`]: e.detail.current,
        });
    },

    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    clientHeight: res.windowHeight
                });
            }
        });
        console.warn(options);
        
        getTabList({
            success: (res) => {
                console.warn(res);
                this.setData({
                    [`categoryTab.scroll`]: res['scroll'],
                    [`categoryTab.list`]: res['list'],
                    [`categoryTab.selectedId`]: res['list'][res['selectedId']]['id'],
                    [`categoryTab.selectedTabID`]: res['selectedId']
                });
                if (options.hasOwnProperty('q')) { //扫码进入时访问
                    var path = decodeURIComponent(options.q);
                    var pathArray = path.split("/"); //各个参数放到数组里
                    console.warn(pathArray);
                    console.warn(pathArray[4]);
                    var tabList = this.data.categoryTab.list;
                    for (var i = 0; i < tabList.length; i++) {
                        if (tabList[i]['id'] == pathArray[4]) {
                            var selectedTabID = i;
                        }
                    }
                    this.setData({
                        [`categoryTab.selectedId`]: pathArray[4],
                        [`categoryTab.selectedTabID`]: selectedTabID,
                    });
                } else {
                    // that.setData({
                    //     path: options.path,
                    // });
                }
                this.refresh({ singleTabRefresh: false });
            }
        });
        var that = this;
    },

    refresh: function(obj) {
        var that = this;
        if (this.data.scrolling == true) {
            console.info("请求刷新中，不执行其他操作")
        } else {
            let currentTabID = this.data.categoryTab.selectedTabID;
            let url = this.data.categoryTab.list[currentTabID].url;
            let currentTabDataID = "categoryTab.list[" + currentTabID + "].data";
            for (var i = 0; i < this.data.categoryTab.list.length; i++) {
                let url = this.data.categoryTab.list[i].url;
                let currentTabDataID = "categoryTab.list[" + i + "]";
                if (this.data.categoryTab.list[i].id == this.data.categoryTab.selectedId) { //刷新当前标签页：
                    console.info('刷新当前标签页：' + currentTabDataID + "；请求地址为：" + url);
                    if (obj.singleTabRefresh) {
                        wx.showLoading({ title: '正在刷新', })
                    } else {
                        wx.showLoading({ title: '加载中', })
                    }

                    this.firstRequest(url, currentTabDataID);
                } else { //刷新非当前标签页
                    if (!obj.singleTabRefresh) {
                        setTimeout(function() {
                            console.info('刷新标签页：' + currentTabDataID + "；请求地址为：" + url);
                            that.firstRequest(url, currentTabDataID);
                        }, 2000);
                    }
                }
            }
        // `categoryTab.selectedId`
        // console.warn(currentTabDataID);
        // this.firstRequest(url, currentTabDataID);
        }
    },

    firstRequest: function(url, currentTabDataID) {
        let that = this;
        wxRequest({
            url: urls.host + url,
            success: (res) => {
                console.warn(res);
                let data = currentTabDataID + ".data";
                let page = currentTabDataID + ".page";
                let currentPage = currentTabDataID + ".currentPage";
                this.setData({
                        [data]: res.list,
                        [page]: res.pagecount,
                        [currentPage]: 1,
                    })
                    // console.warn(res);
            },
            fail: function(res) { console.log(res.code + "====>" + res.error); },
            error: function(res) { console.log(res); },
            complete: function(res) {
                that.setData({ scrolling: false }); 
            },
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},


    /**
     * 页面上拉触底事件的处理函数
     */
    getNextPage: function() {
        var that = this;
        if (this.data.scrolling==true){
            console.info("请求刷新中，不执行其他操作")
        }else{
            that.setData({scrolling:true});
            //wx.showLoading({ title: '下一页数据加载中', });
            let currentTabID = this.data.categoryTab.selectedTabID;
            let url = this.data.categoryTab.list[currentTabID].url;
            let currentTabDataID = "categoryTab.list[" + currentTabID + "]";
            if (this.data.categoryTab.list[currentTabID].currentPage == this.data.categoryTab.list[currentTabID].page) {
                showToast({
                    'title': "没有下一页"
                });
                this.setData({ scrolling: false });
            } else {
                wx.showLoading({
                    title: '正在加载',
                })
                let newCurrentPage = this.data.categoryTab.list[currentTabID].currentPage + 1
                wxRequest({
                    url: urls.host + url + "/page/" + newCurrentPage,
                    success: (res) => {
                        console.warn(res);
                        let data = currentTabDataID + ".data";
                        let page = currentTabDataID + ".page";
                        let currentPage = currentTabDataID + ".currentPage";
                        var newData = this.data.categoryTab.list[currentTabID].data.concat(res.list);
                        that.setData({
                            [data]: newData,
                            [page]: res.pagecount,
                            [currentPage]: newCurrentPage,
                        })
                        setTimeout(function() { wx.hideLoading(); }, 1000);
                    },
                    fail: function(res) {
                        console.log(res);
                        setTimeout(function() { wx.hideLoading(); }, 1000);
                    },
                    complete: function(res) {
                        that.setData({ scrolling: false }); 
                    },
                });
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    refreshCurrentPage: function() {
        wx.showLoading({
            title: '正在刷新',
        })
        this.refresh({ singleTabRefresh: true });
        wx.stopPullDownRefresh();
    },
}));