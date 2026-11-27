---
title: OpenWrt安装OpenClash教程 - 软路由全屋无感翻墙与分流配置
description: OpenWrt软路由安装OpenClash插件完全指南。详解内核选择、Fake-IP模式调优、绕过大陆直连规则及全屋电视/手机/主机透明加速实操。
---

# OpenWrt 路由器安装 OpenClash 插件打造全屋翻墙软路由：保姆级教程

<div class="seo-badge">分类：路由器与旁路网关 · 2026最新保姆级实操</div>

::: info 核心导读
在软路由上部署代理，是实现全家人手机、电视盒、游戏机免装软件全自动翻墙的最优雅方案。OpenClash 是目前 OpenWrt 生态最成熟的插件。
:::


### 步骤 1：第一步：在 OpenWrt 安装依赖与 OpenClash IPK

通过 LuCI 界面上传 luci-app-openclash.ipk，或在终端通过 opkg update && opkg install 安装对应依赖并更新 Mihomo 核心。


### 步骤 2：第二步：创建配置文件并导入机场订阅

进入【服务】->【OpenClash】->【配置文件订阅】，添加新配置，填入订阅链接并保存更新。


### 步骤 3：第三步：运行模式选择【Fake-IP (TUN)】并启动

在通用设置中将模式选为 Fake-IP (TUN)，开启【本地 DNS 劫持】，保存并应用。全屋连接该 Wi-Fi 的设备即可直接无感访问外网。


---

::: tip 节点推荐与搭配
若您尚未选定合适的机场节点，欢迎查阅我们的 **[2026 优质VPN机场综合排行榜](/ranking/overall)** 或前往 **[横向对比工具](/compare/)** 并排查看资费。
:::
