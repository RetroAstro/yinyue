const url = require('url')
const Axios = require('../services/execute/axios')

// 数据中转站
class TransferStation {
  constructor() {
    this.type
    this.data
  }
  // 接收, 暂存数据
  receive(ctx) {
    this.type = url.parse(ctx.request.url).pathname.substr(1)
    this.data = { keyword: [], song_mid: [], singer_mid: [] }
    let res_data = ctx.request.body
    this.get_receive_mission(this)[this.type](res_data)
  }
  // 获取, 发送, 返回数据
  fetch() {
    if (this.type) {
      let params = this.get_fetch_mission(this)[this.type]()
      return Axios(this.type, params)
    }
  }
  // 分发获取的任务
  get_receive_mission(me) {
    return {
      'search': data => me.data.keyword.push(Object.keys(data)[0]),
      'getMusicInfo': data => me.data.song_mid.push(Object.keys(data)[0]),
      'getSingerSongs': data => me.data.singer_mid.push(Object.keys(data)[0])
    }
  }
  // 分配发送的任务
  get_fetch_mission(me) {
    return {
      'search': () => JSON.parse(me.data.keyword[0]).keyword,
      'getMusicInfo': () => JSON.parse(me.data.song_mid[0]).song_mid,
      'getSingerSongs': () => JSON.parse(me.data.singer_mid[0]).singer_mid
    }
  }
}

module.exports = TransferStation
