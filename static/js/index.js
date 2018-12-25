
// 一些零碎的交互效果
var container = document.querySelector('.container');
var innerHeight = window.innerHeight;
container.style.height = `${innerHeight}px`;

var grey = document.querySelector('.mask-grey');
var list = document.querySelector('.music-list');
var list_btn = document.querySelector('.list-icon');
var list_dark_btn = document.querySelector('.icons .list');

list_btn.addEventListener('click', () => {
    list.classList.remove('dark');
    list.classList.add('on');
    grey.classList.add('on');
})
list.querySelector('.close').addEventListener('click', () => {
    list.classList.remove('on');
    grey.classList.remove('on');
})
list_dark_btn.addEventListener('click', () => {
    list.classList.add('on', 'dark');
    grey.classList.add('on');
})

var section = document.querySelector('section');
var list_wrap = document.querySelector('.list-wrap');
var add_music = document.querySelector('.add-music');
var cancel_btn = document.querySelector('.cancel');
var singer_back = document.querySelector('.singer-back');

list_wrap.addEventListener('click', (e) => {
    if ( e.target.matches('.ellipsis i') ) {
        add_music.classList.add('slide');
        grey.classList.add('on');
    }
    if ( e.target.matches('.singer-li, .singer-li *') ) {
        section.classList.add('switch');
    }
})
singer_back.addEventListener('click', () => {
    section.classList.remove('switch');
})
cancel_btn.addEventListener('click', () => {
    add_music.classList.remove('slide');
    grey.classList.remove('on');
})

var avatar = document.querySelector('.foo .song-pic i');
var blur = document.querySelector('.mask-blur');
var blur_back = document.querySelector('.blur-back');

avatar.addEventListener('click', () => {
    blur.classList.add('show');
})
blur_back.addEventListener('touchstart', () => {
    blur.classList.remove('show');
})

var search_input = document.querySelector('.search_input');

search_input.addEventListener('focus', () => {
    search_input.classList.add('active');
})
search_input.addEventListener('blur', () => {
    search_input.classList.remove('active');
})

/* ----------------- 正式开始实现播放器效果 ------------------- */

// audioElement
var player = document.querySelector('.player-fuc .audio');

