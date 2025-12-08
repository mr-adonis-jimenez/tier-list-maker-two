# AGENTS.md - Tier List Maker Two

## 项目概述
Tier List Maker Two 是一个基于 Next.js 的多语言 Tier List 制作工具，支持7种语言和Cloudflare部署。

## 修复的多语言适配问题

### 主要问题
1. **导入路径错误**: 组件中使用了不存在的 `@/lib/i18n/translations` 路径
2. **类型定义冲突**: 组件使用 `Locale` 类型，但翻译文件定义 `LanguageType`
3. **语言支持不一致**: 翻译文件支持7种语言，但语言切换器只支持3种
4. **路由结构问题**: 默认语言路径配置错误
5. **Sitemap配置错误**: 包含所有语言的路径，包括默认语言

### 修复内容
1. **统一类型定义**: 所有组件使用 `LanguageType` 类型
2. **修复导入路径**: 使用正确的 `@/lib/translations` 路径
3. **完善语言支持**: 语言切换器支持所有7种语言
4. **路由配置**: 
   - 默认语言 `en` → 根路径 `/`
   - 其他语言 → `/[lang]` 路径
5. **Sitemap优化**: 只为非默认语言生成语言路径
6. **Metadata配置**: 修复alternate URLs，确保SEO正确

## 核心命令

### 开发命令
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查
npm run format       # 代码格式化
```

### Cloudflare部署命令
```bash
npm run build:worker # 构建Cloudflare Worker
npm run preview      # 预览Cloudflare部署
npm run deploy       # 部署到Cloudflare
npm run upload       # 上传到Cloudflare
```

### 类型生成
```bash
npm run cf-typegen   # 生成Cloudflare类型定义
```

## 项目结构

### 路由结构
```
app/
├── (defautlang)/          # 默认语言路由 (英文)
│   ├── layout.tsx         # 默认语言布局
│   ├── page.tsx           # 主页
│   ├── about/             # 关于页面
│   ├── contact/           # 联系页面
│   ├── posts/             # 博客文章
│   ├── faq/               # 常见问题
│   ├── privacy/           # 隐私政策
│   ├── terms/             # 服务条款
│   └── api/               # API路由
└── (lang)/[lang]/         # 多语言路由
    ├── layout.tsx         # 多语言布局
    ├── page.tsx           # 主页
    └── [其他页面...]      # 其他多语言页面
```

### 多语言配置
```
lib/
├── translations/          # 翻译文件
│   ├── index.ts          # 翻译类型和函数
│   ├── en.ts             # 英文翻译
│   ├── zh.ts             # 中文翻译
│   ├── fr.ts             # 法文翻译
│   ├── es.ts             # 西班牙文翻译
│   ├── ru.ts             # 俄文翻译
│   ├── de.ts             # 德文翻译
│   └── ja.ts             # 日文翻译
└── constants.ts          # 语言常量配置
```

### 核心组件
```
components/
├── language-switcher.tsx  # 语言切换器
├── tier-list-maker.tsx    # 主Tier List组件
├── theme-provider.tsx     # 主题提供者
├── theme-toggle.tsx       # 主题切换
└── ui/                    # UI组件库
```

## 语言配置

### 支持的语言
- `en` - English (默认)
- `zh` - 中文
- `fr` - Français  
- `es` - Español
- `ru` - Русский
- `de` - Deutsch
- `ja` - 日本語

### 语言路由规则
- **默认语言** (`en`): 根路径 `/`
- **其他语言**: 路径 `/[lang]`
- **语言切换**: 自动处理路径转换

## 重要文件配置

### package.json 关键脚本
- `dev`: Next.js开发服务器
- `build`: Next.js生产构建
- `build:worker`: Cloudflare Worker构建
- `lint`: Biome代码检查
- `format`: Biome代码格式化

### 配置文件
- `biome.json`: 代码检查和格式化配置
- `next.config.ts`: Next.js配置
- `wrangler.jsonc`: Cloudflare Worker配置
- `tsconfig.json`: TypeScript配置
- `tailwind.config.*`: Tailwind CSS配置

## 开发规范

### 代码风格
- 使用Biome进行代码检查和格式化
- 2空格缩进
- TypeScript严格模式
- ESLint规则通过

### 导入规则
```typescript
// 正确的导入顺序
import { ... } from "next/...";
import { ... } from "@/lib/...";
import { ... } from "@/components/...";
import type { ... } from "@/lib/...";
```

### 多语言最佳实践
1. 使用 `LanguageType` 类型而不是 `Locale`
2. 导入路径使用 `@/lib/translations`
3. 语言切换器支持所有支持的语言
4. 默认语言对应根路径 `/`
5. SEO配置中正确设置alternate URLs

## 部署配置

### Cloudflare设置
- **Worker名称**: `tier-list-maker`
- **兼容性日期**: `2024-12-30`
- **R2存储**: `next-bucket` (增量缓存)
- **D1数据库**: `next-tier-list-maker-list` (标签缓存)
- **Durable Objects**: `DOQueueHandler` (队列处理)

### 环境变量
需要设置适当的环境变量以支持Cloudflare部署和Directus CMS集成。

## 故障排除

### 常见问题
1. **类型错误**: 确保使用 `LanguageType` 类型
2. **导入错误**: 使用 `@/lib/translations` 而不是 `@/lib/i18n/translations`
3. **路由问题**: 默认语言应该对应根路径 `/`
4. **语言切换不工作**: 检查 `supportedLocales` 配置

### 调试命令
```bash
# 检查类型错误
npm run lint

# 格式化代码
npm run format

# 构建检查
npm run build
```

## 贡献指南
1. 确保所有lint检查通过
2. 代码格式化正确
3. 添加新语言时更新相关配置文件
4. 测试语言切换功能
5. 验证SEO配置正确性