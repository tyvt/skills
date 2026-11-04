# SelectDialog 确认无效因 reject 覆盖 resolve
Bug 在 `zs-select-dialog-func.vue` 中：点击确认时，`setData` 之后跟着 `resolve`，但关闭触发了 `reject('cancel')` 将其覆盖，导致 `handleAdd` 的 catch 静默错误且列表未更新。

## 问题
- `SelectDialog.open` 确认无效，因为 `reject` 在无锁的情况下覆盖了 `resolve`

## 解决方案
- 在 `zs-select-dialog-func.vue` 中添加了 `settled` 锁，以确保仅进行一次结算
- 在 `unionBankWdmc.js` 中新增 `openUnionBankWdmcSelect`，根据 `/system/unionBank/page` 统一银行选择

## 文件
- supervision/bank/superviseBank/index.vue
- supervision/bank/jgwd/index.vue
- supervision/utils/selectDialog/prefund.js
- presale/permit/components/index.vue
- supervision/agreement/account/detail.vue
- supervision/bank/jgwd/detail.vue
- supervision/bank/superviseBank/detail.vue

## 验证
- 验证证据: src=苏州市房地产监测V3/028.md
- 会话: b1936cf8-2758-4591-92a8-a76aef6e1db5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_settled_lock",
  "source_extraction_id": "c7ea67c41536451ea2f1166b9de5c647",
  "version": 1,
  "memory_type": "entities"
}
-->