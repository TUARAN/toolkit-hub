# 部署指南

## Cloudflare Pages 部署

### 方法一：通过 Cloudflare Dashboard（推荐）

1. **登录 Cloudflare Dashboard**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 登录你的账户

2. **创建 Pages 项目**
   - 点击左侧菜单中的 "Pages"
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **连接 GitHub 仓库**
   - 选择 GitHub 作为 Git 提供商
   - 授权 Cloudflare 访问你的 GitHub 账户
   - 选择 `TUARAN/toolkit-hub` 仓库
   - 选择 `master` 分支

4. **配置构建设置**
   - **项目名称**: `toolkit-hub` (或你喜欢的名称)
   - **生产分支**: `master`
   - **框架预设**: `Vue.js`
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
   - **Node.js 版本**: `18` (或更高)

5. **配置环境变量**
   - 在 "Environment variables" 部分添加：
   - **变量名**: `VITE_TENOR_API_KEY`
   - **值**: `AIzaSyCwd7X3s7kWwwAujYxJ1DUtk726UE2SNcM`
   - **环境**: 选择 "Production" 和 "Preview"

6. **部署**
   - 点击 "Save and Deploy"
   - 等待构建完成

### 方法二：使用 Wrangler CLI

1. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **部署项目**
   ```bash
   wrangler pages deploy dist --project-name toolkit-hub
   ```

## 环境变量配置

### 生产环境变量

在 Cloudflare Pages 中设置以下环境变量：

| 变量名 | 值 | 说明 |
|--------|----|----|
| `VITE_TENOR_API_KEY` | `AIzaSyCwd7X3s7kWwwAujYxJ1DUtk726UE2SNcM` | Tenor GIF API 密钥 |

### 本地开发环境变量

创建 `.env` 文件：
```env
VITE_TENOR_API_KEY=AIzaSyCwd7X3s7kWwwAujYxJ1DUtk726UE2SNcM
```

## 自定义域名

部署完成后，你可以：

1. 在 Cloudflare Pages 项目设置中添加自定义域名
2. 配置 DNS 记录指向 Cloudflare Pages
3. 启用 HTTPS（Cloudflare 自动提供）

## 自动部署

每次推送到 `master` 分支时，Cloudflare Pages 会自动：
1. 检测代码变更
2. 触发新的构建
3. 部署到生产环境

## 故障排除

### 构建失败
- 检查 Node.js 版本是否为 18 或更高
- 确保所有依赖都已正确安装
- 查看构建日志中的错误信息

### API Key 问题
- 确保环境变量名称正确（`VITE_TENOR_API_KEY`）
- 检查 API Key 是否有效
- 确认环境变量已应用到正确的环境

### 部署后功能异常
- 清除浏览器缓存
- 检查浏览器控制台是否有错误
- 确认环境变量在部署后生效

## 性能优化

Cloudflare Pages 提供：
- 全球 CDN 加速
- 自动 HTTPS
- 边缘计算能力
- 自动缓存优化

## 监控和分析

- 在 Cloudflare Dashboard 中查看访问统计
- 监控构建状态和部署历史
- 设置自定义分析（可选） 