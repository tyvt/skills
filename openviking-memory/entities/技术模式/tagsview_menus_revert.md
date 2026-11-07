# TagsView childrenMenus 改动撤回与菜单路径诊断
Vue3 迁移中，撤回 TagsView 强算 childrenMenus 的改动并诊断 complexChange 菜单空白问题。
## 改动撤回
- `TagsView/index.vue` 中 `childrenMenus` 相关改动已全部撤回，恢复仓库原始实现。
- 去掉 `getRouterPathByFilePath` 的 import，避免影响其他菜单与整体路由行为。
## 菜单路径诊断
- `/property/property/complex` 可打开，但 `/property/property/complexChange` 空白。
- 代码中“变更”相关跳转使用 `getRouterPathByFilePath('property/complexChange/detail')`，说明真正注册路由的 path 更可能是 `/property/complexChange/...` 而非 `/property/property/complexChange/...`。
- 很可能是后端返回的菜单 path 与实际注册 path 不一致导致空白。
## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 b3c5e61d（cursor session=b3c5e61d-0c1b-42d7-b8c6-0e42c8a88242）。
- 涉及文件：TagsView/index.vue；来源会话ID：b3c5e61d-0c1b-42d7-b8c6-0e42c8a88242；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tagsview_menus_revert",
  "source_extraction_id": "a35c4c422cf44dc4b7bd25b6ea2ac412",
  "version": 1,
  "memory_type": "entities"
}
-->