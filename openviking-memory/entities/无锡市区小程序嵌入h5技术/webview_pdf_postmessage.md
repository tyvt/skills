# web-view内嵌H5的PDF预览postMessage方案
H5 运行在微信小程序 web-view 内时，PDF 预览需通过 wx.miniProgram.postMessage 交给小程序侧处理。

## 解决方案
- H5 wx.miniProgram.postMessage 把文件 URL/元数据发给小程序
- 小程序页 bindmessage 接收 → wx.downloadFile + wx.openDocument
- 小程序为 uni-app 时需新增或扩展原生壳页承载 <web-view> 的 @message 逻辑
- filePreview 类预览页必须在 pages.json 注册
- 若已有等价 web-view 容器，可只合并 message 处理而不重复注册 pages/common/webView

## 验证与归属
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/index.js、src/pages/common/webView.vue、src/pages.json
- 所属项目：无锡市区小程序嵌入H5；来源会话：78182e2b-9fbc-480c-ac57-e8389e0b26c0；代码基线：0804e57

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "webview_pdf_postmessage",
  "source_extraction_id": "778f1362caf64c32a2a51ac9df1ba72f",
  "version": 1,
  "memory_type": "entities"
}
-->