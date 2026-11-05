# 装修补贴企业名单轮播图跳转修复
苏住房C小程序点击热门活动「查看装修补贴企业名单」轮播图提示「功能暂未开放」，已解析嵌入参数修复。

## 问题根因
- 后端返回跳转地址为 3_1_16&richTextId=1989870396182228994，非纯菜单码
- APP 将 3_1_16 作菜单码、richTextId 作参数跳富文本；小程序把整串当菜单码查 MENU_ROUTES 查不到

## 修复内容
- 在 menuNav.js 新增 parseMenuLink，解析 banner 嵌入查询参数（支持 ? 和 &），跳转传 richTextId 给 resolveMenuRoute
- 更新 redirect/index.vue 保证中转页也能解析同类链接

## 验证与归属
- 验证：点击轮播图应跳 /pages_main/news/detail?id=1989870396182228994
- 涉及文件：menuNav.js、redirect/index.vue、utils/index.js、Home_Suzhufang.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：5e3bf5c4-bf75-4a82-9a83-96098fe31155；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menulink_parse_fix",
  "source_extraction_id": "7abc9171dfa941c6b2fe9174722cd6ca",
  "version": 1,
  "memory_type": "entities"
}
-->