// // src/api/index.js
// import axios from 'axios'
// import router from '../router'
// import { Message } from 'element-ui'
// const service = axios.create({
//   // 设置超时时间
//   timeout: 60000,
//   baseURL: process.env.BASE_URL
// })
// // post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置
// // 即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8''
// export default service