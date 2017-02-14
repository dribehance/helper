import ServiceBase from 'ServiceBase';
import __config from '../etc/config'
import Tools from 'Tools';
const tools = new Tools();
class Service extends ServiceBase {
	constructor() {
		super()
		this.$$prefix = ''
		this.$$path = [{
			method: "get",
			name: "index",
			route: '/app/home/index',
			interceptors:[this.imageInterceptor()]
		}, {
			method: "get",
			name: "product",
			route: '/app/goods/detail',
			interceptors:[this.imageInterceptor(),this.tokenInterceptor()]
		}, {
			method: "get",
			name: "products",
			route: '/app/catalog/goods_list_by_catalog',
			interceptors:[this.imageInterceptor()]
		}, {
			method: "get",
			name: "categorys",
			route: '/app/catalog/index',
			interceptors:[this.imageInterceptor()]
		}, {
			method: "get",
			name: "keywords",
			route: '/app/searcher/hot_keyword',
			interceptors:[this.imageInterceptor()]
		}, {
			// 	我的购物车
			method: "get",
			name: "shoppingcart",
			route: '/app/goods/shopping_car',
			interceptors:[this.imageInterceptor(),this.tokenInterceptor()]
		}, {
			// 	加入购物车
			method: "post",
			name: "tocart",
			route: '/app/goods/add_to_shopping_car',
			interceptors:[this.imageInterceptor(),this.tokenInterceptor()]
		}, {
			// 	修改购物车
			method: "put",
			name: "tocart",
			route: '/app/goods/change_shopping_car',
			interceptors:[this.imageInterceptor(),this.tokenInterceptor()]
		}, {
			// 	删除购物车
			method: "delete",
			name: "shoppingcart",
			route: '/app/goods/delete_shopping_car',
			interceptors:[this.imageInterceptor(),this.tokenInterceptor()]
		}];
		var that = this;
		this.$$path.forEach(function (path, index) {
			(function (path) {
				var name = path.name.replace(/_([0-9]|[a-z])/g, function (letter) {
					return letter.split("_")[1].toUpperCase();
				});
				name = name.replace(/^\S/g, (s) => s.toUpperCase());
				that[`${path.method}${name}`] = function (params) {
					if (!params) params = {};
					// post & put
					var header = {}, interceptors = path.interceptors || [];
					if (path.method.toLowerCase() == "post" || path.method.toLowerCase() == "put") {
						header["Content-Type"] = "application/x-www-form-urlencoded";
					}
					// delete 
					if (path.method.toLowerCase() == "delete") {
						path.route = `${path.route}?${tools.paramSerializer(params)}`;
					}
					// get
					return that[`${path.method.toLowerCase()}Request`](path.route, params, header, interceptors);
				}
			})(path)
		});
	}
	tokenInterceptor() {
		return {
			request: (request) => {
				request.data.user_id = "1";
				return request
			},
			requestError: (requestError) => {
				return requestError
			},
			response: (response) => {
				return response
			},
			responseError: (responseError) => {
				return responseError
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
				return requestError
			},
			response: (response) => {
				if (response.statusCode == 200) {
					response.data = parseData(response.data);
				}
				return response
			},
			responseError: (responseError) => {
				return responseError
			},
		}
	}
}

export default Service