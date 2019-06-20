const axios = require('axios')
const api = require('../api/index')
const executer = require('./execute')

module.exports = function (type, params) {
  let url = api[type](params)

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
        let data = executer[type](response.data)
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
