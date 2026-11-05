# 首页租赁机构弹窗布局修复
门户首页租赁机构相关弹窗（开业信息公示 → 基本信息）原双列网格布局导致数值竖排，已改为四列网格等修复方案。

## 问题根因
- 双列网格里每个字段仍用「标签固定 150px + flex」，半列宽度不够，数值被挤成竖排

## 调整方式
- 企业基本信息改为四列网格（标签 | 值 | 标签 | 值），值列使用 minmax(0, 1fr) 并允许正常换行
- 经营范围单独一行两列
- 人员 / 信用详情改为 rental-field-row，值区域 flex: 1 + min-width: 0

## 涉及文件与归属
- d:\repository\门户\zhi2-web-admin\src\views\home\publicPortal
- d:\repository\门户\zhi2-web-admin\src\views\home\publicPortal\PortalDialogHost.vue
- d:\repository\门户\zhi2-web-admin\src\views\home\UnifiedLogin.vue
- 所属项目：门户；来源会话ID：89cd2e8d-f0c3-42b4-8c98-dd51867d7a1f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rental_popup_layout",
  "source_extraction_id": "a6275ba127694256b7356f71babb6ee3",
  "version": 1,
  "memory_type": "entities"
}
-->