function audioPlayer() {

    // 播放暂停事件
    var btn_big_icon = document.querySelector('.icons > i:nth-of-type(3)');
    var btn_small = document.querySelector('.circle');
    var btn_small_icon = btn_small.querySelector('i.btn');

    btn_small.addEventListener('click', toggle);
    btn_big_icon.addEventListener('click', toggle);

    function toggle(e) {
        var icon = e.target.matches('.circle, .circle *') ? btn_small_icon : btn_big_icon;
        if ( icon.classList.contains('pause') ) {
            player.pause();
            btn_small_icon.classList.remove('pause');
            btn_big_icon.classList.remove('pause');
        } else {
            player.play();
            btn_small_icon.classList.add('pause');
            btn_big_icon.classList.add('pause');
        }
    }

    // 进度条事件
    var progress = document.querySelector('.music-progress');
    var progress_bar = document.querySelector('.progress-bar');
    var progress_box = document.querySelector('.progress-tracker');
    var progress_handler = document.querySelector('.progress-handler');
    var current_time = document.querySelector('.music-progress .present');
    var total_time = document.querySelector('.music-progress .total');
    var cir_right = document.querySelector('.circle-right');
    var cir_left = document.querySelector('.circle-left');
    var rotate_wrap = document.querySelector('.circle-pic');

    player.addEventListener('timeupdate', updateProgress);
    player.addEventListener('loadedmetadata', function duration() {
        total_time.textContent = formatTime(player.duration);
    })
    player.addEventListener('playing', () => {
        btn_big_icon.classList.add('pause');
        btn_small_icon.classList.add('pause');
    })
    progress.addEventListener('touchstart', (e) => {
        progress.addEventListener('touchmove', rewind);
        progress.addEventListener('touchend', (e) => {
            progress.removeEventListener('touchmove', rewind);
        });
    })

    function inRange(e) {
        var rect = progress_box.getBoundingClientRect();
        var min = rect.left;
        var max = min + progress_box.offsetWidth;
        var touch = e.targetTouches[0];
        if ( touch.clientX < min || touch.clientX > max ) { return false };
        return true;
    }

    function getCoefficient(e) {
        var rect = progress_box.getBoundingClientRect();
        var touch = e.targetTouches[0];
        var offsetX = touch.clientX - rect.left;
        var width = progress_box.clientWidth;
        var K = offsetX / width;
        return K;
    }

    function rewind(e) {
        if ( inRange(e) ) {
            player.currentTime = player.duration * getCoefficient(e);
        }
    }

    function updateProgress() {
        var current = player.currentTime;
        var ratio = current / player.duration;
        var percent = ratio * 100;
        var movement = ratio * progress_box.clientWidth;
        progress_bar.style.width = percent + '%';
        progress_handler.style.cssText = `transform: translate3d(${movement}px,0,0);`;
        current_time.textContent = formatTime(current);
        progressRotate(ratio);
        autoRotate();
    }
    
    function formatTime(time) {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return '0' + min + ':' + (sec < 10 ? '0' + sec : sec);
    }

    function progressRotate(ratio) {
        var angle = Math.floor(ratio * 360);
        cir_left.style.cssText = `transform: rotate(0deg)`;
        if (angle >= 180) {
            cir_right.style.cssText = `transform: rotate(0deg);background: #b2dedd;`;
            cir_left.style.cssText = `transform: rotate(${angle-180}deg)`;
        } else {
            cir_right.style.cssText = `transform: rotate(${angle}deg);`;
        }
    }

    function autoRotate() {
        var rotate_pic = rotate_wrap.firstChild;
        if (player.paused) {
            var itransform = getComputedStyle(rotate_pic).transform;
            var ctransform = getComputedStyle(rotate_wrap).transform;
            rotate_wrap.style.transform = ctransform == 'none' ? itransform : itransform.concat('', ctransform);
            rotate_pic.classList.remove('animate');
        } else {
            rotate_pic.classList.add('animate');
        }
    }

}
audioPlayer();

// 音乐池
class MusicPool {
    constructor() {
        this.musicList = [
            {
                mid: '000QCwge3B6Ad1',
                pic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002GH0pj1uSvV9.jpg?max_age=2592000',
                name: '肆无忌惮',
                singer: '薛之谦',
                url: 'http://isure.stream.qqmusic.qq.com//C400000QCwge3B6Ad1.m4a?guid=5579254314&vkey=70CB3AB574B79D34F103AC471E91FA2F2AEA185E688AAA4B914E8E69D70F4A3E7EA0CEC26A2775FD047E36B13D62D870124579F902F60346&uin=0&fromtag=38'
            },
            {
                mid: '003TfyNp47dm7E',
                pic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000JOrf02Iy29a.jpg?max_age=2592000',
                name: '哑巴',
                singer: '薛之谦',
                url: 'http://isure.stream.qqmusic.qq.com//C400003TfyNp47dm7E.m4a?guid=5579254314&vkey=72F7E1B8D27BF25CD35D03DE200DCB2FEDA68F04B8A5E2164C07C5749A3133EAA1146CF67E4A098AB5872196EEDEA5F2F9B8A38A90F9E189&uin=0&fromtag=38'
            }
        ];
    }
    getMusicList() {
        return this.musicList;
    }
    addMusic(map) {
        this.musicList.push(map);
    }
    deleteMusic(key) {
        var trash = 
        this.musicList.find((map, index) => {
            if (map.mid == key) {
                return this.musicList.splice(index, 1);
            }
        })
        trash = null;
    }
    emptyMusicList() {
        this.musicList = [];
    }
    findMusic(key, n) {
        var list = this.musicList;
        var last = list.length -1;
        var music;
        this.musicList.find((map, index) => {
            if (map.mid == key) {
                if (n == 1) {
                    map = index == last ? list[0] : list[index+1];
                }
                if (n == -1) {
                    map = index == 0 ? list[last] : list[index-1];
                }
                music = map;
            }
        })
        return music;
    }
    randomMusic() {
        var max = this.musicList.length -1;
        var rand = Math.random();
        var num = Math.round(rand * max);
        var map = this.musicList[num];
        return map;
    }
}

