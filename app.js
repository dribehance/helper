import polyfill from 'js/utils/plugins/polyfill'
import WxValidate from 'js/services/WxValidate'
import HttpResource from 'js/services/HttpResource'
import HttpService from 'js/services/HttpService'
import WxService from 'js/services/WxService'
import Tools from 'js/services/Tools'
import Config from 'js/etc/config'
import Utils from 'js/utils/utils'

App({
	onLaunch() {
		console.log('onLaunch')
	},
	onShow() {
		console.log('onShow')
	},
	onHide() {
		console.log('onHide')
	},
	getUserInfo() {
		return this.WxService.login()
		.then(data => {
			return this.HttpService.postLogin({code:data.code})
		})
		.then(data => {
			return this.WxService.setStorage({
				key:"rd_session",
				data: data.LoginResponse.rd_session
			});
		})
		.then(data => {
			return this.WxService.getUserInfo()
		})
		.then(data => {
			this.HttpService.postUserInfo({
				rd_session:this.WxService.getStorageSync("3d_session"),
				cover:data.userInfo.avatarUrl,
				nickname:data.userInfo.nickName
			});
			return data;
		})
		.then(data => {
			this.globalData.userInfo = data.userInfo
			return this.globalData.userInfo
		})
	},
	globalData: {
		userInfo: null
	},
	WxValidate: (rules, messages) => new WxValidate(rules, messages), 
	HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(), 
	HttpService: new HttpService, 
	WxService: new WxService, 
	Tools: new Tools, 
	Config: Config, 
	Utils: Utils, 
})