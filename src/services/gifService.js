// Tenor GIF API 服务
// 注意：实际使用时需要申请 Tenor API Key
// https://tenor.com/developer/dashboard

const TENOR_API_KEY = import.meta.env.VITE_TENOR_API_KEY || 'YOUR_TENOR_API_KEY' // 从环境变量获取 API Key
const TENOR_BASE_URL = 'https://tenor.googleapis.com/v2'

export class GifService {
  constructor(apiKey = TENOR_API_KEY) {
    this.apiKey = apiKey
  }

  async searchGifs(query, limit = 20) {
    if (!this.apiKey || this.apiKey === 'YOUR_TENOR_API_KEY') {
      // 如果没有 API Key，返回模拟数据
      return this.getMockGifs(query, limit)
    }

    try {
      const response = await fetch(
        `${TENOR_BASE_URL}/search?q=${encodeURIComponent(query)}&key=${this.apiKey}&limit=${limit}&media_filter=gif`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return this.formatGifResults(data.results)
    } catch (error) {
      console.error('GIF 搜索失败:', error)
      // 如果 API 调用失败，返回模拟数据
      return this.getMockGifs(query, limit)
    }
  }

  formatGifResults(results) {
    return results.map(gif => ({
      id: gif.id,
      title: gif.title || 'GIF',
      preview: gif.media_formats?.gif?.preview || gif.media_formats?.gif?.url,
      url: gif.media_formats?.gif?.url,
      size: this.formatFileSize(gif.media_formats?.gif?.size || 0),
      dimensions: `${gif.media_formats?.gif?.dims?.[0] || 0}x${gif.media_formats?.gif?.dims?.[1] || 0}`,
      created: gif.created,
      tags: gif.tags || []
    }))
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  getMockGifs(query, limit = 20) {
    // 模拟 GIF 搜索结果
    const mockGifs = []
    const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DDA0DD', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E9']
    
    for (let i = 0; i < Math.min(limit, 12); i++) {
      const color = colors[i % colors.length]
      const gifId = `mock_${query}_${i}`
      
      mockGifs.push({
        id: gifId,
        title: `${query} gif ${i + 1}`,
        preview: `https://via.placeholder.com/300x200/${color}/FFFFFF?text=${encodeURIComponent(query)}`,
        url: `https://via.placeholder.com/400x300/${color}/FFFFFF?text=${encodeURIComponent(query)}`,
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        dimensions: '400x300',
        created: Date.now(),
        tags: [query, 'gif', 'animation']
      })
    }
    
    return mockGifs
  }

  async getTrendingGifs(limit = 10) {
    if (!this.apiKey || this.apiKey === 'YOUR_TENOR_API_KEY') {
      return this.getMockTrendingGifs(limit)
    }

    try {
      const response = await fetch(
        `${TENOR_BASE_URL}/trending_terms?key=${this.apiKey}&limit=${limit}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.results
    } catch (error) {
      console.error('获取热门搜索失败:', error)
      return this.getMockTrendingGifs(limit)
    }
  }

  getMockTrendingGifs(limit = 10) {
    return [
      'cat', 'dog', 'funny', 'happy', 'sad', 'love', 'dance', 'food', 'anime', 'meme',
      'cute', 'cool', 'awesome', 'epic', 'fail', 'win', 'lol', 'omg', 'wow', 'yay'
    ].slice(0, limit)
  }
}

// 创建默认实例
export const gifService = new GifService() 