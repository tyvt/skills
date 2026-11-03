# 市民端分包迁移后navigateTo页面找不到
苏住房C(zhi2-mobile-shimin) uni-app小程序迁移common/home等目录到pages_main、repair到pages_owner后，真机报navigateTo:fail page not found。

## 问题根因
- 路由路径是字符串硬编码+编码双重形态，跳转目标散落utils及页面写死'/pages/xxx/'字面量，迁移不报错仅运行时失败
- 错误信息url/title被二次URL encode(%253A)，路径可能来自菜单配置或route map拼装

## 修复做法
- 按「路由映射层→跳转调用点」两轮全仓搜索旧前缀替换：common/pdf等及home/news等→pages_main，repair→pages_owner，共22文件
- 必须排除tabBar页面(/pages/index/home等)和主包页面(/pages/benefit/index等)，误改致底部导航失效
- 重新编译逐菜单与WebView入口回归

## 验证与归属
- 所属项目：苏住房C；来源会话：f2f24630-d382-4e92-8671-e8978a914a63；代码基线：9832ba3
- 涉及文件：pages.json、webViewNav.vue、menuRouteMap.js、route-map.js、utils/index.js等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navigate_fail_bug",
  "source_extraction_id": "3ab43fc3ff7e4751aab7746f0359aac7",
  "version": 1,
  "memory_type": "entities"
}
-->