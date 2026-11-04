# AppendixEmpty 路径不正确且未注册

在项目 苏州市房地产监测V3 中，`AppendixEmpty` 位于 `src/components/AppendixEmpty/index.vue`，但有些文件错误地引用它，导致 Vite 错误。

## 问题根因
- `AppendixEmpty` 实际位于 `src/components/AppendixEmpty/index.vue`
- `conLandLic/detail.vue` 和 `conLandLic/changeDetail.vue` 引入了不存在的 `@/components/AnnexUpload/components/AppendixEmpty.vue`
- `AppendixPackageSection/index.vue` 在模板中使用了 `AppendixEmpty` 但未注册它，导致 Vite 错误

## 解决方案
- 将这两个文件中的引用改为 `@/components/AppendixEmpty/index.vue` （与 `presale/surveyChange/detail.vue` 保持一致）
- 在 `AppendixPackageSection/index.vue` 中添加对组件 `AppendixEmpty` 的导入和注册

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/067.md
- 涉及文件: conLandLic/detail.vue, conLandLic/changeDetail.vue, AppendixPackageSection/index.vue, presale/surveyChange/detail.vue, AppendixEmpty/index.vue, presale/permitCancel/detail.vue, companyAdmin/detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: 3e018025-42b0-4579-8189-908990fe5d69; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_empty_fix",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 1,
  "memory_type": "entities"
}
-->