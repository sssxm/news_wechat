Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "外媒称香港回归15年打破“经济将死”预言",
    time : "09:34",
    source: "中国新闻网",
    readtime: 471,
    id : 1523074607642,
    content : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: options.id
      },
      success: res => {
        let result = res.data.result
        let time = result.date.substring(11, 16)
        let source = result.source
        if (result.source === "") {
          source = "佚名"
        }
        let content = []
        for (let i = 0; i < result.content.length; i++) {
          content.push({
            type: result.content[i].type,
            text: result.content[i].text,
            src: result.content[i].src
          })
        }
        this.setData({
          title : result.title,
          id: result.id,
          readtime : result.readCount,
          time: time,
          source: source,
          content: content
        })
      }
    })
  },
  onBackToHome(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }

  
  
})