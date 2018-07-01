Page({
  data:{
    top:"",
    newsList: [],
    newsType: "gn",
    list: ["国内", "国际","财经", "娱乐", "军事", "体育", "其他"],
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
  couNews(){
    this.setData({
      newsType: "gn",
      gn: "#F0E2CF",
      gj: "#F7F7F7",
      cj: "#F7F7F7",
      yl: "#F7F7F7",
      js: "#F7F7F7",
      ty: "#F7F7F7",
      other: "#F7F7F7",
    })
    this.getNow()
  },
  intNews() {
    this.setData({
      newsType: "gj",
      gn: "#F7F7F7",
      gj: "#F0E2CF",
      cj: "#F7F7F7",
      yl: "#F7F7F7",
      js: "#F7F7F7",
      ty: "#F7F7F7",
      other: "#F7F7F7",
    })
    this.getNow()
  },
  ecoNews() {
    this.setData({
      newsType: "cj",
      gn: "#F7F7F7",
      gj: "#F7F7F7",
      cj: "#F0E2CF",
      yl: "#F7F7F7",
      js: "#F7F7F7",
      ty: "#F7F7F7",
      other: "#F7F7F7",
    })
    this.getNow()
  },
  milNews() {
    this.setData({
      newsType: "js",
      gn: "#F7F7F7",
      gj: "#F7F7F7",
      cj: "#F7F7F7",
      yl: "#F7F7F7",
      js: "#F0E2CF",
      ty: "#F7F7F7",
      other: "#F7F7F7",
    })
    this.getNow()
  },
  entNews() {
    this.setData({
      newsType: "yl",
      gn: "#F7F7F7",
      gj: "#F7F7F7",
      cj: "#F7F7F7",
      yl: "#F0E2CF",
      js: "#F7F7F7",
      ty: "#F7F7F7",
      other: "#F7F7F7",
    })
    this.getNow()
  },
  spoNews() {
    this.setData({
      newsType: "ty",
      gn: "#F7F7F7",
      gj: "#F7F7F7",
      cj: "#F7F7F7",
      yl: "#F7F7F7",
      js: "#F7F7F7",
      ty: "#F0E2CF",
      other: "#F7F7F7",
    })
    this.getNow()
  },
  otherNews() {
    this.setData({
      newsType: "other",
      gn: "#F7F7F7",
      gj: "#F7F7F7",
      cj: "#F7F7F7",
      yl: "#F7F7F7",
      js: "#F7F7F7",
      ty: "#F7F7F7",
      other: "#F0E2CF",
    })
    this.getNow()
  },

  onTabs(event){

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