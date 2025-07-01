<template>
  <div class="max-w-6xl mx-auto animate-fade-in">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">GIF 搜索下载</h1>
      <p class="text-gray-600 dark:text-gray-400">输入关键字搜索并下载 GIF 动图</p>
    </div>

    <!-- API Key 配置提示 -->
    <div v-if="!isApiKeyConfigured" class="mb-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            需要配置 API Key
          </h3>
          <div class="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
            <p class="mb-2">要使用真实的 GIF 搜索功能，请按以下步骤配置：</p>
            <ol class="list-decimal list-inside space-y-1 ml-2">
              <li>访问 <a href="https://tenor.com/developer/dashboard" target="_blank" class="underline hover:text-yellow-900 dark:hover:text-yellow-100">Tenor Developer Dashboard</a> 申请免费的 API Key</li>
              <li>在项目根目录创建 <code class="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">.env</code> 文件</li>
              <li>添加内容：<code class="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">VITE_TENOR_API_KEY=你的API密钥</code></li>
              <li>重启开发服务器</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="card p-6">
      <!-- Search Section -->
      <div class="mb-8">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          搜索关键字
        </label>
        <div class="flex space-x-2">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="输入关键字搜索 GIF，如：cat, dog, funny..."
            class="input-field flex-1"
            @keyup.enter="searchGifs"
            :disabled="!isApiKeyConfigured"
          />
          <button 
            @click="searchGifs" 
            class="btn-primary whitespace-nowrap"
            :disabled="!isApiKeyConfigured"
          >
            <Search class="w-4 h-4 inline mr-2" />
            搜索
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">正在搜索 GIF...</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
              搜索失败
            </h3>
            <div class="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- GIF Results -->
      <div v-if="gifs.length > 0" class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          搜索结果 ({{ gifs.length }} 个)
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="(gif, index) in gifs"
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div class="relative group">
              <img
                :src="gif.preview"
                :alt="gif.title"
                class="w-full h-48 object-cover"
                @load="onImageLoad(index)"
                @error="onImageError(index)"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button
                  @click="downloadGif(gif)"
                  class="opacity-0 group-hover:opacity-100 btn-primary text-sm"
                >
                  <Download class="w-4 h-4 inline mr-1" />
                  下载
                </button>
              </div>
            </div>
            <div class="p-3">
              <p class="text-sm text-gray-700 dark:text-gray-300 truncate">{{ gif.title }}</p>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ gif.size }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ gif.dimensions }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="!loading && gifs.length === 0 && searchKeyword && !error" class="text-center py-12">
        <Search class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-600 dark:text-gray-400">未找到相关 GIF</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">尝试使用其他关键字搜索</p>
      </div>

      <!-- Popular Keywords -->
      <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">热门搜索</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="keyword in popularKeywords"
            :key="keyword"
            @click="searchKeyword = keyword; searchGifs()"
            class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors duration-200"
            :disabled="!isApiKeyConfigured"
          >
            {{ keyword }}
          </button>
        </div>
      </div>

      <!-- Tips -->
      <div class="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">使用提示</h4>
        <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
          <li>• 支持中英文关键字搜索</li>
          <li>• 可以搜索表情、动物、动作等关键词</li>
          <li>• 点击 GIF 卡片上的下载按钮即可下载</li>
          <li>• 下载的 GIF 保持原始质量和尺寸</li>
          <li>• 数据来源：Tenor GIF 搜索</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { Search, Download } from 'lucide-vue-next'
import { gifService } from '../services/gifService'

export default {
  name: 'GifDownloader',
  components: {
    Search,
    Download
  },
  setup() {
    const searchKeyword = ref('')
    const gifs = ref([])
    const loading = ref(false)
    const error = ref('')
    
    const popularKeywords = ref([])

    // 检查 API Key 是否已配置
    const isApiKeyConfigured = computed(() => {
      return gifService.isApiKeyConfigured()
    })

    const searchGifs = async () => {
      if (!searchKeyword.value.trim()) {
        error.value = '请输入搜索关键字'
        return
      }

      if (!isApiKeyConfigured.value) {
        error.value = '请先配置 Tenor API Key'
        return
      }

      loading.value = true
      error.value = ''
      gifs.value = []

      try {
        // 使用 GIF 服务搜索
        gifs.value = await gifService.searchGifs(searchKeyword.value, 20)
      } catch (err) {
        error.value = err.message || '搜索失败，请稍后重试'
        console.error('搜索失败:', err)
      } finally {
        loading.value = false
      }
    }

    const loadTrendingKeywords = async () => {
      try {
        popularKeywords.value = await gifService.getTrendingGifs(10)
      } catch (error) {
        console.error('加载热门搜索失败:', error)
        // 使用默认热门搜索
        popularKeywords.value = ['cat', 'dog', 'funny', 'happy', 'sad', 'love', 'dance', 'food', 'anime', 'meme']
      }
    }

    const downloadGif = async (gif) => {
      try {
        const response = await fetch(gif.url)
        const blob = await response.blob()
        
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${gif.title.replace(/[^a-zA-Z0-9]/g, '_')}.gif`
        
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } catch (err) {
        error.value = '下载失败，请稍后重试'
        console.error('下载失败:', err)
      }
    }

    const onImageLoad = (index) => {
      // 图片加载成功
    }

    const onImageError = (index) => {
      // 图片加载失败，可以设置默认图片
      gifs.value[index].preview = 'https://via.placeholder.com/300x200/CCCCCC/666666?text=加载失败'
    }

    onMounted(() => {
      loadTrendingKeywords()
    })

    return {
      searchKeyword,
      gifs,
      loading,
      error,
      popularKeywords,
      isApiKeyConfigured,
      searchGifs,
      downloadGif,
      onImageLoad,
      onImageError
    }
  }
}
</script> 