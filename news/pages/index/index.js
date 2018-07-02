Page({
  data:{
    top:"",
    newsList: [],
    newsType: "gn",
    list: ["国内", "国际","财经", "娱乐", "军事", "体育", "其他"],
    typeList: ["gn", "gj", "cj", "yl", "js", "ty", "other"],
    selectTab: 0
  },
  onLoad(){
    this.getNow();
  },
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newsType
      },
      success: res => {
        let result = res.data.result
        this.addNewsList(result);
      },
      complete: () => {
        callback && callback()
      } 
    })
  },
  onTab(event){
    let index = event.currentTarget.dataset.index;
    this.setData({
      newsType: this.data.typeList[index],
      selectTab: index
    })
    this.getNow();
  },
  onNews(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  addNewsList(result){
    let newsList = []
    for(let i = 1; i < result.length; i++){
      let item = result[i]
      let time = item.date.substring(11,16)
      let source = item.source
      let firstImage = item.firstImage
      if (!firstImage){
        firstImage = "/images/news.png"
      }
      if (!item.source){
        source = "佚名"
      }
      newsList.push({
        id: item.id,
        title: item.title,
        time: time,
        source: source,
        firstImage: firstImage
      })
    }
    let firstItem = result[0]
    let timeTop = firstItem.date.substring(11, 16)
    let sourceTop = firstItem.source

    if (firstItem.source === "") {
      sourceTop = "佚名"
    }
    this.setData({
      newsList: newsList,
      top: {
        title: firstItem.title,
        time: timeTop,
        source: sourceTop,
        firstImage: firstItem.firstImage,
        id: firstItem.id,
      }
    })
  }
})