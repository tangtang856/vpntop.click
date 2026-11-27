# VPN Top (vpntop.click) - 中文机场评测与 Bing SEO 专业建站系统 (VitePress 2.0版)

> 专注于真实晚高峰表现的中文机场推荐、翻墙梯子测评与 IPLC/IEPL 高速节点导航门户。基于 **VitePress (Vue 3 + Vite)** 构建，彻底消除冗余模板代码，实现组件化极速静态生成与优雅阅读体验。

[![Build Status](https://img.shields.io/badge/VitePress-v1.6-brightgreen.svg)](https://vitepress.dev/)
[![SEO Sitemap](https://img.shields.io/badge/Sitemap-170_URLs-blue.svg)](https://vpntop.click/sitemap.xml)
[![Bing IndexNow](https://img.shields.io/badge/IndexNow-HTTP_202-brightgreen.svg)](scripts/indexnow.cjs)

---

## 一、项目核心参数

- **Bing 主攻关键词**：
  `机场推荐` `机场节点` `性价比机场` `梯子推荐` `vpn` `vpn机场` `vpn节点` `vpn推荐`
- **正式上线域名**：`https://vpntop.click`
- **GitHub 远程仓库**：`https://github.com/tangtang856/vpntop.click`
- **收录核心品牌（共14家，严格按指定排名呈现）**：
  1. 微风网络 Breezenet (¥8/月，200GB，优惠码：weifeng90)
  2. 暮光网络 (¥20/月，120GB)
  3. 飞猫云 (¥7/月年折，150GB，优惠码：flycat888)
  4. 无忧 (¥19/月，100GB，优惠码：wuyou666)
  5. 灵猫 (¥25/月，150GB)
  6. 闪跃 FlashLeap (¥24/月，150GB，优惠码：shanyue)
  7. 萤火虫（Firefly） (¥8/月年折，60GB，优惠码：firefly)
  8. 跨界 (¥20/月，120GB)
  9. 隐形人 (¥24/月，144GB，优惠码：yxr888)
  10. 飞V (¥4.9/月，100GB / 不限时29元200GB)
  11. 梯子云 LadderCloud (¥25/月，125GB)
  12. 浪网 WaveNet (¥30/月，150GB)
  13. 灵动云 (¥20/月，100GB)
  14. 全球云 (¥20/月，120GB，优惠码：tt88)

---

## 二、VitePress 架构升级亮点（彻底解决模板重复）

1. **纯粹 Markdown 内容驱动**：
   - 彻底废弃成百上千行机械拼接的 HTML 字符串，全站 100 篇博文与 30 篇教程全部采用结构化标准 Markdown (`.md`) 存储。
   - 使用 VitePress 原生语法提示框（`::: tip`、`::: info`、`::: warning`、`::: details` 折叠菜单），阅读排版干净优雅。
2. **Vue 3 组件化去重**：
   - `<AirportTable />`：统一渲染 1-14 家机场排行表格，带一键复制优惠码与直接直达官网功能。
   - `<AirportCompare />`：支持自由勾选 2-4 家机场进行多维度参数实时并排对照。
   - `<AirportCard id="..." />`：高转化卡片组件，直接按品牌 ID 读取核心数据库。
   - `<AffButton id="..." />`：专属 AFF 推广直达按钮组件。
3. **开箱即用的极速本地搜索**：
   - 内置 VitePress Local Search，无需外部搜索引擎即可实时对全站 170 篇页面进行毫秒级模糊检索。
4. **全自动 SEO 与 Sitemap 生成**：
   - 构建流水线自动生成符合标准协议的 `sitemap.xml`（收录 170 个独立页面）与 `robots.txt`。
   - 集成 Bing IndexNow 实时推送机制 (`scripts/indexnow.cjs`)。

---

## 三、常用命令

### 1. 本地开发与实时预览
```bash
npm run dev
```
启动 VitePress 本地极速开发服务器，支持热模块替换 (HMR)。

### 2. 静态生产构建 (SSG)
```bash
npm run build
```
输出纯静态 HTML/CSS/JS 文件至 `docs/.vitepress/dist`，零服务端依赖。

### 3. 本地预览生产构建产物
```bash
npm run preview
```

### 4. 自动化回归测试
```bash
npm test
```
验证生产构建产物、Sitemap 完整度、核心页面与 IndexNow 密钥。

### 5. 向 Bing 提交 IndexNow 实时收录推送
```bash
npm run indexnow
```
