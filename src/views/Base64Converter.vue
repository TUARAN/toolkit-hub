<template>
  <div class="max-w-6xl mx-auto animate-fade-in">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Base64 编解码工具</h1>
      <p class="text-gray-600 dark:text-gray-400">支持文本和图片的 Base64 编码与解码</p>
    </div>

    <!-- Mode Toggle -->
    <div class="flex justify-center mb-8">
      <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          @click="mode = 'text'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
            mode === 'text'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          文本模式
        </button>
        <button
          @click="mode = 'image'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
            mode === 'image'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          图片模式
        </button>
      </div>
    </div>

    <!-- Text Mode -->
    <div v-if="mode === 'text'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Encode Section -->
      <div class="card p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">编码 (文本 → Base64)</h3>
          <button @click="encodeText" class="btn-primary text-sm">
            编码
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              输入文本
            </label>
            <textarea
              v-model="textInput"
              placeholder="请输入要编码的文本..."
              rows="6"
              class="input-field resize-none"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Base64 结果
            </label>
            <textarea
              v-model="encodedText"
              placeholder="编码结果将显示在这里..."
              rows="6"
              class="input-field resize-none font-mono text-sm"
              readonly
            ></textarea>
          </div>
          <div class="flex space-x-2">
            <button @click="copyToClipboard(encodedText)" class="btn-secondary text-sm">
              复制结果
            </button>
            <button @click="clearTextInput" class="btn-secondary text-sm">
              清空
            </button>
          </div>
        </div>
      </div>

      <!-- Decode Section -->
      <div class="card p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">解码 (Base64 → 文本)</h3>
          <button @click="decodeText" class="btn-primary text-sm">
            解码
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              输入 Base64
            </label>
            <textarea
              v-model="base64Input"
              placeholder="请输入要解码的 Base64 字符串..."
              rows="6"
              class="input-field resize-none font-mono text-sm"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              解码结果
            </label>
            <textarea
              v-model="decodedText"
              placeholder="解码结果将显示在这里..."
              rows="6"
              class="input-field resize-none"
              readonly
            ></textarea>
          </div>
          <div class="flex space-x-2">
            <button @click="copyToClipboard(decodedText)" class="btn-secondary text-sm">
              复制结果
            </button>
            <button @click="clearBase64Input" class="btn-secondary text-sm">
              清空
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Mode -->
    <div v-if="mode === 'image'" class="space-y-6">
      <!-- Image Upload -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">图片转 Base64</h3>
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <input
            ref="imageInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload"
          />
          <div v-if="!selectedImage" @click="$refs.imageInput.click()" class="cursor-pointer">
            <Upload class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600 dark:text-gray-400">点击选择图片或拖拽到此处</p>
            <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">支持 JPG、PNG、GIF、WebP 格式</p>
          </div>
          <div v-else class="text-center">
            <img :src="selectedImage" alt="Selected" class="max-w-xs mx-auto mb-4 rounded-lg" />
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ selectedFileName }}</p>
            <div class="flex justify-center space-x-2">
              <button @click="encodeImage" class="btn-primary">
                转换为 Base64
              </button>
              <button @click="clearImage" class="btn-secondary">
                重新选择
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Base64 Result -->
      <div v-if="imageBase64" class="card p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">图片 Base64 结果</h3>
          <button @click="copyToClipboard(imageBase64)" class="btn-secondary text-sm">
            复制 Base64
          </button>
        </div>
        <textarea
          v-model="imageBase64"
          rows="8"
          class="input-field resize-none font-mono text-xs"
          readonly
        ></textarea>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          长度: {{ imageBase64.length }} 字符
        </div>
      </div>

      <!-- Base64 to Image -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Base64 转图片</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              输入图片 Base64
            </label>
            <textarea
              v-model="imageBase64Input"
              placeholder="请输入图片的 Base64 字符串..."
              rows="6"
              class="input-field resize-none font-mono text-sm"
              @input="decodeImage"
            ></textarea>
          </div>
          <div v-if="decodedImage" class="text-center">
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-2">解码结果</h4>
            <img :src="decodedImage" alt="Decoded" class="max-w-xs mx-auto rounded-lg shadow-lg" />
            <div class="mt-2">
              <button @click="downloadDecodedImage" class="btn-primary">
                下载图片
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">使用提示</h4>
      <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
        <li>• 文本模式：支持任意文本的 Base64 编码和解码</li>
        <li>• 图片模式：支持图片转 Base64 和 Base64 转图片</li>
        <li>• Base64 编码会增加约 33% 的数据大小</li>
        <li>• 图片 Base64 可以直接用于 HTML img 标签的 src 属性</li>
        <li>• 支持复制结果到剪贴板</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Upload } from 'lucide-vue-next'

