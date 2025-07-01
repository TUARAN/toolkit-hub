<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-gray-600 dark:text-gray-400 text-sm">
          © 2025 代码矿工-工具集. All rights reserved.
        </div>
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
          <a 
            href="https://github.com/TUARAN/toolkit-hub" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <Github class="w-5 h-5" />
          </a>
          <span class="text-gray-600 dark:text-gray-400 text-sm">
            Made by 掘金安东尼
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { Github } from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: {
    Github
  }
}
</script> 