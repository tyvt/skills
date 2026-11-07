# Grid上传回调默认值null触发prop警告
苏州市房地产监测V3 的 zhi2-web-admin 中只读路径下 AppendixRequirementGrid 默认回调为 null，绑定至 Card 触发警告。

## 问题根因
- 只读路径下 AppendixPackageSection 使用 AppendixRequirementGrid 未传 onBeforeUpload 等回调
- 原默认 null 绑定至 AppendixRequirementCard 触发 Expected Function, got Null 警告

## 修复方案
- AppendixRequirementGrid.vue 新增 appendixUploadNoop 与 appendixBeforeUploadNoop
- 将相关回调默认值改为 noop
- 编辑态 AnnexUpload 仍传真实 handler 保持行为不变

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/285.md
- 涉及文件：AnnexUpload/components/AppendixRequirementCard.vue、companyManagement/components/DeveloperBasicInfoDetail.vue、AnnexUpload/components/AppendixRequirementGrid.vue、AppendixPackageSection/index.vue、AnnexUpload/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：fe17d399-463d-45e5-9c19-4d7ebc506fcd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "grid_upload_null_callback",
  "source_extraction_id": "f1c4654c51974fa2a2a5c10e8aeed237",
  "version": 1,
  "memory_type": "entities"
}
-->