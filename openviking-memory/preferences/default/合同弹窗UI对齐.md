- chooseHouseDialog.vue: 左侧树在 container tree-box 中，使用 filterNode+watch keyWord 进行本地过滤；onLeftTreeSearch 按关键字触发 loadNode lazy
- 右侧筛选器使用 zs-search-form；resetQuery/onClose 重置状态而不依赖 queryForm
- 弹窗具有 width=80%, height=720px 以及类名 contract-choose-house-dialog
- 涉及文件: chooseHouseDialog.vue, zs-select-dialog.vue, branch-one-dialog.scss, pubFinanceAccountSet/index.vue, contractMainInfo/index.vue, contractMainInfo/components/chooseHouseDialog.vue, BranchOneDialog.vue, zs-dialog.vue
- 验证: src=苏州市房地产监测V3/046.md; 会话 a32271a9-f8e3-4970-8b59-8a7baaf0f55f

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：a32271a9-f8e3-4970-8b59-8a7baaf0f55f


<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "Alinhamento de UI do popup de contrato",
  "source_extraction_id": "a4d28a9776d549a1a813bc4467d14de7",
  "version": 1,
  "memory_type": "preferences"
}
-->
