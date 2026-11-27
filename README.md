# VPN Top (vpntop.click) - 中文机场评测与 Bing SEO 专业建站系统

> 专注于真实晚高峰表现的中文机场推荐、翻墙梯子测评与 IPLC/IEPL 高速节点导航门户。

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

---

## 二、技术架构特色

1. **纯 HTML5 + 原生 CSS**：放弃任何冗长重型的构建器与 JS 组件库，实现毫秒级首屏极速加载。
2. **100% 严格标准相对路径**：所有 CSS、JS 及页面超链接均使用相对路径（`css/style.css`、`../../index.html` 等），支持本地离线直接双击（`file://` 协议）正常浏览，杜绝因域名变更导致的资源加载失败。
3. **结构化机场数据库**：在 `data/airports.js` 与 `data/airports.json` 中统一维护机场套餐、线路、协议与核验状态，多端复用。
4. **全套 Bing SEO 技术系统**：
   - 自动生成 `sitemap.xml` 与 `robots.txt`
   - 集成 `IndexNow` 实时推送脚本（支持 API Key 与验证文件）
   - 全页面标准 Canonical 绝对规范地址与 Schema.org 结构化标记
   - 包含完整的 SEO 与死链自动化回归测试脚本 (`npm test`)

---

## 三、目录体系结构

```text
vpntop.click/
├── index.html                   # 网站首页 (13大功能分区，主攻关键词落地页)
├── 404.html                     # 友好404错误提示页
├── sitemap.xml                  # 自动生成的标准XML网站地图
├── robots.txt                   # 搜索引擎抓取控制文件
├── f23cb41920784260a48b5e98586909cb.txt # IndexNow 密钥验证文件
├── css/
│   └── style.css                # 原生现代科技资讯媒体风格样式表 (纯CSS)
├── js/
│   ├── main.js                  # 响应式折叠菜单与交互脚本 (纯原生JS)
│   └── compare.js               # 机场横向多维度动态对比引擎
├── data/
│   ├── airports.js              # 结构化机场统一数据库
│   └── airports.json            # JSON 格式备用数据源
├── ranking/                     # 多维度排行榜系统
│   ├── overall/index.html       # 2026综合实力总榜
│   ├── value/index.html         # 高性价比排行榜 (每GB单价测算)
│   ├── budget/index.html        # 平价低预算排行榜
│   └── stable/index.html        # 晚高峰稳定性排行榜
├── recommend/                   # 场景专题推荐系统
│   ├── budget/index.html        # 低预算学生党专题
│   ├── premium/index.html       # 高端IPLC专线专题
│   ├── beginner/index.html      # 新手入门零门槛专题
│   ├── stable/index.html        # 高质量稳定节点专题
│   ├── ai/index.html            # ChatGPT/Claude 原生节点专题
│   └── streaming/index.html     # 4K流媒体解锁专题
├── review/                      # 独立机场深度评测
│   ├── wgetcloud/index.html     # WgetCloud 评测
│   ├── kuromi/index.html        # Kuromi 评测
│   ├── tag/index.html           # TAG VPN 评测
│   ├── flyingbird/index.html    # FlyingBird 评测
│   └── duang/index.html         # DuangCloud 评测
├── compare/                     # 机场横向对比工具
│   └── index.html
├── guides/                      # 客户端新手配置教程中心
│   ├── windows/index.html       # Windows (Clash Verge Rev) 教程
│   ├── android/index.html       # Android (Clash Meta/v2rayNG) 教程
│   ├── ios/index.html           # iOS (Shadowrocket小火箭) 教程
│   ├── macos/index.html         # macOS (Clash Verge/Surge) 教程
│   └── clash-meta/index.html    # Clash Meta 进阶分流规则配置
├── blog/                        # 行业深度博文
│   ├── how-to-choose-airport/index.html  # 新手如何挑选靠谱机场
│   ├── iepl-vs-iplc/index.html           # IEPL与IPLC专线深度对比
│   ├── protocol-comparison/index.html    # 主流翻墙协议大横评
│   ├── airport-speedtest-myths/index.html# 破解机场测速图迷信
│   └── airport-security-privacy/index.html# 机场安全与隐私防范
├── glossary/                    # 专业术语百科词典
│   ├── iplc/index.html          # IPLC 专线百科
│   ├── iepl/index.html          # IEPL 专线百科
│   ├── clash/index.html         # Clash 规则分流百科
│   ├── v2ray/index.html         # V2Ray 框架百科
│   └── shadowsocks/index.html   # Shadowsocks 协议百科
├── about/index.html             # 关于我们
├── contact/index.html           # 联系编辑部
├── editorial-policy/index.html  # 客观评测与编辑政策
├── privacy-policy/index.html    # 隐私政策
├── disclaimer/index.html        # 合规免责声明
├── docs/                        # 项目交付与 SEO 文档
│   ├── keyword-map.csv          # Bing 主攻与长尾关键词意图映射表
│   ├── final-audit.md           # 全站自动化验收报告
│   ├── bing-webmaster-tools.md  # 微软必应站长平台操作指南
│   └── deployment-guide.md      # Cloudflare Pages 与 GitHub 部署手册
└── scripts/                     # 自动化生成与 QA 测试脚本
    ├── template.js              # 纯静态页面基础骨架模版
    ├── build-all.js             # 站点全量构建流水线
    ├── indexnow.js              # IndexNow 实时推送工具
    ├── audit-seo.js             # SEO 元数据检查脚本
    ├── check-links.js           # 相对路径与内链死链检查脚本
    └── validate-content.js      # 内容与变量完整性检查脚本
```

---

## 四、常用命令与开发工作流

### 1. 全站重新构建
```bash
npm run build
```
执行后将重新计算数据源，更新所有 38 个纯 HTML 页面、`sitemap.xml` 及 `robots.txt`。

### 2. 自动化质量与 SEO 验收测试
```bash
npm test
```
自动运行三大审计脚本：
- `audit-seo.js`：检查全部页面的 Title、Description、H1、Canonical 与 Schema 结构化数据
- `check-links.js`：验证所有站内相对跳转与静态资产路径，保证 0 死链与 0 根绝对路径违规
- `validate-content.js`：校验页面内容饱满度、排查未替换变量

### 3. 向 Bing 提交 IndexNow 实时推送
```bash
npm run indexnow
```

---

## 五、部署至 Cloudflare Pages

本项目为全纯静态 HTML 结构，可直接部署在 Cloudflare Pages 上：
1. 在 Cloudflare 控制台连接 GitHub 仓库 `tangtang856/vpntop.click`。
2. 构建预设选择 **None**，构建输出目录设置为 **`/`**。
3. 绑定域名 `vpntop.click`，即可在全球数十个边缘数据中心实现秒级分发。
详细步骤请参阅 [docs/deployment-guide.md](docs/deployment-guide.md)。
