# 变更记录业务状态默认「全部」（苏住房G）
苏住房G 物业管理区域下「变更记录」页（complexChange/index.vue）已将业务状态默认筛选改为「全部」。

## 改动说明
- `queryParams.bizState` 由 `'2'`（已备案）改为 `undefined`，首屏与「重置」后不再默认按已备案过滤
- 业务状态筛选项 `placeholder` 改为 `'全部'`，未选择时显示「全部」
- 改动与物业管理区域主列表一致，代码评审结论为可合并
- 若仍显示「已备案」，多为 `listMixins` 对该路由缓存了旧条件，点一次「重置」或用无痕窗口即可看到新默认

## 涉及文件
- zhi2-web-admin/src/views/property/complexChange/index.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：eda79046-a5b1-4099-8173-ae204ff4ad2f；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_change_bizstate_default",
  "source_extraction_id": "e4b9221bd0ea4bf6b2dde95d6d303034",
  "version": 1,
  "memory_type": "entities"
}
-->