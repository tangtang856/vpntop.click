// const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

const allGuides = [
  {
    slug: "windows",
    title: "Windows 电脑机场客户端配置教程：Clash Verge Rev 保姆级实操",
    seoTitle: "Windows电脑机场客户端配置教程 - Clash Verge Rev与Sing-box实战 | VPN Top",
    description: "2026年Windows电脑科学上网完全指南。手把手教你下载、安装并配置开源客户端Clash Verge Rev，实现机场订阅一键导入与国内网站智能分流。",
    lead: "Windows 平台目前最受推荐的现代化客户端是基于 Mihomo 内核的 Clash Verge Rev。界面优雅，内存占用低，完美支持智能分流与系统代理模式。",
    category: "桌面端系统",
    steps: [
      { name: "第一步：获取可靠的开源客户端安装包", detail: "从 GitHub 官方发布页下载 Clash Verge Rev 的 64位 Windows 安装包（.exe 或便携免安装版本）。切勿在未经核实的第三方下载站下载，以防植入木马。" },
      { name: "第二步：复制服务商订阅链接", detail: "登录您的机场后台，在仪表盘找到【便捷导入】或【订阅链接】，复制专属的 Clash / Clash.Meta 订阅 URL。" },
      { name: "第三步：导入订阅并更新节点", detail: "打开 Clash Verge Rev，点击左侧【订阅 (Profiles)】，在顶部输入框粘贴订阅 URL，点击【保存/导入】。软件将自动拉取最新的节点列表与分流规则。" },
      { name: "第四步：选择规则分流模式与主力节点", detail: "进入左侧【代理 (Proxies)】页面，模式推荐选择【规则 (Rule)】，这样访问国内网站直连不消耗流量，访问海外受限网站自动走代理。选择延迟低于 50ms 的香港或日本节点作为主力。" },
      { name: "第五步：开启系统代理 (System Proxy)", detail: "在主界面右下角或【设置】中勾选【系统代理】开关，即可畅享高速海外网络加速。" }
    ]
  },
  {
    slug: "android",
    title: "Android 手机梯子客户端配置教程：Clash Meta 与 v2rayNG 快速入门",
    seoTitle: "安卓手机科学上网教程 - Clash Meta与v2rayNG新手快速上手 | VPN Top",
    description: "安卓手机机场客户端配置教程。图文详解Clash Meta for Android (CMFA) 与 v2rayNG 的下载安装、订阅导入、分流设置与电池后台常驻保活技巧。",
    lead: "Android 系统的开放性使其拥有丰富的客户端选择。对于新手，我们首推界面简洁且支持现代化 Mihomo 内核的 Clash Meta for Android。",
    category: "移动端系统",
    steps: [
      { name: "第一步：安装 Clash Meta for Android APK", detail: "从开源仓库或本站可靠镜像下载最新的 APK 文件完成安装。初次打开时授予其创建本地 VPN 连接的系统网络权限。" },
      { name: "第二步：在手机端导入订阅", detail: "进入应用主页，点击【配置】->【新配置】->【从 URL 导入】。填入机场提供的订阅链接，命名后点击右上角保存并拉取配置。" },
      { name: "第三步：选择节点并启动核心", detail: "返回主界面，点击刚刚导入的配置使其生效。在【代理】列表中挑选测速优异的节点，点击主页的【点击启动】大按钮。" },
      { name: "第四步：开启应用分流与电池白名单保活", detail: "由于安卓系统激进的杀后台策略，务必在系统设置中将客户端加入【电池无限制/后台运行白名单】，防止锁屏后断开连接。" }
    ]
  },
  {
    slug: "ios",
    title: "iOS 平台机场梯子配置教程：Shadowrocket (小火箭) 与 Loon 新手实操",
    seoTitle: "iPhone/iPad 翻墙教程 - Shadowrocket小火箭与Surge配置图解 | VPN Top",
    description: "苹果iPhone与iPad科学上网新手教程。教你如何准备美区Apple ID购买Shadowrocket (小火箭)，并完成订阅一键导入、规则配置与按需连接设置。",
    lead: "受 App Store 区域政策限制，iOS 端翻墙工具需要使用美区或港区等海外 Apple ID 下载。目前生态最为成熟、普及率最高的工具是 Shadowrocket（俗称小火箭）。",
    category: "移动端系统",
    steps: [
      { name: "第一步：获取海外 Apple ID 并下载小火箭", detail: "退出 App Store 当前账号，登录海外 Apple ID（切勿在 iCloud 登录以免锁机），搜索 Shadowrocket（售价约 2.99 美元）下载安装。" },
      { name: "第二步：导入机场订阅", detail: "打开 Safari 浏览器登录机场后台，点击【一键导入 Shadowrocket】，或者手动在小火箭首页右上角点击【+】，类型选择【Subscribe】，粘贴订阅链接完成更新。" },
      { name: "第三步：设置全局路由为【配置 (Config)】", detail: "在小火箭底部将全局路由选为【配置】，保证大陆 IP 直连，避免国内微信和网银支付异常。" },
      { name: "第四步：连接并信任 VPN 配置描述文件", detail: "轻触顶部连接开关，系统会弹窗提示添加 VPN 配置，输入锁屏密码授权后即可连通。" }
    ]
  },
  {
    slug: "macos",
    title: "macOS 平台机场节点设置指南：兼顾规则分流与系统增强模式",
    seoTitle: "Mac电脑科学上网教程 - Clash Verge与Surge Mac保姆级指南 | VPN Top",
    description: "Mac苹果电脑科学上网指南。详解Clash Verge macOS版安装、Apple芯片与Intel原生适配、TUN增强模式配置以及终端命令行代理技巧。",
    lead: "Mac 用户不仅需要浏览器代理，更常涉及终端命令行（Git、Homebrew、Docker）加速。选用支持 TUN 增强模式的客户端能够实现系统级完全透明代理。",
    category: "桌面端系统",
    steps: [
      { name: "第一步：根据芯片类型下载 DMG 安装包", detail: "确认你的 Mac 是 Apple Silicon（M1/M2/M3/M4）还是 Intel 处理器，下载对应的 arm64 或 x64 版 Clash Verge Rev 并拖入 Applications 目录。" },
      { name: "第二步：导入订阅并配置自动更新", detail: "在【Profiles】界面填入订阅链接，建议将定时自动更新间隔设置为 24 小时，以便服务商更换失效节点时本地能够自动同步。" },
      { name: "第三步：配置 TUN 虚拟网卡模式", detail: "在【设置】中安装 Service Mode 服务模式并开启【TUN Mode】，这样系统所有非 Web 流量（包括终端 git clone 和远程 SSH）都会被自动代理接管。" }
    ]
  },
  {
    slug: "clash-meta",
    title: "Clash Meta (Mihomo) 内核规则分流与高级设置详解",
    seoTitle: "Clash Meta (Mihomo) 内核规则分流与高级设置详解 | VPN Top",
    description: "Clash Meta (Mihomo) 进阶教程。深度解析 Rule Provider 分流规则集、DNS 防污染防泄漏设置、Hysteria2与Vless现代协议支持技巧。",
    lead: "Mihomo（原 Clash.Meta）是目前开源社区最强大、维护最活跃的分流代理内核。掌握其高级配置能彻底杜绝 DNS 泄漏并极致优化访问速度。",
    category: "协议与内核进阶",
    steps: [
      { name: "第一步：理解 Rule-Providers 动态规则集", detail: "通过引入外部 YAML 规则文件（如 Loyalsoldier 或 ACL4SSR），可以让国内顶级域名、Steam 游戏加速和 AI 服务走不同的指定策略组。" },
      { name: "第二步：配置 fake-ip 与 DNS 防污染", detail: "将 dns.mode 设置为 fake-ip，并配置境外 DoH（如 Cloudflare 1.1.1.1 或 Google 8.8.8.8），有效规避运营商 DNS 投毒并缩短首包响应时间。" },
      { name: "第三步：针对 ChatGPT 与 Claude 的专项路由策略", detail: "为 OpenAI 相关域名单独设立策略组，强制指定具有原生住宅 IP 的美国或新加坡节点，避免随意漂移触发风控。" }
    ]
  },
  {
    slug: "sing-box-windows",
    title: "Sing-box Windows 客户端图文配置完全教程：轻量新内核实战",
    seoTitle: "Sing-box Windows客户端配置教程 - 新一代通用通用代理平台实操 | VPN Top",
    description: "Sing-box Windows平台配置指南。从图形界面Sing-box GUI的下载安装、配置JSON编写、Outbound出口规则设置到TUN虚拟网卡透明代理图文详解。",
    lead: "Sing-box 作为新一代通用网络代理框架，以极高的性能和极低的内存占用闻名。其支持的现代协议生态极其完善，是未来的主力之选。",
    category: "桌面端系统",
    steps: [
      { name: "第一步：获取 Sing-box 图形客户端", detail: "推荐使用支持图形界面的 Sing-box GUI 或 Nekoray。下载解压至无中文路径的纯英文字符文件夹下。" },
      { name: "第二步：导入包含 VLESS/Hysteria2 的订阅配置", detail: "在客户端配置栏粘贴服务商提供的 Sing-box 订阅链接，软件将自动解析出包含 direct、block 和各类代理 outbound 的完整 JSON 结构。" },
      { name: "第三步：启用规则路由与 TUN 模式", detail: "在路由设置中确保 GeoIP 和 Geosite 规则生效，勾选开启 TUN 虚拟网卡，赋予系统级网络加速权限。" }
    ]
  },
  {
    slug: "sing-box-android",
    title: "Sing-box Android 手机端配置与分流教程：零卡顿轻快体验",
    seoTitle: "Sing-box Android手机版教程 - 安卓最新通用代理客户端使用指南 | VPN Top",
    description: "Sing-box安卓手机配置完全手册。教你如何在 Google Play 或 GitHub 下载官方客户端，导入专属订阅并开启省电高效的规则分流模式。",
    lead: "对于低内存或老旧安卓手机，Sing-box Android 版极低的资源消耗能够显著改善日常续航，同时避免由于后台占用过高被系统频繁查杀。",
    category: "移动端系统",
    steps: [
      { name: "第一步：安装 Sing-box 官方客户端", detail: "从 Google Play 商店或 GitHub Releases 下载最新的 sing-box-android 客户端 APK 安装包。" },
      { name: "第二步：添加远程 Profiles 订阅", detail: "点击 Profiles -> 新增配置，类型选择 Remote，粘贴机场服务商给出的 Sing-box 专属订阅 URL 并点击右上角更新。" },
      { name: "第三步：选择节点并连接", detail: "在 Dashboard 仪表盘选择你的主力专线节点，点击连接按钮，允许创建 VPN 连接即可运行。" }
    ]
  },
  {
    slug: "sing-box-ios",
    title: "Sing-box iOS 客户端安装与规则集配置指南：免翻免费新标杆",
    seoTitle: "Sing-box iOS苹果手机配置指南 - 免费好用的免跨区代理神器 | VPN Top",
    description: "苹果iOS平台Sing-box配置指南。详细介绍这款在美区和部分非国区免费下载的现代化客户端订阅导入、分组切换与分流规则技巧。",
    lead: "相比售价 2.99 美元的 Shadowrocket，Sing-box iOS 在海外商店长期免费开放，且对 VLESS Reality 与 Hysteria 2 具备顶级原生支持。",
    category: "移动端系统",
    steps: [
      { name: "第一步：在海外 App Store 下载 Sing-box", detail: "使用海外 Apple ID 登录 App Store，直接搜索【sing-box】免费下载官方应用程序。" },
      { name: "第二步：导入机场订阅", detail: "进入应用，切换至【Profiles】标签页，点击右上角【+】，输入订阅名称并粘贴 Sing-box 订阅 URL，保存后拉取节点。" },
      { name: "第三步：启用配置并建立连接", detail: "选中该配置，切换至【Dashboard】界面开启开关，系统弹出提示时点击允许并完成指纹/Face ID 认证。" }
    ]
  },
  {
    slug: "sing-box-macos",
    title: "Sing-box macOS 平台配置指南：命令行与图形界面深度调优",
    seoTitle: "Sing-box Mac电脑配置教程 - macOS平台高性能代理分流设置 | VPN Top",
    description: "Mac电脑Sing-box安装与配置完全教程。涵盖Homebrew命令行部署、图形化客户端SFM使用以及针对Mac生态的DNS防泄漏配置策略。",
    lead: "Mac 开发者偏爱高效的系统服务。Sing-box 在 macOS 上通过 launchd 作为系统后台守护进程运行，能够提供极其沉浸且不占用状态栏空间的透明代理。",
    category: "桌面端系统",
    steps: [
      { name: "第一步：选择图形版或命令行安装", detail: "新手推荐使用 SFM (Sing-box for Mac) 图形客户端，高阶极客可通过 brew install sing-box 通过终端配置。" },
      { name: "第二步：配置 config.json 出站规则", detail: "将机场给出的配置导入，在 inbound 中开启 mixed 混合协议端口（如 7890）或配置 tun 虚拟网卡。" },
      { name: "第三步：验证终端与浏览器网络畅通", detail: "在终端输入 curl -I https://google.com 确认返回 HTTP 200，说明透明代理已完全就绪。" }
    ]
  },
  {
    slug: "loon-ios",
    title: "Loon iOS 规则分流、插件与重写脚本入门教程：玩转轻奢客户端",
    seoTitle: "Loon iOS配置教程 - 苹果手机规则分流/插件与订阅实战指南 | VPN Top",
    description: "Loon客户端使用指南。从节点订阅导入、节点策略组配置、去广告插件安装到重写脚本（Rewrite）进阶功能全方位手把手拆解。",
    lead: "Loon 以极其清爽现代的 UI、强大的插件生态和优异的性能表现在 iOS 代理圈中享有盛誉，兼具简单与高可玩性。",
    category: "移动端系统",
    steps: [
      { name: "第一步：获取 Loon 客户端", detail: "使用海外 Apple ID 在 App Store 购买并下载 Loon（售价约 5.99 美元）。" },
      { name: "第二步：导入订阅节点", detail: "打开 Loon，点击【配置】->【订阅】-> 右上角【+】，输入名称并粘贴机场订阅 URL，保存后轻触【更新】拉取全部节点。" },
      { name: "第三步：配置分流策略组与一键连通", detail: "在【策略】页中，你可以为国外媒体、AI 工具（ChatGPT）、国内直连指定不同的节点组，最后在首页点击启动连接。" }
    ]
  },
  {
    slug: "surge-ios",
    title: "Surge iOS 企业级网络抓包与策略组配置：尊贵网络调试利器",
    seoTitle: "Surge iOS新手完全指南 - 苹果旗舰级网络分流与规则配置 | VPN Top",
    description: "Surge iOS 客户端完全指南。深入讲解 Enterprise 级网络策略组设计、Enhanced Mode 增强模式、MitM 证书解密与机场订阅无缝接入。",
    lead: "Surge 被誉为 iOS 平台的网络神器之王。其不仅具备最精准的规则分流，还拥有无与伦比的网络诊断与性能监控面板。",
    category: "移动端系统",
    steps: [
      { name: "第一步：安装并初始化 Surge", detail: "从海外 App Store 获取 Surge（免费下载，功能需购买授权），首次打开完成网络组件安装。" },
      { name: "第二步：使用托管配置接入机场", detail: "在首页选择【从 URL 下载配置】，粘贴机场支持的 Surge 托管配置链接，系统将自动配置好代理策略组与 DNS。" },
      { name: "第三步：开启增强模式与仪表盘监控", detail: "在主屏开启连接，切换至【最近请求】面板，你可以实时查看每一个应用的连接 IP、请求耗时与命中规则。" }
    ]
  },
  {
    slug: "surge-mac",
    title: "Surge for Mac 增强模式与网关旁路路由配置：打造终极工作站",
    seoTitle: "Surge Mac电脑配置教程 - 增强模式与网关旁路代理完全手册 | VPN Top",
    description: "Surge Mac完全配置手册。详解如何利用 Surge for Mac 开启网关增强模式接管全屋局域网流量、终端环境变量自动化配置及性能优化。",
    lead: "Surge for Mac 是 macOS 生态中最成熟稳定的网络工具。开启网关模式后，它能直接充当旁路由为手机、电视和主机提供局域网免翻代理。",
    category: "桌面端系统",
    steps: [
      { name: "第一步：安装 Surge Mac 并激活", detail: "从 Surge 官网下载 DMG 镜像，安装并授权系统扩展组件（System Extension）。" },
      { name: "第二步：导入托管订阅配置", detail: "点击菜单栏 Surge 图标，进入【偏好设置】->【配置】->【安装托管配置】，粘贴订阅并同步。" },
      { name: "第三步：勾选【增强模式 (Enhanced Mode)】", detail: "开启增强模式后，Mac 上的所有 TCP/UDP 流量、后台命令行工具与 Docker 均自动完成透明代理分流。" }
    ]
  },
  {
    slug: "quantumult-x",
    title: "Quantumult X (圈X) 策略组配置与节点订阅导入：极客玩家必备",
    seoTitle: "Quantumult X配置教程 - 圈X订阅导入/策略组与分流规则指南 | VPN Top",
    description: "Quantumult X (圈X) 新手保姆级教程。手把手教你配置分流规则、引用远程节点资源库、设置多重节点健康度检查与流媒体解锁策略。",
    lead: "Quantumult X 以强大的 JavaScript 脚本编写能力、精细化策略组调度和华丽的 UI 图表受到广大翻墙极客的热烈追捧。",
    category: "移动端系统",
    steps: [
      { name: "第一步：安装 Quantumult X", detail: "使用海外 Apple ID 登录 App Store 购买下载 Quantumult X（俗称圈X）。" },
      { name: "第二步：引用节点资源 (Server Resource)", detail: "点击右下角风车图标进入设置，找到【节点】->【引用 (资源)】，点击右上角【+】填入机场订阅链接并勾选更新。" },
      { name: "第三步：创建策略组与规则分流", detail: "在配置文件中引入成熟的分流规则库，在策略组中为流媒体、OpenAI 分配对应的代理策略，长按右下角大按钮开启代理。" }
    ]
  },
  {
    slug: "stash-ios",
    title: "Stash iOS (Clash 核心分支) 新手配置与覆写规则实战教程",
    seoTitle: "Stash iOS苹果版教程 - Clash规则在iPhone上的终极体验 | VPN Top",
    description: "Stash iOS客户端新手完全教程。深入介绍这款完全兼容Clash配置的iOS原生代理工具、订阅一键导入、按需连接与网关控制器实操。",
    lead: "如果你已经习惯了桌面端 Clash 的 YAML 规则体系，那么 Stash 就是你在 iPhone 和 iPad 上无缝迁移原有配置的最佳选择。",
    category: "移动端系统",
    steps: [
      { name: "第一步：在美区 App Store 下载 Stash", detail: "搜索 Stash 下载并完成初次打开的引导设置。" },
      { name: "第二步：直接导入 Clash 订阅", detail: "在配置页面点击从 URL 下载，直接粘贴你电脑上正在使用的 Clash 订阅链接，Stash 原生解析 YAML 配置文件。" },
      { name: "第三步：选择节点并开启按需连接", detail: "在首页选择想要出海的节点，可勾选【按需连接 (On Demand)】，在检测到非蜂窝 Wi-Fi 时自动决定是否开启。" }
    ]
  },
  {
    slug: "v2rayng-advanced",
    title: "v2rayNG 安卓高级分流、分应用代理与自定义 DNS 调优指南",
    seoTitle: "v2rayNG高级教程 - 分应用代理/绕过大陆与自定义DNS配置 | VPN Top",
    description: "v2rayNG高级玩法指南。全面拆解如何配置分应用代理、防止手机微信和网银走节点流量、设置本地DoH与解决频繁掉线技巧。",
    lead: "v2rayNG 是安卓平台上最具代表性的开源客户端之一。通过合理配置分应用代理与自定义路由，能大幅提升移动端续航与隐私安全性。",
    category: "移动端系统",
    steps: [
      { name: "第一步：配置【分应用代理】白名单", detail: "进入左侧抽屉菜单点击【分应用代理】，勾选需要走代理的应用（如 Chrome、Twitter、YouTube），排除微信、淘宝与各大网银。" },
      { name: "第二步：预设自定义路由规则", detail: "将预定义规则设置为【绕过局域网及大陆地址】，避免国内域名走节点消耗流量。" },
      { name: "第三步：配置自建 DoH 防 DNS 污染", detail: "在设置中将远程 DNS 修改为 1.1.1.1 或 8.8.8.8，杜绝运营商 DNS 劫持。" }
    ]
  },
  {
    slug: "v2rayn-windows",
    title: "v2rayN Windows 最新版 Core 配置与 Xray 切换教程：传统老将依然强劲",
    seoTitle: "v2rayN Windows客户端教程 - Xray核心配置/节点订阅导入技巧 | VPN Top",
    description: "Windows平台经典代理工具v2rayN实战指南。涵盖GitHub原版下载、Xray/V2Ray Core内核切换、订阅自动更新与系统路由配置全过程。",
    lead: "对于不喜欢花哨 UI、追求极简高效和丰富自定义参数的老玩家来说，v2rayN 依然是 Windows 平台上兼容性最强、协议支持最全的工具。",
    category: "桌面端系统",
    steps: [
      { name: "第一步：下载集成 Core 的完整发布包", detail: "前往 v2rayN 官方 GitHub Releases，下载包含 Xray-core 的 v2rayN-With-Core.zip，解压即可运行。" },
      { name: "第二步：在订阅分组中添加机场链接", detail: "点击顶部【订阅分组】->【订阅分组设置】->【添加】，输入备注并粘贴订阅链接，确认后点击【更新订阅】拉取节点。" },
      { name: "第三步：设为活动服务器并开启自动配置系统代理", detail: "在节点列表中右键选择延迟最低的节点设为活动服务器，在底部将系统代理切换为【自动配置系统代理】，路由选【绕过大陆】。" }
    ]
  },
  {
    slug: "nekoray-windows",
    title: "NekoRay / NekoBox 跨平台客户端新手配置与 TUN 模式指南",
    seoTitle: "NekoRay配置教程 - 跨平台通用代理工具与全网游戏TUN加速 | VPN Top",
    description: "NekoRay (Matsu) 客户端使用教程。讲解基于 Sing-box 内核的跨平台图形化客户端使用技巧，一键开启 TUN 模式畅玩海外游戏。",
    lead: "NekoRay 基于现代的 Sing-box 与 Xray 核心开发，跨 Windows 和 Linux 平台。其开箱即用的轻量设计受到了很多极客与开发者的喜爱。",
    category: "桌面端系统",
    steps: [
      { name: "第一步：解压并初次启动", detail: "下载 NekoRay 最新 zip 包，解压后双击 nekoray.exe。首次启动选择 core 为 sing-box。" },
      { name: "第二步：导入订阅或自建节点", detail: "点击顶部【分组】->【新建分组】，类型选【订阅】，填入订阅链接并保存更新。" },
      { name: "第三步：勾选【系统代理】与【TUN 模式】", detail: "在顶部工具栏直接勾选【TUN 模式】。客户端将自动接管所有进程流量，甚至包括无法设置独立代理的海外网络游戏。" }
    ]
  },
  {
    slug: "openwrt-clash",
    title: "OpenWrt 路由器安装 OpenClash 插件打造全屋翻墙软路由：保姆级教程",
    seoTitle: "OpenWrt安装OpenClash教程 - 软路由全屋无感翻墙与分流配置 | VPN Top",
    description: "OpenWrt软路由安装OpenClash插件完全指南。详解内核选择、Fake-IP模式调优、绕过大陆直连规则及全屋电视/手机/主机透明加速实操。",
    lead: "在软路由上部署代理，是实现全家人手机、电视盒、游戏机免装软件全自动翻墙的最优雅方案。OpenClash 是目前 OpenWrt 生态最成熟的插件。",
    category: "路由器与旁路网关",
    steps: [
      { name: "第一步：在 OpenWrt 安装依赖与 OpenClash IPK", detail: "通过 LuCI 界面上传 luci-app-openclash.ipk，或在终端通过 opkg update && opkg install 安装对应依赖并更新 Mihomo 核心。" },
      { name: "第二步：创建配置文件并导入机场订阅", detail: "进入【服务】->【OpenClash】->【配置文件订阅】，添加新配置，填入订阅链接并保存更新。" },
      { name: "第三步：运行模式选择【Fake-IP (TUN)】并启动", detail: "在通用设置中将模式选为 Fake-IP (TUN)，开启【本地 DNS 劫持】，保存并应用。全屋连接该 Wi-Fi 的设备即可直接无感访问外网。" }
    ]
  },
  {
    slug: "openwrt-passwall",
    title: "OpenWrt 路由器 PassWall 插件节点分流与自动故障切换配置",
    seoTitle: "PassWall配置教程 - OpenWrt路由器轻量代理插件与双节点主备 | VPN Top",
    description: "OpenWrt PassWall 插件实战教程。对比 OpenClash 的轻量化优势，详解节点导入、TCP/UDP 分流、自动心跳检测与主备无缝切换技巧。",
    lead: "相比功能繁复占用较大的 OpenClash，PassWall 更加轻量稳定，在几十元低配硬路由（如 MT7621）上也能跑出极高吞吐。",
    category: "路由器与旁路网关",
    steps: [
      { name: "第一步：在 PassWall 节点列表添加订阅", detail: "进入【服务】->【PassWall】->【节点订阅】，输入订阅地址，点击【保存并订阅】。" },
      { name: "第二步：设定主节点与备用备选节点", detail: "在基本设置中，将 TCP 节点指定为主力专线节点（如微风网络或隐形人），备用节点指定为备用梯子，开启自动切换检测。" },
      { name: "第三步：配置中国列表直连与 gfwlist 分流", detail: "选择 DNS 模式为 ChinaDNS-NG，国内域名国内解析，国外受阻域名走远程加密解析，彻底杜绝 DNS 污染。" }
    ]
  },
  {
    slug: "router-merlin",
    title: "华硕梅林固件安装科学上网插件打造透明代理网关实战指南",
    seoTitle: "华硕梅林固件翻墙教程 - 科学上网插件安装与透明网关设置 | VPN Top",
    description: "华硕路由器梅林固件 (Merlin) 科学上网教程。通过 Koolshare 软件中心离线安装科学上网插件，支持一键订阅与智能路由分流。",
    lead: "拥有华硕路由器（如 RT-AX86U、RT-AC68U）的用户，刷入梅林改版固件后无需额外购买软路由，即可单设备搞定全家科学上网。",
    category: "路由器与旁路网关",
    steps: [
      { name: "第一步：开启 JFFS 并离线安装插件", detail: "进入梅林后台【系统设置】，勾选 Format JFFS on next boot，在软件中心上传科学上网插件离线安装 tar 包。" },
      { name: "第二步：在插件后台粘贴机场订阅", detail: "打开插件界面，选择【节点管理】->【订阅管理】，粘贴订阅链接并一键拉取所有节点。" },
      { name: "第三步：工作模式选择【gfwlist 模式】或【大陆白名单】", detail: "推荐选择大陆白名单模式，保证国内访问原生千兆直连，海外流量自动送往代理核心。" }
    ]
  },
  {
    slug: "docker-clash",
    title: "利用 Docker 容器部署 Mihomo / Clash 打造内网代理服务器",
    seoTitle: "Docker部署Clash教程 - 局域网透明代理与轻量容器化网关搭建 | VPN Top",
    description: "Docker容器化部署Clash/Mihomo教程。详解docker-compose编写、Host网络模式挂载、外部Web控制面板（Yacd）对接与开机自启。",
    lead: "对于拥有 NAS、树莓派或家庭小型 Linux 服务器的用户，利用 Docker 容器化运行代理，既不需要刷路由器，又能提供全天候稳定的局域网 HTTP/Socks5 出口。",
    category: "进阶开发者环境",
    steps: [
      { name: "第一步：编写 docker-compose.yml 配置文件", detail: "创建 clash 目录，编写基于 metacubex/mihomo 镜像的 compose 文件，映射 7890 端口与 web 仪表板端口。" },
      { name: "第二步：挂载 config.yaml 机场配置文件", detail: "将下载好的机场配置放置在宿主机的挂载卷目录下，核对外部控制端口 secret 密钥。" },
      { name: "第三步：启动容器并通过浏览器 Web UI 管理", detail: "执行 docker-compose up -d 启动，在局域网浏览器输入 http://IP:9090 即可图形化切换节点与查看流量。" }
    ]
  },
  {
    slug: "apple-tv",
    title: "Apple TV 4K 安装小火箭或 Sing-box 打造客厅大屏流媒体无阻访问",
    seoTitle: "Apple TV翻墙教程 - 4K大屏客厅安装Shadowrocket与原生解锁 | VPN Top",
    description: "Apple TV 4K客厅科学上网教程。利用 tvOS 17 原生 VPN 支持，安装 Shadowrocket 或 Sing-box，实现客厅电视秒开 Netflix 4K 与 YouTube。",
    lead: "苹果在 tvOS 17 引入了原生 VPN 框架，宣告了 Apple TV 必须依赖复杂旁路由的时代彻底终结。现在在电视上直接装个小火箭就能畅享 4K HDR。",
    category: "大屏电视与智能家居",
    steps: [
      { name: "第一步：在 Apple TV 登录美区 Apple ID", detail: "进入系统设置添加用户，登录拥有 Shadowrocket 或 Sing-box 的海外账号，进入 App Store 即可直接下载。" },
      { name: "第二步：利用手机局域网隔空推送订阅", detail: "打开 Apple TV 上的小火箭，在 iPhone 上通过扫码或输入电视显示的局部 IP 网址，直接将订阅一键推送到电视端。" },
      { name: "第三步：开启代理享受 4K 秒开", detail: "点击连接，在 Apple TV 上打开 Netflix、Disney+ 或 YouTube，原汁原味 4K 杜比视界片库直接呈现。" }
    ]
  },
  {
    slug: "android-tv",
    title: "Android TV / 索尼电视 / 小米盒子安装 Clash 电视版配置指南",
    seoTitle: "Android TV电视盒子翻墙教程 - 索尼电视/小米盒子安装Clash配置 | VPN Top",
    description: "安卓电视盒子科学上网配置指南。详解通过U盘安装Clash for Android电视版APK、遥控器适配操作、一键订阅导入与开机自动运行技巧。",
    lead: "普通的手机版代理应用在电视上很难用遥控器操作。本教程针对 Android TV、Google TV 操作系统优化，手把手教你遥控器无痛操控。",
    category: "大屏电视与智能家居",
    steps: [
      { name: "第一步：将 TV 专用版 APK 拷贝至 U 盘", detail: "在电脑上下载适配 Android TV 遥控器焦点操作的 Clash for Android TV 版 APK，存入 U 盘插入电视安装。" },
      { name: "第二步：通过局域网剪贴板导入订阅", detail: "在电视应用内开启【局域网导入】，用手机浏览器扫描电视屏幕上的二维码，在手机上把订阅链接粘贴过去即可完成导入。" },
      { name: "第三步：开启系统 VPN 授权与开机自启动", detail: "首次点击启动时同意系统的 VPN 创建申请，在设置中勾选开机自动连接，以后打开电视直接就能看海外节目。" }
    ]
  },
  {
    slug: "ps5-switch-gaming",
    title: "PS5 与任天堂 Switch 主机游戏跨服联机代理加速实战指南",
    seoTitle: "PS5/Switch主机游戏加速教程 - 机场专线解决NAT受限与联机延迟 | VPN Top",
    description: "索尼PS5与任天堂Switch主机科学上网加速教程。教你如何利用电脑局域网共享代理、配置网关IP与DNS，突破NAT Type D解决联机卡顿。",
    lead: "主机游戏玩家经常遇到 Nintendo eShop 进不去、PSN 商店下载慢或《斯普拉遁》《怪物猎人》联机掉线报错。通过局域网代理即可完美解决。",
    category: "游戏主机与极客数码",
    steps: [
      { name: "第一步：在电脑客户端开启【允许局域网连接 (Allow LAN)】", detail: "在电脑上的 Clash Verge 中勾选【允许局域网连接】，记下电脑的内网 IP 地址（如 192.168.1.50）和代理端口（7890）。" },
      { name: "第二步：在 Switch / PS5 手动设置网络代理", detail: "进入主机网络设置 -> 连接 Wi-Fi -> 高级设置，将【代理服务器】设为【开启】，输入电脑的内网 IP 与 7890 端口。" },
      { name: "第三步：连接测试验证 NAT Type 改善", detail: "在主机上运行连接测试，查看 NAT 类型是否变更为 NAT Type A 或 B，下载速度大幅拉满即可畅快联机。" }
    ]
  },
  {
    slug: "steam-deck",
    title: "Steam Deck 掌机 Linux 桌面模式与游戏模式科学上网配置",
    seoTitle: "Steam Deck掌机科学上网教程 - 桌面与游戏模式全开代理加速 | VPN Top",
    description: "Steam Deck掌机科学上网指南。详解在SteamOS切换桌面模式安装Clash/Sing-box、配置全局透明代理，解决锁区游戏下载与社区社区访问。",
    lead: "Steam Deck 拥有完整的 Arch Linux 底层系统。通过配置系统代理或 TUN 模式，你可以随时随地在掌机上刷创意工坊、看 YouTube 和联机对战。",
    category: "游戏主机与极客数码",
    steps: [
      { name: "第一步：长按电源键切换到【桌面模式 (Desktop Mode)】", detail: "在桌面模式下打开 Discover 应用商店，搜索并安装 Clash Verge Flatpak 版或一键脚本。" },
      { name: "第二步：导入订阅并开启 TUN 虚拟网卡模式", detail: "导入机场订阅，在设置中为 Clash Verge 开启系统服务模式与 TUN 模式，输入掌机 sudo 密码授权。" },
      { name: "第三步：切回【游戏模式 (Gaming Mode)】依然生效", detail: "TUN 模式属于内核级全局代理，切换回掌机游戏主界面后依然在后台持续接管网络，Steam 社区与商店秒开。" }
    ]
  },
  {
    slug: "git-terminal-proxy",
    title: "程序员终端命令行 Git / Curl / Wget 走机场代理加速完全配置",
    seoTitle: "程序员终端命令行代理配置教程 - Git/Curl/Homebrew秒开加速 | VPN Top",
    description: "程序员必备终端代理配置指南。手把手教你配置终端 http_proxy 环境变量、Git socks5 代理、Homebrew 克隆提速与 SSH 别名隧道。",
    lead: "很多开发者电脑上明明开着代理，但在终端中执行 git clone、npm install 或 pip install 时依然超时报错。本文提供一键开关终端代理的终极方案。",
    category: "进阶开发者环境",
    steps: [
      { name: "第一步：在终端配置临时环境变量", detail: "在 Bash / Zsh 终端中执行：export http_proxy=http://127.0.0.1:7890; export https_proxy=http://127.0.0.1:7890 即可让当前窗口走代理。" },
      { name: "第二步：设置 Git 专属全局代理", detail: "执行 git config --global http.proxy http://127.0.0.1:7890，克隆 GitHub 代码仓库速率瞬间拉满至几十 MB/s。" },
      { name: "第三步：在 ~/.zshrc 或 ~/.bashrc 写入一键函数", detail: "编写 proxy_on 和 proxy_off 快捷命令别名，敲入命令随用随开，告别手动复制长环境变量。" }
    ]
  },
  {
    slug: "wsl2-proxy",
    title: "Windows WSL2 子系统共享宿主机 Clash 代理网络配置实战教程",
    seoTitle: "WSL2共享Windows代理教程 - 解决Linux子系统无法翻墙网络问题 | VPN Top",
    description: "Windows WSL2子系统代理配置攻略。解析WSL2虚拟网卡独立IP机制，通过Mirrored镜像网络模式或nameserver脚本实现子系统无缝科学上网。",
    lead: "WSL2 采用独立的 Hyper-V 虚拟化架构，其内部与宿主机不在同一个网络命名空间。掌握正确的网关转发配置是每个在 Windows 上做开发人员的必备功底。",
    category: "进阶开发者环境",
    steps: [
      { name: "第一步：在 Windows 端客户端开启【允许局域网连接】", detail: "确保 Clash Verge 的 Allow LAN 开启，这样 WSL2 虚拟网卡才能访问宿主机的 7890 端口。" },
      { name: "第二步：在 ~/.wslconfig 开启 Mirrored 镜像网络（Windows 11 首选）", detail: "在 Windows 用户目录下编辑 .wslconfig，写入 [experimental] networkingMode=mirrored，重启 WSL 后直接共享宿主机 127.0.0.1 端口。" },
      { name: "第三步：旧版系统通过脚本获取宿主机网关 IP", detail: "如果使用的是旧版 Windows 10，在 ~/.bashrc 中提取 /etc/resolv.conf 中的 nameserver 作为宿主机 IP 自动注入 http_proxy 即可。" }
    ]
  },
  {
    slug: "telegram-proxy",
    title: "Telegram 电报 MTProto 与 Socks5 内置代理设置防失联攻略",
    seoTitle: "Telegram电报代理设置教程 - 内置Socks5与MTProto防失联技巧 | VPN Top",
    description: "Telegram (电报) 客户端代理配置指南。教你如何在不开启系统全局代理的情况下，使用 Telegram 内置 Socks5 或 MTProto 代理实现后台独立收发消息。",
    lead: "很多时候我们不希望全电脑或全手机挂着代理，只想单独让 Telegram 后台收发消息。Telegram 原生支持强大的内置代理协议，可随时防失联。",
    category: "进阶开发者环境",
    steps: [
      { name: "第一步：进入 Telegram 高级连接设置", detail: "打开 Telegram -> 设置 (Settings) -> 数据与存储 (Data and Storage) -> 连接类型 (Connection type)。" },
      { name: "第二步：添加自定义 Socks5 代理", detail: "点击【添加代理】，类型选 SOCKS5，服务器填 127.0.0.1，端口填你的本地客户端端口（如 7890），无需账号密码。" },
      { name: "第三步：保存并开启【使用代理 (Use Proxy)】", detail: "勾选启动代理，下方状态变绿显示“已连接 (Connected)”即可。即使系统代理关闭，Telegram 依然能够独立正常通信。" }
    ]
  },
  {
    slug: "chrome-switchyomega",
    title: "浏览器代理扩展 ZeroOmega / SwitchyOmega 规则分流设置完全指南",
    seoTitle: "SwitchyOmega配置教程 - Chrome/Edge浏览器精细化分流插件指南 | VPN Top",
    description: "Chrome与Edge浏览器代理扩展SwitchyOmega (ZeroOmega) 实战教程。详解自动切换模式、PAC规则配置、情景模式搭建及公司内网免冲突设置。",
    lead: "在公司办公网络或高校内网，直接开全局代理经常导致企业内部 OA、内网 GitLab 断连。通过浏览器插件分流，只让指定海外网站走代理，是最优雅的工作模式。",
    category: "进阶开发者环境",
    steps: [
      { name: "第一步：在应用商店安装 ZeroOmega (SwitchyOmega分支)", detail: "在 Chrome 网上应用店搜索并安装兼容最新 Manifest V3 规范的 ZeroOmega 或 SwitchyOmega 插件。" },
      { name: "第二步：建立【代理】情景模式", detail: "新建情景模式命名为【Proxy】，代理协议选 SOCKS5（或 HTTP），服务器填 127.0.0.1，端口填 7890。" },
      { name: "第三步：配置【自动切换】情景模式并导入 gfwlist", detail: "在【自动切换】中，规则列表规则选【Proxy】，默认走【直接连接】。规则列表 URL 粘贴 gfwlist 订阅，点击立即更新，实现完全无感分流。" }
    ]
  },
  {
    slug: "subconverter-selfhost",
    title: "自建 Subconverter 订阅转换服务：保护隐私与节点重命名进阶技巧",
    seoTitle: "自建Subconverter订阅转换教程 - 保护节点隐私与防订阅泄露指南 | VPN Top",
    description: "Subconverter订阅转换自建教程。深入分析第三方在线转换的隐私窃取风险，手把手教你利用Docker自建私有转换API并自定义策略组规则。",
    lead: "很多新手图方便把机场订阅贴到公共在线转换平台，极易导致专属订阅被中间人抓包爬取偷跑流量。自建私有 Subconverter 服务是保护账号安全的关键一步。",
    category: "进阶开发者环境",
    steps: [
      { name: "第一步：理解公共订阅转换的隐私风险", detail: "第三方在线 API 可以轻易记录每一个请求的订阅 URL，一旦泄露，他人可在任何地方拉取你的节点，消耗你的流量甚至导致账号被服务商封禁。" },
      { name: "第二步：使用 Docker 一键启动私有 Subconverter", detail: "在云服务器或本地 NAS 执行 docker run -d -p 25500:25500 tindy2013/subconverter:latest 即可启动私有轻量转换引擎。" },
      { name: "第三步：通过私有 API 进行格式转换", detail: "在请求参数中直接引用 http://localhost:25500/sub?target=clash&url=你的订阅链接，整个过程完全在私有环境完成，0 隐私风险。" }
    ]
  }
];

