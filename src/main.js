import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// 导入页面组件
import Home from './views/Home.vue'
import GifDownloader from './views/GifDownloader.vue'
import ImageCompressor from './views/ImageCompressor.vue'
import QrCodeGenerator from './views/QrCodeGenerator.vue'
import JsonFormatter from './views/JsonFormatter.vue'
import Base64Converter from './views/Base64Converter.vue'
import DiceRoller from './views/DiceRoller.vue'

// 路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/gif-downloader', component: GifDownloader },
  { path: '/image-compressor', component: ImageCompressor },
  { path: '/qr-generator', component: QrCodeGenerator },
  { path: '/json-formatter', component: JsonFormatter },
  { path: '/base64-converter', component: Base64Converter },
  { path: '/dice-roller', component: DiceRoller }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app') 