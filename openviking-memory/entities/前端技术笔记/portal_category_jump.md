# 门户跳转管理端板块名不生效根因
门户首页菜单跳转管理端时顶栏未出现板块名，根因是板块名加在后端SSO回调query上被location.replace丢弃，须注入redirect内嵌前端地址。

## 问题根因
- 之前把板块名加在管理端后端SSO回调地址query：`/api/v3.0/security/auth/portal/callback?...&portalCategory=商品房`
- 后端PortalSsoController.callback()只认ticket/timestamp/nonce/redirect四参数，成功后返回HTML执行sessionStorage.setItem('Admin-Token',...)+location.replace(successUrl)
- resolveSuccessUrl()对有redirect时原样返回redirect，浏览器落地地址按redirect重建，回调URL其它query全被丢弃
- 管理端前端location.search里根本没有portalCategory

## 解决方案
- 不需改后端，读后端源码确认落地地址由resolveSuccessUrl()决定
- 板块名在门户发送端跳转运行时注入，不写死在功能配置jumpUrl字段：新增src/utils/portalCategory.js的buildPortalCategoryUrl()
- 识别URL里redirect参数并递归注入到其内嵌管理端前端地址，写query段与hash段query（兼容hash路由与302只保留fragment），ticket/timestamp/nonce原样保留且幂等不重复追加
- 补齐三条跳转路径：应用列表gotoApp、待办handleProcess（按业务名匹配板块）、常用功能handleCommonJump（按functionId反查板块标题）
- 全链路模拟验证：落地URL含portalCategory=商品房，解析结果「商品房」，标题「苏州市房地产监测V3（商品房）」

## 验证与归属
- 验证会话：session-eb30f683-df51-4286-8b54-7cbdea56c804（基线65275e9），用户诉求1「之前加了首页菜单跳转管理端携带目录名称现在没生效，直接加在跳转逻辑代码里不是配置字段写死」
- 涉及文件：zhi2-web-admin/src/utils/portalCategory.js、zhi2-web-admin/src/views/home/mixins/homeDataMixin.js、zhi2-web-admin/src/views/home/index.vue
- 所属项目：zhi2-web-admin

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "portal_category_jump",
  "source_extraction_id": "35a40b74c09b4248958c07f3ca6c79bd",
  "version": 1,
  "memory_type": "entities"
}
-->