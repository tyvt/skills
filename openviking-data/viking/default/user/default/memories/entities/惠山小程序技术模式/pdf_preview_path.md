# H5根路径PDF地址打开规则
惠山小程序中以 `/` 开头的 PDF 根路径地址在同源时可正常打开，跨域需补全域名或代理。

## 结论
- 根路径形式合理常用，同源 `/statics/...` 能访问即可打开
- 若 PDF 在别的域名只给 `/statics/...`，iframe 向当前站点请求会 404，需改完整域名或网关反向代理

## 子目录部署注意
- H5 挂子路径时静态文件不在站点根 `/statics` 可能路径不对齐
- 后端返回带前缀完整路径，或前端用 `VITE_PUBLIC_PATH` 等拼前缀

## 涉及文件与验证
- 文件：src/utils/index.js、src/pages/common/pdfPreview.vue
- 验证：extracted source=cursor session=9026646d-9676-4a93-b2c3-7ce8fc38c57b
- 所属项目：惠山小程序；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "pdf_preview_path",
  "source_extraction_id": "461613e2a2f54b25a2e9ab1b1429116a",
  "version": 1,
  "memory_type": "entities"
}
-->