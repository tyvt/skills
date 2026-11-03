# 首页快捷菜单入口需先校验登录与绑定房屋再开 web-view
首页快捷菜单（如「共有资金表决」）点击时先 ensureHouseSelected() 校验登录与绑定房屋，通过后再 openWebViewForMiniRoute 打开 mini 路由。

## 入口规范
- 首页快捷菜单（如「共有资金表决」）点击先调 ensureHouseSelected() 校验登录与绑定房屋（未绑定弹房屋绑定引导）
- 校验通过后用 openWebViewForMiniRoute 打开对应 mini 路由（如 /pages_owner/decision/index），与「公示公告」入口一致
- 顶部快捷菜单里的「业主决策」仍走外链 H5 投票逻辑

## 验证与归属
- 验证证据：007.md 会话：共有资金表决菜单入口增加与校验绑定房屋
- 涉及文件：pages/webview/home.vue、pages.json
- 来源会话ID：f1c8f7f6-c39d-4e69-96a6-072e8babb312；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "quick_menu_validation",
  "source_extraction_id": "a05ef5444c4c40b7b614ae24c0ceaaad",
  "version": 1,
  "memory_type": "entities"
}
-->