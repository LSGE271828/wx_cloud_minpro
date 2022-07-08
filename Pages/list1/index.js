/* 待办列表首页 */

Page({
  // 存储请求结果
  data: {
    todos: [], // 用户的所有待办事项
    pending: [], // 未完成待办事项
    finished: [], // 已完成待办事项
		freqOptions4: ['上班', '请假','休息'],
		find:wx.getStorageSync('cdate')
  },
	
  onShow() {
		// 通过云函数调用获取用户 _openId
		
    getApp().getOpenId().then(async openid => {
      // 根据 _openId 数据，查询并展示待办列表
      const db = await getApp().database()
			db.collection(getApp().globalData.collection).where({date:this.data.find}).get().then(res => {
        const {
          data
        } = res
        // 存储查询到的数据
        this.setData({
          // data 为查询到的所有待办事项列表
          todos: data,
          // 通过 filter 函数，将待办事项分为未完成和已完成两部分
          pending: data.filter(todo => todo.freq === 0),
          finished: data.filter(todo => todo.freq === 1)
        })
      })
    })
    // 配置首页左划显示的星标和删除按钮
    this.setData({
      slideButtons: [{
        extClass: 'starBtn',
        text: '星标',
        src: '../../images/list/star.png'
      }, {
        type: 'warn',
        text: '删除',
        src: '../../images/list/trash.png'
      }],
    })
  },
	onDescInput(e){
		this.setData({
			find:e.detail.value
		});
		
	},
  // 响应左划按钮事件
  async onDescIn(e) {
    // 得到触发事件的待办序号
    const datethis = this.data.find
    // 根据序号获得待办对象
    const todoIndex = e.currentTarget.dataset.index
    const todo = this.data.pending[todoIndex]
    const db = await getApp().database()
    getApp().getOpenId().then(async openid => {
      // 根据 _openId 数据，查询并展示待办列表
      const db = await getApp().database()
			db.collection(getApp().globalData.collection).where({date:datethis}).get().then(res => {
        const {
          data
        } = res
        // 存储查询到的数据
        this.setData({
          // data 为查询到的所有待办事项列表
          todos: data,
          // 通过 filter 函数，将待办事项分为未完成和已完成两部分
          pending: data.filter(todo => todo.freq === 0),
          finished: data.filter(todo => todo.freq === 1)
        })
      })
    })
  },

  // 点击左侧单选框时，切换待办状态
  async finishTodo(e) {
    // 根据序号获得触发切换事件的待办
    const todoIndex = e.currentTarget.dataset.index
    const todo = this.data.pending[todoIndex]
    const db = await getApp().database()
    // 根据待办 _id，获得并更新待办事项状态
    db.collection(getApp().globalData.collection).where({
      _id: todo._id
    }).update({
      // freq == 1 表示待办已完成，不再提醒
      // freq == 0 表示待办未完成，每天提醒
      data: {
        freq: 1
      }
    })
    // 快速刷新数据
    todo.freq = 1
    this.setData({
      pending: this.data.todos.filter(todo => todo.freq === 0),
      finished: this.data.todos.filter(todo => todo.freq === 1)
    })
  },

  // 同上一函数，将待办状态设置为未完成
  async resetTodo(e) {
    const todoIndex = e.currentTarget.dataset.index
    const todo = this.data.finished[todoIndex]
    const db = await getApp().database()
    db.collection(getApp().globalData.collection).where({
      _id: todo._id
    }).update({
      data: {
        freq: 0
        ,
        freq1:1
      }
    })
    todo.freq = 0
    this.setData({
      pending: this.data.todos.filter(todo => todo.freq === 0),
      finished: this.data.todos.filter(todo => todo.freq === 1)
    })
  },

  // 跳转响应函数
  toFileList(e) {
    const todoIndex = e.currentTarget.dataset.index
    const todo = this.data.pending[todoIndex]
    wx.navigateTo({
      url: '../file/index?id=' + todo._id,
    })
  },

  toDetailPage(e) {
    const todoIndex = e.currentTarget.dataset.index
    const todo = this.data.pending[todoIndex]
    wx.navigateTo({
      url: '../../pages/edit/index?id=' + todo._id,
    })
  },

  toAddPage() {
    wx.navigateTo({
      url: '../../pages/add/index',
    })
  }
})