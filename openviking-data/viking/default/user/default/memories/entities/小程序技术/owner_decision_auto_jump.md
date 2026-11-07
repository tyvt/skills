# 业主决策自动跳转投票页条件
首页/我的页点「业主决策」后自动打开投票页，须满足本次灵犀选屋成功(isLingXiSuccess===true)。

## 触发与抑制
- 首页/我的页点「业主决策」自动打开投票页的前提：本次灵犀选屋成功 isLingXiSuccess===true
- 待执行动作存在但本次未选屋成功（query 无灵犀回调参数）时，清除待执行动作避免切换页签后误跳转
- authCode=0 时提示改为「您未选择房屋」并清除待执行动作与 query 中的 authCode

## 验证与归属
- 验证证据：005.md 修复内容：home.vue 与 externalWebview.vue 统一 authCode=0 处理与未完成选屋不自动跳转
- 涉及文件：pages/webview/home.vue、pages/webview/externalWebview.vue
- 来源会话ID：aa2b122d-243c-48b0-8db4-1b520bba1bf3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "owner_decision_auto_jump",
  "source_extraction_id": "a05ef5444c4c40b7b614ae24c0ceaaad",
  "version": 1,
  "memory_type": "entities"
}
-->