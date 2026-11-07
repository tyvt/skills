# 物业收费账单错误报告下载归一化
产品2.0 中物业收费账单导入的错误报告下载接口，通过模块常量与解析函数统一 GET 下载通道，规避后端地址形态不统一导致的 404。

## 问题根因
- 后端在导入确认响应体、列表行字段、手动下载按钮三处返回地址形态不同：完整 URL 路径或纯 ID
- 下载必须走 GET，POST 会被请求规范化层改写或返回 405

## 解决方案
- 在 enums.js 新增路径常量 SP_FEE_BILL_ERROR_REPORT_API 与解析函数 resolveErrorReportDownloadPath({errorReportId, errorReportUrl})
- 解析函数无论入参是纯 ID 还是完整路径，均剥离到末段业务主键再拼成 /property/spFeeBill/import/errorReport/{id}
- 所有下载点（导入成功后自动下载、手动点击、importUploadDialog.vue 内触发）统一调 resolver + downloadGet，禁止自拼 URL 或混用 POST 版 download
- 新增同类「生成后回传文件地址」接口时，先确认 method 与路径公约数再建 resolver

## 验证与归属
- 验证证据：会话 1d7f75cd（2026-07-21，代码基线 075e6e9）用户要求「这个要改成 get 请求」
- 涉及文件：src/views/property/spFeeBill/components/enums.js、import.vue、importUploadDialog.vue
- 所属项目：产品2.0；来源会话：1d7f75cd-da2a-402e-b855-e1c9d96162c5；代码基线：075e6e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sp_fee_download",
  "source_extraction_id": "c6f7f75bccb4456b9472da01fa926967",
  "version": 1,
  "memory_type": "entities"
}
-->