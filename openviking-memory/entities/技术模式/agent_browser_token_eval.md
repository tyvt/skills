# agent-browser 注入长 token 用 base64 eval
用 agent-browser 在 CDP 9229 上做实机验证时需向 localStorage 注入登录态 token（key flood-token-v1），长 JWT 内联会触发 SyntaxError，导致注入失败、页面停在未登录态。

## 问题与修复
- 失败形态：eval 内联长 JWT（约 270 字符）时引号/特殊字符解析出错，报 SyntaxError
- 修复：把 localStorage.setItem("flood-token-v1","<TOKEN>") 编码为 base64，改用 agent-browser eval -b <base64> 注入
- 本例 base64 约 416 字符，注入后页面加载真实数据（真实计数 4912 + 内容摘要行）
- 验证脚本用 timeout 包住，避免 agent-browser wrapper 未 kill 干净导致外层 wait 挂起

## 归属
- 所属项目：苏住房防汛C端移动查询H5（zhi2-mobile-query-h5-c）
- 来源：2026-11-25 bug 6959 首页待办实机验证门


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agent_browser_token_eval",
  "source_extraction_id": "d53ff4e5e5a146dbb9e52d9832912ade",
  "version": 1,
  "memory_type": "entities"
}
-->