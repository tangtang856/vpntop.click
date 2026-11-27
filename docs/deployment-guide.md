# Cloudflare Pages 与 GitHub 部署指南

本指南指导如何将 **vpntop.click** 完整部署至 Cloudflare Pages，享受全球 CDN 秒级加速与自动化持续部署（CI/CD）。

---

## 架构优势与设计原则

根据项目规范与最终优化指令：
- **纯 HTML + 原生 CSS**：零重型框架依赖，无复杂打包膨胀，冷启动速度极快。
- **100% 标准相对路径**：页面内所有 CSS、JS、图片及内部超链接均使用严格相对路径（如 `css/style.css`、`../../css/style.css`、`../ranking/overall/index.html`），确保在本地直接双击（`file://` 协议）或部署上线后均能完美加载与跳转。
- **Bing SEO 强化**：全站预生成 Canonical 绝对规范地址、Schema 结构化标记、Sitemap 与 IndexNow 推送模块。

---

## 一、推送至 GitHub 远程仓库

1. 检查当前本地分支与远程关联：
   ```bash
   git status
   git remote -v
   ```
   已绑定远程仓库：`https://github.com/tangtang856/vpntop.click`

2. 提交全部代码并推送到 GitHub：
   ```bash
   git add .
   git commit -m "feat: complete professional Bing SEO Chinese airport review portal with pure HTML architecture"
   git push -u origin main
   ```

---

## 二、在 Cloudflare Pages 上创建并绑定项目

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2. 在左侧菜单中选择 **Workers 和 Pages (Workers & Pages)**。
3. 点击 **创建应用程序 (Create Application)** -> **Pages** -> **连接到 Git (Connect to Git)**。
4. 授权 GitHub 账户并选择仓库 `tangtang856/vpntop.click`。
5. 配置构建预设（Build Settings）：
   - **项目名称**：`vpntop`
   - **生产分支 (Production Branch)**：`main`
   - **框架预设 (Framework preset)**：`None`（或者选择静态 HTML）
   - **构建命令 (Build command)**：`npm run build`（或者直接留空，因为根目录本身即为完整纯静态站点）
   - **构建输出目录 (Build output directory)**：`/`（项目根目录）
6. 点击 **保存并部署 (Save and Deploy)**。
7. Cloudflare Pages 将自动拉取代码并在 30 秒内完成全球边缘分发。

---

## 三、配置自定义域名 (vpntop.click)

1. 在 Cloudflare Pages 项目的 **自定义域 (Custom Domains)** 标签页中，点击 **设置自定义域 (Set up a custom domain)**。
2. 输入正式域名：`vpntop.click`（以及可选的 `www.vpntop.click`）。
3. 按照提示在 Cloudflare DNS 中激活（若域名已在 Cloudflare 解析，系统将自动添加 CNAME 记录并配置全站免费 SSL/TLS 证书）。
4. 开启 **始终使用 HTTPS (Always Use HTTPS)** 与 **自动缩小 (Auto Minify HTML/CSS/JS)**，进一步提升加载性能。

---

## 四、本地预览与双击测试 (file://)

由于本站严格执行了相对路径规范：
- 您可以直接用鼠标双击任意 HTML 文件（如 `index.html` 或 `ranking/overall/index.html`），在浏览器地址栏显示 `file:///...` 状态下正常浏览全部页面，CSS 样式、表格与页面跳转均完美呈现。
- 也可以通过轻量 HTTP 服务预览：
  ```bash
  npx serve .
  ```
