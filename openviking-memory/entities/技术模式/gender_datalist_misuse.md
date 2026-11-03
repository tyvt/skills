# 性别选择器误用data-list致个人信息不显
泰兴小程序 personal-info.vue 中性别选择器误用 :data-list 属性，项目其他模块使用统一属性名，导致性别数据无法渲染。
## 问题根因
- personal-info.vue 性别选择器误用 :data-list 属性。
- 项目其他模块使用统一属性名，导致性别数据无法渲染。
## 解决方案
- 将属性名修正为项目统一规范。
## 验证与归属
- 验证证据：src=泰兴小程序/019.md
- 涉及文件：src/staff/pages/profile/personal-info.vue、src/components/ZsPicker/ZsPicker.vue、src/staff/store/user.js、src/pages/staff/profile/index.vue、src/pages.json、.workbuddy/memory/2026-09-11.md、src/staff/api/security.js、src/utils/responseDecrypt.js
- 来源会话ID：f1d75e40-8380-4c8e-b5ee-a2b53b5dc865
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gender_datalist_misuse",
  "source_extraction_id": "3035b0b609d145a6af09e8f9d214d24d",
  "version": 1,
  "memory_type": "entities"
}
-->