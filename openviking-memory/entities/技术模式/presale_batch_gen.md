# 基于 maxBatchNo 生成预售 batchNo
在 `zhi2-web-admin/src/views/presale/permit/components/detail.vue` 中，`handleProjectChange` 根据项目的 `maxBatchNo` 生成 `form.batchNo`。

## 上下文
- 在 `handleProjectChange` 中，从 `projectOptions[].raw` 读取 `maxBatchNo`
- 计算 `String(Number(raw.maxBatchNo) + 1)` 并赋值给 `form.batchNo`

## 解决方案
- 当为空时，设置为 `undefined` 以显示占位符并避免 `NaN`
- 提交负载的白名单不包含 `batchNo`

## 验证与归属
- 文件: zhi2-web-admin/src/views/presale/permit/components/detail.vue
- 会话: session_738a2a4d2ad93a91c77adf4b7c511d52

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_batch_gen",
  "source_extraction_id": "76f2d71ba1c4492cb8ab951b1612621d",
  "version": 1,
  "memory_type": "entities"
}
-->