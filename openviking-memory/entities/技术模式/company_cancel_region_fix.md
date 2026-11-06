# 机构注销列表行政区划列修复
苏州市房地产监测V3 项目修复了「入网注销 → 机构注销列表」行政区划列显示为 `-` 的问题。

## 问题原因
- 列表行政区划列绑定 `administrativeArea`，但接口中该字段为 `null`
- 实际区划编码在 `provinceCityArea`（如 `320500`）
- `formatRegion` 只读 `administrativeArea`，导致整列显示为 `-`

## 修复内容
- 文件：`zhi2-web-admin/src/views/company/companyCancel/index.vue`
- 列表列与「选择机构」弹窗改为以 `provinceCityArea` 为主字段展示
- 新增 `resolveRegionCode`：在 `administrativeArea` 为空时回退到 `provinceCityArea`，并处理空字符串
- 仍先走经纪机构字典 `ECONOMIC_INSTITUTIONS_REGION`，再走 `fullRegionFormatter` / 区划树

## 验证与归属
- 刷新列表后，`320500` 应显示为对应区划名称（如苏州市）；若仍不对，确认本地 `common/getRegions` 区划数据已加载
- 所属项目：苏州市房地产监测V3；来源会话：bd5fafe3-fa56-452c-ba9a-70e37c9c2fd4；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_region_fix",
  "source_extraction_id": "014112f6aff74aea9baf732337ff8e1f",
  "version": 1,
  "memory_type": "entities"
}
-->