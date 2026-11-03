# 大屏数据沙盒页 transform 双比例缩放
数据沙盒类页面用 transform: scale 适配视口时，只缩 X 会导致纵向溢出，需拆 layoutScaleX/Y 且 Y=min(1, 视口/设计高)。

## 问题根因
- 数据沙盒类页面（fundPanorama/assetPanorama）按 1920 设计稿用 transform: scale 适配视口
- 侧边栏展开收起改变内容区宽度时，若整块等比缩放，图标会随侧栏一起放大缩小，不符合「侧栏只影响宽度」的预期
- 改成 scale(sx, 1) 只缩横向后，设计稿量算高度 designMeasuredH 大于 calc(100vh - 顶栏) 可视高度时会纵向溢出
- 单一 scale 无法同时满足「横向跟宽度、纵向跟视口高度」两个独立约束

## 解决方案
- 拆成两个比例仍用一套 transform：layoutScaleX 只跟内容区宽度（侧栏主要改这个）
- layoutScaleY = min(1, viewportH / designMeasuredH)，只有内容比视口高时才小于 1，视口够高时恒为 1
- stage 高度同步写成 h*sy 与 scale(sx,sy) 视觉一致
- 折中：高度紧张时 sx≠sy 图标会略有非等比变形，若不可接受需切 min(sx,sy) 等比分支

## 验证与归属
- 验证：会话 77a735af 用户反馈侧边菜单展开收起会等比放大图标、随后高度溢出；最终在 fundPanorama 拆 layoutScaleX/layoutScaleY 双比例解决
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；代码基线：f00310232；来源会话：77a735af-afdd-4ef8-b842-d6aea8630229

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "sandbox_scale_split",
  "source_extraction_id": "045a65d55d4b439cb1758c87ddea6f9a",
  "version": 1,
  "memory_type": "entities"
}
-->