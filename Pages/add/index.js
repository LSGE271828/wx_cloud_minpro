/* 新增待办页面 */
const app = getApp()

Page({
  // 保存编辑中待办的信息

  data: {
    title: '',
    desc: '无',
    files: [],
    fileName: '',
    freqOptions: ['未阅', '已阅'],
    freqOptions4: ['上班', '请假','休息'],
    freqOptions1: ['健康', '不适'],
    freqOptions2: ['有效', '过期'],
    freqOptions3: ['否', '是'],
    freq: 0,
    freq1:0,
    freq2:0,
    freq3:0,
    freq4:0,
    a : '',
    date:'未获取',
    mo:'',
    da:'',
		hour:'',
		formatNumber:function (n)
    {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    ,
		minute:'',
		sec:"",
		datejpg:""
  },

  // (dad(date) {
	// 	const years = date.getFullYear();
	// 	return years 
	// },
  // 表单输入处理函数
  onLoad(){
// this.tes

this.setData({
  a:wx.getStorageSync('okk'),
	date:this.fortime(new Date()),
	datejpg:this.fortime1(new Date())
});//设置用户


	},
	fortime1 : function (date) {
    this.data.mo=date.getMonth() + 1;
    this.data.da=date.getDate();
    this.data.hour=date.getHours();
		this.data.minute=date.getMinutes();
		this.data.sec=date.getSeconds();
   return [this.data.mo, this.data.da].map(this.data.formatNumber)+[this.data.hour, this.data.minute].map(this.data.formatNumber)+".jpg"
    
  },
tes:function () {
  
  console.log(wx.getStorageSync('okk'))
},

  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  
  fortime : function (date) {
    this.data.mo=date.getMonth() + 1;
    this.data.da=date.getDate();
   
   return [this.data.mo, this.data.da].map(this.data.formatNumber).join('/') 
    
  },
  
  onDescInput(e) {
    this.setData({
      desc: e.detail.value
    })
  },

    // 上传新附件
  async addFile() {
    // 限制附件个数
    if (this.data.files.length + 1 > getApp().globalData.fileLimit) {
      wx.showToast({
        title: '数量达到上限',
        icon: 'error',
        duration: 2000
      })
      return
    }
		wx.chooseMedia({
			count: 1,
			sourceType:['album']
		}).then(
			res => {
      // 将选择结果中的临时文件上传到云存储
			const file = res.tempFiles[0]
			const a1 = this.data.datejpg
			console.log(file)
		
      getApp().uploadFile(a1, file.tempFilePath).then(res => {
        // 存储已上传的文件名、文件大小及其 id
        this.data.files.push({
          name: a1,
          size: (file.size / 1024 / 1024).toFixed(2),
          id: res.fileID
        })
        // 更新显示
        this.setData({
          files: this.data.files,
          fileName: this.data.fileName + '成功 '
        })
      })
    })
  },
  // 响应事件状态选择器
  
  onChooseFreq1(e) {
    this.setData({
      freq1: e.detail.value
    })
  },
  onChooseFreq2(e) {
    this.setData({
      freq2: e.detail.value
    })
  },onChooseFreq3(e) {
    this.setData({
      freq3: e.detail.value
    })
  },onChooseFreq4(e) {
    this.setData({
      freq4: e.detail.value
    })
  },
  // 保存待办
  async saveTodo() {
    // 对输入框内容进行校验
    if (this.data.a === '') {
      wx.showToast({
        title: '超时,返回重登',
        icon: 'error',
        duration: 2000
      })
      return
		}
		// if (this.data.files == []) {
    //   wx.showToast({
    //     title: '截图未上传',
    //     icon: 'error',
    //     duration: 2000
    //   })
    //   return
    // }
    if (this.data.title === '') {
      wx.showToast({
        title: '体温未填写',
        icon: 'error',
        duration: 2000
      })
      return
    }
    
    if (this.data.fileName === '') {
      wx.showToast({
        title: '请上传截图',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.title.length > 10) {
      wx.showToast({
        title: '格式错误',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.desc.length > 100) {
      wx.showToast({
        title: '备注过长',
        icon: 'error',
        duration: 2000
      })
      return
		}
		wx.showToast({
			title: '提交成功',
			
			duration: 3000
		})
    const db = await getApp().database()
    // 在数据库中新建待办事项，并填入已编辑对信息
    db.collection(getApp().globalData.collection).add({
      data: {
        a:this.data.a,
        title: this.data.title,       // 待办体温
        desc: this.data.desc,         // 待办备注
        files: this.data.files,       // 待办附件列表
        freq: Number(this.data.freq), // 待办1情况
        freq1: Number(this.data.freq1),
        freq2: Number(this.data.freq2),
        freq3: Number(this.data.freq3),
        freq4: Number(this.data.freq4),
        star: false,
        date:this.data.date
			}
			
    }).then(() => {
			
      wx.navigateBack({
        delta: 0,
      })
    })
  },

  // 重置所有表单项
  resetTodo() {
    this.setData({
      //pass
    })
  }
})