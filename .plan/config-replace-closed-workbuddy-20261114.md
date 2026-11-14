---
status: approved
human_confirmed: true
approved_sha256: d067ef17635f515b677837a83710ab95e9ff85ee6292ba82678edf5efefcda4c
approved_version: 1
---

# 编排器 config.yaml：替换已关停的 workbuddy 模型

## 一、前因后果（痛点）
用户已关闭 workbuddy 多个模型，网关现存 workbuddy 仅 `deepseek-v4.1-flash`、`space-bunny`、`kimi-k3.1-pro`、`hy3`、`workbuddy-ai/hy3`。但 `config.yaml` 仍引用已下线模型 `workbuddy/glm-5.3-flash`（5 处兜底）与 `workbuddy/deepseek-v4-pro`（security_guard 主选），不换会导致这些池请求失败、降级或整池失效。

## 二、现状与证据
- 网关 `/v1/models` 现存 workbuddy（2026-11-14 实测）：`deepseek-v4.1-flash`、`space-bunny`、`kimi-k3.1-pro`、`hy3`、`workbuddy-ai/hy3`。**已下线**：`glm-5.3-flash`、`deepseek-v4-pro`、`glm-5.3`。
- config.yaml 引用已关模型处：
  - `workbuddy/glm-5.3-flash`：L53(file_reader 兜底)、L61(code_editor 兜底)、L86(code_edit_with_signal 兜底)、L150(summarizer 兜底)、L213(pwsh 兜底)
  - `workbuddy/deepseek-v4-pro`：L129(security_guard 主选)
- `cursor/composer-2.5`（L84 code_edit_with_signal 主选）**网关仍在**，属 cursor 暂缓范围，本次**不动**。
- 实测（workbuddy 保留 6 模型 × 35 题有效分，fmt/err 记 0）：kimi-k3.1-pro 0.849（JSON 最稳 1/35 fmt）、space-bunny 0.706、deepseek-v4.1-flash 0.732（最快 5.3s）。

## 三、实施方案
1. **security_guard 主选**（L129，原 deepseek-v4-pro 已关）→ `workbuddy/kimi-k3.1-pro`（JSON 顺从最稳，max_tokens 1024），兜底维持 `workbuddy/deepseek-v4.1-flash`(512)。同步更新 L124 注释。
2. **glm-5.3-flash 兜底 ×5**（L53/61/86/150/213）→ 统一替换为 `workbuddy/space-bunny`（实测稳 0.706、6.5s；作为兜底档不改 max_tokens 归属）。
3. 其余池（file_reader/code_editor/code_edit_with_signal/summarizer/pwsh 的主选、auto 兜底、plan_reviewer/verifier grok）**不动**。
4. 不同时改 cursor/composer-2.5、不删任何池、不动 graph.py。
5. **测试同步（回应 P1-2）**：已 rg 全仓 `glm-5.3-flash|deepseek-v4-pro`（*.py）。需同步的仅 `tests/test_tool_signal_split.py:169`（`load_config(CFG_PATH)` 读真实 config，断言 code_edit_with_signal 池含 `workbuddy/glm-5.3-flash`）→ 改为 `workbuddy/space-bunny`。其余命中不受影响：`test_offtask_guard.py:71` 仅传参日志；`test_scheduling.py` 用自建假配置（models=[FLASH,GLM,HY3,ZAI] 自造，不读真实 config），GLM 仅字符串常量，不依赖真实池；`router.py:33 GLM_FLASH="glm-5.3-flash"` 是峰时策略子串匹配（匹配 `glm-5.3-flash` 前缀，autoclaw-zai 也含该串，与本次替换无关，不动）。

## 四、验证计划
- **逐一核对替换结果（回应 P1-1）**：`python -c "from src.config import load_config; c=load_config('config.yaml'); g=c.tools['security_guard']; print('guard=',[m.model for m in g.models]); [print(t, [m.model for m in getattr(c.tools[t],'models',[])]) for t in ['file_reader','code_editor','code_edit_with_signal','summarizer','pwsh']]"` —— 断言 security_guard=[kimi-k3.1-pro, deepseek-v4.1-flash]；5 处 glm 兜底均已变 space-bunny（逐一对照，非只扫残留）。
- **残留已关模型 = 空**：`python -c "from src.config import load_config; c=load_config('config.yaml'); bad=[m.model for t in c.tools.values() for m in getattr(t,'models',[]) if m.model in ('workbuddy/glm-5.3-flash','workbuddy/deepseek-v4-pro','workbuddy/glm-5.3')]; print('残留:',bad); assert not bad"`。
- **git diff 确认范围**：只改 config.yaml 与 tests/test_tool_signal_split.py:169，未碰 cursor/composer-2.5 与 graph.py。
- 重启 DSH Web（config 启动读死）后 `op:list` 复验池结构；security_guard 冒烟（安全操作 allow、危险操作 refuse，主选 kimi-k3.1-pro）。
- `python -m pytest -q`（全量 160）无回归。

> 变更受 git 管理，git revert 即可。