// 初始化音乐池
var pool = new MusicPool();

// 前进后退、播放顺序以及歌单的交互逻辑
var prev = document.querySelector('.icons .prev');
var next = document.querySelector('.icons .next');
var btn_big_icon = document.querySelector('.icons > i:nth-of-type(3)');
var btn_small_icon = document.querySelector('.circle i.btn');
var order = document.querySelector('.icons i:first-child');
var p_name = document.querySelector('.player-info .p-name');
var p_singer = document.querySelector('.player-info .p-singer span');
var p_pic = document.querySelector('.circle-pic i');
var s_name = document.querySelector('.foo .song-name');
var s_singer = document.querySelector('.foo .singer');
var s_pic = document.querySelector('.foo .song-pic i');
var self_wrap = document.querySelector('.self-wrap');
var self_songs = self_wrap.querySelectorAll('.song-info');
var warning = document.querySelector('.warning');

player.addEventListener('ended', checkOrder);
prev.addEventListener('click', checkOrder);
next.addEventListener('click', checkOrder);

// 判断此时属于哪种播放顺序从而确定如何执行下一步
function checkOrder() {
    var key = player.getAttribute('mid');
    var type = order.getAttribute('class');
    if ( type == 'loop' ) {
        var { mid, name, pic, singer, url } = pool.findMusic(key);
    }
    if ( type == 'circle' || type == null ) {
        var { mid, name, pic, singer, url } = this == prev ? pool.findMusic(key, -1) : pool.findMusic(key, 1);
    }
    if ( type == 'random' ) {
        var { mid, name, pic, singer, url } = pool.randomMusic();
    }
    change(mid, name, pic, singer, url);
}

// 最后一步歌曲信息的改变
function change(mid, name, pic, singer, url, type) {
    if ( !judge(type, mid, name, singer) ) { return }; 
    refresh(mid, name, pic, singer, url);
    player.play();
}

// 歌曲切换时相应图片文字的改变
function refresh(mid, name, pic, singer, url) {
    p_name.textContent = name;
    s_name.textContent = name;
    p_singer.textContent = singer;
    s_singer.textContent = singer;
    p_pic.style.cssText = `background-image:url(${pic})`;
    s_pic.style.cssText = `background-image:url(${pic})`;
    showActiveMusic(mid);
    player.setAttribute('mid', mid);
    player.setAttribute('title', name);
    player.setAttribute('src', url);
}

/**
 * 
 * @param {*} type  判断以哪种方式对歌曲进行操作
 *  repeat: 若歌单中有该歌曲则只显示播放页不请求该歌曲
 *  lowerPlay: 请求歌曲, 添加到歌单, 播放歌曲但不显示播放页
 *  onlyList: 请求歌曲, 添加到歌单
 *  outerPlay: 请求歌曲, 添加到歌单, 播放歌曲且显示播放页
 * 
 */
function judge(type, mid, name, singer) {
    if ( type == 'repeat' ) {
        blur.classList.add('show');
    } 
    else if ( type == 'lowerPlay') {
        addToMusicList(mid, name, singer);
        saveMusicListToCache();
    }
    else if ( type == 'onlyList' ) {
        addToMusicList(mid, name, singer);
        saveMusicListToCache();
        return false;
    }
    else if ( type == 'outerPlay' ) {
        blur.classList.add('show');
        addToMusicList(mid, name, singer);
        saveMusicListToCache();
    } else {
        p_pic.parentNode.parentNode.classList.add('scale-once');
        setTimeout(() => { p_pic.parentNode.parentNode.classList.remove('scale-once') }, 500);
    }
    return true;
}

