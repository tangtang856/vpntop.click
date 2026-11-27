---
title: Sing-box Mac电脑配置教程 - macOS平台高性能代理分流设置
description: Mac电脑Sing-box安装与配置完全教程。涵盖Homebrew命令行部署、图形化客户端SFM使用以及针对Mac生态的DNS防泄漏配置策略。
---

# Sing-box macOS 平台配置指南：命令行与图形界面深度调优

<div class="seo-badge">分类：桌面端系统 · 2026最新保姆级实操</div>

::: info 核心导读
Mac 开发者偏爱高效的系统服务。Sing-box 在 macOS 上通过 launchd 作为系统后台守护进程运行，能够提供极其沉浸且不占用状态栏空间的透明代理。
:::


### 步骤 1：第一步：选择图形版或命令行安装

新手推荐使用 SFM (Sing-box for Mac) 图形客户端，高阶极客可通过 brew install sing-box 通过终端配置。


### 步骤 2：第二步：配置 config.json 出站规则

将机场给出的配置导入，在 inbound 中开启 mixed 混合协议端口（如 7890）或配置 tun 虚拟网卡。


### 步骤 3：第三步：验证终端与浏览器网络畅通

在终端输入 curl -I https://google.com 确认返回 HTTP 200，说明透明代理已完全就绪。


---

::: tip 节点推荐与搭配
若您尚未选定合适的机场节点，欢迎查阅我们的 **[2026 优质VPN机场综合排行榜](/ranking/overall)** 或前往 **[横向对比工具](/compare/)** 并排查看资费。
:::
