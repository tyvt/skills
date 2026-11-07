# overviewEmpty.scss 弃用警告修复
产品2.0 的 zhi2-web-admin 中将 9 个组件的 Sass `@import` 改为 `@use`，消除编译弃用警告。

## 改动内容
- 9 个组件里的 `@import './overviewEmpty.scss'` 改为 `@use './overviewEmpty.scss' as *;`
- 样式行为不变，编译时不再出现该弃用警告

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：重启 dev server 后刷新页面即可验证
- 涉及文件：overviewEmpty.scss、publicQuery/complex/detail.vue、propertyContractTable.vue、buildingTable.vue
- 所属项目：产品2.0；来源会话：4f89ea4c-149b-4217-b962-c76fcfb5aaea；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sass_deprecation_fix",
  "source_extraction_id": "fa91e52bec984e5cbe8148f4d9145e28",
  "version": 1,
  "memory_type": "entities"
}
-->