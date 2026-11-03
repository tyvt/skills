# 上传区按标题栏左内边距对齐
苏州市房地产监测V3 的 zhi2-web-admin 中标题栏含 padding-left:12px 而上载区原贴左，新增 requirement-column 同列排版并将上传区设 margin-left:12px 对齐。

## 变更内容
- 标题栏含 `padding-left: 12px` 而上载区原贴左，致虚线框较标题文字偏左
- 新增 `requirement-column` 同列排版，上传区设 `margin-left: 12px` 对齐
- 清除 `el-upload` 列表外边距并统一标题栏最小宽度与缩略图列宽

## 涉及文件
- `zhi2-web-admin/src/components/AnnexUpload/components/AppendixRequirementCard.vue`
- `zhi2-web-admin/src/styles/appendix-requirement-grid.scss`
- `zhi2-web-admin/src/views/projectManagement/buildinginfo/components/BuildingCertificateDisplayGrid.vue`
- `zhi2-web-admin/src/components/AnnexUpload/components/AppendixRequirementGrid.vue`
- `zhi2-web-admin/src/components/AnnexUpload/components/AppendixFileThumbnail.vue`
- `zhi2-web-admin/src/components/ImageUpload/index.vue`
- `zhi2-web-admin/package.json`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/144.md
- 来源会话ID：01e8df3d-6c81-47b3-9085-07a3082b51b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "upload_margin_align",
  "source_extraction_id": "d2f3bc9cdf3c4c72be8ab951414c7c0b",
  "version": 2,
  "memory_type": "entities"
}
-->