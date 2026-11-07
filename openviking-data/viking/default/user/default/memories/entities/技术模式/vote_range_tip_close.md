# 线下投票成功提示框未关闭修复
太仓G端一般表决详情线下投票提交成功后，嵌套的「线下票录入信息确认」提示框残留页面。

## 问题根因
- `finalSubmit` 仅调用 `close()` 关闭主弹框（决策明细维护），嵌套确认框由独立 `tipDialogVisible` 控制
- `zs-dialog` 挂载到 `body`，父弹框关闭后确认框仍残留页面

## 修复方案
- 在 `VoteRangeDialog.vue` 的 `finalSubmit` 成功回调中先设 `tipDialogVisible = false` 再关闭主弹框
- `close()` 方法中统一重置 `tipDialogVisible`，避免取消关闭时确认框残留
- 修复后投票成功时确认框与主弹框均正常关闭

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 161a2f78 用户报线下投票成功后提示框还在，修复后正常
- 涉及文件：ownerDecision/components/VoteRangeDialog.vue、DecisionRangeTable.vue
- 所属项目：太仓G；来源会话：161a2f78-6494-4326-934c-d2a31ef3bbc2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_range_tip_close",
  "source_extraction_id": "e10f5b85e1b24318b239ba222491d390",
  "version": 1,
  "memory_type": "entities"
}
-->