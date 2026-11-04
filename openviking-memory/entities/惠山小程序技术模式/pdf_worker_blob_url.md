# PDF预览Worker的Blob URL加载方案
惠山小程序`pdfPreview.vue`通过`?raw`读取pdfjs worker源码并包装为Blob URL，规避服务器MIME类型问题。

## 实现要点
- 用`?raw`读取`pdfjs-dist/build/pdf.worker.min.mjs?raw`源码字符串
- 包装成`Blob(type: "text/javascript")`并通过`URL.createObjectURL(blob)`生成`blob:` URL
- 赋值给`pdfjsLib.GlobalWorkerOptions.workerSrc`避免请求服务器`.mjs`文件
- 页面卸载时`URL.revokeObjectURL(...)`清理避免泄漏
- 若线上严格CSP禁`blob:`可改内联fake worker+主线程兜底

## 核心文件
- `d:/repository/惠山小程序/src/pages/common/pdfPreview.vue`
- `d:/repository/惠山小程序/vite.config.js`
- `d:/repository/惠山小程序/package.json`
- `d:/repository/惠山小程序/src/workers/pdf.worker.entry.js`

## 验证与归属
- 验证证据：extracted source=cursor project=惠山小程序
- 来源会话：427fdc69-ed6e-4b9c-811d-7f88c8d2f375；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "pdf_worker_blob_url",
  "source_extraction_id": "7d5ef1522fbc472fbc5710e10832618d",
  "version": 1,
  "memory_type": "entities"
}
-->