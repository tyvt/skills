# 双晒公示附件不显示修复
苏住房C 小程序双晒公示中物业服务计划、公共收益收支、维修资金使用三类详情页附件不显示，已修复。

## 问题原因
- 分包迁移后 `FileList` 从主包 `src/components/FileList/` 移到 `pages_main/components/FileList/`
- `mp` 分支 `ListDetail.vue` 使用 `<FileList>` 但未显式 import，easycom 也找不到，导致附件不显示
- `detail.vue` 用 `v-if="loading"` 延迟挂载子组件，子组件 `onShow` 拉附件可能错过生命周期

## 修复内容
- `ListDetail.vue`：显式引入 `FileList`，用 `watch(noticeId)` 加载附件
- `files.vue`：同样补上 `FileList` 引入
- `detail.vue`：改为 `watch(noticeId)` 拉取
- 物业服务合同跳 `contracts.vue` 已有 import，若异常需单独排查

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`ListDetail.vue`、`files.vue`、`contracts.vue`、`detail.vue`
- 所属项目：苏住房C；来源会话ID：63bf69eb-375f-44da-bede-0924286c59be；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "filelist_import_fix",
  "source_extraction_id": "7e3e0be08a0d49459cf6cdab5cb477e0",
  "version": 1,
  "memory_type": "entities"
}
-->