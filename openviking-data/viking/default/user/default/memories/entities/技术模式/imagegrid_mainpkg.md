# ImageGrid移至主包公共组件
泰兴小程序因分包间不能互相引用组件，`maintain-detail` 引用 `pages_owner` 分包的 `ImageGrid` 报错，已将其移至主包。

## 问题根因
- 微信小程序分包之间不能互相引用组件。
- `pages_facility/maintain-detail` 在 `pages_facility` 分包，却引用了 `pages_owner/repair/components/ImageGrid`（属 `pages_owner` 分包），导致 `Component is not found` 报错。

## 解决方案
- 新增 `src/components/ImageGrid/ImageGrid.vue` 主包公共组件。
- 更新 `maintain-detail.vue` 的 import 为 `@/components/ImageGrid/ImageGrid.vue`。
- 同步更新 `pages_owner/repair/detail.vue` 引用。
- 删除原分包内 `pages_owner/repair/components/ImageGrid.vue`，避免重复。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/components/ImageGrid/ImageGrid.vue、maintain-detail.vue、pages_owner/repair/detail.vue
- 来源会话ID：1417821d-8f00-4c9e-bb90-7ad9e702968e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "imagegrid_mainpkg",
  "source_extraction_id": "d785119f5bb249119c9e3f841e480587",
  "version": 1,
  "memory_type": "entities"
}
-->