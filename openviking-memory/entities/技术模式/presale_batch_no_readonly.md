# 预售批次号字段改为只读后端生成
预售许可页 `PermitInfoPanel.vue` 与 `detail.vue` 将批次号改为禁用输入，由后端按申请次数自动生成。

## 改动内容
- `PermitInfoPanel.vue` 将 editable `zs-input-number` 替换为 disabled `zs-input`（placeholder "系统自动生成"），移除 `prop="batchNo"`
- `detail.vue` 移除 `batchNo` 必填校验与保存载荷

## 生成逻辑
- 批次号改由后端按申请次数自动生成，前端不再提交该字段

## 验证与归属
- 验证证据：extracted source=zcode session=session_92f14ad8ea3d61cd3f2e758f2ce4acb6
- 涉及文件：`src/views/presale/permit/components/PermitInfoPanel.vue`、`detail.vue`
- 来源会话ID：session_92f14ad8ea3d61cd3f2e758f2ce4acb6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_batch_no_readonly",
  "source_extraction_id": "b95348e2547a4fca98ef615e2cc3835f",
  "version": 1,
  "memory_type": "entities"
}
-->