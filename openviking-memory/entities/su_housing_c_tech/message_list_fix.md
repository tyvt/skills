# 消息列表页面布局修复
苏住房C小程序消息列表页面布局错位已修复，对齐参考图样式。

## 问题根因
- 列表项图标、标题、标签同行，摘要单独占行导致摘要跑到图标下方未与标题对齐
- 标题与日期挤同行，业务标题易被挤压或不显示

## 修复要点
- 左侧：铃铛图标 + 未读红点
- 右侧内容区：第一行业务标题 + 「系统推送」标签 + 时间；第二行摘要内容
- 调整标题字重（600）和间距使样式一致
- 若标题仍不显示需排查字典 `msg_bus_code_H5` 未加载完成

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_main/message/message.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：1b6b9470-2d5b-4ade-a9e6-8d19594ebac4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "message_list_fix",
  "source_extraction_id": "28e8d98968314a9086db1bb85f1eddd6",
  "version": 1,
  "memory_type": "entities"
}
-->