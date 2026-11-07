# 清理 storage 前的 E2E 会话清理协议
Playwright 跨端 clearBrowserSession 在 about:blank 访问 storage 时抛出 SecurityError；需要先进入真实 origin。

## 症状
- 跨端用例（03 将企业切换为 admin）调用 clearBrowserSession 并因 SecurityError 失败
- clearCookies 正常工作但清理 storage 出错，容易与登录或权限问题混淆

## 问题根因
- 在用例开始时，page 处于没有 origin 的 about:blank；page.evaluate 访问 localStorage/sessionStorage 被同源策略阻止
- clearCookies 使用 context 层，不依赖 origin，因此行为不一致

## 解决方案
- clearBrowserSession 分 3 步：首先 context().clearCookies()；然后 page.evaluate 检测 http/https 协议（try/catch）；如果不满足，goto('/#/') 进入 app；然后清理 localStorage/sessionStorage
- 检测本身应有 catch 以免提前中断
- 在 e2e/fixtures/auth-helpers.js 中检查协议；如果不是 http/https 则在清理 storage 前执行 page.goto
- 流程状态文本遵循用户标准，不要推断

## 验证与来源
- 验证证据: 在 about:blank 直接清理 storage 的 clearBrowserSession 会触发 SecurityError；解决方案为使用 canClearOnCurrentPage 检测 + 清理前 goto
- 涉及文件: e2e/fixtures/auth-helpers.js, e2e/fixtures/company-helpers.js, e2e/fixtures/register-helpers.js, e2e/company/company-record-change.spec.js, src/views/company/companyManagement/components/CompanyBasicInfoDetail.vue, src/views/company/companyManagement/change/detail.vue, src/views/toB/change/detail.vue, src/views/toB/companyRecord/detail.vue, package.json
- 所属项目: 产品2.0; session: c24a0b77-252c-498f-8424-de964da60242; 代码库: 62d5fb9

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：c24a0b77-252c-498f-8424-de964da60242


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_clear_session_protocol",
  "source_extraction_id": "4d80bcc2a01b4c9daeb3c9c060bc1073",
  "version": 2,
  "memory_type": "entities"
}
-->
