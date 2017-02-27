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
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			method: "get",
			name: "getBanner",
			route: '/app/home/banner',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			method: "get",
			name: "getProduct",
			route: '/app/goods/detail',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			method: "get",
			name: "getNature",
			route: '/app/goods/nature',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			method: "get",
			name: "getProducts",
			route: '/app/catalog/goods_list_by_catalog',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			method: "get",
			name: "getProductsByKeyword",
			route: '/app/goods/goods_list_by_catalog',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			method: "get",
			name: "getCategorys",
			route: '/app/catalog/index',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			method: "get",
			name: "getKeywords",
			route: '/app/searcher/hot_keyword',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	我的购物车
			method: "get",
			name: "getShoppingcart",
			route: '/app/goods/shopping_car',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	加入购物车
			method: "post",
			name: "postTocart",
			route: '/app/goods/add_to_shopping_car',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	修改购物车
			method: "put",
			name: "changeShoppingcartAmount",
			route: '/app/goods/change_shopping_car',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	删除购物车
			method: "delete",
			name: "deleteShoppingcart",
			route: '/app/goods/delete_shopping_car',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	优惠券列表
			method: "get",
			name: "getAllCoupons",
			route: '/app/usercenter/vanchers_list',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	首页领取优惠券
			method: "get",
			name: "selectCoupon",
			route: '/app/home/pickup_vancher',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	支付选取优惠券列表
			method: "get",
			name: "getAvailableCoupons",
			route: '/app/goods/available_vancher',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	待付款
			method: "get",
			name: "getUnpayOrders",
			route: '/app/goods/topayOrders',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	已付款
			method: "get",
			name: "getPayOrders",
			route: '/app/goods/payOrders',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	全部订单
			method: "get",
			name: "getAllOrders",
			route: '/app/goods/myOrders',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	订单详情
			method: "get",
			name: "getOrderById",
			route: '/app/goods/payOrdersDetails',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	获取预付订单信息
			method: "get",
			name: "getPrepayPayOrderInfo",
			route: '/app/goods/topay',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	生产预付订单
			method: "get",
			name: "fillinorder",
			route: '/app/goods/pre_pay',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	支付订单
			method: "get",
			name: "payOrder",
			route: '/app/goods/wx_pay',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	取消订单
			method: "get",
			name: "cancelOrder",
			route: '/app/usercenter/cancel_order',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	收货地址
			method: "get",
			name: "getAddress",
			route: '/app/usercenter/address_list',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	新增地址
			method: "post",
			name: "postAddress",
			route: '/app/usercenter/add_address',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	修改收货地址
			method: "put",
			name: "putAddress",
			route: '/app/usercenter/modify_address',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	设置默认地址
			method: "get",
			name: "setDefaultAddress",
			route: '/app/usercenter/set_default_address',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	删除收货地址
			method: "delete",
			name: "deleteAddress",
			route: '/app/usercenter/delete_address',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	login code
			method: "post",
			name: "postLogin",
			route: '/app/usercenter/login',
			interceptors: []
		}, {
			// 	同步用户信息到服务器
			method: "post",
			name: "postUserInfo",
			route: '/app/usercenter/set_user_info',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	获取刷选条件
			method: "get",
			name: "getFilterInfo",
			route: '/app/goods/filter',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	收藏列表
			method: "get",
			name: "getSaveList",
			route: '/app/usercenter/collect_list',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	加入收藏
			method: "get",
			name: "save",
			route: '/app/usercenter/add_collect',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
		}, {
			// 	取消收藏
			method: "get",
			name: "cancelSave",
			route: '/app/usercenter/cancel_collect',
			interceptors: [this.networkInterceptor(), this.imageInterceptor(), this.tokenInterceptor()]
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
			},
		}
	}
	tokenInterceptor() {
		return {
			request: (request) => {
				return new es6.Promise((resolve, reject) => {
					if (wx.getStorageSync('rd_session')) {
						request.data.rd_session = wx.getStorageSync('rd_session');
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
}

export default Service