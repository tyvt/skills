# tab_key_fix
标签页键冲突导致苏州市房地产监测V3项目中的互斥失效及子表数据为空。
## 问题根因
- 遮盖/精装修共享 `versionId` 和 `deliverType`，键 `versionId_deliverType` 冲突导致两者同时激活
- 子表在 `currentTab` 就绪之前请求数据，返回空
## 解决方案
- 标签页名称改为行索引 `0,1,2...`，保证互斥
- `cardValue` 默认 `0` 并校验；子表使用 `watch currentTab` (`immediate`)，并在就绪后调用 `getColumn`/`getList` 并传入分页参数
## 文件
- unblock/usemoney/detail.vue, plan/detail.vue, AppropriateTable.vue, PlanDetailsTable.vue, planChange/detail.vue, BuildingTable.vue, RelatedBuildingsTable.vue
## 验证
- 来源: 苏州市房地产监测V3/053.md; 会话: 66577926-e9f6-4492-b968-4c342f004cbe

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：66577926-e9f6-4492-b968-4c342f004cbe


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_key_fix",
  "source_extraction_id": "ecf2b490657f45b9bed88b23d9e2450a",
  "version": 1,
  "memory_type": "entities"
}
-->