// 添加到歌单
function addToMusicList(mid, name, singer) {
    var html = 
    `
    <li class="self-song">
        <div class="song-info" song_mid=${mid}>
            <span class="song-name">${name}</span>
            <span class="singer">- <span>${singer}</span></span>
            <div class="beat">
                <span class="one"></span>
                <span class="two"></span>
                <span class="three"></span>
            </div>
        </div>
        <div class="close-icon"><i></i></div>
    </li>
    `
    self_wrap.insertAdjacentHTML('beforeEnd', html);
}

// 当前播放歌曲高亮
function showActiveMusic(mid) {
    self_wrap.querySelectorAll('.song-info').forEach((ele) => {
        var li = ele.parentNode;
        li.classList.remove('active');
        var song_mid = ele.getAttribute('song_mid');
        if ( song_mid == mid ) {
            li.classList.add('active');
        }
    })
}

// 点击播放顺序按钮切换
(() => {
    var i = 0;
    var classLists = ['loop', 'random','circle'];
    order.addEventListener('click', () =>{
        i = i == 3 ? 0 : i;
        order.className = classLists[i];
        order.classList.contains('loop') ? player.setAttribute('loop', 'loop') : player.removeAttribute('loop');
        i++;
    })
})()

// 歌单中播放音乐或删除音乐
self_wrap.addEventListener('click', debounce(playMusic, 1000, true));
self_wrap.addEventListener('click', debounce(deleteMusic, 1000, true));

function playMusic(e) {
    if ( e.target.matches('.song-info, .song-info *') ) {
        var li = findParent(e.target, 'self-song');
        var key = li.querySelector('.song-info').getAttribute('song_mid');
        var { mid, name, pic, singer, url } = pool.findMusic(key);
        change(mid, name, pic, singer, url);
    }
}

function deleteMusic(e) {
    if ( e.target.matches('.close-icon, .close-icon i') ) {
        var li = findParent(e.target, 'self-song');
        var key = li.querySelector('.song-info').getAttribute('song_mid');
        var mid_now = player.getAttribute('mid');
        if ( key == '000QCwge3B6Ad1' ) {
            warning.textContent = '默认歌曲不能删除哦^_^';
            warning.classList.add('on');
            setTimeout(() => { warning.classList.remove('on') }, 2000);
            return;
        }
        if ( key == mid_now ) {
            warning.textContent = '正在播放的歌曲不能删除哦^_^';
            warning.classList.add('on');
            setTimeout(() => { warning.classList.remove('on') }, 2000);
            return;
        }
        pool.deleteMusic(key);
        saveMusicListToCache();
        li.classList.add('disappear');
        setTimeout(() => { li.outerHTML = '' }, 500);
    }
}

// 请求搜索后的数据并渲染
var search_box = document.querySelector('.search_input');
var list_wrap = document.querySelector('.list-wrap');

search_box.addEventListener('blur', reqSearchData);

function reqSearchData() {
    var keyword = htmlEncode(search_box.value);
    if ( keyword == '' ) {
        list_wrap.innerHTML = '';
        return;
    }
    var data = { keyword: keyword };
    $.ajax({
        url: '/search',
        method: 'POST',
        data: data
    }).then(res => {
        if (res.fail) { return };
        res[0].pic ? renderSinger(res) : renderSong(res);
    }).catch(err => console.log(err));
}

function renderSinger(res) {
    list_wrap.innerHTML = '';
    for ( var data of res ) {
        var { singer_mid, name, pic } = data;
        var li = document.createElement('li');
        li.classList.add('singer-li');
        var html = 
        `
        <div class="singer-info">
            <div class="singer-pic">
                <i singer_mid=${singer_mid}></i>
            </div>
            <div class="singer-name">${name}</div>
        </div>
        <div class="check-singer">
        </div>
        `
        li.innerHTML = html;
        list_wrap.appendChild(li);
        document.querySelectorAll('.singer-pic i').forEach((ele) => {
            if ( ele.getAttribute('singer_mid') == singer_mid ) {
                ele.style.cssText =`background-image:url(${pic})`;
            }
        })
    }
}

