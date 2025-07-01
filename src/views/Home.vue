<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        代码矿工-工具集
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        收集实用的开发工具，提升开发效率
      </p>
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ToolCard
        v-for="tool in tools"
        :key="tool.route"
        :title="tool.title"
        :description="tool.description"
        :icon="tool.icon"
        :route="tool.route"
        :category="tool.category"
      />
    </div>

    <!-- Stats Section -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div class="text-3xl font-bold text-primary-600 mb-2">{{ tools.length }}</div>
        <div class="text-gray-600 dark:text-gray-400">实用工具</div>
      </div>
      <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div class="text-3xl font-bold text-primary-600 mb-2">100%</div>
        <div class="text-gray-600 dark:text-gray-400">前端实现</div>
      </div>
      <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div class="text-3xl font-bold text-primary-600 mb-2">免费</div>
        <div class="text-gray-600 dark:text-gray-400">开源使用</div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolCard from '../components/ToolCard.vue'
import { 
  Download, 
  Image, 
  QrCode, 
  FileText, 
  Code 
} from 'lucide-vue-next'

export default {
  name: 'Home',
  components: {
    ToolCard
  },
  setup() {
    const tools = [
      {
        title: 'GIF 搜索下载',
        description: '输入关键字搜索并下载 GIF 动图',
        icon: Download,
        route: '/gif-downloader',
        category: '下载工具'
      },
      {
        title: '图片压缩',
        description: '上传图片，自动压缩并显示对比',
        icon: Image,
        route: '/image-compressor',
        category: '图片处理'
      },
      {
        title: '二维码生成',
        description: '输入任意文本，生成二维码',
        icon: QrCode,
        route: '/qr-generator',
        category: '生成工具'
      },
      {
        title: 'JSON 格式化',
        description: '输入 JSON 文本，美化格式并高亮',
        icon: FileText,
        route: '/json-formatter',
        category: '开发工具'
      },
      {
        title: 'Base64 编解码',
        description: '支持文本和图片的 Base64 编码与解码',
        icon: Code,
        route: '/base64-converter',
        category: '编码工具'
      }
    ]

    return {
      tools
    }
  }
}
</script> 