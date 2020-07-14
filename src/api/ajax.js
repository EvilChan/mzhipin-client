import axios from 'axios'

export default function ajax(url = '', data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (method === 'GET') {
      let paramStr = ''
      Object.keys(data).forEach(key => {
        paramStr += key + '=' + data[key] + '&'
      })
      if (paramStr) {
        paramStr = paramStr.substring(0, paramStr.length - 1)
      }
      promise = axios.get(`${url}?${paramStr}`)
    } else {
      promise = axios.post(url, data)
    }
    promise
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
