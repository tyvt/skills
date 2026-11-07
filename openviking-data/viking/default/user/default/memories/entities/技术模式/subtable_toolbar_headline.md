# 子表工具栏迁入 Headline #right 规范
苏州市房地产监测V3 子表工具栏迁入 Headline #right 的待办已全部完成，统一子表操作按钮布局。

## 盘点与脚本
- 脚本：zhi2-web-admin/scripts/list-subtable-toolbar-in-content.mjs
- 当前扫描：212 个文件已符合规范；1 个仍为 NEEDS_MOVE：QualificationsForm.vue（机构备案向导，工具栏在 record-content 而非 Headline 子表，作特例保留）

## P0 与批量改造
- SupervisionTable.vue：Headline + #right 内「选择 / 删除」
- jgxm/detail.vue：去掉外层 Headline，改为 title-text="监管范围" 传给子表
- move-subtable-toolbar-to-headline-right.mjs --write 已改约 32 个子表组件
- 恢复 PayrollAccountTable.vue 的 <script>（listJffw / selectBuild / delJffw，字典 HOUSE_DELIVERY_TYPE）
- 修复 xmjf 相关组件

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：QualificationsForm.vue、SupervisionTable.vue、jgxm/detail.vue、PayrollAccountTable.vue
- 来源会话ID：35be263a-990d-4719-bbaf-de230fb45c4b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_toolbar_headline",
  "source_extraction_id": "d465aecbeb4342b69de5b9a977f1992c",
  "version": 1,
  "memory_type": "entities"
}
-->