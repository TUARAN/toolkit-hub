<template>
  <router-link :to="route" class="block">
    <div class="card p-6 h-full transform hover:scale-105 transition-transform duration-300">
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
          <component :is="icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500 dark:text-gray-400">{{ category }}</span>
        <ArrowRight class="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </router-link>
</template>

<script>
import { ArrowRight } from 'lucide-vue-next'

export default {
  name: 'ToolCard',
  components: {
    ArrowRight
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: Object,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: '工具'
    }
  }
}
</script> 