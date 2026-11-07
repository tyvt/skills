# 企业入网变更备案要件上传排序一致修复
苏州市房地产监测V3 修复企业入网变更备案中查看详情与编辑详情的要件上传顺序不一致问题。

## 原因说明
- 查看态在 AppendixPackageSection.loadRequirementPackages 里按 appendixConfig.sort 排序
- 编辑态走 AnnexUpload.getList 到 mapAppendixPackageToFileList，之前未排序，顺序不一致

## 改动内容
- appendix.js 新增 sortAppendixPackages（稳定升序，非法 sort 当作 0），mapAppendixPackageToFileList 在映射前先排序，编辑态与查看宫格共用同一规则
- AppendixPackageSection/index.vue 非宫格查看的 appendixContentInfo 使用 sortAppendixPackages，宫格查看经 gridFileList 到 mapAppendixPackageToFileList 排序避免重复排序

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：435d70c1-1e98-4e05-b285-4c74fff0815e
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：appendix.js、AppendixPackageSection/index.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_sort_fix",
  "source_extraction_id": "152541cf03c74c8fbf304040976910c6",
  "version": 1,
  "memory_type": "entities"
}
-->