# ImageUpload 多图预览错位
园区物管2.0 公共组件 ImageUpload 新增态连续上传多图后，点击缩略图预览总是打开第一张。

## 现象与根因
- 预览列表 urlList 存 resolveServerAssetUrl() 处理后的完整地址，而当前图索引用 urlList.indexOf(file.fileUrl) 匹配后端返回原始相对路径
- 两套格式不一致时 indexOf 恒为 -1，索引 -1 兜成第一张

## 解决方案
- 索引匹配改为 findIndex 多条件兜底（依次比对 uid、fileUrl、name、url 及解析后 URL），任一命中即定位
- handleUploadSuccess 中保留 Element UI 传入的 file.uid，保证上传中精确对应
- 该组件全局共用，修一处全项目受益；排查「点哪张都看错」优先怀疑预览列表与匹配键 URL 格式不一致

## 验证与归属
- 验证：会话 90aa41bd-020e-45a5-bbab-7177966aefbc 用户报 housePart/detail.vue:57 新增时多图预览匹配错乱；定位 handlePictureCardPreview 的 indexOf 格式不一致，改 findIndex + 保留 uid
- 另据会话 90aa41bd-ec8d-452e-9246-bbbc58df8558 复现同因，涉及更多文件（见下）
- 涉及文件：src/components/ImageUpload/index.vue、src/utils/resolveServerAssetUrl.js、src/components/AnnexUpload/components/ImageGrid.vue、src/components/detail-template/detail-template.vue、src/views/property/allotNotice/detail.vue、src/store/modules/preview.js
- 所属项目：园区物管2.0；来源会话ID：90aa41bd-020e-45a5-bbab-7177966aefbc、90aa41bd-ec8d-452e-9246-bbbc58df8558；代码基线：5a288f142（早期）、none（后续会话）

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "upload_preview_mismatch",
  "source_extraction_id": "6979dc0db6524b59bb6a0c5f048888aa",
  "version": 2,
  "memory_type": "entities"
}
-->