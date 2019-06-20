const axios = require('axios')

module.exports = {
  'search': opts => {
    if (JSON.stringify(opts.data) == "{}") {
      return {
        fail: 'no data'
      }
    }

    if (opts.data.singer.count) {
      let singer_list = opts.data.singer.itemlist
      let list = []

      for (let singer of singer_list) {
        list.push({
          singer_mid: singer.mid,
          name: singer.name,
          pic: singer.pic
        })
      }

      return list
    } else {
      let song_list = opts.data.song.itemlist
      let list = []

      for (let song of song_list) {
        list.push({
          song_mid: song.mid,
          name: song.name,
          singer: song.singer
        })
      }

      return list
    }
  },
  'getMusicInfo': opts => {
    let data = JSON.parse(opts.slice(1, opts.length - 1))
    let mid = data.data[0].mid
    let albumId = data.data[0].album.mid
    let name = data.data[0].name
    let singer = data.data[0].singer[0].name

    return (async () => {
      let res = await axios.get(`https://music.niubishanshan.top/api/music/songUrllist/${mid}`)
      let url = 'https:' + res.data.data[0].split(':')[1]

      return {
        mid: mid,
        pic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumId}.jpg?max_age=2592000`,
        name: name,
        singer: singer,
        url: url
      }
    })()
  },
  'getSingerSongs': opts => {
    let data = JSON.parse(opts.slice(31, opts.length - 1))
    let lists = []
    let singer = data.data.singer_name
    let singer_mid = data.data.singer_mid
    let pic = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer_mid}.jpg?max_age=2592000`

    for (let list of data.data.list) {
      let song_mid = list.musicData.songmid
      let song_name = list.musicData.songname
      let singer_name = list.musicData.singer[0].name

      lists.push({
        song_mid: song_mid,
        song_name: song_name,
        singer_name: singer_name
      })
    }

    return [{ singer: singer, pic: pic, singer_mid: singer_mid }, lists]
  }
}
