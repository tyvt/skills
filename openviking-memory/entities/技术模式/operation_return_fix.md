# 修复因移除路由段的返回逻辑导致的404问题
`OperationBtnGroup` 的默认返回逻辑会移除路径的最后一段（例如：`/import/add` → `/import`），当中间路径没有路由时会导致404。

## 解决方案
- `import.vue` 禁用了内置返回，并改用 `navigateBack()`，优先使用 `backUrl`
- `index.vue` 在导航时传递 `backUrl: this.$route.path`

## 涉及的文件
- zhi2-web-admin/src/views/property/spFeeBill/components/index.vue
- zhi2-web-admin/src/views/property/spFeeBill/components/import.vue
- zhi2-web-admin/src/mixins/detailMixins.js
- zhi2-web-admin/src/views/property/spFeeBill/service/import.vue
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- zhi2-web-admin/src/mixins/form.js
- zhi2-web-admin/src/utils/ruoyi.js
- zhi2-web-admin/src/router/index.js

## 验证
- 源会话：7e35018a-3038-4ded-afb4-236a2607fad5 (extracted source=cursor)
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_return_fix",
  "source_extraction_id": "1a2b75746c8a4c628333ce0a17314818",
  "version": 1,
  "memory_type": "entities"
}
-->