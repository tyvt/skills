- 撤回 TagsView/index.vue 中使用 getRouterPathByFilePath 强行计算 childrenMenus 的改动，恢复原始实现并移除 import。
- 不采用 getRouterPathByFilePath 干扰原有路由/菜单行为的方式，因该方式会破坏原有路由/菜单逻辑。
- 后端返回菜单 path 实为 /property/complexChange/ 导致 /property/property/complexChange 空白嵌套错误，勿用前端强行计算掩盖该问题。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "TagsView菜单计算偏好",
  "source_extraction_id": "9a939398a49a4f2e9c451b05bb181dcb",
  "version": 1,
  "memory_type": "preferences"
}
-->