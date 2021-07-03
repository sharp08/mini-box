const relationship = require("../../utils/relationship")
// pages/call/call.js
Page({
  data: {
    list: [], //  存储点击的关系，用来生成 completeStr
    completeStr: "", //  展示在界面的完整 str
    sexList: [{
        text: "男",
        value: "1",
        checked: true
      },
      {
        text: "女",
        value: "0"
      },
    ],
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
    },
    result: []
  },
  // 切换性别
  handleRadioChange(e) {
    let temp = this.data.sexList
    for (let i = 0; i < temp.length; i++) {
      temp[i].checked = temp[i].value === e.detail.value
    }
    this.setData({
      sexList: temp
    })
  },
  // 点击关系按钮（父母兄妹...)
  handleTap(e) {
    const text = e.target.dataset.text
    const str = this.data.textMap[text]
    this.data.list.push(str)
    const completeStr = this.data.list.join("的")
    this.setData({
      completeStr
    })
    const sex = this.data.sexList.find(item => item.checked).value
    const option = {
      text: completeStr,
      sex: Number(sex)
    }
    console.log(option)
    const r = relationship(option)
    console.log(r)
  }
})