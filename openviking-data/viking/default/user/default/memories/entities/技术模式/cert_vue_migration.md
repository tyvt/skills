# 证书目录Vue文件迁移改造
certificate 目录下共 28 个 Vue 文件，已完成 20 个迁移改造，8 个 index.vue 包装页无需改动。

## 改造范围
- 8 个 detail.vue：operation-container 改为 operation-btn-group，增加 moduleName:'presale'、businessName、primaryKey
- 移除独立 zs-attachment（由 operation-btn-group 通过 busCode 处理附件）
- 移除重复 zs-print（由操作栏内置打印处理）
- 主证页面保留「变更」按钮，变更单页面仅保留标准操作栏

## 文件映射示例
- conLandLic 对应 businessName conLandLic、primaryKey conLandLicId
- consLic 对应 businessName consLic、primaryKey conEngConsLicId 等
- 其他改造文件含 SearchLand.vue、LicSearch.vue、LandTable.vue 等共 20 个

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：certificate 目录下 index.vue、detail.vue 及多个子组件
- 来源会话：5a8c8d9e-bdb0-4660-b439-a10862f22116；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_vue_migration",
  "source_extraction_id": "1361bd3813744042a98313dc80ef9a52",
  "version": 1,
  "memory_type": "entities"
}
-->