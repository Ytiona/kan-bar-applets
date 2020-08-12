// pages/add_article/add_article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    title: '',
    content: '',
    images: [],
    addTagVisible:  false,
    selectedTagList: [],
    popularTags: [
      {
        color: 'warning',
        icon: 'funny',
        text: '搞笑',
        checked: true
      },
      {
        color: 'success',
        icon: 'talk',
        text: '议题',
        checked: true
      },
      {
        color: '#8046eb',
        icon: 'story',
        text: '故事',
        checked: true
      },
      {
        color: '#ed5946',
        icon: 'heart',
        text: '鸡汤',
        checked: true
      },
      {
        color: 'primary',
        icon: 'science',
        text: '科普',
        checked: true
      }
    ],
    customTagText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ type: options.type })
  },

  onChooseImg() {
    const {images} = this.data;
    const max = MAX_IMG_NUM - images.length;
    wx.chooseImage({
      count: max,
      success: (res)=> {
        console.log(res);
        this.setData({
          images: images.length ? images.concat(res.tempFilePaths) : res.tempFilePaths
        })
      }
    })
  },
  onDeleteImg(e) {
    const index = e.currentTarget.dataset.index;
    console.log(e);
    const { images } = this.data;
    images.splice(index, 1);
    this.setData({
      images
    })
  },
  onPreviewImage(e) {
    console.log(e);
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.imgsrc
    })
  },
  toggleSelectTag(e) {
    const index = e.currentTarget.dataset.index;
    const { selectedTagList, popularTags } = this.data;
    //更新popularTags，相当于双向绑定
    popularTags[index].checked = e.detail;
    if(!e.detail) {
      //如果变成未选中（灰色），则将其添加至selectedTagList中
      selectedTagList.push(popularTags[index]);
    } else {
      //否则，则将其从selectedTagList删除
      selectedTagList.splice(selectedTagList.findIndex(item => item.text == popularTags[index].text), 1);
    }
    //更新视图
    this.setData({ selectedTagList, popularTags });
  },
  addCustomTag() {
    const { selectedTagList, popularTags, customTagText } = this.data;
    if(customTagText !== '') {
      //查看selectedTagList是否已经存在该标签
      const findRes = selectedTagList.findIndex(item => item.text == customTagText);
      if(findRes === -1) {
        //查看popularTags是否存在该标签
        const popularTagsFindRes = popularTags.findIndex(item => item.text == customTagText);
        if(popularTagsFindRes != -1) {
          //popularTags存在，则将popularTags中对应的数据添加至selectedTagList
          selectedTagList.push(popularTags[popularTagsFindRes]);
          //同时将popularTags对应的标签设置为灰色（代表已经添加过）
          popularTags[popularTagsFindRes].checked = false;
        } else {
          //否则直接设置文本和图标
          selectedTagList.push({ text: customTagText, icon: 'tag' });
        }
      }
      //更新视图
      this.setData({ selectedTagList, popularTags, customTagText: '' });
    }
  },
  deleteTag(e) {
    const { selectedTagList, popularTags } = this.data;
    const tagText = e.currentTarget.dataset.text;
    const findRes = selectedTagList.findIndex(item => item.text == tagText);
    selectedTagList.splice(findRes, 1);
    //删除标签时将其对应在popularTags中的状态也变更
    popularTags.forEach(item => {
      if(item.text == tagText) {
        item.checked = true;
      }
    })
    this.setData({ selectedTagList, popularTags });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})