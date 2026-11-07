# 登录侧栏装饰图白条修复
苏州市房地产监测V3 中登录侧栏装饰图缩放高度不足致底部露白底，已在 login.vue 改用 cover 铺满。

## 问题根因
- 侧栏宽度固定 520px 且表单 min-height 约 500px
- 装饰图 `object-fit:contain` 缩放高度不足致底部露白底

## 修复方案
- 于 login.vue 按宽高比计算侧栏宽度
- 视口压缩时加 `login-bg__side-image--cover` 用 cover 铺满
- 侧栏容器 flex + min-height:0 铺满

## 涉及文件
- zhi2-web-admin/src/views/login.vue

## 验证与归属
- 验证证据：extracted source=cursor session=09c6ceb2-361f-43b0-9c69-57ac6c7fa6aa
- 来源会话ID：09c6ceb2-361f-43b0-9c69-57ac6c7fa6aa
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_sidebar_cover",
  "source_extraction_id": "a272ea15b80241319e7bdad773ac5ebe",
  "version": 1,
  "memory_type": "entities"
}
-->