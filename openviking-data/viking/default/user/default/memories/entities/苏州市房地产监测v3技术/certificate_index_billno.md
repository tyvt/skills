# 证书列表序号列误绑billNo致空白
personnelCertificate/index.vue 序号列 prop 误绑接口不存在的 billNo 字段致列表序号空白。

## 问题根因
- personnelCertificate/index.vue 序号列配置 prop="billNo"
- 接口不返回 billNo 字段，导致序号列显示空白

## 修复方案
- 采用 type="index" 并设宽度 80，传入 :index="tableIndex"
- 新增 tableIndex 计算属性，按 (pageNum - 1) * pageSize + index + 1 计算翻页连续序号

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/120.md、src=苏州市房地产监测V3/320.md
- 涉及文件：personnelCertificate/index.vue、companyApplyAudit/index.vue、listMixins.js、companyCancel/index.vue
- 所属项目：苏州市房地产监测V3
- 来源会话ID：c7022489-2172-47ce-8e1e-dcbd234762d8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "certificate_index_billno",
  "source_extraction_id": "2a864028af814491ba471786ba13e88c",
  "version": 2,
  "memory_type": "entities"
}
-->