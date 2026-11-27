# VPN Top (vpntop.click) - 中文机场评测与 Bing SEO 专业建站系统

> 专注于真实晚高峰表现的中文机场推荐、翻墙梯子测评与 IPLC/IEPL 高速节点导航门户。已接入 14 家高可用核验品牌、30 篇保姆级全平台配置教程与 100 篇原创技术长文。

[![SEO Audit](https://img.shields.io/badge/SEO_Audit-PASS-success.svg)](docs/final-audit.md)
[![Link Audit](https://img.shields.io/badge/Link_Audit-PASS-success.svg)](docs/final-audit.md)
[![Relative Paths](https://img.shields.io/badge/Path_Standard-100%25_Relative-blue.svg)](docs/final-audit.md)
[![Bing IndexNow](https://img.shields.io/badge/IndexNow-HTTP_202-brightgreen.svg)](scripts/indexnow.js)
[![Total Pages](https://img.shields.io/badge/HTML_Pages-169-orange.svg)](docs/final-audit.md)

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

## 二、网站内容与架构体系（共 169 个纯静态页面）

1. **核心枢纽**：
   - 首页 (`/index.html`)：13个结构化分区，Bing 核心词自然覆盖，高转化卡片与 1-14 精确排名表格。
   - 横向对比工具 (`/compare/index.html`)：支持 14 家品牌多维度自由并排比对。
   - 4大维度排行榜 (`/ranking/overall/`, `/ranking/value/`, `/ranking/budget/`, `/ranking/stable/`)。
   - 6大使用场景推荐 (`/recommend/budget/`, `/premium/`, `/beginner/`, `/stable/`, `/ai/`, `/streaming/`)。
2. **14 家品牌独立评测** (`/review/[slug]/`)：
   - 包含一句话结论、真实套餐价格表、节点线路数据、优缺点剖析、购买注意事项与 FAQ。
3. **30 篇保姆级全平台配置教程** (`/guides/` 与 `/guides/[slug]/`)：
   - 覆盖 Windows、Android、iOS、macOS、Sing-box、Clash Meta、Surge、Loon、小火箭、软路由 (OpenWrt/梅林/Docker)、电视盒子 (Apple TV/Android TV)、游戏主机加速 (PS5/Switch/Steam Deck)、开发环境 (Git/WSL2/SwitchyOmega) 等。
4. **100 篇深度原创技术博文** (`/blog/` 与 `/blog/[slug]/`)：
   - 涵盖 7 大核心主题知识库：选型避坑、底层专线、协议横评、性能调优、AI 解锁、流媒体、安全隐私。
5. **知识词典与信任背书** (`/glossary/[slug]/`, `/about/`, `/contact/`, `/editorial-policy/`, `/privacy-policy/`, `/disclaimer/`)。

---

## 三、技术架构特色

1. **纯 HTML5 + 原生 CSS**：放弃任何冗长重型的构建器与 JS 组件库，首屏毫秒级加载。
2. **100% 严格标准相对路径**：所有 CSS、JS 及页面超链接均使用相对路径（`css/style.css`、`../../index.html` 等），支持本地离线直接双击（`file://` 协议）正常浏览。
3. **结构化机场数据库**：在 `data/airports.js` 与 `data/airports.json` 中统一维护 14 家机场套餐、线路、协议、优惠码与核验状态。
4. **自动化 Bing SEO 赋能**：
   - 自动生成 `sitemap.xml`（168个核心索引页面）与 `robots.txt`。
   - 集成 `IndexNow` 实时推送脚本 (`scripts/indexnow.js`)。
   - 全页面标准 Canonical 规范地址与 Schema.org 结构化标记。

---

## 四、常用命令与开发工作流

### 1. 全站重新构建
```bash
npm run build
```
一键生成全站 169 个纯 HTML 页面、`sitemap.xml`、`robots.txt` 与 IndexNow 校验文件。

### 2. 自动化质量与 SEO 验收测试
```bash
npm test
```
自动运行三大审计脚本（`audit-seo.js`, `check-links.js`, `validate-content.js`），确保 169 个页面 0 死链、0 模板变量残留、100% 相对路径。

### 3. 向 Bing 提交 IndexNow 实时推送
```bash
npm run indexnow
```
