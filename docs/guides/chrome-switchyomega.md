---
title: SwitchyOmega配置教程 - Chrome/Edge浏览器精细化分流插件指南
description: Chrome与Edge浏览器代理扩展SwitchyOmega (ZeroOmega) 实战教程。详解自动切换模式、PAC规则配置、情景模式搭建及公司内网免冲突设置。
---

# 浏览器代理扩展 ZeroOmega / SwitchyOmega 规则分流设置完全指南

<div class="seo-badge">分类：进阶开发者环境 · 2026最新保姆级实操</div>

::: info 核心导读
在公司办公网络或高校内网，直接开全局代理经常导致企业内部 OA、内网 GitLab 断连。通过浏览器插件分流，只让指定海外网站走代理，是最优雅的工作模式。
:::


### 步骤 1：第一步：在应用商店安装 ZeroOmega (SwitchyOmega分支)

在 Chrome 网上应用店搜索并安装兼容最新 Manifest V3 规范的 ZeroOmega 或 SwitchyOmega 插件。


### 步骤 2：第二步：建立【代理】情景模式

新建情景模式命名为【Proxy】，代理协议选 SOCKS5（或 HTTP），服务器填 127.0.0.1，端口填 7890。


### 步骤 3：第三步：配置【自动切换】情景模式并导入 gfwlist

在【自动切换】中，规则列表规则选【Proxy】，默认走【直接连接】。规则列表 URL 粘贴 gfwlist 订阅，点击立即更新，实现完全无感分流。


---

::: tip 节点推荐与搭配
若您尚未选定合适的机场节点，欢迎查阅我们的 **[2026 优质VPN机场综合排行榜](/ranking/overall)** 或前往 **[横向对比工具](/compare/)** 并排查看资费。
:::
