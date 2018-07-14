import merged from 'obj-merged';
export { merged };

import moment from 'moment';
import 'moment/locale/zh-cn';
export { moment };

// 自行新添加的Tool.{func}需要添加注释
const Tool = {};

/**
 * 获取URL参数
 * @param param 获取的value
 * @return {string}
 */
Tool.getQuery = params => {
    var result = window.location.search.match(new RegExp("(\\?|&)" + params + "=([^&]*)(&|$)"));
    return result ? decodeURIComponent(result[2]) : null;
}

Tool.replaceAll = (strOrg, strFind, strReplace) => {
    return strOrg.replace(new RegExp(strFind, "g"), strReplace);
}

/**
 * 获取token
 */
Tool.getToken = () => {
    let t = Tool.getCookie('token');
    if (t === null) {
        // TODO: 如果获取不到需要跳转Login;
    } else {
        return t;
    }
}
/**
 * 获取cookie
 */
Tool.getCookie = (name) => {
    if (name === undefined) return document.cookie;
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
/**
 * 设置cookie
 */
Tool.setCookie = (key, value, expiredays = 0) => {
    let expire = new Date();
    expire.setTime(expire.getTime() + expiredays * 24 * 60 * 60 * 1000); // 设置cookie的期限
    document.cookie = key + "=" + escape(value) + "; expires=" + expire.toGMTString(); // 创建cookie
}
/**
 * 删除cookie
 */
Tool.delCookie = (name, times = -1) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = Tool.getCookie(name);
    if (cval !== null) {
        document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
    }
}

// 本地缓存设置
Tool.setLocalStorage = (key, value, timeout) => {
    if (!Tool.isNotBlank(key) || !Tool.isNotBlank(value)) return;
    var res = new RegExp("^\\+?[1-9][0-9]*$");
    if (!res.test(timeout)) {
        timeout = null;
    }
    var nowTimeStamp = null;
    if (timeout != null) {
        nowTimeStamp = new Date().getTime()
    }
    var storagevalue = {
        value: value,
        timeout: timeout,
        timestamp: nowTimeStamp
    };
    localStorage.setItem(key, JSON.stringify(storagevalue));
};
// 获取本地缓存设置
Tool.getLocalStorage = key => {
    var storagevalue = JSON.parse(localStorage.getItem(key));
    if (!Tool.isNotBlank(storagevalue)) return null;
    if (!Tool.isNotBlank(storagevalue.timeout) || storagevalue.timeout <= 0) {
        return storagevalue.value;
    }
    var nowTimeStamp = new Date().getTime();
    var storeTimeStamp = storagevalue.timestamp;
    var timeout = storagevalue.timeout;
    if ((nowTimeStamp - storeTimeStamp) < timeout) {
        return storagevalue.value;
    }
    localStorage.removeItem(key);
    return null;
};

/**
 * 判断IE版本是否低于默认版本
 * 参数：默认版本(默认为8.0)
 */
Tool.isIElt = (DEFAULT_VERSION = "8.0") => {
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie") > -1;
    var safariVersion;
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
    }
    return !!(parseFloat(safariVersion) <= parseFloat(DEFAULT_VERSION));
}

/**
 * ajax之后打开新窗口，防止浏览器拦截
 * @param String href 打开的URL
 */
Tool.open = href => {
    const a = document.createElement('a')
    const span = document.createElement('span')
    $(a).click(function(e) {
        window.open(href);
    }).append(span);
    document.body.appendChild(a);
    $(span).trigger('click');
}

/**
 * 找数组对象索引方法
 * k 对象键值
 * v 搜索的值
 * range 搜索数组
 * start 开始位置
 * flag 是否全等于
 */
Tool.search = (k, v, range, start = 0, flag = false) => {
    let l = -1;
    for (let j = range.length; start < j; start++) {
        if (range[start][k] === v || range[start][k] == v && flag) {
            l = start;
            break;
        }
    }
    return l;
}
Tool.searchRight = (k, v, range, start = 0) => {
    let l = -1;
    for (let i = range.length - 1 - start; i >= 0; i--) {
        if (range[i][k] === v) {
            l = i;
            break;
        }
    }
    return l;
}

// 获取数据类型
Tool.type = obj => {
    if (obj == null) {
        return obj + "";
    }
    let class2type = {};
    let toString = class2type.toString;
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").map((name, index) => {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
}

// 数字处理
/**
 * 简单判断是否为数字，或者是数字字符串
 */
Tool.isNumber = obj => {
    var realStringObj = obj && obj.toString();
    return !Tool.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
}
/**
 * 千分位计数
 * 当传入值为无效值时返回'--',否则原样返回
 * s 为传入的值
 * fixed 为保留几位小数
 * unit 单位
 */
Tool.milliFormat = (s, fixed = 4, unit = '', zoom = 1, isfixed = false) => {
    if (s === null || s === undefined || s !== s || s === '') return '--';
    if (!Tool.isNumber(s)) return s;
    if (isfixed) {
        s = Number(s * zoom).toFixed(fixed);
    } else {
        // s = (s * zoom * Math.pow(10, fixed) | 0) / Math.pow(10, fixed);
        s = Math.floor(parseFloat((s * zoom * Math.pow(10, fixed)).toFixed(8))) / Math.pow(10, fixed);
        s = s.toFixed(fixed);
    }
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) {
        s = s.replace(re, "$1,$2");
    }
    var orz = '/,(';
    for (var i = 0; i < fixed; i++) {
        orz += '\\d';
    };
    orz += ')$/';
    s = s.replace(eval(orz), ".$1");
    return s.replace(/^\./, "0.") + unit;
}
/**
 * 根据value值获取涨跌颜色
 */
