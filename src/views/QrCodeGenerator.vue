<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">二维码生成器</h1>
      <p class="text-gray-600 dark:text-gray-400">输入任意文本，生成二维码</p>
    </div>

    <div class="card p-6">
      <!-- Input Section -->
      <div class="mb-8">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          输入内容
        </label>
        <textarea
          v-model="inputText"
          placeholder="请输入要生成二维码的文本内容..."
          rows="4"
          class="input-field resize-none"
          @input="generateQR"
        ></textarea>
      </div>

      <!-- QR Code Options -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">二维码设置</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              尺寸 ({{ size }}px)
            </label>
            <input
              v-model="size"
              type="range"
              min="128"
              max="512"
              step="32"
              class="w-full"
              @input="generateQR"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              容错级别
            </label>
            <select v-model="errorCorrectionLevel" class="input-field" @change="generateQR">
              <option value="L">低 (7%)</option>
              <option value="M">中 (15%)</option>
              <option value="Q">高 (25%)</option>
              <option value="H">最高 (30%)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              前景色
            </label>
            <input
              v-model="foregroundColor"
              type="color"
              class="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
              @change="generateQR"
            />
          </div>
        </div>
      </div>

      <!-- QR Code Display -->
      <div v-if="qrCodeDataUrl" class="text-center mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">生成的二维码</h3>
        <div class="inline-block p-4 bg-white rounded-lg shadow-lg">
          <img
            :src="qrCodeDataUrl"
            alt="QR Code"
            class="max-w-full"
          />
        </div>
        <div class="mt-4">
          <button @click="downloadQR" class="btn-primary">
            <Download class="w-5 h-5 inline mr-2" />
            下载二维码
          </button>
        </div>
      </div>

      <!-- Preview Section -->
      <div v-if="inputText && !qrCodeDataUrl" class="text-center py-8">
        <div class="text-gray-500 dark:text-gray-400">
          <QrCode class="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>输入内容后将自动生成二维码</p>
        </div>
      </div>

      <!-- Tips -->
      <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">使用提示</h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• 支持文本、URL、电话号码、邮箱等</li>
          <li>• 容错级别越高，二维码越复杂但越不容易损坏</li>
          <li>• 建议使用深色前景色以获得最佳扫描效果</li>
          <li>• 下载的二维码为 PNG 格式，支持透明背景</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { QrCode, Download } from 'lucide-vue-next'
import QRCode from 'qrcode'

export default {
  name: 'QrCodeGenerator',
  components: {
    QrCode,
    Download
  },
  setup() {
    const inputText = ref('')
    const qrCodeDataUrl = ref('')
    const size = ref(256)
    const errorCorrectionLevel = ref('M')
    const foregroundColor = ref('#000000')

    const generateQR = async () => {
      if (!inputText.value.trim()) {
        qrCodeDataUrl.value = ''
        return
      }

      try {
        const options = {
          width: size.value,
          margin: 2,
          color: {
            dark: foregroundColor.value,
            light: '#FFFFFF'
          },
          errorCorrectionLevel: errorCorrectionLevel.value
        }

        qrCodeDataUrl.value = await QRCode.toDataURL(inputText.value, options)
      } catch (error) {
        console.error('生成二维码失败:', error)
      }
    }

    const downloadQR = () => {
      if (!qrCodeDataUrl.value) return

      const link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = qrCodeDataUrl.value
      link.click()
    }

    // 监听输入变化，自动生成二维码
    watch(inputText, () => {
      generateQR()
    })

    return {
      inputText,
      qrCodeDataUrl,
      size,
      errorCorrectionLevel,
      foregroundColor,
      generateQR,
      downloadQR
    }
  }
}
</script> 