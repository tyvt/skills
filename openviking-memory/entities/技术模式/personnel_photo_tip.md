# 移除人员详情中的冗余照片提示
在项目 zhi2-web-admin 中，移除了 AgencyPersonnelDetail.vue 中手动添加的照片提示段落。

## 变更
- 移除 `AgencyPersonnelDetail.vue` 中手动添加的 `<p class="photo-tip">`
- 保留 `ImageUpload` 组件中的 `el-upload__tip` 提示
- 样式仅保留 `.appendix-tip`；校验 `rules.photo` 保持不变
- 当 `ImageUpload` 的 `file-size="5"` 时，`el-upload__tip` 显示规格说明
- 验证路径：经纪机构管理 → 从业人员信息 → 编辑/新增，确认「个人证件照」下方仅一行提示

## 文件
- src/components/ImageUpload/index.vue
- src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- src/mixins/form.js
- src/views/institution/agencyPersonnel/components/AgencyPersonnelList.vue

## 验证
- 会话: a49c2c35-e07c-4746-8286-a944b2d7a666
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_photo_tip",
  "source_extraction_id": "6a00dea484364694864f56aa0b0b9ba2",
  "version": 2,
  "memory_type": "entities"
}
-->