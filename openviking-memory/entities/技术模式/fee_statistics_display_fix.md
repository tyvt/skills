# 收费统计颜色与金额显示修复
泰兴小程序收费统计页金额显示为0、收缴率无主题色的问题已修复，通过新增归一化工具统一接口结构。

## 改动要点
- 新增 `src/staff/utils/statisticsFee.js`，提供 `normalizeFeeStatistics()`，将接口 `fee` 统一为 `{ house, area, money }` 结构，兼容嵌套对象与顶层扁平字段（如 `receivableAmount`、`houseCollectionRate`）。
- 更新 `src/pages/staff/statistics/index.vue`：`fee` computed 接入归一化，解决卡片读 `fee.house` 而接口返回扁平字段导致显示 0 的问题。
- 卡片 UI：`<strong>` 改为 `<text class="fee-value">` / `<text class="rate-value rate-value--*">`，收缴率分别显示橙/蓝/绿主题色。
- 欠缴分析：`arrearsOption` 改为读取 `fee.money.receivableAmount` / `unpaidAmount`。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`src/staff/utils/statisticsFee.js`、`src/pages/staff/statistics/index.vue`、`src/staff/api/statistics.js`、`src/staff/utils/formatter.js`、`src/pages_property/chargeSituation/index.vue`。
- 来源会话ID：1a7fcd5e-e97f-49e6-aa2f-13a3b608f6e4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_statistics_display_fix",
  "source_extraction_id": "d0b95a1ac762463e87faf215f6601357",
  "version": 1,
  "memory_type": "entities"
}
-->