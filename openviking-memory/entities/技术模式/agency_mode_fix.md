# 组件prop与mixin计算属性mode同名致覆盖
`AgencyBasicInfoDetail` 混入 `detailMixins` 含计算属性 `mode`，组件声明同名 prop `mode` 引发 Vue 警告并覆盖属性，致 `mode == 'view'` 逻辑异常。

## 问题根因
- `AgencyBasicInfoDetail` 混入 `detailMixins` 含计算属性 `mode`（供 `form.js` 的 `isFormDisabled` 使用）
- 组件声明同名 prop `mode` 引发 Vue 警告并覆盖属性，致 `mode == 'view'` 逻辑异常

## 解决方案
- 将 prop 改名为 `detailScope`
- `loadDetail` 内以 `this.detailScope === 'admin'` 判断
- 引用组件 `toB/agencyRecord/detail.vue` 未传 `mode` 故无需改父组件

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/062.md
- 涉及文件：AgencyBasicInfoDetail.vue、detailMixins.js、toB/agencyRecord/detail.vue、DeveloperBasicInfoDetail.vue、form.js、formComponents.js
- 所属项目：苏州市房地产监测V3；来源会话：d7c5546b-aa33-4b71-aad6-e797b69bb1eb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_mode_fix",
  "source_extraction_id": "25da285e84a84b788cd24433bceb9002",
  "version": 1,
  "memory_type": "entities"
}
-->