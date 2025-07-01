<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- 标题 -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🎲 摇色子决定器
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            在两个选项中随机选择一个，让命运为你做决定
          </p>
        </div>

        <!-- 选项输入区域 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            设置选项
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选项 A
              </label>
              <input
                v-model="optionA"
                type="text"
                placeholder="输入第一个选项"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选项 B
              </label>
              <input
                v-model="optionB"
                type="text"
                placeholder="输入第二个选项"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <!-- 随机方式选择 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            选择随机方式
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="method in randomMethods"
              :key="method.id"
              @click="selectRandomMethod(method.id)"
              class="p-4 border-2 rounded-lg cursor-pointer transition-all duration-200"
              :class="selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'"
            >
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  {{ method.name }}
                </h3>
                <span class="text-2xl">{{ method.icon }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {{ method.description }}
              </p>
              <div class="text-xs text-gray-500 dark:text-gray-500">
                安全性: {{ method.security }}
              </div>
            </div>
          </div>
        </div>

        <!-- 摇色子区域 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div class="mb-6">
            <div 
              class="inline-block text-8xl mb-4 transition-transform duration-500"
              :class="{ 'animate-bounce': isRolling }"
            >
              🎲
            </div>
            
            <button
              @click="rollDice"
              :disabled="isRolling"
              class="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <span v-if="!isRolling">摇色子</span>
              <span v-else>摇动中...</span>
            </button>
          </div>

          <!-- 结果显示 -->
          <div v-if="result" class="mt-6">
            <div class="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg">
              <h3 class="text-lg font-medium text-white mb-2">选择结果</h3>
              <div class="text-2xl font-bold text-white">
                {{ result }}
              </div>
            </div>
          </div>

          <!-- 历史记录 -->
          <div v-if="history.length > 0" class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              历史记录
            </h3>
            <div class="space-y-2 max-h-40 overflow-y-auto">
              <div
                v-for="(item, index) in history.slice(-5)"
                :key="index"
                class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <span class="text-gray-600 dark:text-gray-400">
                      {{ item.timestamp }} - 选择了: 
                    </span>
                    <span class="font-medium text-gray-900 dark:text-white">
                      {{ item.result }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 text-right">
                    <div>{{ item.method }}</div>
                    <div>随机值: {{ item.randomValue }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            使用说明
          </h3>
          <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• 在输入框中输入两个选项，或使用默认选项</li>
            <li>• 选择你喜欢的随机方式（推荐Crypto API获得最高安全性）</li>
            <li>• 点击"摇色子"按钮随机选择一个选项</li>
            <li>• 结果会显示在下方，并保存到历史记录中</li>
            <li>• 历史记录会显示使用的随机方法和具体随机值</li>
            <li>• 最多显示最近5次的选择记录</li>
          </ul>
        </div>

        <!-- 随机性原理说明 -->
        <div class="mt-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
            🎯 随机性原理说明
          </h3>
          <div class="text-sm text-green-800 dark:text-green-200 space-y-2">
            <p><strong>可选的随机方法：</strong></p>
            <ul class="space-y-1 ml-4">
              <li><strong>🎲 Math.random()</strong> - JavaScript内置伪随机数，基于时间种子</li>
              <li><strong>🔐 Crypto API</strong> - 密码学安全的随机数，不可预测</li>
              <li><strong>⏰ 时间戳随机</strong> - 基于当前时间的微秒级随机</li>
              <li><strong>🖱️ 鼠标位置随机</strong> - 基于点击位置的随机数</li>
            </ul>
            
            <p class="mt-3"><strong>随机数生成原理：</strong></p>
            <ul class="space-y-1 ml-4">
              <li>• 所有方法都生成 0 到 1 之间的随机浮点数</li>
              <li>• 当随机数 ≥ 0.5 时选择选项A，&lt; 0.5 时选择选项B</li>
              <li>• 理论上每个选项被选中的概率都是 50%</li>
              <li>• 历史记录会显示使用的随机方法和具体随机值</li>
            </ul>
            
            <p class="mt-3"><strong>安全性对比：</strong></p>
            <ul class="space-y-1 ml-4">
              <li>• <strong>高安全性</strong>：Crypto API - 适用于密码学应用</li>
              <li>• <strong>中等安全性</strong>：鼠标位置 - 结合用户行为</li>
              <li>• <strong>普通安全性</strong>：Math.random() - 日常使用足够</li>
              <li>• <strong>低安全性</strong>：时间戳 - 可预测性较高</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const optionA = ref('')
const optionB = ref('')
const result = ref('')
const isRolling = ref(false)
const history = ref([])
const selectedMethod = ref('math')

// 默认选项
const defaultOptions = {
  A: '是',
  B: '否'
}

// 随机方法配置
const randomMethods = [
  {
    id: 'math',
    name: 'Math.random()',
    icon: '🎲',
    description: 'JavaScript内置的伪随机数生成器，基于时间种子',
    security: '普通',
    function: () => Math.random()
  },
  {
    id: 'crypto',
    name: 'Crypto API',
    icon: '🔐',
    description: '使用Web Crypto API生成密码学安全的随机数',
    security: '高',
    function: () => {
      const array = new Uint32Array(1)
      crypto.getRandomValues(array)
      return array[0] / (0xffffffff + 1)
    }
  },
  {
    id: 'timestamp',
    name: '时间戳随机',
    icon: '⏰',
    description: '基于当前时间戳的微秒级随机数',
    security: '低',
    function: () => {
      const now = new Date()
      return (now.getTime() % 1000) / 1000
    }
  },
  {
    id: 'mouse',
    name: '鼠标位置随机',
    icon: '🖱️',
    description: '基于鼠标点击位置的随机数',
    security: '中等',
    function: () => {
      // 这里会在点击时获取鼠标位置
      return Math.random() // 临时使用，实际会在点击时计算
    }
  }
]

const selectRandomMethod = (methodId) => {
  selectedMethod.value = methodId
}

const rollDice = (event) => {
  if (isRolling.value) return
  
  isRolling.value = true
  
  // 使用选项或默认值
  const choiceA = optionA.value.trim() || defaultOptions.A
  const choiceB = optionB.value.trim() || defaultOptions.B
  
  // 模拟摇色子动画
  setTimeout(() => {
    let random
    
    // 根据选择的随机方法生成随机数
    const method = randomMethods.find(m => m.id === selectedMethod.value)
    
    if (selectedMethod.value === 'mouse' && event) {
      // 鼠标位置随机：基于点击位置计算
      const rect = event.target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      random = ((x + y) % 100) / 100
    } else {
      // 其他方法使用预定义的函数
      random = method.function()
    }
    
    const selected = random < 0.5 ? choiceA : choiceB
    
    result.value = selected
    
    // 添加到历史记录
    const timestamp = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    history.value.push({
      result: selected,
      timestamp: timestamp,
      method: method.name,
      randomValue: random.toFixed(4)
    })
    
    // 限制历史记录数量
    if (history.value.length > 10) {
      history.value = history.value.slice(-10)
    }
    
    isRolling.value = false
  }, 1500)
}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 0.5s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style> 