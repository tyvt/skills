# 门户 homeDataMixin 调试 return 短路 layoutVariant
`homeDataMixin.js` 的 `layoutVariant` 若在 `resolveHomeLayoutVariant(...)` 之前存在 `return 'developer'` 等调试早退，会永久短路布局变体解析。
## 问题根因
- index-new 将始终走 developer 的 `home-layout-sidebar` 分支，admin/broker 布局、`fetchStats(variant)` 与权限驱动首页形态全部错误，且与 hideLayoutChrome 无关。
## 修复方案
- 合并前必须删除调试 return，恢复 `resolveHomeLayoutVariant` 完整逻辑。
## 验证与归属
- 验证证据：Review 标记 HIGH：layoutVariant 首行 return 'developer' 导致 resolveHomeLayoutVariant 永不执行。
- 涉及文件：zhi2-web-admin/src/views/home/mixins/homeDataMixin.js、zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户；来源会话 1cdf8560-a3f6-464f-957c-55bbfb919fcf；代码基线 50578e9。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_layoutvariant_debug",
  "source_extraction_id": "731ed82de4844f9c8dc4884c40a5bb81",
  "version": 1,
  "memory_type": "entities"
}
-->