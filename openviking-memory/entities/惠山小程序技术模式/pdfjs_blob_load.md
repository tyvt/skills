# pdfjs worker MIME错误改用Blob加载
惠山小程序因 pdfjs-dist 构建为 .mjs 且服务器返回错误 MIME，改用 ?raw 导入源码包装 Blob 加载 worker。

## 问题根因
- pdfjs-dist 构建产物为 .mjs，服务器返回 application/octet-stream MIME 致 worker 加载失败

## 修复方案
- src/pages/common/pdfPreview.vue 以 `?raw` 导入 pdfjs-dist/build/pdf.worker.min.mjs 源码
- 包装 Blob(type:"text/javascript") 并 URL.createObjectURL 赋给 pdfjsLib.GlobalWorkerOptions.workerSrc
- 页面卸载时 URL.revokeObjectURL 清理

## 涉及文件
- D:/repository/惠山小程序/src/pages/common/pdfPreview.vue
- D:/repository/惠山小程序/vite.config.js
- D:/repository/惠山小程序/package.json
- D:/repository/惠山小程序/src/workers/pdf.worker.entry.js

## 验证与归属
- 验证证据：src=惠山小程序/002.md
- 来源会话：427fdc69-ed6e-4b9c-811d-7f88c8d2f375
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "pdfjs_blob_load",
  "source_extraction_id": "cb1b208ed4a04a328bf963f720200934",
  "version": 1,
  "memory_type": "entities"
}
-->