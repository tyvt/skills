# showListName 混入冲突修复
修复苏州市房地产监测V3中 listMixins→table.js 已有 data.showListName，而 StateTable/PlanTable/LicTable 重复定义同名 computed.showListName 导致的 Vue2 警告。

## 问题根因
- table.js 的 listMixins 已提供 data.showListName
- StateTable、PlanTable、LicTable 组件又定义同名 computed.showListName，Vue2 报警 vue.js:5108 [Vue warn]

## 修复方案
- 在 projectEmbeddedCertificateList.js 中用 watch isEmbedded，将 mixin 的 showListName 设为 !embedded（内嵌项目详情时隐藏列表标题）
- 从三个证书表格组件中删掉重复的 computed.showListName

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 刷新后警告消失；项目详情内嵌证书列表仍不显示标题，独立菜单页正常显示
- 涉及文件：table.js、projectEmbeddedCertificateList.js、ProjectCertificateDetailDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：82c57f89-5320-4ad9-a2ed-1c48587b738a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "showlistname_conflict",
  "source_extraction_id": "6f58039a3564482e961b58f9f1b314ce",
  "version": 1,
  "memory_type": "entities"
}
-->