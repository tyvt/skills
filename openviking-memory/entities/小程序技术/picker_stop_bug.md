# picker内@click.stop致切换点击无反应
切换按钮位于 picker 内且绑定 @click.stop 无对应方法，拦截事件致选择器无法弹出。

## 问题根因
- 切换按钮位于 `<picker mode="selector">` 内并绑定 `@click.stop`，但无对应处理方法
- 该绑定拦截子节点点击并阻止事件传到 picker，导致选择器无法弹出

## 解决方案
- 移除 externalWebview.vue 房屋卡切换按钮上的 `@click.stop`
- 移除 home.vue 切换小区按钮上的 `@click.stop`，恢复弹窗正常弹出

## 验证与归属
- 来源会话：4cbe7d62-f4dd-4789-afa2-f9344da6e1d1
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue、utils/portal-user.js
- 所属项目：小程序（wygl-wxxcx-dev-slh）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "picker_stop_bug",
  "source_extraction_id": "f8f2d02b96524106a6bb0d48004c87f7",
  "version": 1,
  "memory_type": "entities"
}
-->