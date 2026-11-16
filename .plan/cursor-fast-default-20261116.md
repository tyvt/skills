---
status: approved
human_confirmed: true
risk: low
review_override: false
session: cursor-fast-default-20261116
title: 编排器 cursor 模型默认 Fast（service_tier=priority）
approved_sha256: 41a85a1d8e6bad1fed7d81656c0c671b4d78fc62cbed48e0a506b81b181a7871
approved_version: 2
---

# 编排器 cursor 模型默认 Fast

## 一、前因后果
- magpie 的 cursor 通道支持 Fast（1.5x 速度，用量增加），但请求须显式带 `service_tier:"priority"`，不带即为普通档。
- 用户已确认：DSH 编排器里所有 cursor 模型调用默认走 Fast。

## 二、已核验事实
- E1 插件 `opencode-cursor-auth@0.2.48` `index.mjs:3600-3601`：`service_tier` 为 `priority`/`fast` 即开 fast，缺省/其他即关；`index.mjs:1210` 落到变体参数 `fast=true`。
- E2 网关 `/v1/models`：`cursor/grok-4.7@256k/500k`、`gpt-5.6-sol/terra@272k/1m`、`claude-opus-4-7@300k/1m` 共 8 个带 `service_tiers=[priority]`；`gpt-5.4-mini`、`deepseek-v41-flash-1017` 无 fast 档（Cursor 账号侧未提供）。
- E3 实测：`cursor/grok-4.7@256k` + `service_tier:"priority"` 请求成功返回。
- E4 请求构造唯一点 `dsh/langgraph-orchestrator/src/router.py:162-168` `create(model, messages, temperature, max_tokens, timeout)`，未传 service_tier；唯一调用点 `router.py:227`。
- E5 `ModelSpec` 定义 `src/config.py:23-32`（字段 model/temperature/max_tokens/timeout/weight/retry_on），解析 `config.py:132-141`。
- E6 编排器 config 中 cursor 池条目：`config.yaml:106`（planner 池 cursor/gpt-5.4-mini）、`config.yaml:170`（plan_reviewer 池 cursor/grok-4.7@256k）、`config.yaml:188`（verifier 池 cursor/grok-4.7@256k）。
- E7 编排器 config 的 cursor 条目均为字符串短格式或 ModelSpec 字典格式，字典格式可加模型级字段（现有 max_tokens/timeout 同级，解析层在 E5）。

- E7 openai SDK 实测（openai 2.54.0）：`Completions.create` 原生 `service_tier`（keyword-only，`Literal['auto','default','flex','scale','priority','fast']`），无需 extra_body。
- E8 reviewer 修订（v1，76/100）：mini 无 fast 档不写 priority；验证补 create kwargs mock 断言。

## 三、实施方案（分步）
| 步骤 | 落点文件:函数 | 改动 | 验证 |
|---|---|---|---|
| 1 | `src/config.py:23` `ModelSpec` | 新增字段 `service_tier: Optional[str] = None` | py_compile |
| 2 | `src/config.py:132-141` `load_config` | ModelSpec 解析加 `service_tier=m.get("service_tier")` | py_compile + load_config 冒烟 |
| 3 | `src/router.py:153-168` `_call_once` | 加 `service_tier` 参数；非空时透传进 `chat.completions.create`（None 不发字段） | py_compile |
| 4 | `src/router.py:227` 调用点 | 传 `spec.service_tier` | 步骤 5 实测 |
| 5 | `config.yaml:170/188` | plan_reviewer、verifier 两处 `cursor/grok-4.7@256k` 条目各加 `service_tier: priority`；`config.yaml:106` mini 无 fast 档（E2），**不加** | load_config 断言 |

## 四、验证计划
- 静态：`python -m py_compile src/config.py src/router.py`（基线已跑，BASELINE OK）。
- 配置：`python -c` 调 `load_config`，断言全部 cursor 条目 `service_tier == "priority"`、mini 条目无 service_tier。
- 单测（mock）：mock `Completions.create` 捕获 kwargs——spec.service_tier=priority 时 kwargs 含 `service_tier:"priority"`；spec.service_tier=None 时 kwargs 不含 `service_tier` 键。
- 端到端：python 片段直调 `Router._call_once`（model=`cursor/grok-4.7@256k`，service_tier=priority，max_tokens=16），确认正常返回——与改动前 curl 实测（E3）对齐。
- 未跑全量编排回归（改动仅请求参数透传，无分支逻辑）。

## 五、范围
- 改：`dsh/langgraph-orchestrator/src/config.py`、`src/router.py`、`config.yaml`（2 处条目）。
- 不改：`~/.dsh/settings.yaml`（DSH Web 会话层模型注册表，fast 属请求方自由，不默认）；magpie 插件零改动。
- 回滚：变更受 git 管理，git revert 即可。

## 六、提交
- 待确认：仅提交 / 提交并推送 / 暂不处理。
