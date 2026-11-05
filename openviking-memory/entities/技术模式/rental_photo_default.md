# 住房租赁从业人员证件照缺省图
住房租赁从业人员信息公示「基本信息」弹窗补齐右上角证件照区域，无照片时显示项目内缺省图。

## Description
- 场景：住房租赁→从业人员信息公示「基本信息」弹窗需显示证件照，缺图时放缺省图
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue；E2E public-portal-interactions.spec.ts
- 来源会话ID：44666f5e-377b-4054-95b9-ebfb3f53c03e；所属项目：门户

## Solution
- RentalDetailDialog.vue 增加 102×128 照片位（与截图红框位置一致）
- 优先使用记录中的 photo/photoUrl/avatar/headPortrait
- 无 URL 或图片加载失败显示缺省图 /assets/images/empty.svg（UI 规范「暂未上传图片」）
- 切换人员或记录变更时重置加载失败状态

## Verification
- E2E 断言照片 src 包含 empty.svg（当前 mock 数据无真实照片）
- 本地刷新 portal=rental-staff 点任一行「基本信息」即可看到缺省图

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rental_photo_default",
  "source_extraction_id": "9a10764b0dbe4c0daf38f8e33312cb75",
  "version": 1,
  "memory_type": "entities"
}
-->