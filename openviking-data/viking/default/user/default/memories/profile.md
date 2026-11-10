# 当前用户
- 身份：default（DSH Web，peer：deepseek-harness-default-workspace）
- 目录清单不再注入。找文件、账单、历史会话先走 search。

# 核心规范（5）
1. 找不到文件或不知道组件在哪个仓库时，先调用 mcp__openviking__search，禁止盲目 glob / pwsh 遍历。
2. 大面积代码检索、构建、测试、账单明细走 orchestrate，主模型只读摘要。
3. 未知具体路径时，禁止全盘 grep / read。
4. 同一会话不换模型、不改工具清单。
5. 需要用户做选择时用 ask_user_question，不在正文末尾提问。

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->