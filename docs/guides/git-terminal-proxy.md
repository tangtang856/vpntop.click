---
title: 程序员终端命令行代理配置教程 - Git/Curl/Homebrew秒开加速
description: 程序员必备终端代理配置指南。手把手教你配置终端 http_proxy 环境变量、Git socks5 代理、Homebrew 克隆提速与 SSH 别名隧道。
---

# 程序员终端命令行 Git / Curl / Wget 走机场代理加速完全配置

<div class="seo-badge">分类：进阶开发者环境 · 2026最新保姆级实操</div>

::: info 核心导读
很多开发者电脑上明明开着代理，但在终端中执行 git clone、npm install 或 pip install 时依然超时报错。本文提供一键开关终端代理的终极方案。
:::


### 步骤 1：第一步：在终端配置临时环境变量

在 Bash / Zsh 终端中执行：export http_proxy=http://127.0.0.1:7890; export https_proxy=http://127.0.0.1:7890 即可让当前窗口走代理。


### 步骤 2：第二步：设置 Git 专属全局代理

执行 git config --global http.proxy http://127.0.0.1:7890，克隆 GitHub 代码仓库速率瞬间拉满至几十 MB/s。


### 步骤 3：第三步：在 ~/.zshrc 或 ~/.bashrc 写入一键函数

编写 proxy_on 和 proxy_off 快捷命令别名，敲入命令随用随开，告别手动复制长环境变量。


---

::: tip 节点推荐与搭配
若您尚未选定合适的机场节点，欢迎查阅我们的 **[2026 优质VPN机场综合排行榜](/ranking/overall)** 或前往 **[横向对比工具](/compare/)** 并排查看资费。
:::
