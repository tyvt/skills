# 区域概览字段未纳入 contentInfo 致变更记录缺失
淮安物管 zhi2-web-admin 中 complexChange/detail.vue 区域概览字段仅在模板渲染，未纳入 contentInfo* 计算属性，导致变更记录缺失。
## 问题现象
- complexChange/detail.vue 的区域概览字段（如占地面积）只在模板渲染，未注册到 contentInfo* 计算属性。
- changeRecordMixins 的 allChangeContentInfo 无法收集这些字段，自动变更对比记录缺失。
## 修复方案
- 新增 contentInfo3 计算属性，注册占地面积等区域概览字段，供自动对比收集。
## 涉及文件
- zhi2-web-admin/src/views/property/complexChange/detail.vue
- zhi2-web-admin/src/mixins/changeRecordMixins.js
- zhi2-web-admin/src/utils/contentInfoChange.js
- zhi2-web-admin/src/views/property/complex/detail.vue
- zhi2-web-admin/src/views/property/propertyContract/components/detail.vue
- zhi2-web-admin/src/components/change-record-dialog/change-record-dialog.vue
## 验证与归属
- 所属项目：淮安物管
- 验证证据：extracted source=cursor project=淮安物管
- 来源会话：3badcbf0-1f78-46b6-adad-d5ac25a98bda；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "区域概览字段未纳contentInfo",
  "source_extraction_id": "14c4f7c09ae048a298848ab2771b6290",
  "version": 1,
  "memory_type": "entities"
}
-->