export default {
  name: 'Base64Converter',
  components: {
    Upload
  },
  setup() {
    const mode = ref('text')
    
    // Text mode
    const textInput = ref('')
    const encodedText = ref('')
    const base64Input = ref('')
    const decodedText = ref('')
    
    // Image mode
    const imageInput = ref(null)
    const selectedImage = ref('')
    const selectedFileName = ref('')
    const imageBase64 = ref('')
    const imageBase64Input = ref('')
    const decodedImage = ref('')

    const encodeText = () => {
      if (!textInput.value.trim()) return
      try {
        encodedText.value = btoa(unescape(encodeURIComponent(textInput.value)))
      } catch (error) {
        console.error('编码失败:', error)
      }
    }

    const decodeText = () => {
      if (!base64Input.value.trim()) return
      try {
        decodedText.value = decodeURIComponent(escape(atob(base64Input.value)))
      } catch (error) {
        console.error('解码失败:', error)
      }
    }

    const clearTextInput = () => {
      textInput.value = ''
      encodedText.value = ''
    }

    const clearBase64Input = () => {
      base64Input.value = ''
      decodedText.value = ''
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file && file.type.startsWith('image/')) {
        selectedFileName.value = file.name
        const reader = new FileReader()
        reader.onload = (e) => {
          selectedImage.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const encodeImage = () => {
      if (!selectedImage.value) return
      imageBase64.value = selectedImage.value
    }

    const clearImage = () => {
      selectedImage.value = ''
      selectedFileName.value = ''
      imageBase64.value = ''
      if (imageInput.value) {
        imageInput.value.value = ''
      }
    }

    const decodeImage = () => {
      if (!imageBase64Input.value.trim()) {
        decodedImage.value = ''
        return
      }
      
      try {
        // 检查是否是有效的 Base64 图片
        if (imageBase64Input.value.startsWith('data:image/')) {
          decodedImage.value = imageBase64Input.value
        } else {
          // 尝试添加 data URL 前缀
          decodedImage.value = `data:image/png;base64,${imageBase64Input.value}`
        }
      } catch (error) {
        console.error('图片解码失败:', error)
        decodedImage.value = ''
      }
    }

    const downloadDecodedImage = () => {
      if (!decodedImage.value) return
      
      const link = document.createElement('a')
      link.download = 'decoded-image.png'
      link.href = decodedImage.value
      link.click()
    }

    const copyToClipboard = async (text) => {
      if (!text) return
      
      try {
        await navigator.clipboard.writeText(text)
        // 可以添加一个临时的成功提示
      } catch (error) {
        console.error('复制失败:', error)
      }
    }

    return {
      mode,
      textInput,
      encodedText,
      base64Input,
      decodedText,
      imageInput,
      selectedImage,
      selectedFileName,
      imageBase64,
      imageBase64Input,
      decodedImage,
      encodeText,
      decodeText,
      clearTextInput,
      clearBase64Input,
      handleImageUpload,
      encodeImage,
      clearImage,
      decodeImage,
      downloadDecodedImage,
      copyToClipboard
    }
  }
}
</script> 