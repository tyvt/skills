# 监管项目名称的 flex 布局
在项目 苏州市房地产监测V3 中，监管 jgxm 的 `detail.vue` 使用 flex 来对齐主名称和楼栋号，并且查看状态拼接全角括号。

## 描述
- 调整监管项目名称的展示（jgxm）
- 所属项目: 苏州市房地产监测V3

## 实现
- 编辑时：容器 `regulator-project-name-fields` 使用 flex；主名称 `flex:1`，楼栋号片段 `margin-left:auto` 靠右
- 查看时：`regulatorProjectNameDisplay` 拼接 `${name}（${short}）` 使用全角括号

## 相关文件
- `src/views/supervision/agreement/jgxm/detail.vue`
- `src/views/supervision/unblock/InformationPush/detail.vue`
- `src/utils/detailLayout.js`
- `src/views/supervision/agreement/jgxm/components/ProjectNameDialog.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据: src=苏州市房地产监测V3-leftover/032.md
- 来源会话: 8ed69fd8-6062-4732-bc26-b18e22054b54; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_name_flex",
  "source_extraction_id": "9e8fdb1f8e9d4c00b0343d17cab91324",
  "version": 1,
  "memory_type": "entities"
}
-->