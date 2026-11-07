#:deep()嵌套编译出Chrome53不支持CSS
泰兴小程序在 `list.vue`、`create.vue`、`proposal-item-detail.vue` 中将 `:deep(.zs-button)` 嵌套于 `.page-button-container {}` 内，编译生成 Chrome53 不支持的嵌套 CSS 触发警告。

## 问题根因
- `:deep(.zs-button)` 嵌套于 `.page-button-container {}` 内部，编译生成 Chrome53 不支持的嵌套 CSS。
- 触发浏览器警告且样式异常。

## 解决方案
- 改为平铺写法，警告消除且按钮样式正常。

## 验证与归属
- 所属项目：泰兴小程序
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证证据：src=泰兴小程序/014.md
- 涉及文件：src/pages_common/verifyUser/components/AuthDialog.vue、src/utils/coordinateTransformer.js、src/App.vue、src/components/ZsButton/ZsButton.vue、vite.config.ts、src/pages-suggest/list.vue、src/pages-suggest/create.vue、src/pages-suggest/proposal-item-detail.vue
- 来源会话ID：27f4bf24-bca2-4fd1-8aad-6b6ad61ac1e1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "chrome53_nested_css",
  "source_extraction_id": "b7c019530c904296840e1259d4506eac",
  "version": 1,
  "memory_type": "entities"
}
-->