function renderSong(res) {
    list_wrap.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for ( var song of res ) {
        var { song_mid, name, singer } = song;
        var li = document.createElement('li');
        li.classList.add('song');
        var html = 
        `
        <div class="song-info" song_mid=${song_mid}>
            <p class="song-name">${name}</p>
            <p class="singer">${singer}</p>
        </div>
        <div class="ellipsis">
            <i></i>
        </div>
        `
        li.innerHTML = html;
        fragment.appendChild(li);
    }
    list_wrap.appendChild(fragment);
}

// 主页点击歌曲或歌手之后的逻辑
list_wrap.addEventListener('click', wardsAction);

function wardsAction(e) {
    if ( e.target.matches('.song-info, .song-info *') ) {
        var li = findParent(e.target, 'song');
        var song_mid = li.querySelector('.song-info').getAttribute('song_mid');
        reqMusicData(song_mid);
    }
    if ( e.target.matches('.singer-info, .singer-info *') ) {
        var li = findParent(e.target, 'singer-li');
        var singer_mid = li.querySelector('.singer-pic i').getAttribute('singer_mid');
        reqSingerData(singer_mid);
    }
}

// 请求音乐数据并渲染
function reqMusicData(song_mid, type = 'outerPlay') {
    if ( checkPool(song_mid) ) { return };
    var data = {
        song_mid: song_mid
    }
    $.ajax({
        url: '/getMusicInfo',
        method: 'POST',
        data: data
    }).then((res) => {
        handleMusic(res, type);
    })
    .catch(err => console.log(err));
}

function checkPool(mid) {
    var map = pool.findMusic(mid);
    if ( map ) {
        var { mid, name, pic, singer, url } = map;
        change(mid, name, pic, singer, url, 'repeat');
        return true;
    }
    return false;
}

function handleMusic(data, type) {
    var { mid, name, pic, singer, url } = data;
    pool.addMusic(data);
    change(mid, name, pic, singer, url, type);
}

// 请求歌手详情页数据并渲染
var singer_bg = document.querySelector('.singer-bg');
var page_singer_name = document.querySelector('.page-singer-name');
var songs_wrap = document.querySelector('.singer-songs-wrap ul');

function reqSingerData(singer_mid) {
    if ( singer_bg.getAttribute('singer_mid') == singer_mid ) { return };
    var data = {
        singer_mid: singer_mid
    }
    $.ajax({
        url: '/getSingerSongs',
        method: 'POST',
        data: data
    }).then((res) => {
        handleSinger(res, singer_mid);
    }).catch((err) => {
        console.log(err);
    })
}

function handleSinger(res, singer_mid) {
    var [{ pic, singer, singer_mid }, lists] = res;
    singer_bg.setAttribute('singer_mid', singer_mid);
    singer_bg.style.cssText = `background-image:url(${pic})`;
    page_singer_name.textContent = singer;
    songs_wrap.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for ( var list of lists ) {
        var { singer_name, song_mid, song_name } = list;
        var li = document.createElement('li');
        li.classList.add('singer-song');
        var html = 
        `
        <div class="song-info" song_mid=${song_mid}>
            <p class="song-name">${song_name}</p>
            <p class="singer-name">${singer_name}</p>
        </div>
        <div class="ellipsis"><i></i></div>
        `
        li.innerHTML = html;
        fragment.appendChild(li);
    }
    songs_wrap.appendChild(fragment);
}

// 主页歌曲信息右侧立即播放与加入歌单
var selection = document.querySelector('.selection');
var play_now = selection.querySelector('.selection .play_now');
var add_list = selection.querySelector('.selection .add_list');

list_wrap.addEventListener('click',markMid);
play_now.addEventListener('click', playNow);
add_list.addEventListener('click', addToList);

