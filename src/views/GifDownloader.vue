<template>
  <div class="max-w-6xl mx-auto animate-fade-in">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">GIF 搜索下载</h1>
      <p class="text-gray-600 dark:text-gray-400">输入关键字搜索并下载 GIF 动图</p>
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
          />
          <button @click="searchGifs" class="btn-primary whitespace-nowrap">
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
        <p class="text-red-700 dark:text-red-400">{{ error }}</p>
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
      <div v-if="!loading && gifs.length === 0 && searchKeyword" class="text-center py-12">
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
import { ref, onMounted } from 'vue'
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

    const searchGifs = async () => {
      if (!searchKeyword.value.trim()) {
        error.value = '请输入搜索关键字'
        return
      }

      loading.value = true
      error.value = ''
      gifs.value = []

      try {
        // 使用 GIF 服务搜索
        gifs.value = await gifService.searchGifs(searchKeyword.value, 20)
      } catch (err) {
        error.value = '搜索失败，请稍后重试'
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
      searchGifs,
      downloadGif,
      onImageLoad,
      onImageError
    }
  }
}
</script> 