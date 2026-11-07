# 满量禁用el-upload致删除失效与列表弹跳
苏州市房地产监测V3 中满量时禁用整个 el-upload 致列表删除失效，受控 file-list 刷新触发入场动画与状态标签弹跳。

## 问题根因
- `:disabled="!canUpload"` 在满量时禁用整个 `el-upload`，致列表删除失效
- 受控 `:file-list` 经 `loadPackage()` 刷新触发入场动画与状态标签

## 解决方案
- 禁用条件改为 `:disabled="!activeConfig || loading"`，由 `hideUploadTrigger` 与 `before-upload` 控上传
- 列表动画时长置 0 且隐藏 `.el-upload-list__item-status-label`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/019.md
- 涉及文件：institution/agencyBranch/components/CancelDialog.vue、AppendixPictureUpload.vue、components/AnnexUpload/index.vue、utils/appendix.js、AppendixPackageSection/index.vue、AnnexUpload/components/AppendixRequirementCard.vue、ImageUpload/index.vue、e2e/institution/agency-branch-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：01a16795-c57c-764e-99b7-4234d397a95f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "upload_full_disable",
  "source_extraction_id": "0bcf481cb340407cb990dac81fe58681",
  "version": 1,
  "memory_type": "entities"
}
-->