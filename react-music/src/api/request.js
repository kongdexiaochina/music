
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.response.use(res => res.data)

export default function request (url, data = {}, method = 'get') {
  return new Promise((resolve, reject) => {
    let p = null
    if (method === 'get') { // 如果是get请求
      p = axios.get(url, {
        params: data
      })
    } else {
      p = axios.post(url, data)
    }
    p.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
