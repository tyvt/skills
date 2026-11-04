# 物业合同PDF预览报错修复
昆山市民小程序物业合同预览因 scroll-view H5 兼容性与 canvas 获取方式错误导致报错，已修复。

## 问题根因
- `scroll-view` 在 H5 下反复读取 DOM `offsetWidth`，子元素未渲染完成致 TypeError。
- 原实现用 `document.getElementById` 查找 uni-app 的 `<canvas>` 组件，H5 下非原生 canvas 使 pdfjs 无法渲染。

## 解决方案
- `filePreview.vue` 将 `scroll-view` 替换为普通 `view` + CSS `overflow-y: auto`。
- PDF 加载后用原生 DOM API 动态创建 `canvas` 渲染每页。
- 使用 Vue `nextTick` 确保容器 DOM 挂载后渲染。

## 验证与归属
- 涉及文件：d:/repository/昆山市民/src/pages/common/filePreview.vue、src/pages_contract/detail.vue、src/utils/index.js、src/utils/resolveAssetUrl.js、src/pages.json、src/env/mp.js、package.json
- 来源会话ID：a046a6f8-9e58-45ea-a7be-81dc2f303792
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "contract_pdf_bug",
  "source_extraction_id": "c3b6be7beffe427a8a4251db85b7ca61",
  "version": 1,
  "memory_type": "entities"
}
-->