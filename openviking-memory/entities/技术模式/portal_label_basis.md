# 门户 publicPortal 标签值列对齐用固定 flex-basis
publicPortal 表单项标签若仅用 min-width 会因长文案变宽导致值列不对齐，需改用固定 flex-basis 与许可弹窗行一致。

## 问题根因
- publicPortal 表单项用 dt/dd 或 .portal-detail-row 时，标签仅 flex:0 0 auto + min-width: var(--portal-form-label-width)
- 长文案标签会随内容变宽，dd 起始位置行与行不一致，text-align:left 不能保证「值成列」
- 标签仅用 min-width 时值列对齐弱于许可弹窗

## 修复方向
- 与许可弹窗行一致：flex: 0 0 var(--portal-form-label-width) 且 width/max-width 同值
- 桌面可 nowrap + 定宽，窄屏断点再 white-space:normal
- Fix 已对齐 PropertyDetailDialog

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：会话 03d20bf9 [HIGH] 标签仅用 min-width，值列对齐弱于许可弹窗；Fix 对齐 PropertyDetailDialog
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue；zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- 所属项目：门户；来源会话ID：03d20bf9-e86f-46c1-aa96-4b6f60f3e8f1；代码基线：门户 zhi2-web-admin @ e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_label_basis",
  "source_extraction_id": "53b97c16cee14d85a13ad8202c60d342",
  "version": 1,
  "memory_type": "entities"
}
-->