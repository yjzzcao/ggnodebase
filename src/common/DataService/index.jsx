import $ from 'jQuery';
import Tool, { merged } from 'Common/Tool';
const timeout = 30000;
const APIparams = '/api/';
const DataService = {};

function makeApiParams(params) {
    var paramsObj = {};
    if (params && Object.prototype.toString.call(params) === '[object Object]') {
        for (var key in params) {
            var value = params[key];
            if (typeof (value) !== 'undefined' && value !== null && value !== Infinity) {
                if (Object.prototype.toString.call(value) === '[object Array]' || Object.prototype.toString.call(value) === '[object Object]') {
                    paramsObj[key] = JSON.stringify(value);
                } else {
                    paramsObj[key] = Tool.replaceAll(String(value), '\\*', "");
                }
            }
        }
    } else if (params && typeof (params) === 'string') {
        var strs = params.split('&');
        for (var i in strs) {
            var paramPair = strs[i].split('=');
            paramPair[1] = Tool.replaceAll(paramPair[1], '\\*', "");
            if (paramPair[0] === '') {
                continue;
                // break;
            }
            if (!paramPair[1]) {
                continue;
                // paramPair[1] = '';
            }
            paramsObj[decodeURIComponent(paramPair[0])] = decodeURIComponent(paramPair[1]);
        }
    }
    return paramsObj;
}

function getError(option, xhr) {
    const msg = `cannot post ${option.action} ${xhr.status}'`;
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = option.action;
    return err;
}

function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

// 下载文件，默认GET
DataService.download = (url, params, handle, method = 'get') => {
    var div = document.createElement('div');
    div.innerHTML = '<a href="' + document.createElement('a').appendChild(document.createTextNode(String(url))).parentNode.innerHTML + '"></a>';
    url = div.firstChild.href;

    var target = 'downloadTarget-' + (new Date()).getTime();
    var $downloader = $('<div style="display: none;"><form target="' + target + '"></form><iframe name="' + target + '"></iframe></div>');
    $('body').append($downloader);

    var $iframe = $downloader.children('iframe');
    $iframe.one('load', function () {
        function callbackNoError(res) {
            if (handle && typeof (handle.callbackNoError) === 'function') {
                handle.callbackNoError(res);
            }
        }

        function callbackAnyError(res) {
            if (handle && typeof (handle.callbackAnyError) === 'function') {
                handle.callbackAnyError(res);
            }
        }

        function callback0() {
            if (handle && typeof (handle.callback0) === 'function') {
                handle.callback0();
            }
        }

        function callback400() {
            if (handle && typeof (handle.callback400) === 'function') {
                handle.callback400();
            }
        }

        function callback401() {
            if (handle && typeof (handle.callback401) === 'function') {
                handle.callback401();
            }
        }

        function callback1001() {
            if (handle && typeof (handle.callback1001) === 'function') {
                handle.callback1001();
            }
        }

        function callback1009() {
            if (handle && typeof (handle.callback1009) === 'function') {
                handle.callback1009();
            }
        }

        function callback1100() {
            if (handle && typeof (handle.callback1100) === 'function') {
                handle.callback1100();
            }
        }

        function callback1101() {
            if (handle && typeof (handle.callback1101) === 'function') {
                handle.callback1101();
            }
        }

        function callbackError() {
            if (handle && typeof (handle.callbackError) === 'function') {
                handle.callbackError();
            }
        }

        function callbackFail() {
            if (handle && typeof (handle.callbackFail) === 'function') {
                handle.callbackFail();
            }
        }
        setTimeout(function () {
            var resp = null;
            try {
                resp = JSON.parse($iframe.contents().find('body').text());
                if (resp.code === 0 && !util.isBlankVariable(resp.data)) {
                    callback0();
                    callbackNoError(resp);
                } else if (resp.code === 1001 || (resp.code === 0 && util.isBlankVariable(resp.data))) {
                    callback1001();
                    callbackNoError(resp);
                } else {
                    if (resp.code === 400) {
                        callback400();
                    } else if (resp.code === 401) {
                        callback401();
                    } else if (resp.code === 1009) {
                        callback1009();
                    } else if (resp.code === 1100) {
                        callback1100();
                    } else if (resp.code === 1101) {
                        callback1101();
                    } else {
                        callbackError();
                    }
                    callbackAnyError(resp);
                }
            } catch (err) {
                callbackFail();
                callbackAnyError(err);
            }
        }, 1000);
    });

    var $form = $downloader.children('form');
    $form.empty();
    $form.attr('action', url);
    if (String(method).toLowerCase() === 'get') {
        console.log("get");
        $form.attr('method', 'get');
    } else {
        console.log("post");
        $form.attr('method', 'post');
    }
    params = makeApiParams(params);
    for (var key in params) {
        var value = params[key];
        var $input = $('<input type="text"/>');
        $input.attr('name', key);
        $input.attr('value', value);
        $form.append($input);
    }
    var $submit = $('<input type="submit"/>');
    $form.append($submit);
    $submit.click();

    setTimeout(function () {
        $downloader.remove();
    }, 60000);
};

