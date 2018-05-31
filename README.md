> #### 音悦 ~ 一款PWA版的在线音乐APP
##### 使用
````

# install dependencies
npm install

# run server
npm start

````

项目本身是适配移动端的所以在网站中打开的时候请自行切换到移动端视角查看...... 然后就是苹果手机的话请长按项目地址拷贝后用Safari打开,点击正下角的按钮然后将应用添加到桌面。 要说的是只有IOS系统升级到11.3.0以上才会支持 Service Worker 缓存功能, 不过没有升级添加到桌面后也能看, 应有的效果还是有的, 只是不能做到重启应用后秒开的效果。安卓的话由于我的是IOS系统所以不怎么清楚, 网上说似乎下载手机谷歌浏览器后在设置中可以将应用添加到桌面上。

##### 项目演示地址：[音悦 ~ Version Of Progressive Web App](https://cosmos-alien.com:443)

##### 技术栈

* 原生JavaScript
* CSS (3) 、Sass
* Koa2 、axios
* PWA：Manifest、Service Worker 、cacheStorage

##### 已实现的功能

后端部分: 

* 用Koa2搭建的一个服务器, 用来提供路由和处理请求, 然后就是有一个很基本的架构。

* 为前端提供用户请求音乐相关数据的接口, 其实是简单的用axios请求音乐数据然后对其进行必要的过滤之后再返回给前端。在这里提一下音乐的数据多亏了一位学长的指点, 然后自己在QQ音乐官网耐心找一找就有啦 ^_^

前端部分: 

* 基于rem和vw的移动端适配, 自己还用了Sass和Autoprefixer

* 基于CSS3和部分JS配合实现的一些页面动态效果
* 音乐播放器的基本功能
  * 上下首切换
  * 播放顺序的改变
  * 添加歌曲到歌单, 歌单播放, 歌单歌曲删除
* 歌曲、歌手的搜索功能
* 歌手页数据的请求, 每个歌手只有30首歌曲可以播放, 因为QQ音乐给的接口只有30首哈哈 ^_^

PWA部分: 

* 基于Manifest, 实现应用可添加到桌面等功能, 自己用的是IOS系统, 而苹果好像暂时不支持manifest，但有兼容的解决办法。
* 基于Service Worker, 实现静态资源的预缓存, 拦截请求并对其进行处理, 比如图片和音乐可以通过拦截然后进行缓存, 这样在离线的情况下仍能够播放音乐, 可惜的是自己尝试了多次还是有问题, 总感觉是 IOS 11.3.1 上的bug... 因为自己在谷歌浏览器上尝试的时候离线时音乐是可以播放的。所以最终的决定是不缓存音乐。
* 基于cacheStorage, 它是与Service Worker一起使用的一个API，但与localStorage和SessionStorage不同, 因为当用户退出页面后, 放在它里面的缓存数据仍然有效。利用这个特性我实现了保存用户歌单的简单功能, 意思是每次用户退出然后再次进入时, 歌单里面的歌曲仍然存在而不会初始化, 当前显示的歌曲仍和用户退出时显示的歌曲一致。
> PS: 本项目仍存在某些问题, 可能是IOS系统并未实现PWA技术的全方位支持, 也可能是自己的问题, 在这里提一下, 起初是想的是将用户播放的音乐缓存从而实现离线听歌, 在手机谷歌浏览器中尝试可以实现,但在IOS系统上却播放不了音乐,在谷歌中用户将应用切换到后台仍能够播放音乐, 但在IOS上添加到桌面的应用切换后台后音乐停止响应。相反, 在浏览器中运行的项目手机熄屏后无法做到JS脚本持续运行实现歌曲自动切换, 而加载到IOS桌面上的应用确能够实现。所以我估计的话安卓上面对PWA技术的支持性应该很好, 添加到桌面后从缓存中取出的歌曲也应该能够播放。 最后自己还是想了一个折中的办法, 即缓存用户的歌单。这样的话用户体验性能够高一点...
