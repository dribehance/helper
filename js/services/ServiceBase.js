import __config from '../etc/config'
import es6 from '../utils/plugins/es6-promise'

class ServiceBase {
    constructor() {
        Object.assign(this, {
            $$basePath: __config.basePath
        })
        this.__init()
    }

    /**
     * __init
     */
    __init() {
        this.__initDefaults()
        this.__initMethods()
    }

    /**
     * __initDefaults
     */
    __initDefaults() {
        // 方法名后缀字符串
        this.suffix = 'Request'

        // 发起请求所支持的方法
        this.instanceSource = {
            method: [
                'OPTIONS',
                'GET',
                'HEAD',
                'POST',
                'PUT',
                'DELETE',
                'TRACE',
                'CONNECT',
            ]
        }
    }

    /**
     * 遍历对象构造方法，方法名以小写字母+后缀名
     */
    __initMethods() {
        for (let key in this.instanceSource) {
            this.instanceSource[key].forEach((method, index) => {
                this[method.toLowerCase() + this.suffix] = (...args) => this.__defaultRequest(method, ...args)
            })
        }
    }

    /**
     * 以wx.request作为底层方法
     * @param {String} method 请求方法
     * @param {String} url    接口地址
     * @param {Object} params 请求参数
     * @param {Object} header 设置请求的 header
     * @param {String} dataType 请求的数据类型
     */
    __defaultRequest(method = '', url = '', params = {}, header = {}, interceptors = [], dataType = 'json') {
        const $$header = Object.assign({}, this.setHeaders(), header)
        const $$url = this.setUrl(url)

        // 注入拦截器
        const chainInterceptors = (promise, interceptors) => {
            for (let i = 0, ii = interceptors.length; i < ii;) {
                let thenFn = interceptors[i++]
                let rejectFn = interceptors[i++]
                promise = promise.then(thenFn, rejectFn)
            }
            return promise
        }

        // 请求参数配置
        const $$config = {
            url: $$url,
            data: params,
            header: $$header,
            method: method,
            dataType: dataType,
        }

        let requestInterceptors = []
        let responseInterceptors = []
        let reversedInterceptors = this.setInterceptors(interceptors)
        let promise = this.__resolve($$config)

        // 缓存拦截器
        reversedInterceptors.forEach((n, i) => {
            if (n.request || n.requestError) {
                requestInterceptors.push(n.request, n.requestError)
            }
            if (n.response || n.responseError) {
                responseInterceptors.push(n.response, n.responseError)
            }
        })

        // 注入请求拦截器
        promise = chainInterceptors(promise, requestInterceptors)

        // 发起HTTPS请求
        promise = promise.then(this.__http);

        // 注入响应拦截器
        promise = chainInterceptors(promise, responseInterceptors)

        // 接口调用成功，res = {data: '开发者服务器返回的内容'}
        promise = promise.then(res => res.data, this.__reject);

        return promise
    }

    /**
     * __http - wx.request
     */
    __http(obj) {
        return new es6.Promise((resolve, reject) => {
            obj.success = (res) => resolve(res)
            obj.fail = (res) => reject(res)
            wx.request(obj)
        })
    }

    /**
     * __resolve
     */
    __resolve(res) {
        return new es6.Promise((resolve, reject) => {
            resolve(res)
        })
    }

    /**
     * __reject
     */
    __reject(res) {
        return new es6.Promise((resolve, reject) => {
            reject(res)
        })
    }

    /**
     * 设置请求路径
     */
    setUrl(url) {
        return `${this.$$basePath}${this.$$prefix}${url}`
    }

    /**
     * 设置请求的 header , header 中不能设置 Referer
     */
    setHeaders() {
        return {
            // 'Accept': 'application/json', 
            // 'Content-type': 'application/json', 
            'Authorization': 'Bearer ' + wx.getStorageSync('token'),
        }
    }

    /**
     * 设置request拦截器
     */
    setInterceptors(interceptors) {
        return [{
            request: (request) => {
                request.header = request.header || {}
                request.requestTimestamp = new Date().getTime()
                if (request.url.indexOf('/api') !== -1 && wx.getStorageSync('token')) {
                    request.header.Authorization = 'Bearer ' + wx.getStorageSync('token')
                }
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 10000,
                    mask: !0,
                })
                return request
            },
            requestError: (requestError) => {
                wx.hideToast();
                return new es6.Promise((resolve, reject) => reject(requestError));
            },
            response: (response) => {
                return new es6.Promise((resolve, reject) => {
                    var error = {}, errorList = [];
                    response.responseTimestamp = new Date().getTime();
                    // server not response
                    if (response.statusCode != 200) {
                        error.errorCode = response.statusCode;
                        error.errorMessage = "数据加载出错，请稍后再试";
                        errorList.push(error);
                    }
                    // server response empty data
                    if (!response.data) {
                        error.errorCode = 404;
                        error.errorMessage = "数据加载出错，请稍后再试";
                        errorList.push(error);
                    }
                    // server response data not json
                    if (response.data && typeof response.data == "string") {
                        var data = response.data
                            .replace(/\n+/g, "")
                            .replace(/\t+/g, "")
                        response.data = JSON.parse(data);
                    }
                    // reject or resolve
                    wx.hideToast();
                    if (errorList.length > 0) {
                        wx.showModal({
                            title: '友情提示',
                            content: errorList[0].errorMessage,
                            showCancel: !1,
                            success: function () {
                                wx.navigateBack();
                            }
                        });
                        reject(errorList[0]);
                    }
                    else {
                        resolve(response);
                    }
                });
            },
            responseError: (responseError) => {
                // "request:fail"
                return new es6.Promise((resolve, reject) => {
                    wx.hideToast();
                    wx.showModal({
                        title: '友情提示',
                        content: "服务器繁忙，稍后再试",
                        showCancel: !1,
                        success: function () {
                            wx.navigateBack();
                        }
                    });
                    reject({
                        errorCode: 500,
                        errorMessage: "服务器繁忙，稍后再试"
                    })
                });
            },
        }].concat(interceptors)
    }
}

export default ServiceBase