/**
 * 上传文件方法
 * 文档：https://github.com/react-component/upload/blob/master/src/request.js
 * @param Object option
 * @param Function option.onProgress(e)
 * @param Function option.onError(e)
 * @param Function option.onError(e, body)
 * @param Function option.onSuccess(body, xhr)
 * @param Object option.data
 * @param String option.filename
 * @param File option.file
 * @param Boolean option.withCredentials
 * @param String option.action
 * @param Object option.headers
 */
DataService.upload = option => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = e => {
        if (e.total > 0) {
            e.percent = e.loaded / e.total * 100;
        }
        option.onProgress(e);
    };

    const formData = new FormData();

    if (option.data) {
        Object.keys(option.data).map(key => {
            formData.append(key, option.data[key]);
        });
    }

    formData.append('file_name', option.filename);
    formData.append('file', option.file);

    xhr.onerror = e => {
        option.onError(e);
    };

    xhr.onload = function onload() {
        // allow success when 2xx status
        // see https://github.com/react-component/upload/issues/34
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr));
        }
        option.onSuccess(getBody(xhr), xhr);
    };

    xhr.open('post', option.action, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    // when set headers['X-Requested-With'] = null , can close default XHR header
    // see https://github.com/react-component/upload/issues/33
    if (headers['X-Requested-With'] !== null) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    for (const h in headers) {
        if (headers.hasOwnProperty(h) && headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }

    xhr.send(formData);

    return xhr;
};

DataService.get = function (api, params = {}) {
    // params.token = Tool.getCookie('token');
    return $.ajax({
        url: APIparams + api,
        type: 'GET',
        data: makeApiParams(params),
        timeout: timeout
    });
};

DataService.post = function (api, params = {}) {
    // params.token = Tool.getCookie('token');
    return $.ajax({
        url: APIparams + api,
        type: 'POST',
        timeout: timeout,
        data: makeApiParams(params)
    });
};

DataService.handleDataResponse = function (option) {
    const dataResponse = option.dataResponse,
        callback0 = option.callback0, // 请求成功
        callback1001 = option.callback1001, // 请求成功无数据
        callbackNoError = option.callbackNoError, // 无错误，请求成功或者无数据
        callback1009 = option.callback1009,
        callback1100 = option.callback1100,
        callback1101 = option.callback1101,
        callback401 = option.callback401,
        callback400 = option.callback400,
        callbackError = option.callbackError, // 不是上面任何错误之一
        callbackAnyError = option.callbackAnyError, // 只要有错误就会调用
        callbackFail = option.callbackFail, // 请求失败(基本为网络错误)
        afterResponse = option.afterResponse;

    dataResponse.done(function (res) {
        if (typeof (res) !== 'object') {
            // 登录失效
            if (callbackAnyError && typeof callbackAnyError === "function") {
                callbackAnyError(res);
            }
            return false;
        }
        const statusCode = res.code;
        if (statusCode === 0) {
            if (callback0 && typeof callback0 === "function") {
                callback0(res.data);
            }
            if (callbackNoError && typeof callbackNoError === "function") {
                callbackNoError(res);
            }
        } else if (statusCode === 1001) {
            if (callback1001 && typeof callback1001 === "function") {
                callback1001();
            }
            if (callbackNoError && typeof callbackNoError === "function") {
                callbackNoError(res);
            }
        } else {
            if (statusCode === 1100) {
                if (callback1100 && typeof callback1100 === "function") {
                    callback1100();
                }
                // 记录当前页面，添加跳转参数
                const { pathname, hash } = window.location;
                const url = `?url=${encodeURIComponent(pathname + hash)}`;
                window.location.href = "/" + url;
            } else if (statusCode === 1101) {
                if (callback1101 && typeof callback1101 === "function") {
                    callback1101();
                }
            } else if (statusCode === 401) {
                if (callback401 && typeof callback401 === "function") {
                    callback401();
                }
            } else if (statusCode === 400) {
                if (callback400 && typeof callback400 === "function") {
                    callback400();
                }
            } else if (statusCode === 1009) {
                if (callback1009 && typeof callback1009 === "function") {
                    callback1009();
                }
            } else if (callbackError && typeof callbackError === "function") {
                callbackError(res);
            }
            if (callbackAnyError && typeof callbackAnyError === "function") {
                callbackAnyError(res);
            }
        }
    });

    dataResponse.fail(function (jqXHR, status, error) {
        let res = {};
        if (error === "") {
            res = { code: 408, message: status };
        } else {
            res = error;
        }
        if (callbackFail && typeof callbackFail === "function") {
            callbackFail();
        }
        if (callbackAnyError && typeof callbackAnyError === "function") {
            callbackAnyError(res);
        }
    });

    dataResponse.always(function () {
        if (afterResponse && typeof afterResponse === 'function') {
            afterResponse();
        }
    });

    dataResponse.complete(function (jqXHR, status) {
        if (status === 'timeout') { return false; } // 处理请求超时
    });

    return dataResponse;
};

DataService.getTimeout = function (params) {
    // interval 时间间隔 maxTime 最大时间限制
    let r = null;
    if (params === 'interval') {
        r = 2000; // 2000ms
    } else if (params === 'maxTime') {
        r = 10 * 60 * 1000; // 10min
    }
    return r;
};

export default DataService;
