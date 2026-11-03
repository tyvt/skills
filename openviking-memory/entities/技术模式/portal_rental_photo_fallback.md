# 门户住房租赁人员弹窗证件照兜底
publicPortal 的 RentalDetailDialog 基本信息区 102×128 证件照位按多字段读取，失败展示 empty.svg。

## 实现规则
- URL 按多候选读取：`photo` / `photoUrl` / `avatar` / `headPortrait`
- 无 URL 或 `@error` 加载失败时展示 `/assets/images/empty.svg`（项目「暂未上传图片」规范）
- 切换人员或记录变更时重置加载失败状态
- 专用占位图可放 `public/assets/images/` 并改组件内 DEFAULT_PERSON_PHOTO 常量

## 验证与归属
- mock 无真实照片时 E2E 可断言 src 含 empty.svg
- 验证证据：截图标注「没照片放一张缺省图」；结论写明字段优先级、empty.svg 与 E2E 断言
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue、zhi2-web-admin/tests/e2e/public-portal-interactions.spec.ts、zhi2-web-admin/src/views/home/publicPortal/mock/rental.js
- 所属项目：门户；来源会话：44666f5e-377b-4054-95b9-ebfb3f53c03e；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_rental_photo_fallback",
  "source_extraction_id": "53c603737d434329a97690f706a618f0",
  "version": 1,
  "memory_type": "entities"
}
-->