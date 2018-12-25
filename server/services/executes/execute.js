const axios = require('axios')

// 处理请求的数据并返回必要的数据
module.exports = {
    'search': opts => {
        if ( JSON.stringify(opts.data) == "{}" ) {
            return {
                fail: 'no data'
            }
        }
        if (opts.data.singer.count) {
            var singer_list = opts.data.singer.itemlist;
            var list = [];
            for (var singer of singer_list) {
                list.push({
                    singer_mid: singer.mid,
                    name: singer.name,
                    pic: singer.pic
                })
            }
            return list;
        } else {
            var song_list = opts.data.song.itemlist;
            var list = [];
            for ( var song of song_list ) {
                list.push({ 
                    song_mid: song.mid,
                    name: song.name,
                    singer: song.singer
                })
            }
            return list;
        }
    },
    'getMusicInfo': opts => {
        var data = JSON.parse(opts.slice(1, opts.length-1));
        var mid = data.data[0].mid;
        var albumId = data.data[0].album.mid;
        var name = data.data[0].name;
        var singer = data.data[0].singer[0].name;
        return (async () => {
            var res = await axios.get(`https://music.niubishanshan.top/api/music/songUrllist/${mid}`);
            var url = 'https:' + res.data.data[0].split(':')[1];
            console.log(url)
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
        var data = JSON.parse(opts.slice(31, opts.length-1));
        var lists = [];
        var singer = data.data.singer_name;
        var singer_mid = data.data.singer_mid;
        var pic = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer_mid}.jpg?max_age=2592000`
        for ( var list of data.data.list ) {
            var song_mid = list.musicData.songmid;
            var song_name = list.musicData.songname;
            var singer_name = list.musicData.singer[0].name;
            lists.push({
                song_mid: song_mid,
                song_name: song_name,
                singer_name: singer_name
            })
        }
        return [ { singer: singer, pic: pic, singer_mid: singer_mid }, lists ];
    }
}