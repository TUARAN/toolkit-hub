<template>
  <div class="max-w-6xl mx-auto animate-fade-in">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">图片压缩工具</h1>
      <p class="text-gray-600 dark:text-gray-400">上传图片，自动压缩并显示对比效果</p>
    </div>

    <div class="card p-6">
      <!-- Upload Section -->
      <div class="mb-8">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          选择图片文件
        </label>
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileSelect"
          />
          <div v-if="!originalImage" @click="$refs.fileInput.click()" class="cursor-pointer">
            <Upload class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600 dark:text-gray-400">点击选择图片或拖拽到此处</p>
            <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">支持 JPG、PNG、WebP 格式</p>
          </div>
          <div v-else class="text-center">
            <p class="text-gray-600 dark:text-gray-400 mb-4">已选择: {{ selectedFile.name }}</p>
            <button @click="compressImage" class="btn-primary">
              开始压缩
            </button>
          </div>
        </div>
      </div>

      <!-- Compression Settings -->
      <div v-if="originalImage" class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">压缩设置</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              质量 ({{ quality }}%)
            </label>
            <input
              v-model="quality"
              type="range"
              min="10"
              max="100"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              最大宽度
            </label>
            <input
              v-model="maxWidth"
              type="number"
              placeholder="800"
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              输出格式
            </label>
            <select v-model="outputFormat" class="input-field">
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Comparison Section -->
      <div v-if="originalImage && compressedImage" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Original Image -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">原始图片</h3>
          <div class="relative">
            <img
              :src="originalImage"
              alt="Original"
              class="w-full rounded-lg shadow-lg"
            />
            <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              {{ originalSize }}
            </div>
          </div>
          <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            尺寸: {{ originalDimensions.width }} × {{ originalDimensions.height }}
          </div>
        </div>

        <!-- Compressed Image -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">压缩后</h3>
          <div class="relative">
            <img
              :src="compressedImage"
              alt="Compressed"
              class="w-full rounded-lg shadow-lg"
            />
            <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              {{ compressedSize }}
            </div>
          </div>
          <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            尺寸: {{ compressedDimensions.width }} × {{ compressedDimensions.height }}
          </div>
        </div>
      </div>

      <!-- Download Section -->
      <div v-if="compressedImage" class="mt-8 text-center">
        <button @click="downloadImage" class="btn-primary">
          <Download class="w-5 h-5 inline mr-2" />
          下载压缩图片
        </button>
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          压缩率: {{ compressionRatio }}% | 节省空间: {{ savedSpace }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Upload, Download } from 'lucide-vue-next'

export default {
  name: 'ImageCompressor',
  components: {
    Upload,
    Download
  },
  setup() {
    const fileInput = ref(null)
    const selectedFile = ref(null)
    const originalImage = ref('')
    const compressedImage = ref('')
    const quality = ref(80)
    const maxWidth = ref(800)
    const outputFormat = ref('jpeg')
    const originalSize = ref('')
    const compressedSize = ref('')
    const originalDimensions = ref({ width: 0, height: 0 })
    const compressedDimensions = ref({ width: 0, height: 0 })

    const handleFileSelect = (event) => {
      const file = event.target.files[0]
      if (file && file.type.startsWith('image/')) {
        selectedFile.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
          originalImage.value = e.target.result
          originalSize.value = formatFileSize(file.size)
          
          // 获取原始尺寸
          const img = new Image()
          img.onload = () => {
            originalDimensions.value = { width: img.width, height: img.height }
          }
          img.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const compressImage = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // 计算新尺寸
        let { width, height } = img
        if (maxWidth.value && width > maxWidth.value) {
          height = (height * maxWidth.value) / width
          width = maxWidth.value
        }
        
        canvas.width = width
        canvas.height = height
        
        // 绘制图片
        ctx.drawImage(img, 0, 0, width, height)
        
        // 压缩
        const mimeType = `image/${outputFormat.value}`
        const compressedDataUrl = canvas.toDataURL(mimeType, quality.value / 100)
        
        compressedImage.value = compressedDataUrl
        compressedDimensions.value = { width, height }
        
        // 计算压缩后大小
        const base64 = compressedDataUrl.split(',')[1]
        const compressedBytes = atob(base64).length
        compressedSize.value = formatFileSize(compressedBytes)
      }
      
      img.src = originalImage.value
    }

    const downloadImage = () => {
      const link = document.createElement('a')
      link.download = `compressed.${outputFormat.value}`
      link.href = compressedImage.value
      link.click()
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const compressionRatio = computed(() => {
      if (!originalSize.value || !compressedSize.value) return 0
      const original = parseFloat(originalSize.value)
      const compressed = parseFloat(compressedSize.value)
      return Math.round(((original - compressed) / original) * 100)
    })

    const savedSpace = computed(() => {
      if (!originalSize.value || !compressedSize.value) return ''
      const original = parseFloat(originalSize.value)
      const compressed = parseFloat(compressedSize.value)
      return formatFileSize(original - compressed)
    })

    return {
      fileInput,
      selectedFile,
      originalImage,
      compressedImage,
      quality,
      maxWidth,
      outputFormat,
      originalSize,
      compressedSize,
      originalDimensions,
      compressedDimensions,
      compressionRatio,
      savedSpace,
      handleFileSelect,
      compressImage,
      downloadImage
    }
  }
}
</script> 