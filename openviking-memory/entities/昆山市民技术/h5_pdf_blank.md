# H5调uni.openDocument致PDF空白
昆山市民H5因直接调用小程序专用API致PDF预览空白的bug根因与修复记录。

## 问题根因
- `detail.vue` 直接调用小程序专用API `uni.openDocument`，H5环境跳转空白页

## 修复方案
- 引入 `pdfjs-dist`，新增 `src/pages/common/filePreview.vue` 渲染PDF
- `src/utils/index.js` 的 `filePreview` 按环境分流
- `detail.vue` 改调统一 `filePreview`

## 验证与归属
- 验证证据：src=昆山市民/005.md
- 涉及文件：src/pages_contract/detail.vue、src/utils/index.js、package.json、src/utils/resolveAssetUrl.js、src/pages_vote/vote/material.vue、src/env/mp.js、src/pages.json、vite.config.js
- 所属项目：昆山市民；来源会话ID：80b2d970-e79a-47cf-80f8-ee0a0c415a96；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "h5_pdf_blank",
  "source_extraction_id": "9755aff3db004e64a6a0cd48ad9d743b",
  "version": 1,
  "memory_type": "entities"
}
-->