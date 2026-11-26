# 安卓端查看整改通知书异常与返回路由错误
苏州住房防汛 C 端移动查询 H5 中「查看整改通知书」在 iOS 正常、Android 打不开且返回误回首页的缺陷，2026-11-26 完成定位与应用内预览页改造。

## 问题与根因
- 现象：Android 点「查看整改通知书」打不开；返回后直接回首页，而非物业检查对应 checkType 列表。
- 根因：H5 在 Android 用 `<a download>`，常无法打开预览；误走 `window.open` 裸链会 401 并被路由带回首页。
- iOS 原走 `previewFileWithAuth`，下载/预览行为与改前一致。

## 方案确认
- 2026-11-26 方案审查通过并获用户确认后开始实施。
- Android 改用应用内预览页：`navigateTo` + 带鉴权 blob iframe 拉取 PDF；返回用 `navigateBack` 回到对应 checkType 列表，栈空时 `redirectTo` 带 checkType 到项目检查列表。

## 代码实施
- `src/utils/request.ts` 新增 `isAndroidH5Agent`、`buildAuthedApiUrl`、`fetchAuthedBlob`。
- 新增 `src/pages/project-check/notice-preview/index.vue`；`src/pages.json` 注册预览页。
- `src/pages/project-check/records/index.vue` 的 `goNotice` 在 H5 且 Android 时 `navigateTo` 预览页。
- 测试同步：`tests/e2e/bug-mobile-notice-preview.spec.ts`、`tests/is-mobile-pdf-agent.test.ts`；2026-11-26 `npm run build:h5` 成功。

## 路径参数与验证排查
- 2026-11-26：`path` 查询参数在 hash 路由下丢失，导致预览页报「通知书地址无效」，改用 Playwright 完成验证。
- 根因：H5 直达 URL 时 `path` 未传入 `onLoad`（与 `uni.navigateTo` 不同）；已添加 hash 查询回退。
- 2026-11-26 8150 排查：可能仍用旧 dist、列表 mock 响应形状可能不对，正在核对 `request` 的 `raw` 处理；8150 未监听且无对应 nginx 片段、站点掉线，改为从注册表生成站点配置并重载 nginx，并用系统 Chrome 跑 Playwright 验证。

## 验证与待办
- 本机 nginx 8095 未监听，未能跑 agent-browser/Playwright 实机截图；待部署最新 dist 后验证 Android 预览与返回、iOS 不变。
- 灰区：部分 Android WebView 对 iframe blob PDF 支持差，可能需改 PDF.js 或系统 openDocument。
- 待定：是否提交推送、是否回写禅道（若有单号）；部署面板本项目 local 为 8150，与常用 e2e 8095 不一致，需确认实际访问地址。
- 计划文件：`D:/plan/苏住房防汛C端/android-notice-preview-20261126.md`。

<!-- MEMORY_FIELDS
{
  "category": "缺陷",
  "name": "android_notice_preview",
  "source_extraction_id": "89e35c9ee1de4879a6c3d5e5488bdccb",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->