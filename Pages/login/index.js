// index.js
const app = getApp()

Page({
	data: {
		//此处定义本页面中的全局变量
		result: '',
		username: '',
		id: '',
		info: '',
		iddb: {

			1: '测试',
			666: "管理员",


		},
		date: '未获取',
		mo: '',
		da: '',
		hou: '',
		formatNumber: function (n) {
			n = n.toString()
			return n[1] ? n : '0' + n
		},
		min: '',
		inf: ''

	},
	onLoad() {
		// this.tes
		const ab = this.data.formatNumber
		this.setData({
			inf: new Date()
		}); //设置用户}
		this.setData({
			hou: this.data.inf.getHours(),
			min: this.data.inf.getMinutes(),
			date: this.fortime(this.data.inf)
		}); //设置用户}
		wx.setStorageSync('cdate', this.data.date);
		wx.setStorageSync('chour', this.data.hou);
		wx.setStorageSync('cmin', this.data.min);
	},
	// fortime1 : function (date) {

	//   this.data.hour=date.getHours();
	// 	this.data.minute=date.getMinutes();


	// 	// wx.setStorageSync('okk', this.data.result);
	//  return [this.data.mo, this.data.da].map(this.data.formatNumber).join('/') + ' ' + [this.data.hour, this.data.minute].map(this.data.formatNumber).join(':')

	// },
	fortime: function (date) {
		this.data.mo = date.getMonth() + 1;
		this.data.da = date.getDate();

		return [this.data.mo, this.data.da].map(this.data.formatNumber).join('/')
	},
	inputName: function (e) { // 用于获取输入的账号
		this.setData({
			username: e.detail.value //将获取到的账号赋值给username变量
		});
	},
	log: function () {
		if (this.data.username == '123') {
			wx.navigateTo({
				url: '../list/index'
			})
		}
		if (this.data.username == '321') {
			wx.navigateTo({
				url: '../listpm/index'
			})
		}
		if (this.data.username == '0339') {
			this.setData({
				result: this.data.iddb[339], //将获取到的账号赋值给username变量,


			});
			wx.setStorageSync('okk', this.data.result);
			if (this.data.hou < 12) {
				wx.navigateTo({
					url: '../list/index'
				})
			} else {
				wx.navigateTo({
					url: '../listpm/index'
				})
			}

		}
		if (this.data.username == '0536') {
			this.setData({
				result: this.data.iddb[536], //将获取到的账号赋值给username变量,


			});
			wx.setStorageSync('okk', this.data.result);
			if (this.data.hou < 12) {
				wx.navigateTo({
					url: '../list/index'
				})
			} else {
				wx.navigateTo({
					url: '../listpm/index'
				})
			}
		}
		if (typeof this.data.iddb[this.data.username] !== 'undefined') {
			console.log("键存在");
			this.setData({
				result: this.data.iddb[this.data.username], //将获取到的账号赋值给username变量,

			});
			wx.setStorageSync('okk', this.data.result);
			if (this.data.iddb[this.data.username] == "管理员") {
				wx.navigateTo({
					url: '../list1/index'
				})
			} else {

				// app.globalData.useid = this.data.result;
				console.log(app.globalData.useid)
				if (this.data.hou < 12) {
					wx.navigateTo({
						url: '../list/index'
					})
				} else {
					wx.navigateTo({
						url: '../listpm/index'
					})
				}
			}
			if (this.data.iddb[this.data.username] == "ok") {
				wx.navigateTo({
					url: '../list999/index'
				})
			}

		}
	}

})