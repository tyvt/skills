# 经营资源扁平列表按子类解析展示

根因：`operatingResources.assetCategories` 变更为扁平列表（`subCategory` 为 null 表示大类）。关键修复：`assetPanorama/index.vue` 的 `parseAssetCategories` 自动识别 `subCategory` 展示，名称取 `subCategory` 或 `category`，配色按父级 `category` 取色。

**验证证据**：extracted source=cursor session=c124ec6d-cfdd-4039-bf13-b501e1b22a3a

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/api/benefit/assetPanorama.js、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/mock.js、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、assetPanorama/index.vue

**所属项目**：园区物管2.0
**来源会话**：c124ec6d-cfdd-4039-bf13-b501e1b22a3a
**代码基线**：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_category_parse",
  "source_extraction_id": "f667ae03057146ae8933dff0fd05df44",
  "version": 2,
  "memory_type": "entities"
}
-->