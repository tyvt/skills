# 顶栏菜单展平逻辑修复
苏州市房地产监测V3 项目中，顶栏菜单第一项错误显示子菜单标题的问题已修复。

## 问题根因
- 若依兼容逻辑：一级菜单 path 为 / 且存在子菜单时，直接用第一个子菜单作为顶栏项，导致显示「待办事项」
- 父级带有 alwaysShow: true，表示应作为目录展示，不应被展平

## 修复内容
- ruoyi.js：新增 shouldFlattenRootTopNavMenu，仅在根路径且未设置 alwaysShow 时才展平；collectTopNavMenus 统一使用该规则
- Navbar.vue：topMenus 改为调用 collectTopNavMenus，避免逻辑不一致
- 刷新登录后顶栏第一项显示「工作中心」，点击后侧栏仍为待办/已办/事项管理

## 涉及文件与归属
- 涉及文件：ruoyi.js、Navbar.vue
- 所属项目：苏州市房地产监测V3
- 来源会话ID：95e998b6-1d2c-4372-a159-b6161609fa2a；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "topnav_flatten_fix",
  "source_extraction_id": "2f30ec58d9394013bd84cd5ef6e15455",
  "version": 1,
  "memory_type": "entities"
}
-->