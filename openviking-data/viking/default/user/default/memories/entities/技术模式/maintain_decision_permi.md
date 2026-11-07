# 维修资金表决菜单权限前缀不一致致按钮隐藏
太仓G端重构后维修资金表决页面组件路径与后台菜单权限前缀不一致，导致详情按钮全隐藏。

## 问题根因
- 页面组件为 `estate/maintainDecision/*`，代码按钮权限常写 `estate:maintainDecision:*`
- 后台菜单可能仍配旧前缀 `estate:ownerDecision:*`，角色只配旧串时 `v-hasPermi`/`checkPermission` 全部失配
- `ownerDecision` 固定 `decisionType=OWNERS`，运维误配会查错数据

## 修复约定
- 页面与 `decisionCommon/config` 权限判断同时接受两套前缀（`estate:ownerDecision:xxx` 与 `estate:maintainDecision:xxx` 任一命中即可）
- 运维侧按模块核对菜单组件路径必须是 `maintainDecision` 而非 `ownerDecision`
- 列表页权限标识如 `estate:ownerDecision:query/add/edit/remove/list` 任一旧串亦可命中

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 0a42918d 用户报维修资金表决很多按钮看不到但权限已配
- 涉及文件：zhi1-web-admin/src/views/estate/maintainDecision/detail.vue、ownerDecision/detail.vue、decisionCommon/config.js、components/OperationContainer/index.vue
- 所属项目：太仓G；来源会话：0a42918d-d7b1-492b-8365-de6556f0a811；代码基线：9638e2f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintain_decision_permi",
  "source_extraction_id": "d3b28c99a0db46578f9102cf955f5f7e",
  "version": 2,
  "memory_type": "entities"
}
-->