# Excel 导入部分失败错误报告约定
产品2.0 物业费账单导入接口部分失败时，前端按 errorReportUrl 有值即提示 errorSummary 并自动下载错误报告。

## 接口约定
- 后端导入校验失败返回结构化结果：`errorReportUrl`（错误明细文件地址）+ `errorSummary`（汇总文案）
- 附带 `failCount`（替代旧 errorCount）、`bills`（替代 previewList）、`importId`（替代 previewBatchId）

## 前端做法
- 导入与确认导入统一约定：只要 `data.errorReportUrl` 有值，就 1) 提示 errorSummary 文案；2) 自动调用该 URL 下载错误报告文件
- confirm 环节有 errorReportUrl 时不再弹原确认弹窗；文件列表保留「下载错误报告」按钮供用户再次下载
- 字段适配以新字段为主、兼容旧字段名；该套路可复用到其他模块批量导入

## 验证与归属
- 验证证据：import.vue 与 importUploadDialog.vue 实现该逻辑，接口字段映射 failCount←errorCount、bills←previewList、importId←previewBatchId
- 涉及文件：property/spFeeBill/components/import.vue、property/spFeeBill/components/importUploadDialog.vue
- 所属项目：产品2.0；来源会话：17074586-b181-47e4-98de-bff948d7a54e；代码基线：2f68042

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "excel_import_error_report",
  "source_extraction_id": "0484b9296d2e4e3da6a631e0d03fa14f",
  "version": 1,
  "memory_type": "entities"
}
-->