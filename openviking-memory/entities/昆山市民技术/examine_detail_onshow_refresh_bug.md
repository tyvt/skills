# 审核详情页onShow未刷新致按钮状态旧
昆山市民审核详情页onShow未重拉详情、operationBtn.vue watch漏监听致审批后按钮状态旧，已通过onShow拉取与refreshKey修复。

## 问题根因
- `examineDetail.vue` 的 `onShow` 未重拉详情
- `operationBtn.vue` 的 watch 仅监听 `busCode`/`dataId` 漏刷新
- 审批成功仅 `navigateBack` 致按钮状态旧

## 修复方案
- `examineDetail.vue` 增 `onShow` 拉取与 `refreshKey` 递增
- `operationBtn.vue` watch 增 `refreshKey` 并 `await init()` 重校验权限

## 验证与归属
- 验证证据：src=昆山市民/007.md
- 涉及文件：src/pages_examine/examineDetail.vue、src/pages_examine/components/operationBtn.vue、src/api/modules/examine.js、src/pages_examine/components/approveDialog.vue、src/request/index.js、src/pages_examine/examineList.vue
- 所属项目：昆山市民；来源会话ID：73a8f90b-b76b-4c0a-817c-91bc79c7d47c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "examine_detail_onshow_refresh_bug",
  "source_extraction_id": "41290def6eab418c91baea7174a07d93",
  "version": 1,
  "memory_type": "entities"
}
-->