# zs-search-form 增强与 BranchOneDialog 迁移
苏州市房地产监测V3 增强公共组件 zs-search-form 并将 BranchOneDialog 迁移至其下。

## 增强内容
- zs-search-form.vue 新增 `borderless` prop：弹窗场景下去掉边框与内边距，布局更紧凑
- zs-search-form.vue 新增 `resetFields()` 方法：供外部在关闭/重置时调用，替代直接操作内部 zs-form

## BranchOneDialog 迁移
- 文件路径：zhi2-web-admin/src/views/supervision/agreement/xy/components/BranchOneDialog.vue
- 手写 zs-form 替换为 zs-search-form
- 省/市通过 `type: 'slot'` 插槽保留原有 el-select 联动逻辑
- 关键字通过 `formItems` 声明为 `type: 'input'`
- 搜索/重置由公共组件 QueryResetButtons 统一处理
- 重置逻辑补充清空 provinceName、cityName

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 来源会话ID：7353ddc2-3283-4c26-b2a3-4ba0abc60fcf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_search_form_enhance",
  "source_extraction_id": "b7b0aa0fe086415bb2597677d3dc2469",
  "version": 1,
  "memory_type": "entities"
}
-->