Tool.RiseFallColor = (value, base = 0) => {
    const RED = '#d54636';
    const GREEN = '#00a320';
    const GRAY = '#354052';
    if (Tool.isNumber(value)) {
        if (Number(value) > base) {
            return RED;
        } else if (Number(value) < base) {
            return GREEN;
        }
    }
    return GRAY;
}

// 对象判断
/**
 * 判断是否为有空
 */
Tool.isNotBlank = value => {
    if (value === null || value === undefined || value !== value ||
        value === 'null' || value === 'undefined' || value === 'NaN' || value === '') {
        return false;
    } else {
        let jsonStr = null;
        try {
            jsonStr = JSON.stringify(value);
        } catch (error) {
            jsonStr = ""
        }
        if (jsonStr === "{}") {
            return false;
        }
        return true;
    }
}
/**
 * 简单判断对象是否相等
 */
/**
 * 简单判断数组对象是否包含一个对象
 */
// TODO
/**
 * 简单判断数组对象的指定的值是否相等
 */
Tool.isArrayContainerValue = (array, key, value) => {
    var flag = false;
    array.map((item, index) => {
        if (item[key] === value) {
            flag = true;
        }
    })
    return flag
}
/**
 * 对象数组比较
 * arr1
 * arr2
 * key
 * order
 */
Tool.arrayCompare = (arr1, arr2, key, order = false) => {
    try {
        let result = false;
        // 数组长度不一致
        if (arr1.length !== arr2.length) {
            return result;
        }

        result = true;
        if (order) { // 顺序要求一致
            for (let i = 0; i < arr1.length; i++) {
                if (Tool.isNotBlank(key)) {
                    if (arr1[i][key] != arr2[i][key]) {
                        result = false;
                        break;
                    }
                } else {
                    if (arr1[i] != arr2[i]) {
                        result = false;
                        break;
                    }
                }
            }
        } else { // 顺序可以不一致
            for (let i = 0; i < arr1.length; i++) {
                let temp = false;
                for (let j = 0; j < arr2.length; j++) {

                    if (Tool.isNotBlank(key)) {
                        if (arr1[i][key] == arr2[j][key]) {
                            temp = true;
                            break;
                        }
                    } else {
                        if (arr1[i] == arr2[j]) {
                            temp = true;
                            break;
                        }
                    }
                }
                if (!temp) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// 数组处理
/**
 * 判断是否为数组
 */
Tool.isArray = Array.isArray || (obj => {
    return Tool.type(obj) === "array";
})
Tool.getObjectKeys = Object.keys || (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;
    return function (obj) {
        if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
        var result = [];
        for (var prop in obj) {
            if (hasOwnProperty.call(obj, prop)) result.push(prop);
        }
        if (hasDontEnumBug) {
            for (var i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
            }
        }
        return result;
    }
})();

// 格式化空处理
/**
 * 友好输出字符串
 * 当传入值为无效值时返回'--',否则原样返回
 */
Tool.friendlyString = (value, defaultValue = '--') => {
    if (value === null || value === undefined || value !== value ||
        value === 'null' || value === 'undefined' || value === 'NaN' || value === '' || value === false) {
        return defaultValue;
    } else {
        return value;
    }
}

// 时间处理
/**
 * 格式化输出日期
 */
Tool.formatDateTime = (date = null, format = "YYYY-MM-DD HH:mm:ss") => {
    const d = moment(date, format).format(format);
    return d === "Invalid date" ? "--" : d;
}
/**
 * 格式化输出日期
 */
Tool.formatDate = (date, format = "YYYY-MM-DD") => {
    return Tool.formatDateTime(date, format);
}
/**
 * 格式化输出时间
 */
Tool.formatTime = (time, format = "HH:mm") => {
    return Tool.formatDateTime(time, format);
}
/**
 * 根据天数格式化输出，X年X月
 */
Tool.friendlyDays = days => {
    let start_data = moment().subtract(days, 'days').format('YYYY-MM-DD');
    return Tool.ggYYMM(start_data);
}
/**
 * 根据开始时间&结束时间格式化输出，X年X月
 */
Tool.ggYYMM = (start_date, end_date) => {
    if (start_date === null) return '--';
    let total_months = moment(end_date || new Date()).diff(moment(start_date), 'months');
    let total_years = parseInt(total_months / 12);
    let months = total_months % 12;
    if (total_years === 0 && months !== 0) return `${months}月`;
    if (months === 0 && total_years !== 0) return `${total_years}年`;
    if (total_years === 0 && months === 0) return '--';
    return `${total_years}年${months}月`;
}
/**
 * 格式化输出文件大小
 * @param Number size 文件大小(字节计算)
 */
Tool.friendlySize = size => {
    const gear = [1, 1000, 1000, 1000];
    const fixed = [0, 0, 1, 2];
    const unit = ['字节', 'KB', 'MB', 'GB'];

    const calc = (size, level = 0) => {
        if (size >= gear[level + 1]) {
            return calc(size / gear[level + 1], level + 1);
        } else {
            return Tool.milliFormat(size, fixed[level], unit[level], 1, true);
        }
    }

    return calc(parseFloat(size));
}

// 格式验证
/**
 * 验证手机号
 */
Tool.isMobile = v => {
    return !!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(v))
}
/**
 * 验证邮箱
 */
Tool.isEmail = v => {
    return !!(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(v))
}

export default Tool;
