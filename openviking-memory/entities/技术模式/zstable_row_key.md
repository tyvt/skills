# ZsTable透传attrs需row-key
项目 ZsTable 用 v-bind="attrs" 透传未声明 prop 到内部 el-table，缺 row-key 会报警告。

## 问题根因
- ZsTable 将未声明 prop（如 row-key）通过 v-bind="attrs" 透传给内部 el-table。
- 父组件不传 row-key 时 el-table 报 [ElTable] prop row-key is required。

## 解决方案
- 父组件直接给 zs-table 传 row-key 即可消除警告。
- 按数据唯一字段设 row-key，如 row-key="assetLeaseId" 或 row-key="id"。

## 验证与归属
- 验证证据：010.md 会话 55858be7（AssetLeaseInfoTable 加 row-key="assetLeaseId" 消除警告）。
- 涉及文件：src/components/zsTable/index.vue、src/views/benefit/statisticsMap/components/AssetLeaseInfoTable.vue。
- 来源会话ID：55858be7-9946-4755-bea9-40068591d59b；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_row_key",
  "source_extraction_id": "e9498e5ec3134785bc60d5eca40d3bd0",
  "version": 1,
  "memory_type": "entities"
}
-->