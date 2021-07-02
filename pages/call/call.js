// pages/call/call.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    textStr: "",
    switch: false,
    textMap: {
      "父": "爸爸",
      "母": "妈妈",
      "兄": "哥哥",
      "姐": "姐姐",
      "夫": "丈夫",
      "妻": "妻子",
      "弟": "弟弟",
      "妹": "妹妹",
      "子": "儿子",
      "女": "女儿",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  // 切换性别
  handleSwitchChange() {
    this.setData({
      switch: !this.data.switch
    })
  },
  // 点击关系按钮（父母兄妹...)
  handleTap(e) {
    const text = e.target.dataset.text
    const completeStr = this.data.textMap[text]
    console.log(completeStr)
  }
})