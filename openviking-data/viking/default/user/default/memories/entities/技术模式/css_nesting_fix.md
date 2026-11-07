# CSS嵌套警告修复
泰兴小程序 3 个页面因 `:deep(.zs-button)` 写在容器内部产生 chrome53 不支持的嵌套 CSS，已改为平铺写法消除警告。

## 问题根因
- 根因是 3 个页面里把 `:deep(.zs-button)` 写在 `.page-button-container { }` 内部，编译后会变成 chrome53 不支持的嵌套 CSS。
- 该嵌套 CSS 触发构建警告，但按钮样式本身未受影响。

## 修复方案
- 已改为平铺写法（`list.vue`、`create.vue`、`proposal-item-detail.vue`）。
- 重新构建后该警告不再出现，按钮样式不受影响。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`list.vue`、`create.vue`、`proposal-item-detail.vue` 等。
- 来源会话ID：27f4bf24-bca2-4fd1-8aad-6b6ad61ac1e1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "css_nesting_fix",
  "source_extraction_id": "f14ea4addc6543e1b47221f41498e9f0",
  "version": 1,
  "memory_type": "entities"
}
-->