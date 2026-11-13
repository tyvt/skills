# Summary
2026-11-13 助手诊断确认 composer 仅挂在 code_edit_with_signal 一个池（config.yaml:84，2026-11-13 恢复），而新会话任务（session-acafac8d，2026-11-12 17:45）12 次调用全为 workbuddy/deepseek-v4.1-flash，角色分布 pwsh×9、plan×1、summarize×1、plan_review×1，无任何一步调用 code_edit_with_signal；route.jsonl 显示真实任务为 npm run build×3、eslint×2、目录列举×3、Select-String×1，规划器全部正确派给 pwsh，故 composer 未被使用是执行类任务形态决定而非配置丢失。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 新执行的任务即使用了编排器，依然没有使用composer模型
...
**assistant [peer=github.com-tyvt-skills]**: 查清了。**composer 没被用到是任务形态决定的，不是配置丢了**。证据链：

## 1. composer 只挂在一个池里

`config.yaml:84` — `cursor/composer-2.5` 是 **`code_edit_with_signal`** 池的主选（2026-11-13 恢复），这是全配置里唯一含 composer 的池。其余所有池（`pwsh`、`planner`、`file_reader`、`code_editor`、`summarizer`、`plan_reviewer`、`security_guard*`）全部是 deepseek-v4.1-flash / glm-5.3-flash 系。

## 2. 新会话至今的任务全是执行类，根本没走到 composer 的池

最新账单 `session-acafac8d...costs.jsonl`（17:45）：12 次调用全部 `workbuddy/deepseek-v4.1-flash`，角色分布：`pwsh×9`（generate_command + guard_fast + guard_final）、plan×1、summarize×1、plan_review×1 —— **没有任何一步调用 `code_edit_with_signal`**。

`route.jsonl` 里新会话的真实任务也印证：npm run build ×3、eslint 校验 ×2、目录列举 ×3、Select-String 检索 ×1 —— 规划器全部派给 `pwsh`，这是正确路由（执行类任务本来就不该用 composer 生成文本）。

## 3. composer 什么时候才会被用到

只有当某一步实际走到 `code_edit_with_signal` 工具（生成/修改代码文本且带可验证落点）时才会命中它。两种触发方式：
- 主控显式 `orchestrate {op:"tool", tool:"code_edit_with_signal", ...}`
- `op:"full"` 的请求里明确写「由 code_edit_with_signal 生成代码」，否则规划器默认把活派给 pwsh

另外注意：主控自己用 edit/write 改文件不经过编排器，天然与 composer 无关。...

<!-- MEMORY_FIELDS
{
  "event_name": "新会话未触达composer池诊断",
  "goal": "记录诊断结论",
  "summary": "2026-11-13 助手诊断确认 composer 仅挂在 code_edit_with_signal 一个池（config.yaml:84，2026-11-13 恢复），而新会话任务（session-acafac8d，2026-11-12 17:45）12 次调用全为 workbuddy/deepseek-v4.1-flash，角色分布 pwsh×9、plan×1、summarize×1、plan_review×1，无任何一步调用 code_edit_with_signal；route.jsonl 显示真实任务为 npm run build×3、eslint×2、目录列举×3、Select-String×1，规划器全部正确派给 pwsh，故 composer 未被使用是执行类任务形态决定而非配置丢失。",
  "ranges": "0,20-25",
  "source_extraction_id": "9d22ca3c6a464b08b480075dd24bef29",
  "version": 1,
  "memory_type": "events"
}
-->