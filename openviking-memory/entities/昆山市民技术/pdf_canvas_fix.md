# H5合同PDF预览 scroll-view与uni canvas不可用
H5 下 `scroll-view` 与 uni-app `<canvas>` 导致物业合同 PDF 预览失败，需改用原生 canvas + pdfjs。

## 问题根因
- H5 下用 `scroll-view` 会在子节点未就绪时反复读 `offsetWidth`，控制台大量 `Cannot read properties of null (reading 'offsetWidth')`。
- 用 `document.getElementById` 绑 uni-app 的 `<canvas>` 拿不到真实绘图节点，pdfjs 无法渲染，最终 catch 显示「文件加载失败」。

## 修复方案
- 滚动区改为普通 `view` + `overflow-y: auto`。
- PDF 每页用原生 DOM 动态创建 `canvas` 渲染；`nextTick` 后再挂载。
- 部署后仍失败时核对附件 URL 是否需带登录 token。

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 验证：会话 a046a6f8 用户反馈物业合同预览报错，结论明确两点根因与 filePreview.vue 改造方案。
- 涉及文件：`src/pages/common/filePreview.vue`、`src/pages_contract/detail.vue`。
- 所属项目：昆山市民；代码基线：c8c1c24；来源会话ID：a046a6f8-9e58-45ea-a7be-81dc2f303792。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "pdf_canvas_fix",
  "source_extraction_id": "227214d675d14725964edfb851677a3e",
  "version": 1,
  "memory_type": "entities"
}
-->