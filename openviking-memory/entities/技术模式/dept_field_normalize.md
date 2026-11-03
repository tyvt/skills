# 部门树字段未归一化致区域不显示
物业手持B端因接口返回字段与组件消费字段不一致导致行政区域不显示的已知问题及修复方案。

## 问题根因
- 接口返回 `deptName`/`deptId`，而组件原用 `label`/`id`
- 字段名未归一化导致行政区域（部门树）无法正确显示

## 解决方案
- 在 `src/pages/complex-select/index.vue` 增加 `getDeptNodeId`/`getDeptNodeLabel` 归一化映射

## 验证与归属
- 验证证据：src=物业手持B端/004.md
- 涉及文件：complex-select/index.vue、home/index.vue、ZsPicker.vue、store/user.js、organization/index.vue、login/index.vue、useAreaDict.js、utils/index.js
- 来源会话ID：53a1b5a9-a0bb-43b5-969a-34c78dd71d66；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dept_field_normalize",
  "source_extraction_id": "8d4147cd914e4ebdb70a5e2257f219ff",
  "version": 1,
  "memory_type": "entities"
}
-->