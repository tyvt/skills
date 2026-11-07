# APP业主审核页自动加载修复
修复APP业主人工审核页进入即弹“请在姓名、证件号、手机号中任选至少两个信息查询”异常的技术模式。

## 问题根因
- 通用列表mixin `table.js` 的 `init()` 在页面 `created` 时无条件调用 `getList()`，空条件请求被后端拦截并弹窗
- 报错页面：`zhi2-web-admin/src/views/property/appOwnerAudit/index.vue`（接口 `property/ctUserIdentity/pageAudit`）

## 修复方案
- 在 `src/mixins/table.js` 新增 `autoLoadList` 开关，默认 `true`，其他列表页行为不变
- `init()` 中 `autoLoadList === false` 时跳过自动查询
- 在 `appOwnerAudit/index.vue` 设 `autoLoadList: false`，进入页面不调列表接口，表格为空无弹窗
- 重写 `handleQuery()`：点击搜索时前端先校验姓名/证件号/手机号至少填两项，满足才重置页码请求

## 项目与验证
- 所属项目：惠山二期G
- 来源会话：333318b1-4f2d-4f92-b2b0-f97f02e88d67
- 验证：eslint通过，进入页面无异常弹窗

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_audit_load",
  "source_extraction_id": "418a2e22bab440878a70df76d501799d",
  "version": 1,
  "memory_type": "entities"
}
-->