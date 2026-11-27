# Bing Webmaster Tools 操作与配置完全指南

本指南专为 **vpntop.click** 量身定制，指导站长如何利用微软 Bing Webmaster Tools（必应站长平台）进行站点验证、Sitemap 提交、IndexNow 监控及搜索流量优化。

---

## 一、站点添加与所有权验证

由于本站使用纯静态 HTML 架构并准备部署在 Cloudflare Pages / GitHub 上，支持以下两种最便捷的验证方式：

### 方法 1：XML / 文本文件验证（推荐，最快）
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters) 并使用微软账户登录。
2. 在左上角点击 **添加站点 (Add Site)**，输入完整正式域名：`https://vpntop.click/`。
3. 选择 **手动验证 -> BingSiteAuth.xml 验证**。
4. 下载系统给出的 `BingSiteAuth.xml` 文件，将其直接放置在网站根目录下（或复制其内部的 `<xml>...</xml>` 文本保存为 `BingSiteAuth.xml`）。
5. 部署上线后，点击页面上的 **验证 (Verify)** 按钮。

### 方法 2：DNS CNAME / TXT 记录验证
1. 在 Cloudflare DNS 管理控制台中，添加一条由 Bing 给出的 TXT 记录或 CNAME 记录。
2. 记录传播后（通常 1-2 分钟内生效），返回 Bing 站长平台点击验证。

---

## 二、Sitemap（网站地图）提交

1. 在 Bing 站长平台左侧导航栏点击 **Sitemaps (站点地图)**。
2. 在右上角点击 **提交站点地图 (Submit Sitemap)**。
3. 输入本站的正式 Sitemap 地址：
   ```text
   https://vpntop.click/sitemap.xml
   ```
4. 点击提交后，状态将显示为“正在处理 (Processing)”，通常在 24-48 小时内变更为“成功 (Success)”，显示已发现的 URL 数量（共 37 个公开页面）。

---

## 三、IndexNow 实时推送验证

本站已完整集成 IndexNow 协议模块，无需等待爬虫被动抓取：
- **API Key**：`f23cb41920784260a48b5e98586909cb`
- **公钥文件路径**：`https://vpntop.click/f23cb41920784260a48b5e98586909cb.txt`
- **推送命令**：`npm run indexnow`

### 在 Bing 平台核查 IndexNow：
1. 在 Bing 站长平台左侧导航栏，点击 **IndexNow** 菜单。
2. 页面中会列出最近通过 API 成功推送的 URL 列表、接收时间戳与 HTTP 响应状态码（202 Accepted）。
3. **特别提示**：IndexNow 成功接收代表 Bing 爬虫调度器已收到更新通知并提高抓取优先级，并不等于 100% 页面已建立索引缓存，实际收录进度取决于页面质量与 Bing 配额。

---

## 四、URL Inspection（网址检查）

当发布了新的重要测评或核心排行榜时：
1. 在 Bing 站长平台顶部搜索框直接粘贴目标 URL（例如 `https://vpntop.click/ranking/overall/`）。
2. 点击回车进行深度诊断，系统将显示：
   - 是否在 Bing 索引中（Index Status）
   - 上次成功抓取时间与 HTTP 状态（200 OK）
   - 是否存在 Schema.org 结构化标记解析错误
   - 移动端适配友好度
3. 若页面为最新更新，点击 **请求编入索引 (Request Indexing)** 提交快速抓取队列。

---

## 五、Search Performance（搜索效果监测）

本站主攻 Bing 关键词为：
- `机场推荐`
- `机场节点`
- `性价比机场`
- `梯子推荐`
- `vpn`
- `vpn机场`
- `vpn节点`
- `vpn推荐`

在 **搜索表现 (Search Performance)** 报表中：
1. 观察上述 8 个主攻关键词的**展示量 (Impressions)**、**点击量 (Clicks)** 与 **平均点击率 (CTR)**。
2. 关注平均排名（Position）的变动趋势，重点分析排名在 11-20 位之间的词条，通过补充相关博客内链与专题聚合将关键词推进至前 10 位。

---

## 六、Crawl Issues 与日常维护

- 每周定期查看 **Crawl Control (抓取控制)** 与 **Crawl Errors (抓取错误)**，确保无 404 死链或 5xx 服务器异常。
- 保证 `robots.txt` 和 `sitemap.xml` 始终健康可达。