function generateGuidesFull() {
  const depth = 2;
  const rel = '../../';

  // 1. Generate individual guide pages
  allGuides.forEach(g => {
    const crumbs = [
      { name: "使用教程", url: "guides/index.html" },
      { name: g.title.split('：')[0], url: "" }
    ];

    const content = `
    <article class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <span class="badge badge-verified" style="margin-bottom:10px;">${g.category}</span>
        <h1 class="article-title">${g.title}</h1>
        <div class="article-meta">
          <span>📅 更新时间：2026年11月</span>
          <span>💻 适用环境：${g.category}</span>
          <span>⏱️ 阅读时长：约 5-8 分钟实操</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>💡 教程导读与核心目的</span>
        </div>
        <p style="color:var(--text-muted); font-size:1rem; line-height:1.7;">
          ${g.lead}
        </p>
      </div>

      <div class="article-content">
        <h2>图文实操步骤分解</h2>
        ${g.steps.map((st, i) => `
        <div style="background-color:#fff; border:1px solid var(--border); border-radius:var(--radius-md); padding:20px; margin:20px 0;">
          <h3 style="margin-top:0; color:var(--secondary); font-size:1.15rem;">${st.name}</h3>
          <p style="margin-bottom:0; color:var(--text-main); font-size:0.98rem; line-height:1.7;">
            ${st.detail}
          </p>
        </div>
        `).join('')}

        <h2>常见报错排查技巧 (Troubleshooting)</h2>
        <p>
          <strong>1. 节点全部超时或 Ping 为 Timeout：</strong>
          首先检查电脑或手机的【系统时间】是否精确对齐网络标准北京时间。时间偏差超过 90 秒会导致 TLS 握手彻底失败。其次检查订阅链接是否已过期或流量耗尽。
        </p>
        <p>
          <strong>2. 能打开 Google 但微信图片加载不出来：</strong>
          说明误开启了【全局代理 (Global)】模式。请在代理设置中切换回【规则 (Rule)】模式，让国内流量自动绕过代理走本地直连。
        </p>
        <p>
          <strong>3. 提示 Port already in use 端口被占用：</strong>
          通常是由于旧的客户端后台进程没有退出彻底，或与其他加速器冲突。在任务管理器中结束对应进程，或在设置中将端口从 7890 修改为 7892 即可解决。
        </p>

        <div class="notice-box">
          <strong>还没有好用的机场节点？</strong>
          客户端只是工具外壳，网络速度的核心取决于机场节点的质量。推荐查看我们的 <a href="${rel}ranking/overall/index.html">2026 优质VPN机场综合实力排行榜</a> 或 <a href="${rel}ranking/value/index.html">高性价比专线梯子推荐</a>。
        </div>

        <div class="related-posts">
          <h3>更多新手教程与平台指南</h3>
          <div class="related-grid">
            <a href="${rel}guides/windows/index.html" class="related-card">
              <h4>🖥️ Windows 配置教程</h4>
              <span>Clash Verge 实战</span>
            </a>
            <a href="${rel}guides/android/index.html" class="related-card">
              <h4>📱 Android 配置教程</h4>
              <span>Clash Meta 手机端</span>
            </a>
            <a href="${rel}guides/ios/index.html" class="related-card">
              <h4>🍏 iOS 小火箭配置</h4>
              <span>Shadowrocket 指南</span>
            </a>
            <a href="${rel}guides/clash-meta/index.html" class="related-card">
              <h4>🛠️ Clash Meta 内核进阶</h4>
              <span>分流规则与 DNS 优化</span>
            </a>
          </div>
        </div>
      </div>
    </article>`;

    const html = renderPage({
      title: g.seoTitle,
      description: g.description,
      canonicalPath: `/guides/${g.slug}/`,
      depth: 2,
      activeNav: "guides",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile(`guides/${g.slug}/index.html`, html);
  });

  // 2. Generate Guides Hub Index Page (guides/index.html)
  {
    const crumbs = [{ name: "使用教程中心", url: "" }];

    // Group guides by category
    const categories = {};
    allGuides.forEach(g => {
      if (!categories[g.category]) categories[g.category] = [];
      categories[g.category].push(g);
    });

    const content = `
    <div class="container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">新手翻墙教程中心：全平台全设备保姆级配置手册</h1>
        <div class="article-meta">
          <span>📚 教程总数：30 篇详尽指南</span>
          <span>💻 覆盖平台：Windows · Android · iOS · macOS · 软路由 · 电视盒 · 游戏主机</span>
          <span>⚡ 特性：纯原创图文排版，杜绝生硬机器翻译</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>🎯 教程中心导航指南</span>
        </div>
        <p style="color:var(--text-muted); font-size:1rem; line-height:1.7;">
          无论你是在 Windows/Mac 电脑上查阅海外文献，在 iPhone/Android 手机上追剧看番，在 Apple TV/索尼电视上看 4K Netflix，还是在 Switch/PS5 主机上联机游戏，下方 30 篇针对性教程均能提供一步到位的操作指引。
        </p>
      </div>

      ${Object.keys(categories).map(catName => `
      <section style="margin:40px 0;">
        <h2 style="font-size:1.45rem; font-weight:700; color:var(--secondary); margin-bottom:18px; padding-bottom:8px; border-bottom:2px solid var(--border);">
          📁 ${catName} (${categories[catName].length}篇)
        </h2>
        <div class="grid-cards">
          ${categories[catName].map(g => `
          <a href="./${g.slug}/index.html" class="card" style="text-decoration:none;">
            <div style="font-size:0.8rem; color:var(--primary); font-weight:700; margin-bottom:4px;">${g.category}</div>
            <h3 style="font-size:1.05rem; font-weight:700; color:var(--secondary); margin-bottom:8px; line-height:1.4;">${g.title}</h3>
            <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6; margin-bottom:12px;">${g.lead.slice(0, 95)}...</p>
            <div style="margin-top:auto; font-size:0.85rem; font-weight:600; color:var(--primary);">阅读完整实操教程 &rarr;</div>
          </a>
          `).join('')}
        </div>
      </section>
      `).join('')}

      <div class="notice-box" style="margin-top:40px;">
        <strong>需要好用的专线机场？</strong>
        欢迎前往我们的 <a href="../ranking/overall/index.html">2026 优质VPN机场综合实力排行榜</a> 查看最新实测排行，或者打开 <a href="../compare/index.html">机场横向对比工具</a> 并排比对各家资费。
      </div>
    </div>`;

    const html = renderPage({
      title: "新手翻墙教程中心 - Windows/Android/iOS/Mac/软路由完全配置指南 | VPN Top",
      description: "VPN Top新手翻墙教程中心。汇聚30篇全平台保姆级配置手册，涵盖Clash、Sing-box、小火箭、Surge、OpenWrt软路由、Apple TV及游戏主机跨服加速指南。",
      canonicalPath: "/guides/",
      depth: 1,
      activeNav: "guides",
      breadcrumbs: crumbs,
      schemaJson: null,
      content
    });

    saveHtmlFile('guides/index.html', html);
  }

  console.log(`[SUCCESS] Generated ${allGuides.length} guides + guides/index.html`);
}

module.exports = {
  allGuides,
  generateGuidesFull
};
