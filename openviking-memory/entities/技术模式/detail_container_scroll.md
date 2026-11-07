# detail-container禁滚改由表单容器滚动
苏州市房地产监测V3将 detail-container 禁用滚动并改由内部表单容器承载滚动，避免双滚动条与操作栏冲突。

## 修复方案
- `index.scss` 中 `detail-container` 设 `height: calc(100vh - 120px)` 与 `overflow: hidden`
- `detail-from-container` 设 `flex: 1`、`min-height: 0`、`overflow-y: auto` 承载滚动
- `#app-main:has(> .detail-container)` 设 `overflow: hidden` 防双滚动条
- `OperationBtnGroup` 移除 `position: sticky`，操作栏通过 `flex-shrink: 0` 固定避免冲突
- 滚动条悬停样式从 `detail-container` 改为 `detail-from-container`，仅表单区域滚动

## 涉及文件
- src/styles/index.scss、src/styles/detail-form.scss、src/styles/variables.css
- src/components/detail-template/detail-template.vue
- src/layout/components/AppMain.vue、src/utils/detailLayout.js
- views/company/companyManagement/components/DeveloperBasicInfoForm.vue
- src/components/OperationBtnGroup/index.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/080.md
- 来源会话：057dc9a5-e1bd-4c11-b65c-c659a035ce17；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_container_scroll",
  "source_extraction_id": "a713c3405a0b43ccbbf1e5e1e8b62543",
  "version": 2,
  "memory_type": "entities"
}
-->