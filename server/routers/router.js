
const fs = require('fs')
const path = require('path')

// 注册路由
function addMaps(router, map) {
    for (var url in map) {
        if (url.startsWith('GET')) {
            var path = url.substr(4);
            router.get(path, map[url]);
        } else if (url.startsWith('POST')) {
            var path = url.substr(5);
            router.post(path, map[url]);
        } else {
            console.log(`invalid URL : ${url}`);
        }
    }
}

// 扫描controllers文件
function addControllers(router) {
    var dir = 'controllers';
    var files = fs.readdirSync(path.join(__dirname, `./../${dir}`));
    for (var file of files) {
        let map = require(__dirname + `./../${dir}/` + file);
        addMaps(router, map);
    }
}

module.exports = function () {
    let router = require('koa-router')();
    addControllers(router);
    return router;
}