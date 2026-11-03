# 网点弹窗搜索栏复用 zs-search-form
苏州市房地产监测V3 中弹窗搜索栏统一复用 zs-search-form 组件，支持弹窗场景。

## 变更点
- zs-search-form.vue 新增 borderless prop 与 resetFields 方法支持弹窗场景
- BranchOneDialog.vue 手写 zs-form 替换为 zs-search-form，省市联动通过 type:'slot' 保留
- 搜索重置由 QueryResetButtons 统一处理并清空缓存字段

## 涉及文件
- supervision/bank/superviseBank/components/WdmcDialog.vue
- supervision/bank/cbyh/components/YhwdDialog.vue
- supervision/bank/cbyh/components/WdmcDialog.vue
- supervision/agreement/xy/components/BranchOneDialog.vue
- components/zs-search-form/zs-search-form.vue
- mixins/listMixins.js
- mixins/formComponents.js
- components/zs-search-form/SearchFormItem.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/133.md
- 来源会话：7353ddc2-3283-4c26-b2a3-4ba0abc60fcf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_search_reuse",
  "source_extraction_id": "2d636c74f56d4a018abe20d46118cc05",
  "version": 1,
  "memory_type": "entities"
}
-->