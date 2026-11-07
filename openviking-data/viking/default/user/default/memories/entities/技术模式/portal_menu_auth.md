# 门户首页业务流菜单以接口权限为准
门户 B 端/经纪首页展示业务板块菜单应完全依据接口返回的板块权限与菜单配置，不在客户端叠加互斥隐藏逻辑。

## 问题背景
- 历史上接口字符/权限已正确但商品房菜单仍不展示，因客户端存在「原因 2」类互斥或额外隐藏逻辑

## 解决方案
- 移除「只能二选一」的客户端限制，商品房、存量房、租赁等板块允许同时存在
- 菜单展示完全按接口返回判断，不叠加重原因类互斥或额外隐藏逻辑

## 验证与归属
- 验证证据：用户「字符是对的，为什么商品房的菜单配置没有展示？」「原因2的限制逻辑现在不需要，完全按照接口返回判断」「商品房和存量房可以同时存在」
- 涉及文件：zhi2-web-admin/src/views/home/config/homeLayout.js、homeDataMixin.js、utils/terminalUser.js
- 所属项目：门户；来源会话：f7cb8b58-5877-4cf8-8d73-0c4b5bb0762a；代码基线：fd73e47

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_menu_auth",
  "source_extraction_id": "8ea0a501af204a25846f3fa3289591f8",
  "version": 1,
  "memory_type": "entities"
}
-->