function markMid(e) {
    if ( e.target.matches('.ellipsis, .ellipsis i') ) {
        var li = findParent(e.target, 'song');
        var mid = li.querySelector('.song-info').getAttribute('song_mid');
        var song_name = li.querySelector('.song-name').textContent;
        add_music.querySelector('.song-name').textContent = song_name;
        selection.setAttribute('song_mid', mid);
    }
}

function playNow() {
    var song_mid = this.parentNode.getAttribute('song_mid');
    reqMusicData(song_mid, 'lowerPlay');
    add_music.classList.remove('slide');
    grey.classList.remove('on');
}

function addToList() {
    var song_mid = this.parentNode.getAttribute('song_mid');
    reqMusicData(song_mid, 'onlyList');
    add_music.classList.remove('slide');
    grey.classList.remove('on');
}

// 歌手页歌曲信息点击播放、右侧立即播放与加入歌单
songs_wrap.addEventListener('click', pageMusic);
songs_wrap.addEventListener('click', slideUp);
songs_wrap.addEventListener('click', markPageMid);

function pageMusic(e) {
    if ( e.target.matches('.song-info, .song-info *') ) {
        var li = findParent(e.target, 'singer-song');
        var song_mid = li.querySelector('.song-info').getAttribute('song_mid');
        reqMusicData(song_mid);
    }
}

function slideUp(e) {
    if ( e.target.matches('.ellipsis i') ) {
        add_music.classList.add('slide');
        grey.classList.add('on');
    }
}

function markPageMid(e) {
    if ( e.target.matches('.ellipsis, .ellipsis i') ) {
        var li = findParent(e.target, 'singer-song');
        var mid = li.querySelector('.song-info').getAttribute('song_mid');
        var song_name = li.querySelector('.song-name').textContent;
        add_music.querySelector('.song-name').textContent = song_name;
        selection.setAttribute('song_mid', mid);
    }
}

// Service Worker Register 
if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('/service_worker.js')
    .then( registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch( err => console.log('ServiceWorker registration failed: ', err));
}

// 一但歌单有变化就将其存储到cacheStorage
function saveMusicListToCache(mid) {
    var cache_list = 'music_list';
    var musicList = pool.getMusicList();
    var data = JSON.stringify(musicList);
    if ( 'caches' in window ) {
        caches.open(cache_list)
        .then( cache => {
            cache.put(cache_list, new Response(data, { status: 200 }));
        })
    }
}

// 用户离开页面时将正在播放的mid存储到cache
player.addEventListener('loadedmetadata', () => {
    var last_playing_mid = 'last_playing_mid';
    var mid = player.getAttribute('mid');
    var data = JSON.stringify(mid);
    if ( 'caches' in window ) {
        caches.open(last_playing_mid)
        .then( cache => {
            cache.put(last_playing_mid, new Response(data, { status: 200 }));
        })
    }
})

// 每次页面启动时渲染用户之前离开时的musicList并显示离开时播放的歌曲
function getMusicListFromCache() {
    var cache_list = 'music_list';
    var last_playing_mid = 'last_playing_mid';
    if ( 'caches' in window ) {
        return Promise.all([
            caches.match(cache_list)
            .then( cache => {
                if ( !cache ) { return };
                return cache.json();
            }),
            caches.match(last_playing_mid)
            .then( cache => {
                if ( !cache ) { return };
                return cache.json();
            })
        ])
    } else {
        return Promise.resolve();
    }
}
getMusicListFromCache().then( response => {
    var [musicList, song_mid] = response;
    if ( !musicList || !song_mid ) {
        return;
    }
    self_wrap.innerHTML = '';
    pool.emptyMusicList();
    for ( var music of musicList ) {
        pool.addMusic(music);
        var { mid, name, pic, singer, url } = music;
        addToMusicList(mid, name, singer);
        if ( song_mid == mid ) {
            refresh(mid, name, pic, singer, url);
        }
    }
})
.catch( err => { 
    console.log(err);
})