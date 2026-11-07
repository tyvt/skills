# 全站图片上传上限 10MB 默认化
园区公共收益项目客户要求附件统一仅图片且上限 10MB 时，改 ImageUpload 组件默认 fileSize 并对业务弹窗显式传值。

## 改动方案
- 将 ImageUpload 默认 fileSize 从 5 调整为 10（未传 file-size 的页面一并生效）
- 租赁申请/公共场地等关键弹窗再显式 :file-size="10" 避免遗漏
- 提示文案随组件默认显示「大小不超过 10MB，格式为 png/jpg/jpeg」

## 例外保留
- 已单独配置更小上限的页面（如平台 Logo 1MB、注册页 5MB）保持原 props 不变
- 全站切换前若曾按场景分流文档上传，需与客户确认是否所有入口都改为 ImageUpload

## 验证与归属
- 用户诉求：「可以都改为 imageupload」「图片限制都改为10MB」
- 涉及文件：zhi2-web-admin/src/components/ImageUpload/index.vue、zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subVenueDialog.vue、zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subAdvertiseDialog.vue、zhi2-web-admin/src/views/benefit/pubVenue/components/venueDialog.vue
- 所属项目：园区公共收益；来源会话ID：6d0d4a75-b40f-4a8d-835d-d20d317c84ca；代码基线：fc47501

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "image_10mb_default",
  "source_extraction_id": "265d1891016b4a6484b2371a245ed467",
  "version": 1,
  "memory_type": "entities"
}
-->