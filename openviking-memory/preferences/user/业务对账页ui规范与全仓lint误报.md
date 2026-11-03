- `repairFunds/finance/rec/index.vue` 落地字典筛选、实心蓝/红按钮等 UI 规范
- `npm run lint` 触发全仓 `eslint src/**/*.{vue,js}` 扫描，输出含其他页面既有告警，不代表本次改动引入新问题
- 全仓 lint 误报须对改动页面人工确认样式，不可误判为本次引入
- 涉及文件：路由信息.json、repairFunds/finance/rec/index.vue、mixins/ListTemplate.js、repairFunds/finance/rec/detail.vue、components/zs-search-form/SearchFormItem.vue、styles/index.scss、components/zs-select/zs-select.vue、repairFunds/verifyRecord/index.vue
- 验证：src=苏州市房地产监测V3-rest/046.md；来源会话：6c2ced12-a350-48f6-a3e1-2355e67d6ccf

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "业务对账页UI规范与全仓lint误报",
  "source_extraction_id": "e18487dcd9274300a15dcfa11665b262",
  "version": 1,
  "memory_type": "preferences"
}
-->