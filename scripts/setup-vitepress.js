import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import existing data
const airports = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/airports.json'), 'utf-8'));
const { allGuides } = require('./generate-guides-full.cjs');
const { allBlogs } = require('./blogs-data.cjs');

const DOCS_DIR = path.join(__dirname, '..', 'docs');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 1. Generate .vitepress/config.mts
function generateConfig() {
  console.log('[1/8] Generating .vitepress/config.mts...');

  // Group guides for sidebar
  const guideCategories = {};
  allGuides.forEach(g => {
    if (!guideCategories[g.category]) guideCategories[g.category] = [];
    guideCategories[g.category].push({
      text: g.title.split('：')[0].replace(/教程/g, '').trim() || g.title,
      link: `/guides/${g.slug}`
    });
  });

  const guideSidebarItems = Object.keys(guideCategories).map(cat => ({
    text: cat,
    collapsed: false,
    items: guideCategories[cat]
  }));

  // Group blogs for sidebar
  const blogCategories = {};
  allBlogs.forEach(b => {
    if (!blogCategories[b.category]) blogCategories[b.category] = [];
    blogCategories[b.category].push({
      text: b.title.split('：')[0].trim(),
      link: `/blog/${b.slug}`
    });
  });

  const blogSidebarItems = Object.keys(blogCategories).map(cat => ({
    text: `📁 ${cat} (${blogCategories[cat].length})`,
    collapsed: true,
    items: blogCategories[cat]
  }));

  // Review sidebar
  const reviewSidebarItems = airports.map(a => ({
    text: `${a.name} 评测`,
    link: `/review/${a.id}`
  }));

  const configContent = `import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'VPN Top',
  titleTemplate: ':title | VPN Top 机场评测网',
  description: '2026最新机场推荐与梯子评测指南 - 精选高性价比VPN机场节点，提供晚高峰稳定IPLC/IEPL专线实测、横向对比与配置教程。',
  lang: 'zh-CN',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://vpntop.click'
  },
  head: [
    ['meta', { name: 'keywords', content: '机场推荐, 机场节点, 性价比机场, 梯子推荐, vpn, vpn机场, vpn节点, vpn推荐' }],
    ['meta', { name: 'author', content: 'VPN Top 资深网络评测组' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],
    ['meta', { property: 'og:site_name', content: 'VPN Top' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['link', { rel: 'canonical', href: 'https://vpntop.click/' }]
  ],
  themeConfig: {
    siteTitle: 'VPN TOP 机场评测网',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '机场推荐',
        items: [
          { text: '🪙 低预算平价机场', link: '/recommend/budget' },
          { text: '🚀 高端专线机场', link: '/recommend/premium' },
          { text: '🛡️ 晚高峰稳定优先', link: '/recommend/stable' },
          { text: '🔰 新手入门推荐', link: '/recommend/beginner' },
          { text: '🤖 AI / ChatGPT 专线', link: '/recommend/ai' },
          { text: '🎬 4K 流媒体秒开', link: '/recommend/streaming' }
        ]
      },
      {
        text: '排行榜',
        items: [
          { text: '🏆 综合实力总榜', link: '/ranking/overall' },
          { text: '💰 高性价比排行榜', link: '/ranking/value' },
          { text: '📉 低预算平价榜', link: '/ranking/budget' },
          { text: '🔒 晚高峰稳定性榜', link: '/ranking/stable' }
        ]
      },
      { text: '品牌评测', link: '/review/' },
      { text: '横向对比', link: '/compare/' },
      { text: '使用教程', link: '/guides/' },
      { text: '博客专栏', link: '/blog/' }
    ],
    sidebar: {
      '/guides/': [
        {
          text: '📖 翻墙新手教程中心',
          items: [{ text: '教程总览与选型指南', link: '/guides/' }]
        },
        ...${JSON.stringify(guideSidebarItems, null, 2)}
      ],
      '/blog/': [
        {
          text: '📚 科学上网知识文库',
          items: [{ text: '100篇深度专栏全景', link: '/blog/' }]
        },
        ...${JSON.stringify(blogSidebarItems, null, 2)}
      ],
      '/ranking/': [
        {
          text: '📊 梯子评测多维排行榜',
          items: [
            { text: '排行榜导览', link: '/ranking/' },
            { text: '2026 综合实力排行榜', link: '/ranking/overall' },
            { text: '2026 高性价比排行榜', link: '/ranking/value' },
            { text: '2026 低预算平价榜', link: '/ranking/budget' },
            { text: '2026 晚高峰稳定性榜', link: '/ranking/stable' }
          ]
        }
      ],
      '/recommend/': [
        {
          text: '🎯 按场景推荐',
          items: [
            { text: '低预算平价机场', link: '/recommend/budget' },
            { text: '高端专线机场', link: '/recommend/premium' },
            { text: '晚高峰稳定优先', link: '/recommend/stable' },
            { text: '新手入门指南', link: '/recommend/beginner' },
            { text: 'AI / ChatGPT 专用节点', link: '/recommend/ai' },
            { text: '4K 流媒体解锁节点', link: '/recommend/streaming' }
          ]
        }
      ],
      '/review/': [
        {
          text: '🔍 14家核心品牌深度评测',
          items: [
            { text: '评测中心导览', link: '/review/' },
            ...${JSON.stringify(reviewSidebarItems, null, 2)}
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档与文章' },
              modal: {
                noResultsText: '未找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tangtang856/vpntop.click' }
    ],
    footer: {
      message: '专注客观公正的中文机场评测与科学上网技术科普 | Bing SEO 强化版',
      copyright: 'Copyright © 2026 VPN Top (vpntop.click) 保留所有权利。'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      label: '页面目录',
      level: [2, 3]
    }
  }
});
`;

  fs.writeFileSync(path.join(DOCS_DIR, '.vitepress', 'config.mts'), configContent, 'utf-8');
}

