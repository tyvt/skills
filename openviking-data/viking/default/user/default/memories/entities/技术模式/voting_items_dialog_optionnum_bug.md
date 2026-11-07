# 投票对话框中最大选项配置错误
在 zhi2-web-admin (Huishan Fase 2G) 中，`VotingItemsDialog.vue` 在详情模式（`DetailTemplate` `contentInfo`）下仅配置了 `minOptionNum` 且错误标记为“选择项”，缺少 `mixOptionNum`，与编辑模式不一致。

## 问题
- `VotingItemsDialog.vue` 详情模式：`contentInfo` 仅有 `minOptionNum` 错误命名为“选择项”（已选项）
- 缺少 `mixOptionNum` 导致与编辑模式不一致

## 修复
- 将 `contentInfo` 改为“最少选择项”（最小选择数）并添加“最多选择项”（`mixOptionNum`）
- 在多选时显示（`optionType==='1'`）

## 文件
- src/views/autonomy/multiply/components/VotingItemsDialog.vue
- src/views/autonomy/option/components/VotingItemsDialog.vue
- src/views/autonomy/option/components/VoteView.vue
- src/views/autonomy/option/detail.vue

## 验证
- Cursor 会话: 5f4bd9ba-c920-4b33-ab4f-5d2525ca5150; 代码库: none

## 验证与归属
- 所属项目：惠山二期G
- 验证证据：extracted source=cursor project=惠山二期G
- 来源会话：5f4bd9ba-c920-4b33-ab4f-5d2525ca5150


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voting_items_dialog_optionnum_bug",
  "source_extraction_id": "bd420326a12843babc324cc305cc151c",
  "version": 1,
  "memory_type": "entities"
}
-->
