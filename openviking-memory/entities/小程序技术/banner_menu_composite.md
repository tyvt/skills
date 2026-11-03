# banner跳转地址复合串致小程序提示功能暂未开放
苏住房C首页热门活动轮播图因后端下发「菜单码&参数」复合串，小程序/H5整串查菜单表失败兜底提示「功能暂未开放」，APP正常。

## 问题现象
- 首页「热门活动」中「查看装修补贴企业名单」轮播图在小程序/H5点击提示「功能暂未开放」，同一banner在APP里正常打开
- 终端用户反馈「APP里是好的、小程序不行」，易误判为菜单配置或权限问题

## 根因
- 后端下发跳转地址为`3_1_16&richTextId=1989870396182228994`复合串，非纯菜单码
- APP侧拆成菜单码+参数跳富文本详情页；小程序/H5的navigateMenuItem把整串当菜单码查MENU_ROUTES，查不到触发静态兜底文案

## 解决方案
- utils/menuNav.js新增parseMenuLink，拆开菜单码与参数，兼容`?`与`&`两种连接格式
- 跳转时将richTextId等参数传给resolveMenuRoute，由菜单码映射页面后带参（本例落到/pages_main/news/detail?id=...）
- redirect/index.vue中转页也要走同一解析，否则从中转页进入的同类链接仍提示未开放

## 验证与归属
- 验证：会话5e3bf5c4后台跳转地址为复合串，navigateMenuItem整串查表触发「功能暂未开放」；修复后menuNav.js支持双格式并同步redirect页
- 涉及文件：src/utils/menuNav.js、src/utils/menuRouteMap.js、src/pages/redirect/index.vue、src/pages/index/components/Home_Suzhufang.vue
- 所属项目：苏住房C；来源会话ID：5e3bf5c4-bf75-4a82-9a83-96098fe31155；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "banner_menu_composite",
  "source_extraction_id": "cc94cc1db25f4df5aeee6e6f8a3b8b62",
  "version": 1,
  "memory_type": "entities"
}
-->