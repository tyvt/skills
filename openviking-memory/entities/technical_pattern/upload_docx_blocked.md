# 上传组件包含校验误拦docx且旧类型未热更新
苏州市房地产监测V3 中上传组件旧 `:fileType` 未热更新且扩展名模糊匹配，致配置 doc 时误拦 docx。

## 问题根因
- `FjDialog.vue` 旧 `:fileType` 未热更新，提示仅 png/jpg/jpeg/pdf
- `StandaloneAppendixField/index.vue` 使用 `normalized.includes(fileExtension)` 致配置 doc 时误拦 docx

## 解决方案
- `FjDialog.vue` 模板上传改为 `templateUploadFileTypes` 包含 png/jpg/jpeg/pdf/doc/docx
- `StandaloneAppendixField/index.vue` 扩展名改为精确匹配 `fileExtension === normalized`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/097.md
- 涉及文件：tool/fjflpz/components/FjDialog.vue、zs-file-upload/zs-file-upload.vue、StandaloneAppendixField/index.vue、tool/fjflpz/index.vue、AnnexUpload/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a1629f-1e1d-70c5-a400-75728aadabaf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "upload_docx_blocked",
  "source_extraction_id": "e144584a2db34952bb1d629f14ca179b",
  "version": 1,
  "memory_type": "entities"
}
-->