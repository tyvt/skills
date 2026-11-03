# project_subtype_constants
物业项目「项目类型+二级多选」需求中，仅备案与变更页改造，二级选项硬编码于 projectTypeConstants.js 的技术约定。
## 业务规则
- 一级 projectType 从字典 complex_project_type 加载（住宅/非住宅），二级按字典项 remark 分组。
- 提交字段为 projectSubType（多选），二级选项不依赖 complex_project_sub_type 字典。
## 硬编码映射
- 普通住宅=1、非普通住宅=2、办公=3、商业=4、其他=5。
- 硬编码统一置于 property/complex/components/projectTypeConstants.js。
## 改造范围
- 仅改备案 property/complex/detail.vue 与变更 property/complexChange/detail.vue。
- 其余 complex 查询页保持原 zs-select 单选，避免改公共组件或只读页 publicQuery。
## 验证与归属
- 验证：d9d55de8 诉求1-2 定义 UI 与 projectSubType，最终结论只改两页及五级硬编码。
- 涉及文件：zhi2-web-admin/src/views/property/complex/detail.vue、property/complexChange/detail.vue、components/projectTypeConstants.js。
- 所属项目：园区公共收益；来源会话：d9d55de8-ed79-48f5-8bf7-19bf90a396e9；代码基线：7458acc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_subtype_constants",
  "source_extraction_id": "04f44256a020407aa30d82b50cc89746",
  "version": 1,
  "memory_type": "entities"
}
-->