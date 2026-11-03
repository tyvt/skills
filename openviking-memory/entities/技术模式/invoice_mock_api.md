# 发票管理页打印下载接入Mock接口
iHomePC 个人中心发票管理页通过 personalCenter.js 新增 Mock 接口完成打印与下载前置调用。

## 接口变更
- `src/api/modules/personalCenter.js` 新增 `downloadInvoiceApi` 与 `printInvoiceApi` 的 Mock 接口，约 300ms 返回 `code: 200`。

## 页面接入
- `src/views/personalCenter/invoiceManage/index.vue` 中打印与下载功能前置调用上述接口，成功后再生成 HTML 并触发下载或打印。

## 验证与归属
- 验证：来源 cursor 会话 ec637371-49d1-4d1e-b60f-a99e73b4d64d。
- 涉及文件：`src/api/modules/personalCenter.js`、`src/views/personalCenter/invoiceManage/index.vue`；所属项目：iHomePC；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "invoice_mock_api",
  "source_extraction_id": "c4320d92c8f24e3b81f1dfcac4d346a6",
  "version": 1,
  "memory_type": "entities"
}
-->