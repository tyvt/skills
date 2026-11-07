# 容量满时 el-upload 完全禁用的问题
在项目 苏州市房地产监测V3 中，容量满时 `el-upload` 被完全禁用导致无法从列表中删除，并且 `loadPackage` 在更新受控的 `:file-list` 时触发了进入动画。

## 问题根因
- `:disabled="!canUpload"` 在容量满时禁用了整个 `el-upload`，导致无法删除列表项
- `loadPackage()` 更新受控的 `:file-list`，触发了进入动画和状态徽标

## 主要修复
- `el-upload` 的禁用条件改为 `:disabled="!activeConfig || loading"`
- 列表动画时长设置为 0，并隐藏了 `.el-upload-list__item-status-label`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/219.md
- 涉及文件: institution/agencyBranch/components/CancelDialog.vue, institution/agencyBranch/components/AppendixPictureUpload.vue, components/AnnexUpload/index.vue, utils/appendix.js, components/AppendixPackageSection/index.vue, components/AnnexUpload/components/AppendixRequirementCard.vue, components/ImageUpload/index.vue, e2e/institution/agency-branch-real-api-flow.spec.js
- 所属项目: 苏州市房地产监测V3; 会话: 01a16795-c57c-764e-99b7-4234d397a95f; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elupload_disable_bug",
  "source_extraction_id": "5b55fde1cd1b4f419a674259657b5c37",
  "version": 1,
  "memory_type": "entities"
}
-->