
const axios = require('axios')
const apis = require('../apis/api')
const executer = require('./execute')

// axios 请求数据
module.exports = function (type, params) {
    var url = apis[type](params);
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'GET',
            timeout: 1500,
            xhrFields: {
                withCredentials: true
            }
        })
        .then((response) => {
            var data = executer[type](response.data);
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}