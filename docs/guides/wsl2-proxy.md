---
title: WSL2共享Windows代理教程 - 解决Linux子系统无法翻墙网络问题
description: Windows WSL2子系统代理配置攻略。解析WSL2虚拟网卡独立IP机制，通过Mirrored镜像网络模式或nameserver脚本实现子系统无缝科学上网。
---

# Windows WSL2 子系统共享宿主机 Clash 代理网络配置实战教程

<div class="seo-badge">分类：进阶开发者环境 · 2026最新保姆级实操</div>

::: info 核心导读
WSL2 采用独立的 Hyper-V 虚拟化架构，其内部与宿主机不在同一个网络命名空间。掌握正确的网关转发配置是每个在 Windows 上做开发人员的必备功底。
:::


### 步骤 1：第一步：在 Windows 端客户端开启【允许局域网连接】

确保 Clash Verge 的 Allow LAN 开启，这样 WSL2 虚拟网卡才能访问宿主机的 7890 端口。


### 步骤 2：第二步：在 ~/.wslconfig 开启 Mirrored 镜像网络（Windows 11 首选）

在 Windows 用户目录下编辑 .wslconfig，写入 [experimental] networkingMode=mirrored，重启 WSL 后直接共享宿主机 127.0.0.1 端口。


### 步骤 3：第三步：旧版系统通过脚本获取宿主机网关 IP

如果使用的是旧版 Windows 10，在 ~/.bashrc 中提取 /etc/resolv.conf 中的 nameserver 作为宿主机 IP 自动注入 http_proxy 即可。


---

::: tip 节点推荐与搭配
若您尚未选定合适的机场节点，欢迎查阅我们的 **[2026 优质VPN机场综合排行榜](/ranking/overall)** 或前往 **[横向对比工具](/compare/)** 并排查看资费。
:::
