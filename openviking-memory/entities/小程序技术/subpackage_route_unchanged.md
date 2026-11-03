# uni-app分包瘦身页面挪进subPackages后业务跳转完整路径不变
主包超限把页面从 pages 挪到 subPackages 后，业务跳转 URL 不必批量改写。

## 原理
- 微信小程序/uni-app 分包只改变打包落点，页面运行时完整路由仍是 root 与 path 拼接（例：pages/face/bdc），与挪包前一致
- 仅「目录整体迁分包且改了 pages.json 注册方式」或「历史路径废弃」时才需全仓替换 URL

## 做法
- 改 pages.json 的 subPackages 与物理文件位置即可
- 用「文件路径 ↔ root+path ↔ 代码里跳转字符串」三张对照表全量核对，一致则不动业务 URL
- 主包 redirectTo 分包 Tab 页、分包 reLaunch 回主包 webview 均合法
- 主包瘦身核对路由时优先查是否误改了本来正确的 /pages/face/* 等路径

## 验证与归属
- 验证证据：会话 404cce7e 结论「分包后业务跳转路径不需要改」「uni-app/微信小程序分包只改变打包位置，页面完整路径不变」
- 涉及文件：pages.json、pages/webview/home.vue、pages/webview/externalWebview.vue、pages/face/bdc.vue
- 所属项目：小程序；来源会话ID：404cce7e-39c8-4d87-8c7d-0d9d3fe66028；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "subpackage_route_unchanged",
  "source_extraction_id": "3009dd90074b496cb5ed0d2113ea792c",
  "version": 1,
  "memory_type": "entities"
}
-->