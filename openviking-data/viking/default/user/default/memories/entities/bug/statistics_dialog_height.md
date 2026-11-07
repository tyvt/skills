# 综合查询弹窗高度过长修复
产品2.0 物业管理区域备案详情页点击「综合查询」弹窗高度超出视口，已修复。

## 问题根因
- 问题在 `StatisticsDialog.vue`（综合查询弹窗组件），非 `detail.vue` 本身
- `zs-dialog` 按内容自动计算高度，四个区块（开发企业、物业服务企业、物管会、业委会）数据多时超出视口，标题栏和关闭按钮被顶出屏幕

## 修复方案
- 弹窗整体 `max-height: 88vh`，不超过视口
- 内容区 `.dialog-box` 设 `overflow-y: auto`，超出部分弹窗内滚动
- 标题栏固定顶部，关闭按钮始终可见

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：cursor 会话 fe6a9c71 提取，刷新后点击综合查询验证
- 涉及文件：zhi2-web-admin/src/views/property/complex/detail.vue、zhi2-web-admin/src/views/property/complex/components/StatisticsDialog.vue
- 所属项目：产品2.0；来源会话：fe6a9c71-d8dc-4321-9d4d-34e4729e5e46；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "statistics_dialog_height",
  "source_extraction_id": "f665265909c84349965a107959cf0fa9",
  "version": 1,
  "memory_type": "entities"
}
-->