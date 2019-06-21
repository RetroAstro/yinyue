## 音悦 ~ 一款 PWA 版的在线音乐 APP

**[Version Of Progressive Web App](https://yinyue.now.sh)** 

**Serverless**

基于 Serverless ，项目前后端分离，代码部署在 **zeit** 平台上。

**技术栈**

* JavaScript
* CSS (3) 、Sass
* Koa2 、axios
* PWA：Manifest、Service Worker 、cacheStorage

**已实现的功能**

后端部分: 

* 用 Koa2 搭建的一个服务器, 用来提供路由和处理请求, 然后就是有一个很基本的架构。

* 为前端提供用户请求音乐相关数据的接口, 其实是用 axios 请求音乐数据然后对其进行必要的过滤, 之后再返回给前端。

前端部分: 

* 基于 rem 和 vw 的移动端适配, 自己还用了 Sass 和 Autoprefixer

* 基于 CSS3 和部分 JS 配合实现的一些页面动态效果
* 音乐播放器的基本功能
  * 上下首切换
  * 播放顺序的改变
  * 添加歌曲到歌单, 歌单播放, 歌单歌曲删除
* 歌曲、歌手的搜索功能
* 歌手页数据的请求, 每个歌手只有30首歌曲可以播放, 因为QQ音乐给的接口只有30首哈哈^_^

PWA 部分: 

* 基于 Manifest, 实现应用可添加到桌面等功能, 自己用的是 IOS 系统, 而苹果好像暂时不支持 `manifest.json`, 但有兼容的解决办法。
* 基于 Service Worker, 实现静态资源的预缓存, 拦截请求并对其进行处理, 比如图片和音乐可以通过拦截然后进行缓存, 这样在离线的情况下仍能够播放音乐, 可惜的是自己尝试了多次还是有问题, 总感觉是 IOS 11.3.1 上的 bug ... 因为自己在谷歌浏览器上尝试的时候离线时音乐是可以播放的。所以最终的决定是不缓存音乐。
* 基于 cacheStorage, 它是与 Service Worker 一起使用的一个 API，但与 localStorage 和 sessionStorage 不同, 因为当用户退出页面后, 放在它里面的缓存数据仍然有效。利用这个特性我实现了保存用户歌单的简单功能, 意思是每次用户退出然后再次进入时, 歌单里面的歌曲仍然存在而不会初始化, 当前显示的歌曲仍和用户退出时显示的歌曲一致。

> 项目本身是适配移动端的所以在网站中打开的时候请自行切换到移动端视角查看...... 然后就是苹果手机的话请长按项目地址拷贝后用 Safari 打开,点击正下角的按钮然后将应用添加到桌面。 要说的是只有 IOS 系统升级到 11.3.0 以上才会支持 Service Worker 缓存功能, 不过没有升级添加到桌面后也能看, 应有的效果还是有的, 只是不能做到重启应用后秒开的效果。安卓手机可通过手机谷歌浏览器打开点击右上角按钮然后有添加到主屏幕的选项。
