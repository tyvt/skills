# ImageUpload误传数组file-type致报错
苏州市房地产监测V3 的 AgencyPersonnelDetail 向 ImageUpload 误传数组 file-type，导致 allowedTypes 为 undefined 并调用 .join('/') 报错，移除传参修复。

## 问题根因
- `ImageUpload/index.vue` 的 `file-type` 仅接受字符串映射内置类型列表
- `AgencyPersonnelDetail.vue` 误传数组导致 `allowedTypes` 计算为 undefined 并调用 `.join('/')` 报错

## 修复方案
- 移除错误 `file-type` 传参（默认 image 涵盖 png/jpg/jpeg）
- 自定义后缀应改用 `accept-types` 属性

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/129.md
- 涉及文件：src/components/ImageUpload/index.vue、src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：9449756e-c27f-4b6f-8d25-58ca3b632943；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "imageupload_filetype_bug",
  "source_extraction_id": "07c2d7124c274e7c976432390b07e669",
  "version": 1,
  "memory_type": "entities"
}
-->