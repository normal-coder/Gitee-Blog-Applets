/**
 * 网络请求模块
 * @module newDate - 获取当前时间戳
 * @module getDate - 获取当前日期
 * @module getDay - 获取当前时间为星期几
 * @module getDateVisible - 把时间转化为「多久前」
 * @author 诺墨 <normal@normalcoder.com>
 */
const newDate = new Date()
const getDate = () => newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate()
const getDay = () => " 星期" + "日一二三四五六".charAt(new Date().getDay())
const getDateVisible = (dateTimeStamp) => {
    let result;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime();
    let diffValue = now - dateTimeStamp;
    if (diffValue < 0) {return;}
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if (monthC >= 1) {
        if (monthC <= 12)
            result = "" + parseInt(monthC) + "月前";
        else {
            result = "" + parseInt(monthC / 12) + "年前";
        }
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}


module.exports = {
    newDate, getDate, getDay, getDateVisible
};


