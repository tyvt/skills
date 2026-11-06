# 股东信息查看弹窗修复
苏州市房地产监测V3 修复股东查看弹窗始终表现为「新增」且可编辑的问题，改用 `dialogMode` prop 区分模式。

## 问题根因
- `ShareholderDialog` 的 prop `mode` 被 `detailMixins` 的 computed `mode`（来自路由 `formMode`，注册页多为 `'add'`）覆盖
- 父组件传入的 `'view'` / `'edit'` 无效，弹窗一直表现为「新增」且可编辑

## 修改内容
- `ShareholderDialog.vue`：prop 改为 `dialogMode`，标题与保存逻辑均基于 `dialogMode`
- `view`：使用 `DetailTemplate` + `contentInfo`（与 toB/shareholder/detail.vue 一致）
- `view` 底部仅「返回」，不显示「保存」
- 增加 `data-testid="register-shareholder-dialog-view"`

## 涉及文件
- zhi2-web-admin/src/views/register/components/ShareholderDialog.vue
- zhi2-web-admin/src/views/toB/shareholder/detail.vue
- zhi2-web-admin/src/views/register/components/Step4Shareholders.vue
- zhi2-web-admin/e2e/fixtures/register-helpers.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：bc548255-f57a-4017-8739-5446258f1073
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shareholder_dialog_fix",
  "source_extraction_id": "c72fc439f52742fe91d274aac0ac08bc",
  "version": 1,
  "memory_type": "entities"
}
-->