# ref=queryForm 弹窗去除 DetailTemplate 规则
全局检索 DetailTemplate + v-if dialogMode view/else + 内层 zs-form ref=queryForm 结构时，统一改为只保留 zs-form 及其子项。

## 改造规则
- 模板只保留 <zs-form ref="queryForm"> 及其子项（保留原有 v-show="showSearch" 等），删除 DetailTemplate 包裹与 v-if/v-else
- 脚本侧删除对应 contentInfo 计算属性（或清空仅含它的 computed）

## 适用范围
- ref 为 form 的详情/编辑弹窗仍可按原 DetailTemplate 模式，不在此次规则内
- 涉及文件：ScopeSelectDialog.vue、propertyProjectDialog.vue 等多个 maintenance/benefit/property/evaluation 弹窗组件

## 验证与归属
- 验证：会话 2c30fb51 按 queryForm 规则批量改 14 个弹窗组件
- 所属项目：2-0；来源会话ID：2c30fb51-d231-4c97-b3fd-4b938f11499b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "queryform_remove_template",
  "source_extraction_id": "7e05f1205910435fbbe5059959536467",
  "version": 1,
  "memory_type": "entities"
}
-->