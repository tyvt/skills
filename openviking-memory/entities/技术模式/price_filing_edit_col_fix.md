
# 价格备案编辑/新增表单栅格修复
苏州市房地产监测V3 修复价格备案（苏州）编辑/新增表单中「单位面积成本」与「所属片区」栅格不对齐问题。

## 原因
- 编辑/新增表单里「单位面积成本」用了 `lg="16"` / `xl="16"`，在大屏上占两格
- 同一行「所属片区」只占一格，导致该行缺一格、输入框被拉宽

## 修改内容
- 在 `recordPriceMngSuzhou/detail.vue` 中改为与其它基本信息字段一致，使用 `v-bind="FORM_COL_THREE"`（一行三列，每字段占 1/3 宽）
- 查看模式里 `buildBaseContentInfo` 本来就是 `DETAIL_COL_THREE`，无需改动
- 刷新后「所属片区」与「单位面积成本」并排各占一格，「承诺车位售价」等字段按三列栅格正常换行
- 若需在「所属片区」后留空白占位格（只占布局、不显示字段），可再加占位 `el-col`

## 涉及文件
- zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：c17eb850-8da8-45be-8e07-7991bc836b23；验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_filing_edit_col_fix",
  "source_extraction_id": "23307535f6ae434f939ec78293727547",
  "version": 1,
  "memory_type": "entities"
}
-->