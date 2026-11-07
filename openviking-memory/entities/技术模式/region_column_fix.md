# 机构注销列表行政区划列显示修复
苏州市房地产监测V3 项目中修复了「入网注销 → 机构注销列表」行政区划列全部显示为 `-` 的问题。

## 问题原因
- 列表列绑定的字段为 `administrativeArea`，但接口中该字段为 `null`
- 实际区划编码在 `provinceCityArea`（如 `320500`）
- `formatRegion` 只读 `administrativeArea`，导致整列显示 `-`

## 修复内容
- 文件 `zhi2-web-admin/src/views/company/companyCancel/index.vue`
- 列表列与「选择机构」弹窗改为以 `provinceCityArea` 为主字段展示
- 新增 `resolveRegionCode`：在 `administrativeArea` 为空时回退到 `provinceCityArea`，并处理空字符串
- 仍先走经纪机构字典 `ECONOMIC_INSTITUTIONS_REGION`，再走 `fullRegionFormatter` / 区划树

## 涉及文件
- `zhi2-web-admin/src/views/company/companyCancel/index.vue`
- `zhi2-web-admin/src/views/company/companyRegister/index.vue`
- `路由信息.js`

## 验证与归属
- 刷新列表后 `320500` 应显示为对应区划名称（如苏州市）；若仍不对需确认本地 `common/getRegions` 区划数据已加载
- 所属项目：苏州市房地产监测V3；来源会话：bd5fafe3-fa56-452c-ba9a-70e37c9c2fd4；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_column_fix",
  "source_extraction_id": "aff9df126aa24c699d3457e4ec4b1263",
  "version": 1,
  "memory_type": "entities"
}
-->