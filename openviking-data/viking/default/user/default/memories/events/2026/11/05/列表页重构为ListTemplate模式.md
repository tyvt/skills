# Summary
将6个 Vue 列表页改为 ListTemplate + listMixins（script-only），参考 xy/index.vue。已提及 progress/gcht/index.vue（moduleName prefund, businessName engContract, permsPrefix xmxx:gcht, primaryKey contractId, 保留 ProjectDialog+ExtractDialog，提取按钮权限 xmxx:gcht:extract，搜索项目名/合同类别，列含项目名/合同号等）与 progress/change/index.vue（moduleName prefund, businessName proChange）。涉及文件 xy/index.vue、progress/gcht/index.vue、progress/change/index.vue、progress/bdcdj/index.vue 等。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】pattern
【标题】Convert these 6 Vue list p
【内容】6 个列表页均已改为 `ListTemplate` + `listMixins`（script-only），参考 `xy/index.vue`。各文件摘要如下： --- ### 1. `progress/gcht/index.vue` - **moduleName**: `prefund` / **businessName**: `engContract` / **permsPrefix**: `xmxx:gcht` - **primaryKey**: `contractId` / **apiSuffix**: `list` - **保留**: `ProjectDialog` + `ExtractDialog`（`baseTemplate.replace` 注入模板） - **保留**: 提取按钮（权限 `xmxx:gcht:extract`）、`setProject` / `setExtract` 自定义新增流程 - **搜索**: 项目名称、合同类别（`CONTRACT_CLASS`） - **列**: 项目名称/合同号（link）、合同名称、合同类别、金额、开始日期、业务状态 ### 2. `progress/change/index.vue` - **moduleName**: `prefund` / **businessName**: `proChange` / **pe
【验证证据】extracted source=cursor project=产品2.0
【涉及文件】`xy/index.vue ; `progress/gcht/index.vue ; `progress/change/index.vue ; `progress/bdcdj/index.vue
【所属项目】产品2.0
【来源会话ID】0c55b984-d193-404d-80bd-37db6196ab05
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "列表页重构为ListTemplate模式",
  "goal": "列表页模板化重构",
  "summary": "将6个 Vue 列表页改为 ListTemplate + listMixins（script-only），参考 xy/index.vue。已提及 progress/gcht/index.vue（moduleName prefund, businessName engContract, permsPrefix xmxx:gcht, primaryKey contractId, 保留 ProjectDialog+ExtractDialog，提取按钮权限 xmxx:gcht:extract，搜索项目名/合同类别，列含项目名/合同号等）与 progress/change/index.vue（moduleName prefund, businessName proChange）。涉及文件 xy/index.vue、progress/gcht/index.vue、progress/change/index.vue、progress/bdcdj/index.vue 等。",
  "ranges": "14-19",
  "source_extraction_id": "dda5bf48e4c0455487a6e628405285b5",
  "version": 1,
  "memory_type": "events"
}
-->