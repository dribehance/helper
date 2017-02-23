// pages/me/address/create_address/create_address.js
import PCTData from "../../../../js/utils/districts.js";
const App = getApp();
Page({
  data: {
    provinces: [],
    cities: [],
    districts: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getAddressFromCache(options);
    this.setDefaultFormValid();
    this.setData({
      provinces: this.getProvinces()
    });
  },
  getAddressFromCache: function (options) {
    if (options.type == "edit") {
      App.WxService.getStorage({
        key: "cache_address"
      }).then(function (response) {
        this.setData({
          address: response.data,
          provinces: this.getProvinces(),
          p_value: this.getProvinceIndex(response.data.province),
          cities: this.getCities(response.data.province),
          c_value: this.getCityIndex(response.data.province, response.data.city),
          districts: this.getDistricts(response.data.province, response.data.city),
          d_value: this.getDistrictIndex(response.data.province, response.data.city, response.data.area)
        })
      }.bind(this));
      this.setData({
        address_id: options.address_id
      })
    }
  },
  setDefaultFormValid: function () {
    this.WxValidate = App.WxValidate({
      name: {
        required: true,
        minlength: 2,
        maxlength: 10,
      },
      province: {
        required: true
      },
      city: {
        required: true
      },
      area: {
        required: true
      },
      telephone: {
        required: true,
        tel: true,
      },
      street: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
    }, {
        name: {
          required: '请输入收货人姓名',
        },
        province: {
          required: "请选择省份"
        },
        city: {
          required: "请选择城市"
        },
        area: {
          required: "请选择区域"
        },
        telephone: {
          required: '请输入收货人电话',
        },
        street: {
          required: '请输入收货人地址',
        },
      });
  },
  formSubmit: function (e) {
    var params = e.detail.value;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      App.WxService.showModal({
        title: '友情提示',
        content: `${error.param}：${error.msg}`,
        showCancel: !1,
      })
      return;
    }
    params.province = this.data.provinces[params.province];
    params.city = this.data.cities[params.city];
    params.area = this.data.districts[params.area];
    if (this.data.address_id) {
      this.putAddress(params);
      return;
    }
    this.postAddress(params)
  },
  postAddress: function (params) {
    // 新增地址
    App.HttpService.postAddress(params).then(function (data) {
      setTimeout(function () {
        App.WxService.showToast({
          title: data.AddAddressResponse.message,
          icon: "success",
          duration: 2000
        });
        App.WxService.setStorage({
          key: "cache_address",
          data: params
        });
        App.WxService.setStorage({
          key: "info",
          data: "addressUpdate"
        })
      }, 500);
      setTimeout(function () {
        App.WxService.navigateBack();
      }, 1000)
    })
  },
  putAddress: function (params) {
    // 修改地址
    params.address_id = this.data.address_id;
    App.HttpService.putAddress(params).then(function (data) {
      setTimeout(function () {
        App.WxService.showToast({
          title: data.ModifyAddressResponse.message,
          icon: "success",
          duration: 2000
        });
        App.WxService.setStorage({
          key: "cache_address",
          data: params
        });
        App.WxService.setStorage({
          key: "info",
          data: "addressUpdate"
        })
      }, 500);
      setTimeout(function () {
        App.WxService.navigateBack();
      }, 1000)
    })
  },
  getProvinces: function () {
    var provinces = [];
    for (var i = 0; i < PCTData.province.length; i++) {
      provinces.push(PCTData.province[i].name);
    }
    return provinces;
  },
  getProvinceIndex: function (province) {
    var index = 0;
    for (var i = 0, provinces = this.getProvinces(); i < provinces.length; i++) {
      if (provinces[i] == province) {
        index = i;
      }
    }
    return index;
  },
  getCities: function (province) {
    var cities = [];
    for (var i = 0; i < PCTData.province.length; i++) {
      if (PCTData.province[i].name == province) {
        cities = PCTData.province[i].city.map(function (c) {
          return c.name;
        });
      }
    }
    return cities;
  },
  getCityIndex: function (province, city) {
    var index = 0;
    for (var i = 0, cities = this.getCities(province); i < cities.length; i++) {
      if (cities[i] == city) {
        index = i;
      }
    }
    return index;
  },
  getDistricts: function (province, city) {
    var districts = [];
    for (var i = 0; i < PCTData.province.length; i++) {
      if (PCTData.province[i].name == province) {
        for (var j = 0; j < PCTData.province[i].city.length; j++) {
          if (PCTData.province[i].city[j].name == city) {
            districts = PCTData.province[i].city[j].district.map(function (d) {
              return d.name
            })
          }
        }
      }
    }
    return districts;
  },
  getDistrictIndex: function (province, city, district) {
    var index = 0;
    for (var i = 0, districts = this.getDistricts(province, city); i < districts.length; i++) {
      if (districts[i] == district) {
        index = i;
      }
    }
    return index;
  },
  onProvinceChange: function (e) {
    var that = this;
    var current_value = e.detail.value;
    this.setData({
      p_value: current_value,
      cities: that.getCities(that.data.provinces[current_value]),
      districts: []
    });
  },
  onCityChange: function (e) {
    var that = this;
    var current_value = e.detail.value;
    this.setData({
      c_value: current_value,
      districts: that.getDistricts(that.data.provinces[that.data.p_value], that.data.cities[current_value])
    });
  },
  onDistrictChange: function (e) {
    var current_value = e.detail.value;
    this.setData({
      d_value: current_value
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})