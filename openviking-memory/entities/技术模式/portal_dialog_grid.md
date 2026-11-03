# 公示详情弹窗网格标签竖排修复
publicPortal 租赁/开业类详情弹窗在 CSS Grid 双列布局中沿用「标签固定约150px + 值区flex」行内结构，半列宽度不足导致长文本逐字竖排。

## 问题根因
- 租赁/开业类详情弹窗在双列网格中仍用标签固定约150px + 值区flex的行内结构
- 半列可用宽度不足，长文本被挤成逐字竖排

## 解决方案
- 企业基本信息改为四列网格（标签 | 值 | 标签 | 值），值列用 minmax(0, 1fr) 并允许正常换行
- 经营范围等整行字段单独占满整行
- 人员/信用等区块改用 rental-field-row，值区域 flex:1 且 min-width:0

## 验证与归属
- 验证证据：会话 89cd2e8d 用户反馈「开业信息公示→基本信息」排版问题，根因是双列网格每字段仍用标签150px+flex导致半列不够
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue、zhi2-web-admin/src/views/home/publicPortal/portal.scss
- 所属项目：门户；来源会话ID：89cd2e8d-f0c3-42b4-8c98-dd51867d7a1f；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dialog_grid",
  "source_extraction_id": "cfc726e98b9447b3be6480bf5186e90f",
  "version": 1,
  "memory_type": "entities"
}
-->