# VPN Top (vpntop.click) - 中文机场评测与 Bing SEO 专业建站系统

> 专注于真实晚高峰表现的中文机场推荐、翻墙梯子测评与 IPLC/IEPL 高速节点导航门户。已接入 14 家高可用核验品牌与专属优惠通道。

[![SEO Audit](https://img.shields.io/badge/SEO_Audit-PASS-success.svg)](docs/final-audit.md)
[![Link Audit](https://img.shields.io/badge/Link_Audit-PASS-success.svg)](docs/final-audit.md)
[![Relative Paths](https://img.shields.io/badge/Path_Standard-100%25_Relative-blue.svg)](docs/final-audit.md)
[![Bing IndexNow](https://img.shields.io/badge/IndexNow-HTTP_202-brightgreen.svg)](scripts/indexnow.js)

---

## 一、项目核心参数

- **Bing 主攻关键词**：
  `机场推荐` `机场节点` `性价比机场` `梯子推荐` `vpn` `vpn机场` `vpn节点` `vpn推荐`
- **正式上线域名**：`https://vpntop.click`
- **GitHub 远程仓库**：`https://github.com/tangtang856/vpntop.click`
- **收录核心品牌（共14家）**：
  微风网络 Breezenet、暮光网络、飞猫云、无忧、灵猫、闪跃 FlashLeap、萤火虫（Firefly）、跨界、隐形人、飞V、梯子云 LadderCloud、浪网 WaveNet、灵动云、全球云。

---

## 二、技术架构特色

1. **纯 HTML5 + 原生 CSS**：放弃任何冗长重型的构建器与 JS 组件库，实现毫秒级首屏极速加载。
2. **100% 严格标准相对路径**：所有 CSS、JS 及页面超链接均使用相对路径（`css/style.css`、`../../index.html` 等），支持本地离线直接双击（`file://` 协议）正常浏览，杜绝因域名变更导致的资源加载失败。
3. **结构化机场数据库**：在 `data/airports.js` 与 `data/airports.json` 中统一维护 14 家机场套餐、线路、协议、优惠码与核验状态，多端复用。
4. **全套 Bing SEO 技术系统**：
   - 自动生成 `sitemap.xml`（46个核心索引页面）与 `robots.txt`
   - 集成 `IndexNow` 实时推送脚本（支持 API Key 与验证文件）
   - 全页面标准 Canonical 绝对规范地址与 Schema.org 结构化标记
   - 包含完整的 SEO 与死链自动化回归测试脚本 (`npm test`)

---

## 三、常用命令与开发工作流

### 1. 全站重新构建
```bash
npm run build
```
执行后将重新计算数据源，更新所有 47 个纯 HTML 页面、`sitemap.xml` 及 `robots.txt`。

### 2. 自动化质量与 SEO 验收测试
```bash
npm test
```
自动运行三大审计脚本：
- `audit-seo.js`：检查全部 47 个页面的 Title、Description、H1、Canonical 与 Schema 结构化数据
- `check-links.js`：验证所有站内相对跳转与静态资产路径，保证 0 死链与 0 根绝对路径违规
- `validate-content.js`：校验页面内容饱满度、排查未替换变量

### 3. 向 Bing 提交 IndexNow 实时推送
```bash
npm run indexnow
```
