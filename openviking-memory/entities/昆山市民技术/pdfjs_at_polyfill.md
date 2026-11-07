# 物业合同PDF预览 Array.at 兼容问题
微信等移动端 WebView 不支持 ES2022 的 `Array.prototype.at`，导致 pdfjs-dist 打开物业合同 PDF 报错。

## 问题根因
- 微信内置浏览器等移动端 WebView 不支持 ES2022 的 `Array.prototype.at`。
- `pdfjs-dist` 内部使用 `.at()`，打开物业合同 PDF 时报 `t.at is not a function`。

## 修复方案
- 新增 `src/utils/pdfPolyfill.js`，在加载 pdfjs 前为 `Array`/`TypedArray` 补 `.at`。
- `filePreview.vue` 最先引入 polyfill，并改用 `pdfjs-dist/legacy/build`。
- 保留 `globalThis.pdfjsWorker` 注册以免 worker 加载失败。

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 验证：会话 d22bb0e1 最终结论，含报错与修复要点。
- 涉及文件：`src/utils/pdfPolyfill.js`、`src/pages/common/filePreview.vue`、`src/pages_contract/detail.vue`、`src/utils/index.js`、`package.json`、`vite.config.js`。
- 所属项目：昆山市民；代码基线：75db5a8；来源会话ID：d22bb0e1-fc61-42cb-bfc2-13d1d148fd21。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "pdfjs_at_polyfill",
  "source_extraction_id": "e7ff9dee35c247329e04ae4c0c42cda8",
  "version": 2,
  "memory_type": "entities"
}
-->