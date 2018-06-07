
var cacheMaps = {
    cache_static: 'static_online',
    cache_image: 'image_online',
    cache_list: 'music_list',
    last_playing_mid: 'last_playing_mid'
}

// var cache_music = 'music_online';

var staticFiles = 
[
'/','/js/tool.js','/js/index.js','/css/index.css',
'/img/avatar.jpg','/img/play.png','/img/list.png','/img/logo.svg','/img/active.png',
'/img/add.png','/img/arrow_l.png','/img/arrow_r.png','/img/arrow.png','/img/blur.jpg',
'/img/circle.png','/img/close.png','/img/ellipsis.png','/img/ellis.png','/img/loop.png',
'/img/music.png','/img/next.png','/img/pause.png','/img/play2.png','/img/play3.png',
'/img/prev.png','/img/random.png','/img/search.png','/img/stop.png'
]

// 预缓存静态资源并立即激活 Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheMaps.cache_static)
        .then( cache => cache.addAll(staticFiles))
        .then(() => self.skipWaiting())
    )
})

// 监听activate事件, 激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
        .then( cacheNames => {
            return cacheNames.filter( item => !Object.values(cacheMaps).includes(item))
        })
        .then( keys => {
            return Promise.all( keys.map( key => {
                return caches.delete(key);
            }))
        })
        .then(() => self.clients.claim())
    )
})

// 缓存策略 -- 在IOS 11.3.1 上有bug, 缓存后的音乐不能播放, 歌手图片不显示 --
self.addEventListener('fetch', event => {
    // 缓存音乐
    if ( /dl.stream.qqmusic.qq.com/.test(event.request.url) ) {
        // var request = event.request;
        // event.respondWith(firstCache(request, cache_music));
    }
    // 缓存图片
    else if ( /photo_new/.test(event.request.url) ) {
        var request = event.request;
        event.respondWith(firstCache(request, cacheMaps.cache_image));
    }
    // 预缓存
    else if ( !/imgcache.qq.com/.test(event.request.url) ) {
        var request = event.request;
        event.respondWith(preCache(request));
    }
})

// 拿到预缓存的资源
function preCache(request) {
    return caches.match(request)
    .then( cache => {
        if (cache) {
            return cache;
        }
        return fetch(request.clone());
    })
    .catch( err => {
        console.log(err);
        return fetch(request.clone());
    })
}

// 优先请求缓存若没有则请求网络
function firstCache(request, cacheName) {
    return caches.match(request)
    .then( cache => {
        if (cache) {
            return cache;
        }
        var requestCopy = request.clone();
        return fetch(requestCopy)
        .then( response => {
            var responseCopy = response.clone();
            caches.open(cacheName).then( cache => {
                cache.put(requestCopy, responseCopy);
            })
            return response;
        })
    })
}
