# 带右侧后缀的监管项目名称 flex 布局
在项目 苏州市房地产监测V3 中，`supervision/agreement/jgxm/detail.vue` 中的 "监管项目名称" 字段使用 flex 将楼栋号段右对齐。

## 描述
- 在编辑模式下，`regulator-project-name-fields` 采用 flex 布局，主名称 `flex:1`，后缀 `regulator-project-name-suffix` 使用 `margin-left:auto`
- 全角括号 `（` `）`；可视模式拼接 `${name}（${short}）`

## 实现细节
- 楼栋输入框宽度 ~140px，flex 中使用 `:deep(.el-input){width:100%}`
- 涉及 `ProjectNameDialog.vue` 和 `detailLayout.js`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：8ed69fd8-6062-4732-bc26-b18e22054b54
- 验证证据: src=苏州市房地产监测V3/233.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/jgxm/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/unblock/InformationPush/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/detailLayout.js; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/jgxm/components/ProjectNameDialog.vue
- 源会话: 8ed69fd8-6062-4732-bc26-b18e22054b54; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "jgxm_name_flex",
  "source_extraction_id": "ed4340c4032043b1baf185a8b9851f9f",
  "version": 1,
  "memory_type": "entities"
}
-->