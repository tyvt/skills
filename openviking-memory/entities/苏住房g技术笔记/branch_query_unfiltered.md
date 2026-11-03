# 未选左侧银行时网点查询未拦截
苏住房G太仓区未授权银行时左侧列表为空，右侧搜索未带 workBankId 查出全部网点，已在通用弹窗组件拦截未选银行时的请求与搜索。

## 问题现象
- 太仓区未授权银行时左侧银行列表为空
- 右侧搜索调用 `selectTJgBankBranchList` 未带 `workBankId`，查出全部网点而非空结果

## 解决方案
- 在 `zs-select-dialog-func.vue` 拦截未选左侧银行时的接口请求与搜索操作并提示
- 业务页 `benefit/pubRegulatoryAccount` 无需改动

## 验证与归属
- 验证证据：苏住房G/042.md
- 涉及文件：vite.config.js、maintenance/accountOpen/components/OpenDetailDialog.vue、property/components/BranchOneDialog.vue、system/workBank/components/pubRegulatoryBranchDialog.vue、maintenance/accountOpen/components/detail.vue、system/workBank/components/BranchOneDialog.vue、benefit/components/BranchOneDialog.vue、property/propertyAccount/index.vue
- 所属项目：苏住房G；来源会话：e54e19e2-5d01-4169-ace4-1cfb25836888

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "branch_query_unfiltered",
  "source_extraction_id": "9e279c11c0ff4cb281cd315baecbe44b",
  "version": 1,
  "memory_type": "entities"
}
-->