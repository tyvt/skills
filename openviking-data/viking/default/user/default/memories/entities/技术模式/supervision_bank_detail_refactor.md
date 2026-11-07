# 产品2.0监管银行详情页改造
产品2.0 项目将 supervision/bank 三个详情页按新版框架规范改造，并为 DetailTemplate 增加 type:'dict' 渲染支持。

## 改造范围
- 涉及 cbyh/detail.vue（承办银行）、jgwd/detail.vue、wtjgxy/detail.vue 三个 supervision/bank 详情页。
- 顺带为 detail-template.vue 的 DetailTemplate 增加 type:'dict' 渲染支持，与 tag 一致，配合 options 显示字典标签。

## 主要改动
- 顶部 operation-btn-group 配置 moduleName/businessName/primaryKey，关闭内置编辑/提交/审核/打印，slot 内自定义权限按钮。
- 删除 operation-container、zs-attachment，表单改为 zs-form 包裹，view 用 DetailTemplate + contentInfo/contentInfo2。
- edit 模式 el-input→zs-input、el-select→zs-select（银行名称保留 el-select filterable）。
- 保留 prefixUrl、isSuzhouzhizai 条件字段、YhwdTable 子表等原有逻辑。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：cbyh/detail.vue、jgwd/detail.vue、wtjgxy/detail.vue、detail-template.vue。
- 所属项目：产品2.0；来源会话：b653273d-87b4-4092-97cd-01c7ae965dff；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_bank_detail_refactor",
  "source_extraction_id": "a75d7e23582d403c85e4b150a612f382",
  "version": 1,
  "memory_type": "entities"
}
-->