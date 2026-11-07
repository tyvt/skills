# 绑定到 Card 的默认 null 回调触发类型检查警告
在 Suzhou Real Estate Monitoring V3 (zhi2-web-admin) 项目中，在只读路径下，`AppendixPackageSection` 使用 `AppendixRequirementGrid.vue` 时未传递 callbacks，而绑定到 `AppendixRequirementCard` 的默认 null 触发了 "Expected Function got Null" 警告。

## 问题根因
- 在只读模式下，`AppendixPackageSection` 使用 `AppendixRequirementGrid.vue` 时未传递 callbacks
- 默认的 null 值被绑定到 `AppendixRequirementCard`，触发了类型警告

## 解决方案
- 在 `AppendixRequirementGrid.vue` 中添加了 `appendixUploadNoop` 和 `appendixBeforeUploadNoop`（返回 true）
- `onBeforeUpload`/`onUploadError`/`onExceed`/`onUploadSuccess` 的默认值改为 noop
- 在编辑状态下，`AnnexUpload` 继续传递真实的 handlers

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-leftover/085.md
- 涉及文件: AppendixRequirementCard.vue, DeveloperBasicInfoDetail.vue, AppendixRequirementGrid.vue, AppendixPackageSection/index.vue, AnnexUpload/index.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: fe17d399-463d-45e5-9c19-4d7ebc506fcd; baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：fe17d399-463d-45e5-9c19-4d7ebc506fcd


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "grid_callback_noop",
  "source_extraction_id": "0ec9de86592745d2954137491ac6674b",
  "version": 1,
  "memory_type": "entities"
}
-->
