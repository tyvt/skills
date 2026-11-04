# 发票管理页打印下载接入Mock接口
iHomePC 个人中心发票管理页通过 personalCenter.js 新增 Mock 接口完成打印与下载前置调用。

## 接口变更
- `src/api/modules/personalCenter.js` 新增 `downloadInvoiceApi`（入参 `{ invoiceNo }`，约 300ms 返回 `{ code: 200, msg: "下载请求成功", data: { invoiceNo, downloadUrl } }`）与 `printInvoiceApi`（入参 `{ invoiceNo }`，约 300ms 返回 `{ code: 200, msg: "打印请求成功", data: { invoiceNo } }`）的 Mock 接口。

## 页面接入
- `src/views/personalCenter/invoiceManage/index.vue` 中打印与下载功能前置调用上述接口：下载点击先 `downloadInvoiceApi` 显示「正在准备下载...」loading，`code===200` 后生成 HTML 触发下载并提示「下载成功」，失败或异常关闭 loading 提示错误；打印逻辑类似。

## 验证与归属
- 验证：来源 cursor 会话 ec637371-49d1-4d1e-b60f-a99e73b4d64d。
- 涉及文件：`src/api/modules/personalCenter.js`、`src/views/personalCenter/invoiceManage/index.vue`；所属项目：iHomePC；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "invoice_mock_api",
  "source_extraction_id": "12def0402d4647a38511dddb624f592c",
  "version": 2,
  "memory_type": "entities"
}
-->