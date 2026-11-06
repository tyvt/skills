# 详情页两列不等分全局修复
苏州市房地产监测V3 中开发企业入网确认和从业人员管理详情页「封闭设施」两列不等分，已在 detail-template.vue 全局修复。

## 原因
- 同一行两个字段 span 不同：小区主入口 `span: 8`（1/3），主入口位置 `span: 16` + `keepSpan`（2/3）
- `getItemStyle` 按 `flex: itemSpan / totalRowSpan` 分配宽度，出现 1:2 不等分

## 全局修复（detail-template.vue）
- `getItemStyle`：一行两个有效字段时强制 `flex: 1 1 0`，各占 50%
- `normalizeDetailSpan`：历史 `span: 8` 与 `span: 16 + keepSpan` 统一归一为 `span: 12`，保证两列换行逻辑

## 页面数据清理
- auxiliaryProject/detail.vue（小区配套用房）：去掉 `wideLayout` / `keepSpan`，封闭设施改标准两列
- PermitPlanPanel.vue、AgencyPersonnelDetail.vue 等同步清理

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话ID：8938ed10-af4c-44bf-8d0c-5e1178985b2e
- 涉及文件：detail-template.vue、auxiliaryProject/detail.vue、PermitPlanPanel.vue、AgencyPersonnelDetail.vue

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "v3_two_col_fix",
  "source_extraction_id": "ffad441a88ee4d7980bb4a86cbbef7dd",
  "version": 1,
  "memory_type": "entities"
}
-->