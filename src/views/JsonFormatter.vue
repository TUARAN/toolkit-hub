<template>
  <div class="max-w-6xl mx-auto animate-fade-in">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">JSON 格式化工具</h1>
      <p class="text-gray-600 dark:text-gray-400">输入 JSON 文本，美化格式并高亮显示</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div class="card p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">输入 JSON</h3>
          <div class="flex space-x-2">
            <button @click="formatJSON" class="btn-primary text-sm">
              格式化
            </button>
            <button @click="minifyJSON" class="btn-secondary text-sm">
              压缩
            </button>
            <button @click="clearInput" class="btn-secondary text-sm">
              清空
            </button>
        </div>
        </div>
        <textarea
          v-model="inputJSON"
          placeholder="请输入 JSON 文本..."
          rows="20"
          class="input-field resize-none font-mono text-sm"
          @input="validateJSON"
        ></textarea>
        <div v-if="inputError" class="mt-2 text-sm text-red-600 dark:text-red-400">
          {{ inputError }}
        </div>
      </div>

      <!-- Output Section -->
      <div class="card p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">格式化结果</h3>
          <div class="flex space-x-2">
            <button @click="copyToClipboard" class="btn-secondary text-sm">
              复制
            </button>
            <button @click="downloadJSON" class="btn-secondary text-sm">
              下载
            </button>
          </div>
        </div>
        <div class="relative">
          <pre
            v-if="formattedJSON"
            class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-96 font-mono text-sm"
            :class="{ 'text-red-600 dark:text-red-400': outputError }"
          ><code>{{ formattedJSON }}</code></pre>
          <div v-else class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
            格式化后的 JSON 将显示在这里
          </div>
        </div>
        <div v-if="outputError" class="mt-2 text-sm text-red-600 dark:text-red-400">
          {{ outputError }}
        </div>
      </div>
    </div>

    <!-- JSON Statistics -->
    <div v-if="formattedJSON && !outputError" class="mt-8 card p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">JSON 统计信息</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-2xl font-bold text-primary-600">{{ stats.characters }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">字符数</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-2xl font-bold text-primary-600">{{ stats.lines }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">行数</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-2xl font-bold text-primary-600">{{ stats.depth }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">最大深度</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-2xl font-bold text-primary-600">{{ stats.size }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">文件大小</div>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">使用提示</h4>
      <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
        <li>• 支持粘贴 JSON 文本或从文件导入</li>
        <li>• 自动检测 JSON 语法错误并高亮显示</li>
        <li>• 格式化功能会自动添加适当的缩进和换行</li>
        <li>• 压缩功能会移除所有不必要的空格和换行</li>
        <li>• 支持复制到剪贴板和下载为 .json 文件</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'JsonFormatter',
  setup() {
    const inputJSON = ref('')
    const formattedJSON = ref('')
    const inputError = ref('')
    const outputError = ref('')

    const validateJSON = () => {
      if (!inputJSON.value.trim()) {
        inputError.value = ''
        formattedJSON.value = ''
        return
      }

      try {
        JSON.parse(inputJSON.value)
        inputError.value = ''
        formatJSON()
      } catch (error) {
        inputError.value = `JSON 语法错误: ${error.message}`
        formattedJSON.value = ''
      }
    }

    const formatJSON = () => {
      try {
        const parsed = JSON.parse(inputJSON.value)
        formattedJSON.value = JSON.stringify(parsed, null, 2)
        outputError.value = ''
      } catch (error) {
        outputError.value = `格式化失败: ${error.message}`
      }
    }

    const minifyJSON = () => {
      try {
        const parsed = JSON.parse(inputJSON.value)
        formattedJSON.value = JSON.stringify(parsed)
        outputError.value = ''
      } catch (error) {
        outputError.value = `压缩失败: ${error.message}`
      }
    }

    const clearInput = () => {
      inputJSON.value = ''
      formattedJSON.value = ''
      inputError.value = ''
      outputError.value = ''
    }

    const copyToClipboard = async () => {
      if (!formattedJSON.value) return
      
      try {
        await navigator.clipboard.writeText(formattedJSON.value)
        // 可以添加一个临时的成功提示
      } catch (error) {
        console.error('复制失败:', error)
      }
    }

    const downloadJSON = () => {
      if (!formattedJSON.value) return

      const blob = new Blob([formattedJSON.value], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'formatted.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    const stats = computed(() => {
      if (!formattedJSON.value) {
        return { characters: 0, lines: 0, depth: 0, size: '0 B' }
      }

      const characters = formattedJSON.value.length
      const lines = formattedJSON.value.split('\n').length
      const size = formatFileSize(new Blob([formattedJSON.value]).size)
      
      // 计算最大深度
      let depth = 0
      let currentDepth = 0
      for (let char of formattedJSON.value) {
        if (char === '{' || char === '[') {
          currentDepth++
          depth = Math.max(depth, currentDepth)
        } else if (char === '}' || char === ']') {
          currentDepth--
        }
      }

      return { characters, lines, depth, size }
    })

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return {
      inputJSON,
      formattedJSON,
      inputError,
      outputError,
      stats,
      validateJSON,
      formatJSON,
      minifyJSON,
      clearInput,
      copyToClipboard,
      downloadJSON
    }
  }
}
</script> 