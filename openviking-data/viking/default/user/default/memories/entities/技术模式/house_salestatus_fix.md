# 选房弹窗销售状态归一修复
苏州市房地产监测V3 项目中，houseLimitConstants.js 与 HouseSelectDialog.vue 已按 Vue 审查完成销售状态（saleStatus）字段归一与展示对齐。

## 已做修改
- 在 `houseLimitConstants.js` 增加 `resolveHouseSaleStatus`（`saleStatus ?? sale_status`），`isHouseSold`、`normalizeHouseLimitLineRow` 均调用该函数
- `HouseSelectDialog.normalizeHouse` 写入归一后的 `saleStatus`，保证 `dict-tag` 与 `isHouseSelectable` 一致
- 修正注释：已售判定不再误写为「字典 sale_status 字段」
- 对 `HouseSelectDialog.vue` 执行 `eslint --fix`，格式类 error 已清除（保留 2 条既有 `el-form-item` 警告，未改业务结构）

## 未做项
- 选房表格仅展示销售状态、不展示「限制中」——当前靠勾选禁用表达限制态；加 `has_limit` 列需产品确认（审查 MEDIUM）

## 涉及文件与验证
- `houseLimitConstants.js`、`HouseSelectDialog.vue`
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：f742546b-5fa1-4c38-be7c-f50d9d083f69

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_salestatus_fix",
  "source_extraction_id": "49b89a2862454eb7a8ec7d3ff1097f82",
  "version": 1,
  "memory_type": "entities"
}
-->