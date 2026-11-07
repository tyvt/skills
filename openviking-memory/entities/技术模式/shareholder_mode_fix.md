# ShareholderDialog组件mode prop被mixin覆盖
`ShareholderDialog.vue` 的 `mode` prop 被 `detailMixins` 同名 computed 覆盖，父组件传参失效致弹窗恒为新增态。

## 问题根因
- `ShareholderDialog.vue` 声明 prop `mode`
- 混入 `detailMixins` 含同名 computed `mode`，覆盖属性致父组件传参失效
- 弹窗恒为新增态，无法进入查看态

## 修复方案
- 将 prop 重命名为 `dialogMode`
- 依 `dialogMode` 控制 `view` 态使用 `DetailTemplate` 且仅显返回按钮

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/099.md
- 涉及文件：Step4Shareholders.vue、ShareholderDialog.vue、shareholderTable.vue、toB/shareholder/detail.vue、companyInfo.vue、companyRegister.vue、Step3Appendix.vue、detailMixins.js
- 所属项目：苏州市房地产监测V3；来源会话：bc548255-f57a-4017-8739-5446258f1073；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shareholder_mode_fix",
  "source_extraction_id": "d1c5eb1d0bfb481683e1d3af56a26208",
  "version": 1,
  "memory_type": "entities"
}
-->