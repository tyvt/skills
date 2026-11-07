# 平台数据录入明细表换行修复
淮安物管明细表修复数据行换行问题，保持表头可换行、辖区列单行显示。

## 问题根因
- 之前为避免表头撑宽，给所有单元格加 white-space: normal 和 word-break: break-all，导致数据行也换行。

## 修复方案
- 数据行和合计行改为 white-space: nowrap，不再换行。
- 表头仍允许换行，长标题正常显示。
- 辖区列 min-width 设为 140px，保证「经济技术开发区」等名称单行显示，过长时 tooltip 展示。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验证：刷新页面后辖区名称应能单行显示。
- 涉及文件：benefit/pubAccountBalance/index.vue、property、evaluation/companyReport/components/index.vue 等。
- 所属项目：淮安物管；来源会话：5abb161f-954b-4fa6-83c3-5af2e2cb829f；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_nowrap_fix",
  "source_extraction_id": "497161ffec374c01b7ea3b1bbc9a358c",
  "version": 1,
  "memory_type": "entities"
}
-->