// 2. Generate Homepage (docs/index.md)
function generateHomepage() {
  console.log('[2/8] Generating docs/index.md...');
  const content = `---
layout: home

hero:
  name: "VPN Top"
  text: "2026 高性价比机场推荐与梯子评测导航"
  tagline: "专注真实晚高峰表现的中文机场评测与科学上网导航。汇聚14家高可用核验品牌、IPLC/IEPL高速专线节点监测，杜绝虚假跑分。"
  actions:
    - theme: brand
      text: 查看2026综合排行榜
      link: /ranking/overall
    - theme: alt
      text: 机场横向对比工具
      link: /compare/
    - theme: alt
      text: 新手翻墙教程
      link: /guides/

features:
  - title: 14款真实核验品牌
    details: 价格、流量、优惠码均来自实际核验，不虚标、不推广无保障小作坊。
    icon: 🛡️
  - title: 严格区分专线与直连
    details: 深度揭秘物理内网专线与公网中转区别，晚高峰告别丢包卡顿。
    icon: ⚡
  - title: 100篇深度原创专栏
    details: 覆盖协议对比、避坑防跑路、AI/ChatGPT解锁、流媒体解锁等硬核内容。
    icon: 📚
  - title: 30篇全平台保姆级教程
    details: Windows、Android、iOS、macOS、软路由及主机游戏加速一网打尽。
    icon: 🖥️
---

<div class="vp-doc" style="max-width: 1152px; margin: 0 auto; padding: 24px 20px;">

## 🏆 2026 核心核验机场综合实力榜单

以下 14 家机场品牌均经过长期晚高峰实测，支持各大主流翻墙客户端订阅导入：

<AirportTable />

---

## 🎯 快速选型：按您的实际需求匹配

<div class="hub-grid">
  <a href="/recommend/budget" class="hub-card">
    <div class="hub-title">🪙 低预算平价机场</div>
    <div class="hub-desc">适合学生党与轻度办公用户，月付 4.9 元起，提供充沛流量与备用保障。</div>
  </a>
  <a href="/recommend/premium" class="hub-card">
    <div class="hub-title">🚀 高端 IPLC 专线</div>
    <div class="hub-desc">国际企业内网专线骨干，敏感时期稳如磐石，晚高峰网络抖动极小。</div>
  </a>
  <a href="/recommend/stable" class="hub-card">
    <div class="hub-title">🛡️ 晚高峰抗封锁稳定优先</div>
    <div class="hub-desc">BGP 多线中继入口，智能容灾调度，晚8点至11点视频秒开不缓冲。</div>
  </a>
  <a href="/recommend/ai" class="hub-card">
    <div class="hub-title">🤖 AI / ChatGPT 专线</div>
    <div class="hub-desc">高纯净度原生落地 IP，全天候解锁 ChatGPT、Claude 3.5、Gemini，防降智防封号。</div>
  </a>
  <a href="/recommend/streaming" class="hub-card">
    <div class="hub-title">🎬 4K/8K 流媒体秒开</div>
    <div class="hub-desc">完整解锁 Netflix 非自制剧、Disney+、YouTube Premium 4K 与台湾动画疯。</div>
  </a>
  <a href="/recommend/beginner" class="hub-card">
    <div class="hub-title">🔰 新手入门零基础指南</div>
    <div class="hub-desc">一键导入客户端，告别复杂配置代码，配套多平台保姆级视频图文指引。</div>
  </a>
</div>

---

## ⚖️ 犹豫不决？使用横向对比工具

我们提供多品牌实时参数对照矩阵，支持同时并排对比起步资费、每GB单价、解锁能力与短板：

::: tip 实时对比选购
前往 **[机场横向对比工具](/compare/)**，自由勾选 2-4 家候选品牌，直接查看优缺点对照。
:::

---

## 📖 新手使用教程中心

为各主流平台提供清晰实操步骤，拒绝任何繁琐死记硬背：

- **Windows 电脑**：[Clash Verge Rev 配置教程](/guides/windows) · [Sing-box 极速上手](/guides/sing-box-windows)
- **Android 手机**：[Clash Meta 安卓指南](/guides/android) · [v2rayNG 分应用分流](/guides/v2rayng-advanced)
- **iPhone / iPad**：[Shadowrocket 小火箭配置图解](/guides/ios) · [Loon 规则优化](/guides/loon-ios)
- **Mac 电脑**：[Clash Verge macOS 增强模式](/guides/macos) · [Surge Mac 网关](/guides/surge-mac)
- **家庭软路由**：[OpenWrt OpenClash 部署](/guides/openwrt-clash) · [PassWall 分流配置](/guides/openwrt-passwall)
- **电视与主机**：[Apple TV 家庭影院](/guides/apple-tv) · [PS5 / Switch 联机加速](/guides/ps5-switch-gaming)

👉 **[查看全部 30 篇保姆级教程 &rarr;](/guides/)**

---

## 📚 100 篇深度技术博文精选

透视网络专线原理，避开营销虚标陷阱与安全风险：

- **选型与避坑**：[新手如何挑选靠谱机场？防跑路八条准则](/blog/how-to-choose-airport) · [买月付还是年付？](/blog/monthly-vs-annual-subscription)
- **专线与底层**：[IEPL 与 IPLC 专线深度对比](/blog/iepl-vs-iplc) · [为什么专线不会被墙？](/blog/physical-layer-isolation)
- **协议横评**：[SS / V2Ray / Trojan / Hysteria2 协议大横评](/blog/protocol-comparison) · [VLESS Reality 原理解析](/blog/vless-reality-deep-dive)
- **故障排查**：[晚高峰严重卡顿怎么办？五招解决拥堵](/blog/fix-evening-peak-lag) · [彻底杜绝 DNS 泄漏与投毒](/blog/resolve-dns-leak-poisoning)
- **AI与办公**：[ChatGPT 报 Access Denied 解决](/blog/chatgpt-ip-blocked-fix) · [Claude 3.5 防封号与住宅IP挑选](/blog/claude-account-ban-avoidance)

👉 **[查看全部 100 篇原创技术专栏 &rarr;](/blog/)**

---

## ❓ 常见问题解答 (FAQ)

::: details 什么是机场？它和传统 VPN 有什么区别？
“机场”是中文网络语境下对提供 Shadowsocks、VLESS、Trojan、Hysteria 等现代加密代理协议集群服务商的统称。相比传统单连接商业 VPN，机场拥有遍布全球的成百上千个高速节点，具备优秀的规则智能分流能力（访问国内网站直连、访问海外受限网站走加速），速度更快且不易被防火墙全面阻断。
:::

::: details 为什么建议新手优先买月付套餐？
机场属于虚拟网络服务，受上游线路调整与外部审查政策影响较大。坚持月付或季付可以最大限度控制资金风险，即使服务商出现故障或跑路，也能将个人财产损失降至最低。
:::

::: details 什么是 IPLC / IEPL 内网专线？
IPLC（国际私有租用线路）和 IEPL（国际以太网专线）是企业级跨境点对点点物理光缆内网。数据在深圳、上海等国内机房入口打包后，直接通过物理专线传输至香港、日本出口，全程不经过公网国际出口审查网关，因此敏感时期不掉线、晚高峰网络抖动极小。
:::

</div>
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'index.md'), content, 'utf-8');
}

// 3. Generate Compare Page (docs/compare/index.md)
function generateComparePage() {
  console.log('[3/8] Generating docs/compare/index.md...');
  ensureDir(path.join(DOCS_DIR, 'compare'));
  const content = `---
title: 机场横向对比工具
description: 2026年机场梯子横向参数对比工具。支持在 14 家品牌中自由勾选 2-4 家并排对照起步资费、每GB单价、专线架构、AI与流媒体解锁能力。
---

# 机场横向对比工具

自由勾选 2 到 4 家候选品牌，直接并排查看价格、流量配额、协议、AI 解锁与缺点短板：

<AirportCompare />

::: tip 对比小贴士
- **每 GB 估算单价**：反映套餐的基础性价比，但单价极低往往伴随超售，需结合骨干线路架构综合权衡。
- **专线与中转**：追求晚高峰稳定性首选 **IEPL / IPLC 专线**；日常轻量查资料可选择高性价比中转。
- **AI 解锁**：重度依赖 ChatGPT Plus 或 Claude 3.5 的用户，务必关注是否提供**原生住宅 IP 节点**。
:::
`;
  fs.writeFileSync(path.join(DOCS_DIR, 'compare', 'index.md'), content, 'utf-8');
}

// 4. Generate Ranking Pages (docs/ranking/*.md)
function generateRankings() {
  console.log('[4/8] Generating docs/ranking/*.md...');
  ensureDir(path.join(DOCS_DIR, 'ranking'));

  // ranking/index.md
  fs.writeFileSync(path.join(DOCS_DIR, 'ranking', 'index.md'), `---
title: 2026 翻墙机场与梯子多维排行榜
description: 汇聚综合实力榜、高性价比榜、低预算平价榜与晚高峰稳定性榜，多维度真实数据呈现。
---

# 2026 翻墙梯子评测多维排行榜

根据真实晚高峰实测数据与公开核验资料，我们建立了四个不同视角的排行榜单：

- 🏆 **[2026 优质VPN机场综合实力总榜](/ranking/overall)**：综合考量线路质量、节点覆盖、性价比与服务稳定性。
- 💰 **[2026 高性价比机场排行榜](/ranking/value)**：深度核算每 GB 流量单价与可用流量。
- 📉 **[2026 低预算便宜机场榜](/ranking/budget)**：月付 10 元以下高性价比平价梯子精选。
- 🔒 **[2026 晚高峰稳定性排行榜](/ranking/stable)**：晚 8 点至 11 点抗封锁与零卡顿专线榜。

<AirportTable />
`, 'utf-8');

  // ranking/overall.md
  fs.writeFileSync(path.join(DOCS_DIR, 'ranking', 'overall.md'), `---
title: 2026 优质VPN机场综合实力排行榜
description: 2026年中文翻墙机场与VPN梯子综合实力评测排行榜。全站收录 14 家品牌，严格按实测与核验数据排序。
---

# 2026 优质VPN机场综合实力排行榜

本榜单综合了骨干传输线路（专线/中转）、晚高峰网络抗封锁表现、协议前沿性、AI/流媒体解锁能力以及售后响应：

<AirportTable />

::: tip 排行榜说明
全站 14 家品牌排名严格依据实际核验数据排列。点击表格中的品牌名称可查看详细独立评测长文，点击“直达官网”可通过专属通道直达服务商后台。
:::
`, 'utf-8');

  // ranking/value.md
  fs.writeFileSync(path.join(DOCS_DIR, 'ranking', 'value.md'), `---
title: 2026 高性价比机场排行榜
description: 2026高性价比机场梯子排行。按真实可用流量与套餐月费自动折算每GB单价，帮您花最少的钱买到最充沛的专线流量。
---

# 2026 高性价比机场排行榜

根据每 GB 估算单价从低到高排列的高性价比梯子精选：

<AirportCard id="breezenet" />
<AirportCard id="feiv" />
<AirportCard id="feimaoyun" />
<AirportCard id="firefly" />

::: info 性价比选购建议
- **微风网络 Breezenet**：月付 8 元提供 200GB 专线流量，每 GB 仅 0.04 元，堪称大流量性价比之王。
- **飞V**：月付 4.9 元起，同时提供 29 元 200GB 的不限时按量套餐，极适合轻度备用。
:::
`, 'utf-8');

  // ranking/budget.md
  fs.writeFileSync(path.join(DOCS_DIR, 'ranking', 'budget.md'), `---
title: 2026 低预算平价机场排行榜
description: 月付 5-20 元平价梯子精选。专为学生党、轻度查阅资料与寻找备用节点的用户量身打造。
---

# 2026 低预算便宜机场排行榜

月付 10 元左右的亲民平价梯子精选推荐：

<AirportCard id="feiv" />
<AirportCard id="breezenet" />
<AirportCard id="feimaoyun" />
<AirportCard id="firefly" />
`, 'utf-8');

  // ranking/stable.md
  fs.writeFileSync(path.join(DOCS_DIR, 'ranking', 'stable.md'), `---
title: 2026 晚高峰稳定优先机场排行榜
description: 针对晚 8 点至 11 点黄金用网高峰，精选真实 IPLC/IEPL 物理内网专线机场，敏感时期不掉线。
---

# 2026 晚高峰稳定优先机场排行榜

以下品牌均具备纯专线骨干网络，适合对网络卡顿零容忍的用户：

<AirportCard id="yinxingren" />
<AirportCard id="lingmao" />
<AirportCard id="flashleap" />
<AirportCard id="wuyou" />
`, 'utf-8');
}

// 5. Generate Recommend Pages (docs/recommend/*.md)
function generateRecommendations() {
  console.log('[5/8] Generating docs/recommend/*.md...');
  ensureDir(path.join(DOCS_DIR, 'recommend'));

  const recList = [
    { slug: 'budget', title: '低预算平价机场推荐', id: 'breezenet', desc: '适合追求极致性价比、月付10元左右的学生党与备用需求。' },
    { slug: 'premium', title: '高端专线机场推荐', id: 'lingmao', desc: '全物理内网专线架构，针对敏感时期与企业跨境协作保障。' },
    { slug: 'beginner', title: '新手入门梯子推荐', id: 'muguang', desc: '简单易用，支持一键客户端导入，客服响应迅速。' },
    { slug: 'stable', title: '晚高峰稳定机场推荐', id: 'yinxingren', desc: 'BGP多线入口容灾，晚8-11点网络抖动小于5%。' },
    { slug: 'ai', title: 'AI / ChatGPT 原生节点推荐', id: 'flashleap', desc: '原生住宅落地IP，全天候解锁ChatGPT、Claude 3.5防降智。' },
    { slug: 'streaming', title: '4K 流媒体解锁机场推荐', id: 'feimaoyun', desc: 'Netflix非自制剧全解锁、Disney+与YouTube 4K HDR秒开。' }
  ];

  recList.forEach(r => {
    const md = `---
title: ${r.title}
description: ${r.desc}
---

# ${r.title}

${r.desc}

## 精选主力推荐

<AirportCard id="${r.id}" />

## 场景选型要点

1. **带宽与流量匹配**：根据日常工作与娱乐合理预估月流量，避免盲目买过大流量套餐。
2. **协议与客户端选择**：优先选择支持 VLESS、Shadowsocks 或 Hysteria2 的先进协议，提升抗弱网能力。
3. **备用策略**：主力专线搭配一家低成本备用平价机场，保障业务 100% 永不断网。

<AirportTable />
`;
    fs.writeFileSync(path.join(DOCS_DIR, 'recommend', `${r.slug}.md`), md, 'utf-8');
  });
}

// 6. Generate Review Pages (docs/review/*.md)
function generateReviews() {
  console.log('[6/8] Generating docs/review/*.md...');
  ensureDir(path.join(DOCS_DIR, 'review'));

  // review/index.md
  fs.writeFileSync(path.join(DOCS_DIR, 'review', 'index.md'), `---
title: 14家核心机场品牌深度独立评测
description: 2026年实测14家高可用机场品牌。线路架构、价格实标、优缺点深度解析与避坑指引。
---

# 14 家核心机场品牌深度独立评测

我们对以下 14 家服务商进行了长期追踪评测，价格与流量配额均来自官网公示与实际核验：

<AirportTable />
`, 'utf-8');

  // Generate each brand review
  airports.forEach(a => {
    const plansMd = a.plans.map(p => `
| ${p.name} | ¥${p.price} / ${p.period === 'month' ? '月' : p.period} | ${p.traffic} GB | ¥${p.unitPricePerGb?.toFixed(3)} /GB | ${p.features.join('；')} |
`).join('');

    const md = `---
title: ${a.name} 深度评测（2026最新）
description: ${a.description}
---

# ${a.name} 深度独立评测

::: tip 一句话总结
${a.description}
:::

<div style="margin: 16px 0;">
  <AffButton id="${a.id}" text="前往 ${a.name} 官网选购" />
</div>

## 1. 核心套餐资费一览

| 套餐名称 | 订阅价格 | 流量配额 | 每GB单价 | 包含特性 |
| :--- | :--- | :--- | :--- | :--- |${plansMd}

${a.coupon ? `> 💡 **专属优惠码**：\`${a.coupon}\`（结算时填入可享专属折上折）` : ''}

## 2. 节点线路与技术架构

- **传输协议支持**：${a.protocols.join('、')}
- **节点覆盖区域**：${a.regions.join('、')}
- **设备数量限制**：${a.deviceLimit}
- **AI 大模型解锁**：${a.aiSupport.join('、')}
- **流媒体解锁能力**：${a.streamingSupport.join('、')}

## 3. 核心优点剖析

${a.advantages.map(adv => `- ✓ **${adv}**`).join('\n')}

## 4. 注意事项与短板

${a.disadvantages.map(dis => `- ⚠️ ${dis}`).join('\n')}

## 5. 适合人群与推荐场景

${a.suitableFor.map(s => `- 🎯 ${s}`).join('\n')}

## 6. 数据来源与核验状态

- **数据来源**：${a.sources.join('、')}
- **最近核验日期**：${a.lastVerified}
- **测试状态**：已核验测试 (${a.testStatus})

---

<div style="text-align: center; margin: 32px 0;">
  <AffButton id="${a.id}" text="立即直达 ${a.name} 官方控制台" />
</div>
`;

    fs.writeFileSync(path.join(DOCS_DIR, 'review', `${a.id}.md`), md, 'utf-8');
  });
}

// 7. Generate Guides (docs/guides/*.md) - 30 guides
function generateGuides() {
  console.log('[7/8] Generating docs/guides/*.md (30 guides)...');
  ensureDir(path.join(DOCS_DIR, 'guides'));

  // guides/index.md
  fs.writeFileSync(path.join(DOCS_DIR, 'guides', 'index.md'), `---
title: 新手翻墙教程中心
description: 30篇全平台保姆级配置手册，涵盖Clash、Sing-box、小火箭、Surge、软路由及主机游戏加速。
---

# 📖 全平台科学上网新手配置教程中心

本中心提供主流系统与开源客户端的图文操作手册。遵循清晰的步骤指引，助您轻松完成订阅导入与规则分流设置：

## 🖥️ 桌面端与移动端核心教程

- **Windows 电脑**：[Clash Verge Rev 保姆级教程](/guides/windows) · [Sing-box Windows 入门](/guides/sing-box-windows) · [v2rayN 客户端设置](/guides/v2rayn-windows) · [NekoRay 极简指南](/guides/nekoray-windows)
- **Android 手机**：[Clash Meta for Android](/guides/android) · [v2rayNG 分应用分流](/guides/v2rayng-advanced) · [Sing-box Android 指南](/guides/sing-box-android)
- **iPhone / iPad**：[小火箭 (Shadowrocket) 快速配置](/guides/ios) · [Loon 规则与按需连接](/guides/loon-ios) · [Surge iOS 高阶调试](/guides/surge-ios) · [Stash (Clash核心) 指南](/guides/stash-ios) · [Quantumult X (圈X)](/guides/quantumult-x)
- **macOS 电脑**：[Clash Verge macOS 增强模式](/guides/macos) · [Surge Mac 网关模式](/guides/surge-mac) · [Sing-box macOS](/guides/sing-box-macos)

## 🌐 路由器、家庭影院与主机游戏加速

- **软路由与家庭网络**：[OpenWrt OpenClash 全屋加速](/guides/openwrt-clash) · [PassWall 节点分流](/guides/openwrt-passwall) · [梅林固件路由器](/guides/router-merlin) · [Docker 部署代理核心](/guides/docker-clash)
- **电视盒子与家庭影院**：[Apple TV 客户端设置](/guides/apple-tv) · [Android TV 盒子看奈飞](/guides/android-tv)
- **游戏主机与掌机**：[PS5 / Switch 联机加速](/guides/ps5-switch-gaming) · [Steam Deck 掌机加速](/guides/steam-deck)

## ⚡ 开发者网络加速与隐私工具

- [命令行与 Git 终端代理加速](/guides/git-terminal-proxy)
- [WSL2 虚拟机网络穿透配置](/guides/wsl2-proxy)
- [Telegram 电报内置代理与规则修复](/guides/telegram-proxy)
- [Chrome 浏览器 SwitchyOmega 分流](/guides/chrome-switchyomega)
- [自建 Subconverter 订阅转换保护隐私](/guides/subconverter-selfhost)
`, 'utf-8');

  // Generate each of the 30 guides
  allGuides.forEach(g => {
    const stepsMd = g.steps.map((s, idx) => `
### 步骤 ${idx + 1}：${s.name}

${s.detail}
`).join('\n');

    const md = `---
title: ${g.seoTitle.replace(/ \| VPN Top/g, '')}
description: ${g.description}
---

# ${g.title}

<div class="seo-badge">分类：${g.category} · 2026最新保姆级实操</div>

::: info 核心导读
${g.lead}
:::

${stepsMd}

---

::: tip 节点推荐与搭配
若您尚未选定合适的机场节点，欢迎查阅我们的 **[2026 优质VPN机场综合排行榜](/ranking/overall)** 或前往 **[横向对比工具](/compare/)** 并排查看资费。
:::
`;

    fs.writeFileSync(path.join(DOCS_DIR, 'guides', `${g.slug}.md`), md, 'utf-8');
  });
}

// 8. Generate Blog Posts (docs/blog/*.md) - 100 blog posts
function generateBlogs() {
  console.log('[8/8] Generating docs/blog/*.md (100 articles)...');
  ensureDir(path.join(DOCS_DIR, 'blog'));

  // Group blogs by category
  const categories = [
    "选型与避坑",
    "底层网络与专线",
    "协议技术与演进",
    "故障排查与性能调优",
    "AI工具与办公解锁",
    "流媒体与跨境合租",
    "网络安全与隐私防范"
  ];

  let blogIndexMd = `---
title: 科学上网与机场梯子深度技术知识库
description: 收录100篇涵盖机场选型、IPLC专线、现代代理协议、晚高峰卡顿优化、AI工具解锁的硬核原创文章。
---

# 📚 科学上网与机场梯子深度技术知识库

汇集 100 篇涵盖机场选型、专线网络架构、现代代理协议、晚高峰卡顿优化、AI 工具解锁与网络隐私安全的原创专栏：

`;

  categories.forEach(cat => {
    const catBlogs = allBlogs.filter(b => b.category === cat);
    blogIndexMd += `\n## 📁 ${cat} (${catBlogs.length}篇)\n\n`;
    catBlogs.forEach(b => {
      blogIndexMd += `- [${b.title}](/blog/${b.slug})\n`;
    });
  });

  fs.writeFileSync(path.join(DOCS_DIR, 'blog', 'index.md'), blogIndexMd, 'utf-8');

  // Generate each of the 100 blog posts
  allBlogs.forEach(b => {
    const sectionsMd = b.sections.map(s => `
## ${s.heading}

${s.paragraphs.join('\n\n')}
`).join('\n');

    const md = `---
title: ${b.seoTitle.replace(/ \| VPN Top/g, '')}
description: ${b.description}
---

# ${b.title}

<div class="seo-badge">分类：${b.category} · 深度技术专栏</div>

::: info 核心导读
${b.lead}
:::

${sectionsMd}

---

::: tip 进一步探索与选型
- 查看最新实测榜单：**[2026 优质VPN机场综合实力排行榜](/ranking/overall)**
- 并排比对资费：**[机场横向对比工具](/compare/)**
- 客户端配置指南：**[全平台新手翻墙教程中心](/guides/)**
:::
`;

    fs.writeFileSync(path.join(DOCS_DIR, 'blog', `${b.slug}.md`), md, 'utf-8');
  });
}

