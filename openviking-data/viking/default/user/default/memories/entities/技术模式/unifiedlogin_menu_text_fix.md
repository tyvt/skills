# 门户快速查询入口文案显示不全修复
门户项目 UnifiedLogin.vue 中 menuList 文案过短导致快速查询入口显示不全，已按设计稿补全。

## 问题根因
- `UnifiedLogin.vue` 里 `menuList` 的文案写短了，不是样式截断

## 解决方案
- 按设计稿补全 6 处标题
- 将「经纪机构」卡片从 4 项调整为 2 项
- 本地页面已确认 10 条入口文案均完整显示，部署开发环境后生效

## 涉及文件
- d:/repository/门户/zhi2-web-admin/src/views/home/UnifiedLogin.vue

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 所属项目：门户；来源会话：4062ecea-0902-44eb-88ca-58ac62a6986b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unifiedlogin_menu_text_fix",
  "source_extraction_id": "26b930e378994743a28ddd22bfcec007",
  "version": 1,
  "memory_type": "entities"
}
-->