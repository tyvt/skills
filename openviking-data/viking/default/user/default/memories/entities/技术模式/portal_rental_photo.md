# 门户租赁详情证件照失败态
RentalDetailDialog 证件照区在 record.id 不变仅更换 photo/photoUrl 字段时，先前加载失败态不会重置，导致一直显示占位图。

## 问题根因
- 证件照区使用多字段回退 URL，`@error` 置 `personPhotoFailed`，默认 `/assets/images/empty.svg` 可避免占位图死循环
- 若 `watch` 只监听 `record.id`，同一 id 仅更换 `photo`/`photoUrl` 等字段时，先前加载失败会一直显示占位图

## 修复方向
- 打开详情时重置 `personPhotoFailed`
- 或 watch 相关 URL 字段一并清零失败态

## 验证与归属
- 验证证据：审查结论 id 变化重置合理，同 id 换图字段不重置为 MEDIUM 回归风险
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue
- 所属项目：门户；来源会话ID：89c2fd86-be6c-45b3-89d6-1c7e023daba7；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_rental_photo",
  "source_extraction_id": "dd05c04674b048bf80a36b361c86a7fd",
  "version": 1,
  "memory_type": "entities"
}
-->