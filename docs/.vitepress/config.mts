import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'VPN Top',
  titleTemplate: ':title | VPN Top 机场评测网',
  description: '2026最新机场推荐与梯子评测指南 - 精选高性价比VPN机场节点，提供晚高峰稳定IPLC/IEPL专线实测、横向对比与配置教程。',
  lang: 'zh-CN',
  cleanUrls: true,
  ignoreDeadLinks: 'localhostLinks',
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
        ...[
  {
    "text": "桌面端系统",
    "collapsed": false,
    "items": [
      {
        "text": "Windows 电脑机场客户端配置",
        "link": "/guides/windows"
      },
      {
        "text": "macOS 平台机场节点设置指南",
        "link": "/guides/macos"
      },
      {
        "text": "Sing-box Windows 客户端图文配置完全",
        "link": "/guides/sing-box-windows"
      },
      {
        "text": "Sing-box macOS 平台配置指南",
        "link": "/guides/sing-box-macos"
      },
      {
        "text": "Surge for Mac 增强模式与网关旁路路由配置",
        "link": "/guides/surge-mac"
      },
      {
        "text": "v2rayN Windows 最新版 Core 配置与 Xray 切换",
        "link": "/guides/v2rayn-windows"
      },
      {
        "text": "NekoRay / NekoBox 跨平台客户端新手配置与 TUN 模式指南",
        "link": "/guides/nekoray-windows"
      }
    ]
  },
  {
    "text": "移动端系统",
    "collapsed": false,
    "items": [
      {
        "text": "Android 手机梯子客户端配置",
        "link": "/guides/android"
      },
      {
        "text": "iOS 平台机场梯子配置",
        "link": "/guides/ios"
      },
      {
        "text": "Sing-box Android 手机端配置与分流",
        "link": "/guides/sing-box-android"
      },
      {
        "text": "Sing-box iOS 客户端安装与规则集配置指南",
        "link": "/guides/sing-box-ios"
      },
      {
        "text": "Loon iOS 规则分流、插件与重写脚本入门",
        "link": "/guides/loon-ios"
      },
      {
        "text": "Surge iOS 企业级网络抓包与策略组配置",
        "link": "/guides/surge-ios"
      },
      {
        "text": "Quantumult X (圈X) 策略组配置与节点订阅导入",
        "link": "/guides/quantumult-x"
      },
      {
        "text": "Stash iOS (Clash 核心分支) 新手配置与覆写规则实战",
        "link": "/guides/stash-ios"
      },
      {
        "text": "v2rayNG 安卓高级分流、分应用代理与自定义 DNS 调优指南",
        "link": "/guides/v2rayng-advanced"
      }
    ]
  },
  {
    "text": "协议与内核进阶",
    "collapsed": false,
    "items": [
      {
        "text": "Clash Meta (Mihomo) 内核规则分流与高级设置详解",
        "link": "/guides/clash-meta"
      }
    ]
  },
  {
    "text": "路由器与旁路网关",
    "collapsed": false,
    "items": [
      {
        "text": "OpenWrt 路由器安装 OpenClash 插件打造全屋翻墙软路由",
        "link": "/guides/openwrt-clash"
      },
      {
        "text": "OpenWrt 路由器 PassWall 插件节点分流与自动故障切换配置",
        "link": "/guides/openwrt-passwall"
      },
      {
        "text": "华硕梅林固件安装科学上网插件打造透明代理网关实战指南",
        "link": "/guides/router-merlin"
      }
    ]
  },
  {
    "text": "进阶开发者环境",
    "collapsed": false,
    "items": [
      {
        "text": "利用 Docker 容器部署 Mihomo / Clash 打造内网代理服务器",
        "link": "/guides/docker-clash"
      },
      {
        "text": "程序员终端命令行 Git / Curl / Wget 走机场代理加速完全配置",
        "link": "/guides/git-terminal-proxy"
      },
      {
        "text": "Windows WSL2 子系统共享宿主机 Clash 代理网络配置实战",
        "link": "/guides/wsl2-proxy"
      },
      {
        "text": "Telegram 电报 MTProto 与 Socks5 内置代理设置防失联攻略",
        "link": "/guides/telegram-proxy"
      },
      {
        "text": "浏览器代理扩展 ZeroOmega / SwitchyOmega 规则分流设置完全指南",
        "link": "/guides/chrome-switchyomega"
      },
      {
        "text": "自建 Subconverter 订阅转换服务",
        "link": "/guides/subconverter-selfhost"
      }
    ]
  },
  {
    "text": "大屏电视与智能家居",
    "collapsed": false,
    "items": [
      {
        "text": "Apple TV 4K 安装小火箭或 Sing-box 打造客厅大屏流媒体无阻访问",
        "link": "/guides/apple-tv"
      },
      {
        "text": "Android TV / 索尼电视 / 小米盒子安装 Clash 电视版配置指南",
        "link": "/guides/android-tv"
      }
    ]
  },
  {
    "text": "游戏主机与极客数码",
    "collapsed": false,
    "items": [
      {
        "text": "PS5 与任天堂 Switch 主机游戏跨服联机代理加速实战指南",
        "link": "/guides/ps5-switch-gaming"
      },
      {
        "text": "Steam Deck 掌机 Linux 桌面模式与游戏模式科学上网配置",
        "link": "/guides/steam-deck"
      }
    ]
  }
]
      ],
      '/blog/': [
        {
          text: '📚 科学上网知识文库',
          items: [{ text: '100篇深度专栏全景', link: '/blog/' }]
        },
        ...[
  {
    "text": "📁 选型与避坑 (20)",
    "collapsed": true,
    "items": [
      {
        "text": "如何挑选适合自己的机场梯子",
        "link": "/blog/how-to-choose-airport"
      },
      {
        "text": "便宜性价比机场与高端专线机场该如何选择？真实体验与成本拆解",
        "link": "/blog/budget-vs-premium-airport"
      },
      {
        "text": "机场套餐买月付还是年付？防止机场跑路财产损失的最佳购买策略",
        "link": "/blog/monthly-vs-annual-subscription"
      },
      {
        "text": "不限流量与无限流量机场真的靠谱吗？揭秘超售机制与限速内幕",
        "link": "/blog/unlimited-traffic-airports-truth"
      },
      {
        "text": "学生党与穷鬼专属",
        "link": "/blog/student-budget-airport-guide"
      },
      {
        "text": "为什么要准备备用机场？双机场容灾备份配置实战指南",
        "link": "/blog/backup-airport-strategy"
      },
      {
        "text": "玩外服游戏能不能用机场代理？延迟、丢包与电竞加速器对比",
        "link": "/blog/game-acceleration-airport"
      },
      {
        "text": "外贸跨境与自媒体团队如何选择多设备高并发企业级机场节点",
        "link": "/blog/company-team-airport-solution"
      },
      {
        "text": "直连机场与中转机场区别详解",
        "link": "/blog/direct-vs-transit-airports"
      },
      {
        "text": "揭秘不良机场主的7种欺诈套路",
        "link": "/blog/airport-owner-tricks-exposed"
      },
      {
        "text": "购买机场梯子支持退款吗？工单沟通技巧与维权避坑指南",
        "link": "/blog/airport-refund-policy"
      },
      {
        "text": "哪种机场节点延迟最低？香港、日本与新加坡节点实测延迟对比",
        "link": "/blog/low-latency-airport-ranking"
      },
      {
        "text": "为什么千万不要使用免费VPN？免费梯子背后的数据窃取与挖矿风险",
        "link": "/blog/free-vpn-risks"
      },
      {
        "text": "机场邀请码与返利机制揭秘",
        "link": "/blog/airport-invitation-rebate"
      },
      {
        "text": "Telegram电报机场测速频道真的可信吗？如何辨别水军托单",
        "link": "/blog/telegram-airport-channels"
      },
      {
        "text": "按量付费与不限时机场适合哪些人？低频轻度用户的极致省钱方案",
        "link": "/blog/pay-by-traffic-airports"
      },
      {
        "text": "多设备家庭共享与多网卡聚合",
        "link": "/blog/high-concurrency-airports"
      },
      {
        "text": "机场节点大面积超时怎么办？官方维护公告与节点监控排查流程",
        "link": "/blog/airport-status-monitoring"
      },
      {
        "text": "为什么刚买的机场节点IP就被封了？被墙原因与自救更换节点方法",
        "link": "/blog/airport-blacklist-ip"
      },
      {
        "text": "2026年中文机场行业发展趋势",
        "link": "/blog/2026-airport-trend"
      }
    ]
  },
  {
    "text": "📁 底层网络与专线 (15)",
    "collapsed": true,
    "items": [
      {
        "text": "IEPL 与 IPLC 内网专线深度对比",
        "link": "/blog/iepl-vs-iplc"
      },
      {
        "text": "什么是BGP中转机场？入口多线接入与智能优选路由原理解析",
        "link": "/blog/bgp-transit-explained"
      },
      {
        "text": "电信CN2 GIA、联通AS9929与移动CMIN2",
        "link": "/blog/cn2-gia-as9929-cmin2"
      },
      {
        "text": "GFW防火长城是如何阻断翻墙流量的？深度包检测(DPI)技术揭秘",
        "link": "/blog/gfw-blocking-mechanisms"
      },
      {
        "text": "为什么专线不会被墙？物理层内网光缆与过境公网审查原理解析",
        "link": "/blog/physical-layer-isolation"
      },
      {
        "text": "一条千兆专线成本要多少钱？拆解正规机场服务器与带宽运营开支",
        "link": "/blog/airport-bandwidth-cost"
      },
      {
        "text": "机场入口城市对延迟的影响",
        "link": "/blog/entry-exit-points-analysis"
      },
      {
        "text": "Anycast任播技术在机场网络中的应用",
        "link": "/blog/anycast-routing-airport"
      },
      {
        "text": "专线网络中的TCP单边加速与BBR拥塞控制算法调优",
        "link": "/blog/tcp-udp-optimization"
      },
      {
        "text": "机场后端的NAT高可用网关与负载均衡高负载调度设计",
        "link": "/blog/nat-gateway-architecture"
      },
      {
        "text": "IPv6对科学上网有何优势？绕过部分审查与降低延迟的实测验证",
        "link": "/blog/ipv6-airport-nodes"
      },
      {
        "text": "机场节点连接出现网页卡顿？MTU大小调优与分片丢包排查",
        "link": "/blog/mtu-mss-clamping"
      },
      {
        "text": "专线机场的高性能内部DNS架构",
        "link": "/blog/dns-infrastructure-airport"
      },
      {
        "text": "国际海底光缆断裂对机场节点的影响",
        "link": "/blog/submarine-cable-cut-impact"
      },
      {
        "text": "KVM与独服对机场节点性能的影响",
        "link": "/blog/server-virtualization-types"
      }
    ]
  },
  {
    "text": "📁 协议技术与演进 (15)",
    "collapsed": true,
    "items": [
      {
        "text": "主流科学上网协议大横评",
        "link": "/blog/protocol-comparison"
      },
      {
        "text": "VLESS Reality 协议原理全解析",
        "link": "/blog/vless-reality-deep-dive"
      },
      {
        "text": "Hysteria 2 协议深度测评",
        "link": "/blog/hysteria-2-udp-boost"
      },
      {
        "text": "TUIC v5 协议与 QUIC 底层优势",
        "link": "/blog/tuic-v5-quic-proxy"
      },
      {
        "text": "Shadowsocks 2022 最新标准与 AEAD 加密",
        "link": "/blog/shadowsocks-aead-security"
      },
      {
        "text": "Trojan 协议是如何伪装 HTTPS 流量的？TLS 证书与真网站协同防护",
        "link": "/blog/trojan-gfw-imitation"
      },
      {
        "text": "VMess 协议过时了吗？VMess+WS+TLS 在 2026 年的生存现状与性能瓶颈",
        "link": "/blog/vmess-protocol-status"
      },
      {
        "text": "gRPC 与 WebSocket 传输通道对比",
        "link": "/blog/grpc-vs-websocket"
      },
      {
        "text": "WireGuard 原生协议为什么容易被阻断？UDP 混淆技术拯救 WireGuard",
        "link": "/blog/wireguard-for-censorship"
      },
      {
        "text": "开启 Mux 多路复用是好是坏？高并发下的拥塞控制与抗封锁表现",
        "link": "/blog/multiplexing-mux-pros-cons"
      },
      {
        "text": "客户端 uTLS 指纹伪装技术",
        "link": "/blog/tls-fingerprint-mimicking"
      },
      {
        "text": "SNI阻断与ECH加密客户端打招呼",
        "link": "/blog/sni-blocking-esni-ech"
      },
      {
        "text": "ShadowTLS v3 工作原理",
        "link": "/blog/shadowtls-v3-stealth"
      },
      {
        "text": "各大协议数据包封装开销对比",
        "link": "/blog/protocol-overhead-benchmarks"
      },
      {
        "text": "下一代翻墙协议将走向何方？AI流量识别攻防对抗的前瞻思考",
        "link": "/blog/future-of-censorship-evasion"
      }
    ]
  },
  {
    "text": "📁 故障排查与性能调优 (15)",
    "collapsed": true,
    "items": [
      {
        "text": "破解机场测速图迷信",
        "link": "/blog/airport-speedtest-myths"
      },
      {
        "text": "晚高峰八点到十点机场严重卡顿掉线？五招彻底解决晚高峰拥堵",
        "link": "/blog/fix-evening-peak-lag"
      },
      {
        "text": "如何彻底杜绝 DNS 泄漏与 DNS 污染？Fake-IP 与 DoH 终极配置",
        "link": "/blog/resolve-dns-leak-poisoning"
      },
      {
        "text": "什么是 Clash TUN 虚拟网卡模式？接管全系统所有软件流量实战",
        "link": "/blog/clash-tun-mode-explained"
      },
      {
        "text": "客户端所有节点全部超时/显示 Timeout？排查解决网络连接中断",
        "link": "/blog/fix-node-timeout-errors"
      },
      {
        "text": "为什么访问国内网站变得很慢？正确配置智能分流避免流量浪费",
        "link": "/blog/bypass-domestic-sites"
      },
      {
        "text": "观看 YouTube 4K/8K 视频频繁缓冲转圈？提升吞吐量的参数调优",
        "link": "/blog/youtube-4k-buffer-fix"
      },
      {
        "text": "开启代理后微信公众号异常或支付宝被异地登录提醒？规避策略",
        "link": "/blog/fix-wechat-alipay-location"
      },
      {
        "text": "路由器开启科学上网后速度减半？硬件NAT加速与CPU瓶颈排查",
        "link": "/blog/router-port-forwarding-speed"
      },
      {
        "text": "Telegram 电报一直显示 Connecting 连接中？直连代理与分流规则修复",
        "link": "/blog/fix-telegram-connecting"
      },
      {
        "text": "代理客户端占用高 CPU 与内存溢出？内核切换与垃圾回收优化",
        "link": "/blog/client-memory-leak-cpu"
      },
      {
        "text": "机场订阅链接更新失败报错 HTTP 403/500/504？五种快速修复方法",
        "link": "/blog/sub-update-failed-error"
      },
      {
        "text": "联机游戏 NAT 类型变为严格(Strict)？开启 FullCone NAT 最佳实践",
        "link": "/blog/udp-nat-type-strict-fix"
      },
      {
        "text": "浏览器频繁报证书错误或 SSL 握手失败？系统时间同步与证书链排查",
        "link": "/blog/ssl-handshake-failed-fix"
      },
      {
        "text": "机场多节点并发负载均衡(Load Balance)",
        "link": "/blog/multi-core-load-balancing"
      }
    ]
  },
  {
    "text": "📁 AI工具与办公解锁 (15)",
    "collapsed": true,
    "items": [
      {
        "text": "访问 ChatGPT 提示 Access Denied 或 Unable to load site？纯净原生IP选择",
        "link": "/blog/chatgpt-ip-blocked-fix"
      },
      {
        "text": "避免 ChatGPT 被官方降智(4o转4o-mini)",
        "link": "/blog/chatgpt-anti-downgrade-tips"
      },
      {
        "text": "Claude 3.5 封号潮来袭？如何利用独立住宅 IP 与指纹浏览器防封",
        "link": "/blog/claude-account-ban-avoidance"
      },
      {
        "text": "开发者如何使用机场专线稳定调用 OpenAI API 与 Claude API",
        "link": "/blog/openai-api-reverse-proxy"
      },
      {
        "text": "Midjourney 与 Discord 频繁断连卡顿？专属低延迟节点分流配置",
        "link": "/blog/midjourney-discord-proxy"
      },
      {
        "text": "Google Gemini / Gemini Advanced 地区不可用？定位与节点伪装技巧",
        "link": "/blog/gemini-advanced-geo-unlock"
      },
      {
        "text": "程序员必备",
        "link": "/blog/github-copilot-acceleration"
      },
      {
        "text": "Cursor AI 智能编辑器网络代理配置",
        "link": "/blog/cursor-ide-proxy-setup"
      },
      {
        "text": "Perplexity AI 深度搜索引擎无障碍访问与原生 IP 优选指南",
        "link": "/blog/perplexity-ai-search-nodes"
      },
      {
        "text": "Suno 音乐创作与 Runway 视频生成平台的高清大流量节点选购",
        "link": "/blog/ai-voice-clone-suno-runway"
      },
      {
        "text": "机器学习工程师如何通过高速专线机场高速下载 HuggingFace 模型",
        "link": "/blog/huggingface-dataset-download"
      },
      {
        "text": "聚合 AI 平台 Poe 无法登录访问？住宅节点与指纹环境隔离方案",
        "link": "/blog/poe-quora-access-guide"
      },
      {
        "text": "机房托管 IP 与原生住宅家庭宽带 IP 区别",
        "link": "/blog/residential-ip-vs-datacenter"
      },
      {
        "text": "如何检测自己机场节点的欺诈分(Fraud Score)与纯净度？在线工具实测",
        "link": "/blog/fraud-score-ip-check"
      },
      {
        "text": "长期维护干净海外上网环境",
        "link": "/blog/clean-ip-maintenance"
      }
    ]
  },
  {
    "text": "📁 流媒体与跨境合租 (10)",
    "collapsed": true,
    "items": [
      {
        "text": "2026 Netflix 奈飞非自制剧解锁指南",
        "link": "/blog/netflix-full-library-unlock"
      },
      {
        "text": "Disney+ 报错 73 / 83 代码怎么办？修复流媒体区域限制与节点选择",
        "link": "/blog/disney-plus-error-codes"
      },
      {
        "text": "YouTube Premium 会员低价跨区上车指南",
        "link": "/blog/youtube-premium-family-sharing"
      },
      {
        "text": "Spotify 会员跨区合租与曲库解锁",
        "link": "/blog/spotify-family-cross-region"
      },
      {
        "text": "跨境电商做 TikTok 国际版",
        "link": "/blog/tiktok-overseas-sim-bypass"
      },
      {
        "text": "英国 BBC iPlayer 与 ITVX 解锁全攻略",
        "link": "/blog/bbc-iplayer-uk-tv-unlock"
      },
      {
        "text": "美区 Max (HBO) 与 Peacock 4K HDR 串流节点选购与支付验证",
        "link": "/blog/hbo-max-peacock-streaming"
      },
      {
        "text": "日本 AbemaTV、TVer 与 DMM 锁区访问指南",
        "link": "/blog/japan-abematv-tver-unlock"
      },
      {
        "text": "台湾巴哈姆特动画疯与 Hami Video 解锁",
        "link": "/blog/taiwan-hamivideo-bahamut"
      },
      {
        "text": "流媒体分流分流规则最佳实践",
        "link": "/blog/streaming-split-tunneling"
      }
    ]
  },
  {
    "text": "📁 网络安全与隐私防范 (10)",
    "collapsed": true,
    "items": [
      {
        "text": "使用机场节点的网络安全与隐私防范",
        "link": "/blog/airport-security-privacy"
      },
      {
        "text": "机场管理员能看到我的微信聊天和银行卡密码吗？HTTPS 端到端加密解析",
        "link": "/blog/can-airport-admin-see-traffic"
      },
      {
        "text": "什么是流量指纹分析？GFW 如何通过数据包大小与间隔识别代理",
        "link": "/blog/traffic-analysis-fingerprint"
      },
      {
        "text": "Tor 洋葱路由配合前置代理",
        "link": "/blog/tor-over-vpn-privacy"
      },
      {
        "text": "禁用 WebRTC 泄漏本地真实公网 IP",
        "link": "/blog/prevent-webrtc-ip-leak"
      },
      {
        "text": "双重跳转链式代理(Chain Proxy)配置",
        "link": "/blog/two-hop-chain-proxy"
      },
      {
        "text": "购买机场梯子如何保护支付隐私？USDT虚拟币支付与防追查技巧",
        "link": "/blog/safe-payment-airport-crypto"
      },
      {
        "text": "如何识别警察或安全机构设置的钓鱼蜜罐机场？安全核查清单",
        "link": "/blog/honeypot-airport-detection"
      },
      {
        "text": "出差在外连接公共免费 WiFi",
        "link": "/blog/public-wifi-protection"
      },
      {
        "text": "2026年终极个人数字隐私防护清单",
        "link": "/blog/personal-security-checklist"
      }
    ]
  }
]
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
            ...[
  {
    "text": "微风网络 Breezenet 评测",
    "link": "/review/breezenet"
  },
  {
    "text": "暮光网络 评测",
    "link": "/review/muguang"
  },
  {
    "text": "飞猫云 评测",
    "link": "/review/feimaoyun"
  },
  {
    "text": "无忧 (无忧链接) 评测",
    "link": "/review/wuyou"
  },
  {
    "text": "灵猫 评测",
    "link": "/review/lingmao"
  },
  {
    "text": "闪跃 FlashLeap 评测",
    "link": "/review/flashleap"
  },
  {
    "text": "萤火虫（Firefly） 评测",
    "link": "/review/firefly"
  },
  {
    "text": "跨界 (跨界云) 评测",
    "link": "/review/kuajiecloud"
  },
  {
    "text": "隐形人 评测",
    "link": "/review/yinxingren"
  },
  {
    "text": "飞V 评测",
    "link": "/review/feiv"
  },
  {
    "text": "梯子云 LadderCloud 评测",
    "link": "/review/laddercloud"
  },
  {
    "text": "浪网 WaveNet 评测",
    "link": "/review/wavenet"
  },
  {
    "text": "灵动云 评测",
    "link": "/review/lingdongcloud"
  },
  {
    "text": "全球云 评测",
    "link": "/review/quanqiuyun"
  }
]
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
