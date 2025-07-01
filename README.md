# 代码矿工-工具集

一个实用的开发工具集合，包含多种常用工具，提升开发效率。

## 🌐 在线访问

**🎉 项目已成功部署到 Cloudflare Pages！**

👉 **[立即体验](https://toolkit-hub.pages.dev/)** 👈

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-blue?style=for-the-badge&logo=cloudflare)](https://toolkit-hub.pages.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/TUARAN/toolkit-hub)

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

### ✅ 已部署到 Cloudflare Pages

项目已成功部署到 [https://toolkit-hub.pages.dev/](https://toolkit-hub.pages.dev/)

**部署特点：**
- 🚀 全球 CDN 加速
- 🔒 自动 HTTPS 加密
- 🔄 自动部署（每次推送代码自动更新）
- 💰 完全免费托管
- 🌍 全球访问优化

### 其他部署方式

#### GitHub Pages 部署

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

#### Cloudflare Pages 部署（详细步骤）

详细的 Cloudflare Pages 部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

#### Vercel 部署

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

GIF 搜索功能需要配置 Tenor API Key 才能正常工作。请按以下步骤配置：

1. **申请 API Key**：
   - 访问 [Tenor 开发者控制台](https://tenor.com/developer/dashboard)
   - 登录或注册 Google 账户
   - 创建新项目
   - 获取 API Key（免费，每天有请求限制）

2. **配置环境变量**：
   ```bash
   # 复制环境变量示例文件
   cp env.example .env
   
   # 编辑 .env 文件，将 your_tenor_api_key_here 替换为你的实际 API Key
   VITE_TENOR_API_KEY=你的实际API密钥
   ```

3. **重启开发服务器**：
   ```bash
   npm run dev
   ```

**注意事项**：
- API Key 是免费的，但每天有请求次数限制
- 如果没有配置 API Key，GIF 搜索功能将显示配置提示，无法进行真实搜索
- 请勿将 `.env` 文件提交到版本控制系统（已添加到 .gitignore）
- 生产环境部署时，需要在部署平台设置相应的环境变量

**常见问题**：
- 如果搜索时提示 "API Key 无效"，请检查 API Key 是否正确
- 如果提示 "API 请求次数超限"，请等待一段时间后重试
- 如果搜索无结果，请尝试使用其他关键词

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📊 项目状态

[![GitHub stars](https://img.shields.io/github/stars/TUARAN/toolkit-hub?style=social)](https://github.com/TUARAN/toolkit-hub)
[![GitHub forks](https://img.shields.io/github/forks/TUARAN/toolkit-hub?style=social)](https://github.com/TUARAN/toolkit-hub)
[![GitHub issues](https://img.shields.io/github/issues/TUARAN/toolkit-hub)](https://github.com/TUARAN/toolkit-hub/issues)
[![GitHub license](https://img.shields.io/github/license/TUARAN/toolkit-hub)](https://github.com/TUARAN/toolkit-hub/blob/master/LICENSE)

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Lucide](https://lucide.dev/) - 精美的图标库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

⭐ 如果这个项目对你有帮助，请给它一个星标！ 