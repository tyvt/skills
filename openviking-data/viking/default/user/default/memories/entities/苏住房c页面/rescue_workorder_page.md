# 求援工单页面
苏住房防汛C端移动 H5 的求援工单列表、填报与详情页面，2026-11-24 从原型式 mockup 改造为真实 H5 页面。

## 改造前状态
- 原 `rescue-workorder/index.vue` 为原型 mockup：居中 390×844 设备框、`screenStack` 伪页面栈、`navigationStyle:custom`，无真实路由。
- 详情照片为硬编码占位，使用 `v-for="n in 3"` 和 `.shot-art`，没有 `<img>`，导致图片不显示。

## 改造内容（2026-11-24）
- `pages.json` 改为标准 page header，并新增填报页与详情页路由。
- `index.vue` 重写为真实列表页，使用正常路由跳转，底部填报按钮固定且不溢出。
- 新增填报页与详情页，顶部同样贴顶处理，详情页接入真实图片渲染。

## 验证状态
- 基线构建与改造后构建均成功，退出码 0。
- 前端验证因接口 401、API mock 未生效、列表空态而受阻，截图证据未产出，用户未确认，代码未提交或推送。
- 成本交接文档：`D:\plan\苏住房防汛C端\HANDOFF-CHAIN-求援工单原型页真实H5化-hop1-20261124-0913.md`。


<!-- MEMORY_FIELDS
{
  "category": "苏住房C页面",
  "name": "rescue_workorder_page",
  "source_extraction_id": "6618fe9891cc4f0d9d625d1c190be3e5",
  "version": 1,
  "memory_type": "entities"
}
-->