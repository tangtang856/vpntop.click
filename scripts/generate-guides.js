const { DOMAIN, renderPage, saveHtmlFile } = require('./template.js');

function generateGuides() {
  const depth = 2;
  const rel = '../../';

  const guides = [
    {
      slug: "windows",
      title: "Windows 电脑机场客户端配置教程：Clash Verge Rev 保姆级实操",
      seoTitle: "Windows电脑机场客户端配置教程 - Clash Verge Rev与Sing-box实战 | VPN Top",
      description: "2026年Windows电脑科学上网完全指南。手把手教你下载、安装并配置开源客户端Clash Verge Rev，实现机场订阅一键导入与国内网站智能分流。",
      lead: "Windows 平台目前最受推荐的现代化客户端是基于 Mihomo 内核的 Clash Verge Rev。界面优雅，内存占用低，完美支持智能分流与系统代理模式。",
      steps: [
        {
          name: "第一步：获取可靠的开源客户端安装包",
          detail: "建议直接从 GitHub 官方发布页下载 Clash Verge Rev 的 64位 Windows 安装包（.exe 或便携免安装版本）。切勿在未经核实的第三方下载站下载，以防植入木马。"
        },
        {
          name: "第二步：复制服务商订阅链接",
          detail: "登录您的机场后台，在仪表盘找到【便捷导入】或【订阅链接】，复制专属的 Clash / Clash.Meta 订阅 URL。"
        },
        {
          name: "第三步：导入订阅并更新节点",
          detail: "打开 Clash Verge Rev，点击左侧【订阅 (Profiles)】，在顶部输入框粘贴订阅 URL，点击【保存/导入】。软件将自动拉取最新的节点列表与分流规则。"
        },
        {
          name: "第四步：选择规则分流模式与主力节点",
          detail: "进入左侧【代理 (Proxies)】页面，模式推荐选择【规则 (Rule)】，这样访问国内网站（百度、淘宝、B站）将直连不消耗流量，访问海外受限网站自动走代理。选择延迟低于 50ms 的香港或日本节点作为主力。"
        },
        {
          name: "第五步：开启系统代理 (System Proxy)",
          detail: "在主界面右下角或【设置】中勾选【系统代理】开关，即可畅享高速海外网络加速。"
        }
      ]
    },
    {
      slug: "android",
      title: "Android 手机梯子客户端配置教程：Clash Meta 与 v2rayNG 快速入门",
      seoTitle: "安卓手机科学上网教程 - Clash Meta与v2rayNG新手快速上手 | VPN Top",
      description: "安卓手机机场客户端配置教程。图文详解Clash Meta for Android (CMFA) 与 v2rayNG 的下载安装、订阅导入、分流设置与电池后台常驻保活技巧。",
      lead: "Android 系统的开放性使其拥有丰富的客户端选择。对于新手，我们首推界面简洁且支持现代化 Mihomo 内核的 Clash Meta for Android。",
      steps: [
        {
          name: "第一步：安装 Clash Meta for Android APK",
          detail: "从开源仓库或本站可靠镜像下载最新的 APK 文件完成安装。初次打开时授予其创建本地 VPN 连接的系统网络权限。"
        },
        {
          name: "第二步：在手机端导入订阅",
          detail: "进入应用主页，点击【配置】&rarr;【新配置】&rarr;【从 URL 导入】。填入机场提供的订阅链接，命名后点击右上角保存并拉取配置。"
        },
        {
          name: "第三步：选择节点并启动核心",
          detail: "返回主界面，点击刚刚导入的配置使其生效。在【代理】列表中挑选测速优异的节点，点击主页的【点击启动】大按钮。"
        },
        {
          name: "第四步：开启应用分流与电池白名单保活",
          detail: "由于安卓系统激进的杀后台策略，务必在系统设置中将客户端加入【电池无限制/后台运行白名单】，防止锁屏后断开连接。"
        }
      ]
    },
    {
      slug: "ios",
      title: "iOS 平台机场梯子配置教程：Shadowrocket (小火箭) 与 Loon 新手实操",
      seoTitle: "iPhone/iPad 翻墙教程 - Shadowrocket小火箭与Surge配置图解 | VPN Top",
      description: "苹果iPhone与iPad科学上网新手教程。教你如何准备美区Apple ID购买Shadowrocket (小火箭)，并完成订阅一键导入、规则配置与按需连接设置。",
      lead: "受 App Store 区域政策限制，iOS 端翻墙工具需要使用美区或港区等海外 Apple ID 下载。目前生态最为成熟、普及率最高的工具是 Shadowrocket（俗称小火箭）。",
      steps: [
        {
          name: "第一步：获取海外 Apple ID 并下载小火箭",
          detail: "退出 App Store 当前账号，登录海外 Apple ID（切勿在 iCloud 登录以免锁机），搜索 Shadowrocket（售价约 2.99 美元）下载安装。"
        },
        {
          name: "第二步：导入机场订阅",
          detail: "打开 Safari 浏览器登录机场后台，点击【一键导入 Shadowrocket】，或者手动在小火箭首页右上角点击【+】，类型选择【Subscribe】，粘贴订阅链接完成更新。"
        },
        {
          name: "第三步：设置全局路由为【配置 (Config)】",
          detail: "在小火箭底部将全局路由选为【配置】，保证大陆 IP 直连，避免国内微信和网银支付异常。"
        },
        {
          name: "第四步：连接并信任 VPN 配置描述文件",
          detail: "轻触顶部连接开关，系统会弹窗提示添加 VPN 配置，输入锁屏密码授权后即可连通。"
        }
      ]
    },
    {
      slug: "macos",
      title: "macOS 平台机场节点设置指南：兼顾规则分流与系统增强模式",
      seoTitle: "Mac电脑科学上网教程 - Clash Verge与Surge Mac保姆级指南 | VPN Top",
      description: "Mac苹果电脑科学上网指南。详解Clash Verge macOS版安装、Apple芯片与Intel原生适配、TUN增强模式配置以及终端命令行代理技巧。",
      lead: "Mac 用户不仅需要浏览器代理，更常涉及终端命令行（Git、Homebrew、Docker）加速。选用支持 TUN 增强模式的客户端能够实现系统级完全透明代理。",
      steps: [
        {
          name: "第一步：根据芯片类型下载 DMG 安装包",
          detail: "确认你的 Mac 是 Apple Silicon（M1/M2/M3/M4）还是 Intel 处理器，下载对应的 arm64 或 x64 版 Clash Verge Rev 并拖入 Applications 目录。"
        },
        {
          name: "第二步：导入订阅并配置自动更新",
          detail: "在【Profiles】界面填入订阅链接，建议将定时自动更新间隔设置为 24 小时，以便服务商更换失效节点时本地能够自动同步。"
        },
        {
          name: "第三步：配置 TUN 虚拟网卡模式（解决终端代理难题）",
          detail: "在【设置】中安装 Service Mode 服务模式并开启【TUN Mode】，这样系统所有非 Web 流量（包括终端 git clone 和远程 SSH）都会被自动代理接管。"
        }
      ]
    },
    {
      slug: "clash-meta",
      title: "Clash Meta (Mihomo) 内核规则分流与高级设置详解",
      seoTitle: "Clash Meta (Mihomo) 内核规则分流与高级设置详解 | VPN Top",
      description: "Clash Meta (Mihomo) 进阶教程。深度解析 Rule Provider 分流规则集、DNS 防污染防泄漏设置、Hysteria2与Vless现代协议支持技巧。",
      lead: "Mihomo（原 Clash.Meta）是目前开源社区最强大、维护最活跃的分流代理内核。掌握其高级配置能彻底杜绝 DNS 泄漏并极致优化访问速度。",
      steps: [
        {
          name: "第一步：理解 Rule-Providers 动态规则集",
          detail: "通过引入外部 YAML 规则文件（如 Loyalsoldier 或 ACL4SSR），可以让国内顶级域名、Steam 游戏加速和 AI 服务走不同的指定策略组。"
        },
        {
          name: "第二步：配置 fake-ip 与 DNS 防污染",
          detail: "将 dns.mode 设置为 fake-ip，并配置境外 DoH（如 Cloudflare 1.1.1.1 或 Google 8.8.8.8），有效规避运营商 DNS 投毒并缩短首包响应时间。"
        },
        {
          name: "第三步：针对 ChatGPT 与 Claude 的专项路由策略",
          detail: "为 OpenAI 相关域名单独设立策略组，强制指定具有原生住宅 IP 的美国或新加坡节点，避免随意漂移触发风控。"
        }
      ]
    }
  ];

  guides.forEach(g => {
    const crumbs = [
      { name: "使用教程", url: "guides/windows/index.html" },
      { name: g.title.split('：')[0], url: "" }
    ];

    const content = `
    <article class="container article-container" style="padding-top:40px; padding-bottom:60px;">
      <div class="article-header">
        <h1 class="article-title">${g.title}</h1>
        <div class="article-meta">
          <span>📅 更新时间：2026年11月</span>
          <span>💻 操作系统：${g.slug.toUpperCase()}</span>
          <span>⏱️ 阅读时长：约 5 分钟实操</span>
        </div>
      </div>

      <div class="quick-answer-card">
        <div class="quick-answer-header">
          <span>💡 教程导读</span>
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

        <div class="notice-box">
          <strong>还没有好用的机场节点？</strong>
          客户端只是工具外壳，网络速度的核心取决于机场节点的质量。推荐查看我们的 <a href="${rel}ranking/overall/index.html">2026 优质VPN机场综合实力排行榜</a> 或 <a href="${rel}ranking/value/index.html">高性价比专线梯子推荐</a>。
        </div>

        <div class="related-posts">
          <h3>相关平台与进阶教程推荐</h3>
          <div class="related-grid">
            <a href="${rel}guides/windows/index.html" class="related-card">
              <h4>🖥️ Windows 客户端实操指南</h4>
              <span>Clash Verge 配置图解</span>
            </a>
            <a href="${rel}guides/android/index.html" class="related-card">
              <h4>📱 Android 客户端保姆级教程</h4>
              <span>Clash Meta / v2rayNG</span>
            </a>
            <a href="${rel}guides/ios/index.html" class="related-card">
              <h4>🍏 iOS 小火箭配置指南</h4>
              <span>美区ID与订阅导入</span>
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
}

module.exports = {
  generateGuides
};
