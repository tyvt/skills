# 移除人员详情中的冗余照片提示
在项目 zhi2-web-admin 中，移除了 AgencyPersonnelDetail.vue 中手动添加的照片提示段落。

## 变更
- 移除 `AgencyPersonnelDetail.vue` 中手动添加的 `<p class="photo-tip">`
- 保留 `ImageUpload` 组件中的 `el-upload__tip` 提示
- 样式仅保留 `.appendix-tip`；校验 `rules.photo` 保持不变

## 文件
- src/components/ImageUpload/index.vue
- src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- src/mixins/form.js
- src/views/institution/agencyPersonnel/components/AgencyPersonnelList.vue

## 验证
- 会话: a49c2c35-e07c-4746-8286-a944b2d7a666

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_photo_tip",
  "source_extraction_id": "a4c1b4b28e954766b9f8128b10303b6f",
  "version": 1,
  "memory_type": "entities"
}
-->