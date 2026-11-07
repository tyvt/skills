# 价格参数是否停用选项修复
苏州市房地产监测V3 中修复了价格参数「是否停用」单选按钮因字典缺失而不显示的问题。

## 原因
- 「是否停用」使用 `el-radio-group`，选项来自字典 `operating_status`
- 该字典在系统里未配置（全项目仅此一处引用），`getDicts` 返回空数组，导致只有标签无单选按钮

## 修改内容
- 新增 `statusOptions.js`：固定 `status` 含义（`0` 未停用 / `1` 已停用），详情用「否/是」，列表「启用状态」用「启用/停用」
- `detail.vue` 使用上述选项，`disabled` 放在 `el-radio-group` 上（字段只读展示，新增默认「否」）
- `index.vue` 列表列字典与详情语义一致

## 验证与归属
- 刷新新增页后，「是否停用」显示「否 / 是」，默认选中「否」；若线上无显示需重新构建部署
- 所属项目：苏州市房地产监测V3
- 涉及文件：`statusOptions.js`、`detail.vue`、`index.vue`（路径：`commercialHousingSales/priceFiling/priceParameters/`）
- 来源会话ID：2600de34-532b-4e6e-ab9b-42f3de743190
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_parameters_status_fix",
  "source_extraction_id": "e69a9aaf65ce4fd18a27899f934dccdf",
  "version": 1,
  "memory_type": "entities"
}
-->