// 9. Generate Trust & Glossary Pages
function generateTrustAndGlossary() {
  console.log('Generating trust pages and glossary...');
  ensureDir(path.join(DOCS_DIR, 'glossary'));

  const trustPages = [
    { slug: 'about', title: '关于我们', desc: 'VPN Top（vpntop.click）是一个专注于中文翻墙梯子测评、IPLC/IEPL高速专线节点监测与网络加速科普的技术媒体与测评实验室。' },
    { slug: 'contact', title: '联系我们', desc: '商务合作、数据纠错与意见反馈通道。欢迎通过电子邮箱联系编辑部。' },
    { slug: 'editorial-policy', title: '独立编辑政策', desc: '遵循客观中立、数据透明与防虚标原则。所有机场评测均严格区分官方宣传与实测表现。' },
    { slug: 'privacy-policy', title: '隐私政策', desc: '我们严格保护访问者个人隐私，本站不收集任何用户敏感个人信息。' },
    { slug: 'disclaimer', title: '合规与免责声明', desc: '本站所有内容仅供计算机网络技术学术交流、跨国科研及跨境电商合规使用参考。' }
  ];

  trustPages.forEach(p => {
    const md = `---
title: ${p.title}
description: ${p.desc}
---

# ${p.title}

${p.desc}

## 核心原则

1. **客观独立**：数据源严格取自官方公开套餐与真实网络测试，杜绝虚假跑分。
2. **数据透明**：明确标注每 GB 成本、线路架构与短板不足，供用户理性抉择。
3. **技术分享**：致力于普及现代网络代理协议知识，提升中文互联网用户的出海生产力。
`;
    fs.writeFileSync(path.join(DOCS_DIR, `${p.slug}.md`), md, 'utf-8');
  });

  const glossaryTerms = [
    { slug: 'iplc', title: 'IPLC 专线百科', desc: 'IPLC（International Private Leased Circuit，国际私有租用线路）是企业级跨境内网物理专线，不经过公网审查网关。' },
    { slug: 'iepl', title: 'IEPL 专线百科', desc: 'IEPL（International Ethernet Private Line，国际以太网专线）提供二层以太网物理隔离互联，抖动更小、带宽更大。' },
    { slug: 'clash', title: 'Clash 规则分流百科', desc: '基于 Go 开发的跨平台规则代理核心，支持强大的分流规则与策略组调度。' },
    { slug: 'v2ray', title: 'V2Ray 架构百科', desc: 'Project V 旗下的模块化代理工具，定义了经典的 VMess 与 VLESS 协议。' },
    { slug: 'shadowsocks', title: 'Shadowsocks (SS) 百科', desc: '经典的轻量级开源代理协议，2022 最新标准引入了更强健的 AEAD 加密。' }
  ];

  glossaryTerms.forEach(g => {
    const md = `---
title: ${g.title}
description: ${g.desc}
---

# ${g.title}

${g.desc}

::: tip 深入了解
查阅我们的 **[科学上网技术文库](/blog/)** 获取更深入的协议架构与网络工程深度长文。
:::
`;
    fs.writeFileSync(path.join(DOCS_DIR, 'glossary', `${g.slug}.md`), md, 'utf-8');
  });

  // Public assets
  ensureDir(path.join(DOCS_DIR, 'public'));
  fs.writeFileSync(path.join(DOCS_DIR, 'public', 'robots.txt'), `User-agent: *
Allow: /

Sitemap: https://vpntop.click/sitemap.xml
`, 'utf-8');

  fs.writeFileSync(path.join(DOCS_DIR, 'public', 'f23cb41920784260a48b5e98586909cb.txt'), 'f23cb41920784260a48b5e98586909cb', 'utf-8');
}

// Run All
console.log('=== [VitePress Migration Setup] ===');
generateConfig();
generateHomepage();
generateComparePage();
generateRankings();
generateRecommendations();
generateReviews();
generateGuides();
generateBlogs();
generateTrustAndGlossary();
console.log('=== [VitePress Setup Completed Successfully] ===');
