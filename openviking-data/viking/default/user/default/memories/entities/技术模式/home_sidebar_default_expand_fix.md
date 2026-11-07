# home_sidebar_default_expand_fix
产品2.0 修复工作中心首页左侧菜单（消息、待办任务、已办任务、我发起的）进入时未默认展开的问题。

## 问题原因
- `home/index.vue` 的 `created` 钩子调用 `toggleSideBar`，而 Vuex 侧边栏默认 `opened: true`，toggle 会切换为折叠，导致首页加载后菜单收起。

## 修复方案
- `home/index.vue`：移除 `created` 中的 `toggleSideBar` 调用，进入首页不再自动折叠。
- `Navbar.vue`：在 `goHome` 中补充逻辑，点击顶部「首页」时若侧边栏已折叠则自动展开。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`home/index.vue`、`Navbar.vue`
- 所属项目：产品2.0；来源会话：7306b6f9-4bed-4195-ab23-cda67731b6e0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_sidebar_default_expand_fix",
  "source_extraction_id": "73aa35c0f24443eb98ea54b97a326597",
  "version": 1,
  "memory_type": "entities"
}
-->