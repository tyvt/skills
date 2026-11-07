# 门户许可详情mock与列表行合并缺字段
门户 publicPortal 中 PropertyDetailDialog 用 permitDisplay 合并独立预览用的 mockPermit 与列表行 record。

## 问题根因
- 当 propertyPermits（或后续 API 行数据）缺少 expiryDate、supervisionBank、accountNumber、residentialCount 等字段时，合并逻辑让这些项继续显示 mock 常量（例如套数恒为 64）
- 与当前行的 issueDate、area 等同屏展示不一致

## 修复方向
- 列表详情的数据源（propertyPermits / API 层）补齐与独立预览同结构字段
- 或合并时仅对「行上明确缺失且业务允许兜底」的字段用 mock，行级字段禁止用全局 mock 回填
- 单独改 notices.js 只影响 permit-detail 独立预览，不能替代列表详情数据

## 验证与归属
- 验证证据：会话 5983c99f 审查 [HIGH] 列表点开详情时字段与 mock 混用；propertyPermits 无多字段会沿用 mockPermit
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue、zhi2-web-admin/src/views/home/publicPortal/mock/properties.js、zhi2-web-admin/src/views/home/publicPortal/mock/notices.js
- 所属项目：门户；来源会话ID：5983c99f-13e3-4b40-9938-495cc42f24ff；代码基线：门户 zhi2-web-admin @ e1f8e0b（2026-10-20）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_permit_mock",
  "source_extraction_id": "ae068e827ad74504ac580e2a7560d494",
  "version": 1,
  "memory_type": "entities"
}
-->