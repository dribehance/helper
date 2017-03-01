import ServiceBase from 'ServiceBase';
import __config from '../etc/config'
import Tools from 'Tools'
import es6 from '../utils/plugins/es6-promise'
const tools = new Tools();
class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = ''
		this.$$path = [{
			method: "get",
			name: "getIndex",
			route: '/app/home/index',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			method: "get",
			name: "getBanner",
			route: '/app/home/banner',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			method: "get",
			name: "getProduct",
			route: '/app/goods/detail',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			method: "get",
			name: "getNature",
			route: '/app/goods/nature',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			method: "get",
			name: "getProducts",
			route: '/app/catalog/goods_list_by_catalog',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			method: "get",
			name: "getProductsByKeyword",
			route: '/app/goods/goods_list_by_catalog',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			method: "get",
			name: "getCategorys",
			route: '/app/catalog/index',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			method: "get",
			name: "getKeywords",
			route: '/app/searcher/hot_keyword',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	我的购物车
			method: "get",
			name: "getShoppingcart",
			route: '/app/goods/shopping_car',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	加入购物车
			method: "post",
			name: "postTocart",
			route: '/app/goods/add_to_shopping_car',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	修改购物车
			method: "put",
			name: "changeShoppingcartAmount",
			route: '/app/goods/change_shopping_car',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	删除购物车
			method: "delete",
			name: "deleteShoppingcart",
			route: '/app/goods/delete_shopping_car',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	优惠券列表
			method: "get",
			name: "getAllCoupons",
			route: '/app/usercenter/vanchers_list',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	首页领取优惠券
			method: "get",
			name: "selectCoupon",
			route: '/app/home/pickup_vancher',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	支付选取优惠券列表
			method: "get",
			name: "getAvailableCoupons",
			route: '/app/goods/available_vancher',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	待付款
			method: "get",
			name: "getUnpayOrders",
			route: '/app/goods/topayOrders',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	已付款
			method: "get",
			name: "getPayOrders",
			route: '/app/goods/payOrders',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	全部订单
			method: "get",
			name: "getAllOrders",
			route: '/app/goods/myOrders',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	订单详情
			method: "get",
			name: "getOrderById",
			route: '/app/goods/payOrdersDetails',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	获取预付订单信息
			method: "get",
			name: "getPrepayPayOrderInfo",
			route: '/app/goods/topay',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	生产预付订单
			method: "get",
			name: "fillinorder",
			route: '/app/goods/pre_pay',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	支付订单
			method: "get",
			name: "payOrder",
			route: '/app/goods/wx_pay',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	取消订单
			method: "get",
			name: "cancelOrder",
			route: '/app/usercenter/cancel_order',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	收货地址
			method: "get",
			name: "getAddress",
			route: '/app/usercenter/address_list',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	新增地址
			method: "post",
			name: "postAddress",
			route: '/app/usercenter/add_address',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	修改收货地址
			method: "put",
			name: "putAddress",
			route: '/app/usercenter/modify_address',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	设置默认地址
			method: "get",
			name: "setDefaultAddress",
			route: '/app/usercenter/set_default_address',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	删除收货地址
			method: "delete",
			name: "deleteAddress",
			route: '/app/usercenter/delete_address',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	login code
			method: "post",
			name: "postLogin",
			route: '/app/usercenter/login',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	同步用户信息到服务器
			method: "post",
			name: "postUserInfo",
			route: '/app/usercenter/set_user_info',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	获取刷选条件
			method: "get",
			name: "getFilterInfo",
			route: '/app/goods/filter',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	收藏列表
			method: "get",
			name: "getSaveList",
			route: '/app/usercenter/collect_list',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	加入收藏
			method: "get",
			name: "save",
			route: '/app/usercenter/add_collect',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}, {
			// 	取消收藏
			method: "get",
			name: "cancelSave",
			route: '/app/usercenter/cancel_collect',
			interceptors: [this.networkInterceptor(), this.serverInterceptor(), this.sessionInterceptor(), this.tokenInterceptor(), this.imageInterceptor()]
		}];
		var that = this;
		this.$$path.forEach(function (path, index) {
			(function (path) {
				that[`${path.name}`] = function (params) {
					if (!params) params = {};
					var header = {}, interceptors = path.interceptors || [];
					return that[`getRequest`](path.route, params, header, interceptors);
				}
			})(path)
		});
	}
	networkInterceptor() {
		return {
			request: (request) => {
				var obj = {};
				return new es6.Promise((resolve, reject) => {
					obj.success = (res) => {
						if (res.networkType == "none") {
							wx.hideToast();
							wx.showModal({
								title: '友情提示',
								content: '网络不佳，请稍后重试',
								showCancel: !1,
								success: function () {
									wx.navigateBack();
								}
							});
							reject({
								errorCode: "none",
								errorMessage: "网络不佳，请稍后重试"
							});
						}
						else {
							resolve(request);
						}
					}
					obj.fail = (res) => reject(res)
					wx.getNetworkType(obj)
				})
			},
			requestError: (requestError) => {
				return new es6.Promise((resolve, reject) => reject(requestError));
			},
			response: (response) => {
				return response;
			},
			responseError: (responseError) => {
				return new es6.Promise((resolve, reject) => reject(responseError));
			}
		}
	}
	serverInterceptor() {
		return {
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
				return new es6.Promise((resolve, reject) => {
					// "request:fail"
					if (!responseError.errorCode) {
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
					}
					// other fail
					else {
						reject(responseError);
					}
				});
			},
		}
	}
	sessionInterceptor() {
		return {
			request: (request) => {
				return new es6.Promise((resolve, reject) => {
					if (wx.getStorageSync('rd_session')) {
						request.data.rd_session = wx.getStorageSync('rd_session');
						request.data.token = "kb2017";
						resolve(request);
					}
					reject({
						errorCode: "405",
						errorMessage: "未登录"
					});
				});
			},
			requestError: (requestError) => {
				return new es6.Promise((resolve, reject) => reject(requestError));
			},
			response: (response) => {
				return response
			},
			responseError: (responseError) => {
				return new es6.Promise((resolve, reject) => reject(responseError));
			}
		}
	}
	tokenInterceptor() {
		return {
			request: (request) => {
				request.data.token = "kb2017";
				return request;
			},
			requestError: (requestError) => {
				return new es6.Promise((resolve, reject) => reject(requestError));
			},
			response: (response) => {
				return response
			},
			responseError: (responseError) => {
				return new es6.Promise((resolve, reject) => reject(responseError));
			}
		}
	}
	imageInterceptor() {
		var that = this;
		var recursion = function (data, callback) {
			for (var key in data) {
				if (typeof data[key] == "object") {
					recursion(data[key], callback);
				}
				else {
					data[key] = callback(data[key]);

				}
			}
			return data;
		}
		var parseData = function (data) {
			if (!data) return "";
			var renderImage = function (path) {
				if (!path) return ''
				if (path.indexOf('http') !== -1) return path
				return `${__config.fileBasePath}${path}`
			};
			var parseImage = function (data) {
				var image_reg = /.jpg|.JPG|.png|.PNG|.jpeg|.JPEG|.gif|.GIF/;
				if (typeof data == "string" && data.match(image_reg)) {
					return renderImage(data);
				}
				return data;
			}
			data = recursion(data, parseImage);
			return data;
		};
		return {
			request: (request) => {
				return request
			},
			requestError: (requestError) => {
				return new es6.Promise((resolve, reject) => reject(requestError));
			},
			response: (response) => {
				if (response.statusCode == 200) {
					response.data = parseData(response.data);
				}
				return response
			},
			responseError: (responseError) => {
				return new es6.Promise((resolve, reject) => reject(responseError));
			}
		}
	}
}

export default Service