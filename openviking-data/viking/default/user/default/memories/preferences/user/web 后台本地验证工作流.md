- 改完 Web 后台页面后，用「本机就能打开、能证明改动生效」的验证环境，而非只看代码或构建通过；构建成功 ≠ 改动进了产物 ≠ 页面真能访问，每一步都要有可观测证据。
- 构建：`npm install -f` + `npm run build` 产出 `dist`。
- 核对产物：在 `dist/assets/js/<组件名>.js` 里搜新文案（如 TableBody.js 含「请勿上传pdf，注意控制图片大小！」），搜不到说明改动没进产物，别急着往下走。
- 建站：本地 nginx-ui 站点目录新增站点，命名带端口与项目简称（如 `site-8100-huishan-wuguan`），登记进 nginx-ui DB，站点根目录用 junction 指向本项目 `dist`（重构建后不用改站点配置）。
- 重载：先 `nginx -t` 通过再 reload。
- 验证：访问 `http://127.0.0.1:<端口>/`，确认返回 200 且 index.html 字节数符合预期（如 3972 字节）。
- 若页面需登录测试环境后端才能看到数据，把该前提写进交付说明，避免对方以为功能没实现。
- 复用同一底层组件的多处改动，只改最深层共享组件一处即可同时覆盖（如两处截图复用 AnnexContainer → TableBody，改 TableBody 一处同时覆盖两处）。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Web 后台本地验证工作流",
  "source_extraction_id": "242b85e4694845f1bad3189a38632eeb",
  "version": 1,
  "memory_type": "preferences"
}
-->