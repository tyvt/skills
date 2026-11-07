# spfeebill_import_error_report
产品2.0 中 property/spFeeBill 导入模块完成错误报告处理与响应字段对齐。

## 错误报告处理逻辑
- 当导入接口返回 `data.errorReportUrl` 有值时：提示 `data.errorSummary`（如「存在10条数据校验失败，请修正后重新上传。」）并自动下载错误报告文件。
- 上传校验（`/property/spFeeBill/import`）校验失败且返回 `errorReportUrl` 时立即提示并下载。
- 确认导入（`/property/spFeeBill/import/confirm`）有 `errorReportUrl` 时同样提示并下载，不再弹出原确认弹窗。
- 文件列表保留「下载错误报告」按钮便于再次下载。

## 接口字段适配
- 新字段兼容：`failCount`←`errorCount`、`errorSummary`←手动拼接文案、`bills`←`previewList`、`importId`←`previewBatchId`。
- 响应映射：`importId` 存为 `this.importId` 供 confirm 使用；`successCount`/`failCount` 统计条数；`errorSummary` 失败提示；`errorReportUrl` 有值时阻断预览并支持下载；`bills` 预览数据源；`errorData` 与 `bills` 合并展示；行内 `valid`/`errorMsg` 判断校验失败。

## 预览数据处理
- 用 `rowNum` 作为行唯一标识（`_rowKey`）。
- `complexName` 接口未返回时用第一步表单选中区域名补全。
- `feeCycleFromText`/`feeCycleToText` 缺失回退 `feeCycleFrom`/`feeCycleTo`。
- 预览列扩展：账单月份、费用周期、金额、支付状态、备注等。

## 错误报告下载请求修复
- 错误报告下载接口 `property/spFeeBill/import/errorReport/{id}` 为 GET 请求，原使用 `this.download()`（内部 POST）会导致下载失败。
- 新增 `downloadGet` 方法（`api/index.js`）用 GET 请求下载 blob 文件，并在 `main.js` 挂载 `Vue.prototype.downloadGet`。
- `import.vue` / `importUploadDialog.vue` 中错误报告下载由 `this.download` 改为 `this.downloadGet`，验证 GET 请求正常。
- 来源会话：e7bc06b9-bcea-4473-b16e-d02f4f8e8045

## 涉及文件与归属
- 文件：`spFeeBill/components/import.vue`、`importUploadDialog.vue`
- 所属项目：产品2.0；来源会话：17074586-b181-47e4-98de-bff948d7a54e、a10aadfb-a1ed-4720-8d24-06f8099d14c1；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "spfeebill_import_error_report",
  "source_extraction_id": "73aa35c0f24443eb98ea54b97a326597",
  "version": 2,
  "memory_type": "entities"
}
-->
