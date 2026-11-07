# 委托销售详情页terminalType读取修复
苏州市房地产监测V3 的 entrustSale/detail.vue 修复了 terminalType 始终为 undefined 导致选项未加载的问题。

## 修复内容
- `terminalType` 读取由 `mapState('user', ['terminalType'])` 改为 `mapState({ terminalType: (state) => state.user.terminalType })`，与 user 模块未开启 namespaced 的用法一致
- 新增 `shouldLoadSelectOptions` watcher：`true` 时调用 `loadSelectOptions()`，`false` 时清空 `projectOptions` / `agencyOptions`
- `terminalType` 或 `formMode` 变化时会自动重试
- 精简 `loadSelectOptions`，仅保留轻量 guard，清空逻辑统一由 watcher 处理

## 预期效果
- B 端 add/edit 会请求 `selectProject`、`selectAgency`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zhi2-web-admin/src/views/presale/entrustSale/detail.vue`
- 所属项目：苏州市房地产监测V3
- 来源会话：c99f65e0-5f2b-48aa-ba0d-5c31de5fb43b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_terminaltype_fix",
  "source_extraction_id": "f096da90f9b54af4ad0fcc8abdafe82d",
  "version": 1,
  "memory_type": "entities"
}
-->