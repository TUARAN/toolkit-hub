<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Wrench class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">代码矿工-工具集</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            active-class="text-primary-600 dark:text-primary-400"
          >
            主页
          </router-link>
          <a 
            href="https://github.com/TUARAN/toolkit-hub" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            GitHub
          </a>
        </div>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <Moon v-else class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Wrench, Sun, Moon } from 'lucide-vue-next'

export default {
  name: 'Navbar',
  components: {
    Wrench,
    Sun,
    Moon
  },
  setup() {
    const isDark = ref(false)

    const toggleTheme = () => {
      isDark.value = !isDark.value
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }

    onMounted(() => {
      const theme = localStorage.getItem('theme')
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
      }
    })

    return {
      isDark,
      toggleTheme
    }
  }
}
</script> 