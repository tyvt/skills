# 产品2.0 E2E会话清理SecurityError修复
产品2.0 项目修复 E2E 用例因 about:blank 页清理 localStorage 触发 SecurityError 导致「待提交完即审核中」的问题。

## 问题现象
- 03 用例开始时 page 仍为 about:blank，直接 page.evaluate 清理 localStorage 会抛出 SecurityError。
- 根因位于 clearBrowserSession，导致用例状态异常（没有待确认，待提交完即审核中）。

## 修改内容
- e2e/fixtures/auth-helpers.js 的 clearBrowserSession 改为：先 clearCookies，判断当前页协议是否为 http/https。
- 若当前页不可清理（非 http/https），先 page.goto('/#/') 再清理 localStorage。
- 增加 try/catch 兜底，避免清理失败中断用例。

## 验证与归属
- 涉及文件：e2e/fixtures/auth-helpers.js、e2e/company/company-record-change.spec.js、CompanyBasicInfoDetail.vue。
- 所属项目：产品2.0；来源会话：c24a0b77-252c-498f-8424-de964da60242；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_clear_session_fix",
  "source_extraction_id": "a75d7e23582d403c85e4b150a612f382",
  "version": 1,
  "memory_type": "entities"
}
-->