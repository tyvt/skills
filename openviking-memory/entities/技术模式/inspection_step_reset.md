# 巡检步骤增删后新增状态未重置
物业手持B端巡检记录添加并删除步骤后再次新增存在状态残留的已知问题及修复方案。

## 问题根因
- 巡检记录添加并删除步骤后再次新增存在状态残留

## 解决方案
- `src/pages_facility/record/add.vue` 给 `ZsUploader` 加 `v-if="showStepFormPopup"`：弹窗关闭时销毁上传组件，再次打开时重新挂载，避免 `uni-file-picker` 内部 `files` 残留
- 统一取消逻辑：新增 `onCancelStepForm`，关闭弹窗并调用 `resetStepForm()`

## 验证与归属
- 验证证据：src=物业手持B端/004.md
- 涉及文件：record/add.vue、ZsUploader.vue、ZsDialog.vue、TransferKnowledgeDialog.vue、CompleteDialog.vue、package.json、workbench/index.vue、record/index.vue
- 来源会话ID：ce335c8e-5171-4165-8ef8-38b280007b21；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_step_reset",
  "source_extraction_id": "859dfcfb9ffe4d1d902c1e904f6715fb",
  "version": 2,
  "memory_type": "entities"
}
-->