# zs-search-form 配置化搜索表单组件
配置化渲染的搜索表单组件，页面通过 formItems 配置 type 生成查询条件控件，仅识别已注册 type。
## 功能特性
- 支持 search-select 类型：内部为 el-select + filterable，可输入可搜索，用于选项过多的查询条件（如物业费申报页所属街道、社区各上百项）。
- 漏配 type 或写入未注册 type 时，按已知 #287 规律静默退化为空输入框。
## 扩展约定
- 扩展新 type 时务必同步检查漏配 type 时的降级表现，遵循「公共组件扩展而非页面特化」原则。
- 页面侧仅将 type 改为 search-select 即可复用，查询参数名保持不变，改动集中在一个公共组件。
## 关联项目
- 属于苏住房G项目（zhi2-web-admin 子模块），search-select 扩展提交至 develop/v2.6.2-suzhufang 分支（提交 00e5996c1）。

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "zs_search_form",
  "source_extraction_id": "9e18b30cf1944ddd803c60e3d00c1c14",
  "version": 1,
  "memory_type": "entities"
}
-->