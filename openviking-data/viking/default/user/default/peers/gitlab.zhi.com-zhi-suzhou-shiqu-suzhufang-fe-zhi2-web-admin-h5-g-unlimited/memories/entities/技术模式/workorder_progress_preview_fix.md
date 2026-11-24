# 工单进度图片点击预览失效修复
苏住房G（zhi2-web-admin）修复报修/报事工单详情「任务进度」图片点击无法预览的问题（禅道缺陷 6921，类型为 codeimprovement）。

## 问题与根因
- 缺陷 6921：报修/报事工单详情的任务进度图片需支持点击放大预览
- `WorkOrderProgress.vue` 第 72-77 行用 `@click="previewImages(item)"` 渲染进度图片并设 `cursor:pointer`
- `previewImages()`（第 272-277 行）调用 `this.$viewerApi(...)`，但 `$viewerApi` 在项目内从未注册（无插件、无依赖），点击静默失败
- 项目真实预览链路为 `this.$store.dispatch('preview/openPreview', { urlList, currentIndex })`，由 App.vue 中全局 `<image-viewer>` 渲染，`ZsImg` 也使用该机制

## 修复要点
- 模板 `v-for="(url, index) in getAttachmentList(item)"` 把 index 传入 `previewImages`，保证与缩略图一一对应
- `previewImages` 改用 `preview/openPreview` 派发，携带 urlList 与 currentIndex，并加空列表、越界等边界保护
- 不筛选空 URL，避免预览列表与页面缩略图索引错位
- 改动仅涉及 `WorkOrderProgress.vue`，报修与报事详情共用该进度组件

## 验证与环境
- 修复后 ESLint 通过、`npm test` 通过、生产构建 exit 0（约 49 秒）
- 本地站点：nginx 站点 `苏住房G.conf` 把 `http://localhost:8101` 指向项目 dist 构建产物
- 登录需用户名、密码与图形验证码；8080 网关不可用时改用 8101 页面登录并 OCR 识别验证码
- 所属项目：苏住房G（zhi2-web-admin）；禅道缺陷 ID：6921

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "workorder_progress_preview_fix",
  "source_extraction_id": "e2b71bab353941999db6eeb0de924d44",
  "version": 1,
  "memory_type": "entities"
}
-->