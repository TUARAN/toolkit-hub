# 代码矿工-工具集

一个实用的开发工具集合，包含多种常用工具，提升开发效率。

## 🚀 功能特性

- **GIF 搜索下载**: 输入关键字搜索并下载 GIF 动图
- **图片压缩**: 上传图片，自动压缩并显示压缩前后对比
- **二维码生成**: 输入任意文本，生成二维码
- **JSON 格式化**: 输入 JSON 文本，美化格式并高亮
- **Base64 编解码**: 支持文本和图片的 Base64 编码与解码
- **深色/浅色模式**: 支持主题切换
- **响应式设计**: 完美适配 PC 和移动端
- **纯前端实现**: 无需后端，所有功能基于前端 JS 实现

## 🛠️ 技术栈

- **前端框架**: Vue 3 + Composition API
- **构建工具**: Vite
- **路由**: Vue Router 4
- **样式**: TailwindCSS
- **图标**: Lucide Vue Next
- **二维码**: qrcode
- **GIF 搜索**: Tenor API

## 📦 安装和运行

### 本地开发

```bash
# 克隆项目
git clone https://github.com/TUARAN/toolkit-hub.git
cd toolkit-hub

# 安装依赖
npm install

# 配置环境变量（可选）
cp env.example .env
# 编辑 .env 文件，填入你的 Tenor API Key

# 启动开发服务器
npm run dev
```

### 构建生产版本

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 🌐 部署

### GitHub Pages 部署

1. 在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支作为源。

### Cloudflare Pages 部署

1. 将代码推送到 GitHub 仓库
2. 在 Cloudflare Dashboard 中创建新的 Pages 项目
3. 连接 GitHub 仓库
4. 设置构建配置：
   - 构建命令: `npm run build`
   - 输出目录: `dist`
   - Node.js 版本: `18`

### Vercel 部署

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. Vercel 会自动检测 Vue 项目并配置构建设置

## 📁 项目结构

```
toolkit-hub/
├── public/                 # 静态资源
│   └── favicon.svg        # 网站图标
├── src/
│   ├── components/        # 通用组件
│   │   ├── Navbar.vue     # 导航栏
│   │   ├── Footer.vue     # 页脚
│   │   └── ToolCard.vue   # 工具卡片
│   ├── views/             # 页面组件
│   │   ├── Home.vue       # 首页
│   │   ├── GifDownloader.vue
│   │   ├── ImageCompressor.vue
│   │   ├── QrCodeGenerator.vue
│   │   ├── JsonFormatter.vue
│   │   └── Base64Converter.vue
│   ├── App.vue            # 主应用组件
│   ├── main.js            # 应用入口
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── vite.config.js         # Vite 配置
├── tailwind.config.js     # TailwindCSS 配置
└── README.md              # 项目说明
```

## 🎨 自定义和扩展

### 添加新工具

1. 在 `src/views/` 目录下创建新的工具页面组件
2. 在 `src/main.js` 中添加路由配置
3. 在 `src/views/Home.vue` 中的 `tools` 数组中添加新工具信息
4. 确保新工具组件遵循现有的设计模式

### 修改主题

项目使用 TailwindCSS 的深色模式，可以通过修改 `tailwind.config.js` 中的颜色配置来自定义主题。

### API 配置

#### Tenor GIF API

1. 访问 [Tenor 开发者控制台](https://tenor.com/developer/dashboard)
2. 创建新项目并获取 API Key
3. 复制 `env.example` 为 `.env`
4. 在 `.env` 文件中设置 `VITE_TENOR_API_KEY=your_api_key`

注意：如果没有配置 API Key，GIF 搜索功能将使用模拟数据。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Lucide](https://lucide.dev/) - 精美的图标库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

⭐ 如果这个项目对你有帮助，请给它一个星标！ 