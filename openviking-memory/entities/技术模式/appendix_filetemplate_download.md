# 要件带fileTemplate时标题栏显示下载模板
当要件含 `fileTemplate` 时，由 `getAppendixFileTemplatePaths` 解析路径，标题栏渲染下载按钮并调用 `downloadServerAssetFile` 下载。

## 关键逻辑
- 要件含 `fileTemplate` 字段时，由 `getAppendixFileTemplatePaths` 解析模板路径
- 标题栏渲染下载按钮，调用 `downloadServerAssetFile` 下载模板
- `AppendixRequirementCard.vue` 与 `AnnexUpload/index.vue` 分别支持宫格与折叠列表两种展示

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/206.md
- 涉及文件：AppendixPackageSection/index.vue、AnnexUpload/index.vue、utils/appendix.js、AnnexUpload/components/AppendixRequirementGrid.vue、AnnexUpload/components/AppendixRequirementCard.vue、OperationBtnGroup/index.vue、utils/resolveServerAssetUrl.js、maintenance/query/components/AnnexContainer/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a162d8-4237-70c5-a400-75fcab95c485；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_filetemplate_download",
  "source_extraction_id": "410c6abe2a3b43599e57be64b1b56ab3",
  "version": 2,
  "memory_type": "entities"
}
-->