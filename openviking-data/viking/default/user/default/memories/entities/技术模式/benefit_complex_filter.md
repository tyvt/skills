# benefit 详情选物业管理区域过滤规则
收益类详情里「选择物业管理区域」弹窗请求 /property/complex/page，并按终端类型过滤。

## 过滤规则
- 接口须用 /property/complex/page，不要用错 pageOptionalComplex 等接口。
- terminalType === 'B' 时额外传 complexId: this.$store.getters.currentProjectId（全局所选物业管理区域）。
- G 端只按 bizState: '2' 查全部可选区域，不传 complexId。
- 列表页 getQueryParams 已注入 projectId 时，详情弹窗仍可能漏过滤，需单独检查弹窗 query/filter。
- 与 pubManagementOrg/detail 等同模块写法对齐。

## 验证与归属
- 验证证据：会话 3288a566 中 parkingSpace/detail B 端未按 complexId 过滤；用户补充仅 B 端需要过滤且接口应恢复为 /property/complex/page。
- 涉及文件：zhi2-web-admin/src/views/benefit/parkingSpace/detail.vue、zhi2-web-admin/src/views/benefit/pubHouse/detail.vue、zhi2-web-admin/src/views/benefit/pubAdvertiseSpace/detail.vue、zhi2-web-admin/src/views/benefit/pubParkingSpace/detail.vue
- 所属项目：园区公共收益；来源会话：3288a566-1b95-45a9-839d-edc1c433b36e；代码基线：b6bf87d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_complex_filter",
  "source_extraction_id": "181b587a4f3b429fa55c316b8577fde9",
  "version": 1,
  "memory_type": "entities"
}
-->