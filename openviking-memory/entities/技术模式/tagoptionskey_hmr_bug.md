# tagOptionsKey误作method致HMR报错
苏州市房地产监测V3中tagOptionsKey误定义为method却以属性访问，导致HMR下未定义或非函数报错，后移入computed修复。

## 问题根因
- `tagOptionsKey` 定义为 method 却以 `this.tagOptionsKey` 属性访问，与模板解析不一致
- HMR 热更新下出现未定义或非函数报错

## 修复方案
- 将 `tagOptionsKey` 移入 `computed` 取行上 options 字段名
- `resolveRowTagOptions` 置 `methods` 并靠近 `getDictLabel` 供模板 `resolveRowTagOptions(scope.row)` 调用

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/018.md
- 涉及文件：AgencyPersonnelList.vue、zs-table-column.vue、personnelStatus.js、toB/personnelRecord/components/index.vue、company/staffManagement/components/index.vue、LeasePersonnelList.vue、AgencyBranchList.vue、branchStatus.js
- 所属项目：苏州市房地产监测V3；来源会话：e0d81e5e-2d37-4e0c-aea3-ee55f794628f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tagoptionskey_hmr_bug",
  "source_extraction_id": "c77880165b094fe3a94ba8cb2b5fcca5",
  "version": 1,
  "memory_type": "entities"
}
-->