# 上传区12px左缩进对齐标题栏
苏州市房地产监测V3 中通过调整上传区左边距与标题栏内边距对齐，修正虚线框偏左问题。

## 问题背景
- 标题栏含 12px `padding-left` 致上传框原贴列最左时虚线框较文字偏左

## 变更要点
- 新增 `requirement-column` 使标题与上传区同列
- 上传区施加 `margin-left: 12px` 对齐标题文字起点
- 去除 `el-upload` 列表额外外边距、统一标题栏最小宽度与缩略图列宽

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/131.md
- 涉及文件：AppendixRequirementCard.vue、appendix-requirement-grid.scss、BuildingCertificateDisplayGrid.vue、AppendixRequirementGrid.vue、AppendixFileThumbnail.vue、ImageUpload/index.vue、package.json
- 所属项目：苏州市房地产监测V3；来源会话：01e8df3d-6c81-47b3-9085-07a3082b51b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "upload_area_indent_align",
  "source_extraction_id": "09055bdcd2ed47b8927899ce1b85cc24",
  "version": 1,
  "memory_type": "entities"
}
-->