
// 请求的url
module.exports = {
    'search': keyword => `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&key=${encodeURIComponent(keyword)}&g_tk=385294201&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0htt`,
    'getMusicInfo': song_mid => `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${song_mid}&tpl=yqq_song_detail&g_tk=385294201&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
    'getSingerSongs': singer_mid => `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&jsonpCallback=MusicJsonCallbacksinger_track&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&singermid=${singer_mid}&order=listen&begin=0&num=30&songstatus=1`
}