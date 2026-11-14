---
status: approved
human_confirmed: true
approved_sha256: 6f7b3cc0ac08966d38ed4c6ea10de65ee276d569564ab7a48f8cb7c22a187d07
approved_version: 1
---

# security_guard 主选升 workbuddy/deepseek-v4-pro（强模型 + flash 兜底）

## 一、前因后果（痛点）
`security_guard` 是每个写操作都要过的一审池，当前**只有 `workbuddy/deepseek-v4.1-flash` 单一模型**。controller-bench 记录弱模型 gpt-6-astra 在 M4-5 密码导出题失守、glm 在 M3-3 幻觉工具题误判，说明安全审查对模型强弱敏感。按用户拍板「安全必须锁强模型」，但 guard 是**每个写操作都过的高频池**，须控 token 用量——选同为 deepseek 家族、比 flash 更强的 v4-pro 做主选（审查更严），flash 兜底。**成本口径更正（2026-11-14 用户指正）：仅 hy3 免费，其余模型（含 v4-pro、flash、glm、composer、grok）均为套餐按量计用量；因此本改动的成本权衡是「v4-pro 比 flash 每 token 单价/用量更高」而非「免费 vs 计费」。**

## 二、现状与证据
- `config.yaml:124-129` `security_guard`：`models` 仅 `workbuddy/deepseek-v4.1-flash`，`max_tokens: 512`，`timeout: 60`。
- 冒烟验证（2026-11-14）：`workbuddy/deepseek-v4-pro` 已注册且可用，reasoning_tokens=0，256 token 内干净输出 `{"allow":true}`——**非重 reasoning，512 抬 1024 足够，无需 8192**。
- 参考坑：`config.yaml:149-155` plan_reviewer 注释——reasoning 模型 max_tokens 过低会 502 empty reply；本例 v4-pro reasoning=0，风险低，但仍留足余量。
- 路由表（`.plan/explore-multimodel-20261114.md` 附）：安全拒绝→强模型+security_guard 前置。

## 三、实施方案
1. `config.yaml` `security_guard.models` 改为（有序）：
   - `workbuddy/deepseek-v4-pro`（主选，比 flash 审查更严；**套餐按量、非免费，单价比 flash 高**）
   - `workbuddy/deepseek-v4.1-flash`（兜底，fail-closed）
2. `security_guard.max_tokens: 512 → 1024`（容 v4-pro 少量 reasoning 余量，防截断；仍远低于 planner 级）。
3. `timeout` 保持 60；`security_guard_fast`（写操作一审）**不动**；其余所有池**不动**。
4. 不改 graph.py、不改测试逻辑（若有断言 guard 池模型需同步，先 grep 确认）。

## 四、验证计划
- 改前 `grep -rn "security_guard" config.yaml src tests` 全量核对引用点（回应 P1-1）：确认 tests 无断言 guard 池模型名（已核：无匹配），避免漏改致 pytest 失败。
- 冒烟覆盖**两条路径**（回应 P1-1）：① 正常写操作 → 主选 deepseek-v4-pro 返回合法 JSON；② 传一句明确危险写操作（如导出密码）→ 返回 `allow:false`（拒绝路径）验证仍生效。
- **兜底 fail-closed 验证**（回应 P1-1/P1-2）：确认池有序语义为"失败切下一个"（config.yaml:6 已定义"主模型失败自动降级到下一个"），模拟主选失败时回落 deepseek-v4.1-flash，仍 fail-closed（graph.py 模型全失败即 DENY）。
- 职责边界（回应 P2-1）：`security_guard_fast`（写操作一审、max_tokens 256）**保持不动**，主选仍 flash；本改动只升 `security_guard`（终审）主选。二者分工：fast 先审、guard 终审。
- `python -m pytest -q`（全量 160）确保无回归。

> 变更受 git 管理，git revert 即可。
