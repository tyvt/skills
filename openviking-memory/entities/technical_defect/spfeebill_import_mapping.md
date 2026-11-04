# spFeeBill 导入未对齐接口字段致数据丢失
产品2.0 物业费账单(spFeeBill)导入前端解析未对齐 `/property/spFeeBill/import` 返回结构，须做字段映射与数据合并。

## 问题根因
- 前端解析未对齐 `/property/spFeeBill/import` 返回结构，导致字段取不到或展示错乱
- 须映射 `importId` 等接口字段
- `bills` 与 `errorData` 须合并展示
- `rowNum` 须作为 `_rowKey` 行标识

## 修复方案
- 映射 `importId` 等字段以对齐新接口返回
- 将 `bills` 与 `errorData` 合并展示
- 以 `rowNum` 作 `_rowKey`
- `complexName` 缺失时回退用表单区域名补全
- `feeCycleFromText` 缺失时回退用 `feeCycleFrom` 补全

## 验证与归属
- 验证证据：产品2.0/053.md
- 涉及文件：property/spFeeBill/components/import.vue；property/spFeeBill/components/importUploadDialog.vue；property/spFeeBill/components/enums.js；property/bill/components/import.vue
- 所属项目：产品2.0；来源会话ID：a10aadfb-a1ed-4720-8d24-06f8099d14c1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_defect",
  "name": "spfeebill_import_mapping",
  "source_extraction_id": "e09c5981c68446689aef84245a719298",
  "version": 1,
  "memory_type": "entities"
}
-->