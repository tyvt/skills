# 密码重置路径调试日志泄露 Token
登录重置密码时会打印整份用户状态，其中包含 token，需要移除调试日志避免凭据进入浏览器控制台。

## 问题背景
- 登录重置密码路径会打印 Vuex 全状态，其中包含 token
- 属于「凭据不得进日志」这条安全要求的直接违反点
- 明确不改动重置密码本身的行为

## 修复方案
- 先补一条预期失败的安全红测，再移除两条调试日志
- 移除范围仅限密码重置路径的 Vuex 全状态打印，避免 token 出现在浏览器控制台
- 涉及文件 src/stores/user.js（该文件同时做了语法检查与 diff 检查）

## 验证与状态
- 新增安全检查先按预期失败、随后通过；user.js 语法检查与 diff 检查均已通过
- 会话时间 2026-11-14；同期 UI 原型对齐仍由实现成员进行中


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "password_reset_log_token_leak",
  "source_extraction_id": "5dce92c126e34892882eb81ac1bc8cc3",
  "version": 1,
  "memory_type": "entities"
}
-->