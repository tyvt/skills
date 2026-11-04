# detail.vue 保存时未发送 batchNo 字段

在项目 苏州市房地产监测V3 中，`src/views/presale/permit/components/detail.vue` 在 `getForm()` 中组装参数时缺少 `batchNo`，该字段仅在 `handleProjectChange` 中计算用于显示。

## 问题根因
- `detail.vue` 的 `getForm()` 在组装保存参数时未包含 `batchNo`
- 批次号仅在 `handleProjectChange` 中计算用于显示

## 解决方案
- `getForm()` 改为返回 `batchNo: this.form.batchNo`
- 确保在新增和编辑模式下的保存请求都携带批次字段

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/273.md
- 涉及文件: src/views/presale/permit/components/detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: 01a16316-12bd-70c5-a400-765e5489bc0b; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_batch_fix",
  "source_extraction_id": "8b596fb5c71140e8af7f969beaff9a2d",
  "version": 1,
  "memory_type": "entities"
}
-->