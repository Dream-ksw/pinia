import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入pinia
import { createPinia } from 'pinia'

// 创建pinia
const pinia = createPinia()

const app = createApp(App)
// 挂载pinia
app.use(pinia)

app.mount('#app')

// 文档地址
// https://www.yuque.com/yyydaydayup/coding/fp84bm#khXzl
