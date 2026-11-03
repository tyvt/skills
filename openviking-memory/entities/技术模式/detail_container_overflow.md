# 整页滚动溢出裁掉兄弟节点修复
苏州市房地产监测V3的 zhi2-web-admin 中 .detail-container 默认 height:100% 且 overflow:hidden，导致承办银行页兄弟节点被裁切，已收敛为三个互斥触发条件。

## 问题根因
- styles/index.scss 中 .detail-container 默认 height:100%; overflow:hidden，.detail-from-container 自带 overflow-y:auto
- 承办银行页（cbyh）结构未命中整页内滚规则，兄弟节点 YhwdTable 被裁掉

## 修复方案
- 修改 zhi2-web-admin/src/styles/index.scss，将整页滚动收敛为三个互斥触发条件并共用 detail-container 声明

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/054.md
- 涉及文件：zhi2-web-admin/src/styles/index.scss、views/supervision/bank/cbyh/detail.vue、components/YhwdTable.vue、layout/components/AppMain.vue、styles/detail-form.scss、components/OperationBtnGroup/index.vue
- 来源会话：c1906245-6943-4895-a140-51bca0018684

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_container_overflow",
  "source_extraction_id": "44b97381139d40c9b4eb87bf138f6ca4",
  "version": 1,
  "memory_type": "entities"
}
-->