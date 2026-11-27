---
title: Docker部署Clash教程 - 局域网透明代理与轻量容器化网关搭建
description: Docker容器化部署Clash/Mihomo教程。详解docker-compose编写、Host网络模式挂载、外部Web控制面板（Yacd）对接与开机自启。
---

# 利用 Docker 容器部署 Mihomo / Clash 打造内网代理服务器

<div class="seo-badge">分类：进阶开发者环境 · 2026最新保姆级实操</div>

::: info 核心导读
对于拥有 NAS、树莓派或家庭小型 Linux 服务器的用户，利用 Docker 容器化运行代理，既不需要刷路由器，又能提供全天候稳定的局域网 HTTP/Socks5 出口。
:::


### 步骤 1：第一步：编写 docker-compose.yml 配置文件

创建 clash 目录，编写基于 metacubex/mihomo 镜像的 compose 文件，映射 7890 端口与 web 仪表板端口。


### 步骤 2：第二步：挂载 config.yaml 机场配置文件

将下载好的机场配置放置在宿主机的挂载卷目录下，核对外部控制端口 secret 密钥。


### 步骤 3：第三步：启动容器并通过浏览器 Web UI 管理

执行 docker-compose up -d 启动，在局域网浏览器输入 http://IP:9090 即可图形化切换节点与查看流量。


---

::: tip 节点推荐与搭配
若您尚未选定合适的机场节点，欢迎查阅我们的 **[2026 优质VPN机场综合排行榜](/ranking/overall)** 或前往 **[横向对比工具](/compare/)** 并排查看资费。
:::
