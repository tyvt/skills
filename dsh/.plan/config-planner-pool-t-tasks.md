---
status: approved
human_confirmed: true
review_verdict: pass
review_score: 74
approved_sha256: c7222b8bc9808a2c67c7c1daa0e27ca15718197f5fa50064462c28596e719b35
approved_version: 2
session: config-planner-pool-t-tasks
---

# 计划：orchestrator planner 池改为 gpt-6-luna / gpt-5.6-luna 首选

## 一、前因后果
- 用户基于本轮 controller-bench T8–T11 综合对抗结果，要求把编排器 `planner` 池改为以 `codex/gpt-6-luna` 首选，目的是：长任务（build/test）拆解时用 `gpt-6-luna` 做规划，保住时间成本（避免 2.5 分钟等待被 30s 超时打断）和步骤精简度。
- T8–T11 数据支撑：`codex/gpt-6-luna` T_TOTAL 0.875 全场第 1、均耗 6.4s；`codex/gpt-5.6-luna` T_TOTAL 0.834 第 2、Δ+0.067 全场最大正。两者在长任务异步化/步骤精简上表现最好。

## 二、现状与证据
- 文件：`dsh/langgraph-orchestrator/config.yaml`，planner 块在第 96–105 行（已 read 确认）：
  ```yaml
  planner:
    description: 复杂任务的规划与推理。
    models:
      - model: workbuddy/deepseek-v4.1-flash
        max_tokens: 8192
      - model: auto/deepseek-v4.1-flash
        max_tokens: 8192
    max_tokens: 8192
    timeout: 120
  ```
- Schema（`src/config.py` ModelSpec）：`model` 必填；`max_tokens`/`temperature`/`timeout`/`weight`/`retry_on` 可选。planner 池是纯有序列表，无峰时调序逻辑作用于 planner（峰时 GLM 调序仅作用于 GLM_FLASH 代码工具）。
- 注释（第 94–95 行）：reasoning 模型必须给足 max_tokens，过低会 502 empty reply。故**保留每模型 `max_tokens: 8192`**（用户片段省略了它，若照抄会退化为默认值，有 502 风险）。
- 冲突提示：历史建议曾写「gpt-5.6 全系不进池」，但那是基于上轮 M1–M5；本轮 T8–T11 `gpt-5.6-luna` 已低开高走（0.834），用户明确基于新数据覆盖，尊重用户指令。

## 三、分布实施方案
- 单文件一次 edit：`config.yaml` planner.models 替换为（保留块级 max_tokens/timeout/description）：
  ```yaml
  planner:
    description: 复杂任务的规划与推理。
    models:
      - model: codex/gpt-6-luna
        max_tokens: 8192
      - model: codex/gpt-5.6-luna
        max_tokens: 8192
      - model: workbuddy/deepseek-v4.1-flash
        max_tokens: 8192
    max_tokens: 8192
    timeout: 120
  ```
- 保留 `workbuddy/deepseek-v4.1-flash` 作第三兜底（用户明确列出）。

## 四、风险与回滚
- 风险：① `codex/gpt-5.6-luna` 是 gpt-5.6 系，历史在 M1–M5 有 2 次 format_error，长任务拆解若偶发非 JSON 会降级到第三兜底，影响可接受；② codex 系 per-token 计费，planner 使用频率会让成本略升（但 planner 只在需要规划时调用）。③ 若 codex luna 回 502，max_tokens 8192 已足，且池有三级降级。
- 回滚：`git checkout -- dsh/langgraph-orchestrator/config.yaml` 单文件即可复原。

## 四之二、reviewer P1 答复
1. 检索 `tests/`：唯一与模型池字符串相关的断言是 `test_tool_signal_split.py:52`，它断言的是 **code_edit_with_signal** 池（含 deepseek 兜底），**不涉及 planner 池**。无任何测试硬编码 planner 模型列表 → 改 planner 不会破坏 pytest。
2. 验证会 `load_config` 后打印 planner.model_ids 实际值；codex 路由可调用性由 T8-T11 实测（56 组合 0 错误）佐证。
3. 用户明确指定恰好 3 个模型（gpt-6-luna/gpt-5.6-luna/deepseek-v4.1-flash），故不保留 auto/deepseek-v4.1-flash 第四兜底（它与 workbuddy/deepseek-v4.1-flash 同底模型、不同路由入口；三级降级已够）。此点已在人工确认时向用户明示。

## 五、验证计划
- `python -c "from src.config import load_config; c=load_config('config.yaml'); print([m.model for m in c.tool('planner').models])"` 确认解析出 3 个正确 model id。
- 跑 `pytest tests/ -q` 确认现有测试不挂（plan 池非测试重点，预期全绿）。
- 未跑构建则写「未执行」（Python 项目无 build 步骤）。
