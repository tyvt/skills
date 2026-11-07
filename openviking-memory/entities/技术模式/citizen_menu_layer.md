# 市民端菜单三层来源
苏住房C 市民端菜单由硬编码入口页、路由码映射表、后台配置键三处共同决定，改动时需同步理解各自职责。

## 三层职责
- 聚合入口页前端写死 menuList：阳光物业 src/pages/property/index.vue，公共收益/共有资金 src/pages/benefit/index.vue，改子菜单跳转直接改每项 url。
- 后台菜单/外链用路由码，在 src/utils/menuRouteMap.js 的 MENU_ROUTES 映射真实路径（如 3_1_19→/pages/property/index、3_1_18→/pages/benefit/index、1_0_5→/pages_benefit/benefit/index）。
- 苏住房版首页/慧物业/掌服务 Tab 菜单来自后台配置键 app.suzhufang.config（GET /system/config/getByKey/app.suzhufang.config，本地兜底 src/static/menus.fallback.json），url 填路由码不填完整路径。

## 新增页面步骤
- 固定两步：pages.json 注册路由 + MENU_ROUTES 增映射。
- 后台 JSON 可调整入口无需改前端；level 是权限等级 v0（无需登录）→v3（需身份认证），levelCode 是身份要求（owner=业主），isShow="1" 表示暂未开放、点击提示 showMsg。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 618910fc 用户问「阳光物业/公共收益如何配置 URL」，给出三层来源及路由码映射表。
- 涉及文件：src/pages/property/index.vue、src/pages/benefit/index.vue、src/utils/menuRouteMap.js、src/static/menus.fallback.json、src/pages.json。
- 所属项目：苏住房C；来源会话ID：618910fc-72c7-406b-887e-dd852e5e6cf5；代码基线：89637fb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "citizen_menu_layer",
  "source_extraction_id": "43f131e44907422ab73f0bd6432bc67f",
  "version": 1,
  "memory_type": "entities"
}
-->