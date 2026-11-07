# PDF预览基于web-view规避业务域名约束
惠山小程序因业务域名约束不可引第三方，新增 pdfPreview.vue 以 web-view 加载解码后的 URL，并在 utils 中改用 encodeURIComponent 跳转；web-view 内根路径 PDF 须同源否则 404。

## 实现方式
- `src/pages/common/pdfPreview.vue` 使用 `<web-view :src>` 加载 `decodeURIComponent(options.url)`
- `src/utils/index.js` 将 H5 PDF 分支改为 `encodeURIComponent` 后 `uni.navigateTo` 跳转

## 同源约束
- `web-view`（iframe）中 `/` 开头根路径 PDF 解析为当前站点同源地址，跨域 OSS/CDN 会 404
- 同源可正常打开；跨域须改完整域名、反代或依 `VITE_PUBLIC_PATH` 拼子目录前缀

## 涉及文件
- d:/repository/惠山小程序/src/utils/index.js
- d:/repository/惠山小程序/src/pages/common/pdfPreview.vue
- d:/repository/惠山小程序/src/pages.json
- d:/repository/惠山小程序/src/pages/fail/index.vue

## 验证与归属
- 验证证据：src=惠山小程序/003.md；extracted source=cursor session=9026646d-9676-4a93-b2c3-7ce8fc38c57b
- 来源会话：2ae9cef4-d22d-4df3-ae27-9dd7103ad401；9026646d-9676-4a93-b2c3-7ce8fc38c57b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "pdf_preview_webview",
  "source_extraction_id": "95ece653fa38480d983902f7c11dbc0c",
  "version": 1,
  "memory_type": "entities"
}
-->