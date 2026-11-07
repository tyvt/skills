# 切换按钮无响应修复
externalWebview.vue 与 home.vue 的「切换/切换小区」按钮因 @click.stop 拦截导致 picker 无法弹出。
## 问题根因
- 两个页面的「切换」都包在 `<picker mode="selector">` 内，内部按钮写了 `@click.stop` 且未绑定方法
- 微信小程序中 @click.stop 拦截子节点点击，阻止事件传到 picker，选择器弹不出来，表现为按钮无反应
## 修复内容
- externalWebview.vue：去掉房屋卡「切换」上的 `@click.stop`
- home.vue：去掉「切换小区」上的 `@click.stop`
- externalWebview 已绑定房屋时 handleHouseAction 会直接 return，去掉 stop 不会误触整卡逻辑
- home.vue 小区区域无父级点击，本不需要 stop
## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 重新编译后点「切换/切换小区」应弹出房屋列表，选完走 onHousePickerChange 更新当前房屋
- 仍无反应需确认 portalUser.houseList 是否多于 1 套（仅多套时显示该按钮）
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue、utils/portal-user.js
- 来源会话ID：4cbe7d62-f4dd-4789-afa2-f9344da6e1d1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "picker_click_stop",
  "source_extraction_id": "e639637956e641fd92e4d5fcac5e1554",
  "version": 1,
  "memory_type": "entities"
}
-->