const {
  IS_EMPTY
} = require('../../utils/util')
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
    sexLimit: "1", //  用于控制 夫/妻 按钮的可用性 "1" 代表禁止选择 "夫","0" 代表禁止选择 "妻"
    result: {
      iCallTa: "", //  我称呼 Ta
      taCallMe: "", //  Ta 称呼我
    }
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
    this.judgeAvailable()
  },
  // 判断 夫/妻 按钮的可用性
  judgeAvailable() {
    // 判断 夫/妻 按钮的可用性
    if (this.data.list.length > 0) {
      const last = this.data.list.slice(-1)[0]
      console.log(last)
      this.setData({
        sexLimit: ["爸爸", "哥哥", "弟弟", "儿子", "丈夫"].includes(last) ? "1" : "0"
      })
    } else {
      const sex = this.data.sexList.find(item => item.checked).value
      this.setData({
        sexLimit: sex
      })
    }
  },
  // 获取关系
  getRelation() {
    const sex = this.data.sexList.find(item => item.checked).value
    if (this.data.list.length > 0) {
      const sexList = this.data.sexList.map(item => {
        return {
          ...item,
          disabled: true
        }
      })
      this.setData({
        sexList
      })
    } else {
      const sexList = this.data.sexList.map(item => {
        return {
          ...item,
          disabled: false
        }
      })
      this.setData({
        sexList
      })
    }
    // 准备查询参数
    const option1 = {
      text: this.data.completeStr,
      sex: Number(sex),
      reverse: false
    }
    const option2 = {
      text: this.data.completeStr,
      sex: Number(sex),
      reverse: true
    }

    this.judgeAvailable()

    // 查询
    const r1 = relationship(option1)
    const r2 = relationship(option2)
    const r1Str = IS_EMPTY(r1) ? "" : r1.join("/")
    const r2Str = IS_EMPTY(r2) ? "" : r2.join("/")

    // 存结果
    this.setData({
      result: {
        iCallTa: r1Str,
        taCallMe: r2Str
      }
    })
  },
  // 点击关系按钮（父母兄妹...)
  handleTap(e) {
    const text = e.target.dataset.text
    if (text === "夫" && this.data.sexLimit === "1") return
    if (text === "妻" && this.data.sexLimit === "0") return
    const str = this.data.textMap[text] //  转换成完整称呼
    this.data.list.push(str)
    this.setData({
      completeStr: this.data.list.join("的")
    })

    this.getRelation()
  },
  // 删除
  handleDel() {
    const len = this.data.list.length
    if (len > 0) {
      this.data.list.pop()
      this.setData({
        completeStr: this.data.list.join("的")
      })
      this.getRelation()
    }
  },
  // 清空
  handleClear() {
    this.setData({
      list: [],
      completeStr: ""
    })
    this.getRelation()
  },
  onShareAppMessage(res) {
    console.log(res)
    return {
      title: "亲属称呼",
      path: "/pages/call/call",
      imageUrl: '../../static/imgs/code.png'
    }
  },
  onShareTimeline() {}
})