# E2E 清会话前判当前页协议
Playwright 跨端用例 clearBrowserSession 在 about:blank 上调 storage 会抛 SecurityError，需先进入真实 origin。

## 问题现象
- 跨端用例（03 企业端切管理端）调用 clearBrowserSession 报 SecurityError 导致用例失败
- clearCookies 成功但清 storage 炸，易被误判为登录态或权限问题

## 根因
- 用例开始时 page 停在 about:blank 无 origin，page.evaluate 访问 localStorage/sessionStorage 被同源策略拒绝
- clearCookies 走 context 层不依赖 origin，故表现不一致

## 修复方案
- clearBrowserSession 三段式：先 context().clearCookies()；再用 page.evaluate 探测 protocol 是否为 http/https（try/catch 兜底）；不满足先 goto('/#/') 进入应用；再清 localStorage/sessionStorage
- 探测本身要有 catch 兜底避免先炸
- 流程状态文案按用户口径写，不自行推断（如「没有待确认，待提交完了就是审核中」）

## 验证与归属
- 验证证据：最终结论 clearBrowserSession 在 about:blank 直接清 storage 触发 SecurityError；给出 canClearOnCurrentPage 探测 + goto 后清的修复
- 涉及文件：e2e/fixtures/company-helpers.js、e2e/company/company-record-change.spec.js
- 所属项目：产品2.0；来源会话：c24a0b77-252c-498f-8424-de964da60242；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_clear_session_protocol",
  "source_extraction_id": "13dd120e07024e50a04d22b10abf5663",
  "version": 1,
  "memory_type": "entities"
}
-->