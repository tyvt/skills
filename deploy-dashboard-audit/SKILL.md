---
name: deploy-dashboard-audit
description: 部署看板强制合规审计。凡涉及看板注册表登记、env-sites conf、账号密码登记或网关槽位的改动前后必须加载本 skill 并跑审计脚本；退出码非 0 即门禁拒绝，不得宣布合规。覆盖缺 conf / 网关槽位错配 / 凭据缺失 / 非本地网关不通四类违规。
---

# deploy-dashboard-audit — 部署看板强制合规审计

> 定位：`deploy-env` 负责查询与治理动作；本 skill 负责**强制检查**。二者分工，互不替代。

## 何时必须加载（强制触发）
命中任一情形即加载本 skill，并在改动**前后各跑一次**审计：
- 改 `registry.sqlite` 的 `env_registry` / `env_accounts`（登记、改端口、改网关、改账号密码）。
- 改 `D:\nginx\conf\env-sites\*.conf` 或跑 `gen_nginx_sites.ps1` / `sync.ps1`。
- 用户反馈看板「缺 conf / 网关不对 / 密码缺失 / 不通没清理」。
- 提交、推送或回写任何与部署看板相关的变更之前。

## 强制门禁（不可绕过）
```
$env:PYTHONIOENCODING='utf-8'
& 'C:\Program Files\Python310\python.exe' 'D:\repository\skills\deploy-dashboard-audit\audit_dashboard.py'
```
- 退出码 `0`＝合规；`1`＝存在违规（门禁拒绝）；`2`＝脚本异常。
- 机读：`--json`（输出 counts/violations，供 CI 或上层治理消费）。
- 快速：`--no-probe` 跳过 C4 探活（仅用于 CI 无网环境；正式验收必须开探活）。
- **退出码非 0 时禁止**：宣布「已合规」、提交推送、回写禅道、关闭工单。须先按下方路由修复后重跑至 0。

## 四类违规判据（audit_dashboard.py 唯一口径）
- **C1 缺/空 conf**：按 `deploy-env/dashboard/api.py:64-93` `conf_path_for` 同口径解析——先 `env-sites\{display_name|project|project_key}-{env}.conf`，再按 listen 端口回退，最后 legacy；三态 missing / empty(0 字节) / mismatch(无 listen) 均记违规。**禁止**只按 `project_key+.conf` 判缺（中文显示名与 key 不一致会误报）。
- **C2 网关槽位错配**：以 `local`（含 `local-*`）环境归一化网关为基准（`prune_mismatched_gw_envs.py:18-38` `norm_gw`）。无 local → 该项目的全部非 local 记 `no_local_baseline`；local 网关冲突 → `ambiguous_local_baseline`；非 local 网关 ≠ 基准 → `gateway_mismatch`。另校验 `port = port_base + env_index`（local/dev/test/uat/prod=0/1/2/3/4），不符记 `port_slot_mismatch`。
- **C3 凭据登记不规范/密码缺失**：`env_registry.login_user` 空 → `login_user_empty`；`secret_ref` 空 → `secret_ref_empty`（密码缺失）；非空但不匹配 `^\{\{ov_privacy:([^}]+)\}\}$` → `secret_ref_format`。`env_accounts` 同理校验 `username` / `secret_ref`。`password_plain` 非空 → `plaintext_password_in_db`（违反「密码绝不入库」）。
  - 字段优先级：**按环境取 `env_registry.login_user`；多角色时才用 `env_accounts.username`**。审计只查登记格式，不读明文；真实密码须用 `privacy_tree` / `privacy_resolve` 另行核对是否已登记（脚本不做，避免泄密）。
- **C4 非本地网关不通仍登记**：对所有非 local 行的 `backend_gateway` 做 TCP 探活（2s 超时，8 并发）；`closed` / `bad-gateway` / `no-gateway` 记违规。注意：即使网关与 local 基准一致也会被 C4 标记——这类行 `prune_mismatched_gw_envs.py` 不会删，须人工确认后按「不通即清理」处理。
  - 探活失败不等于立刻删：先确认是公司内网不可达还是网关已废弃；确认后走注册治理流程。

## 修复路由（改完必须重跑审计至退出码 0）
| 违规 | 修复动作 |
|---|---|
| C1 | 跑 `D:\repository\skills\deploy-env\gen_nginx_sites.ps1` 或 `sync.ps1` 重生成片段；**禁止**手改 `sites-enabled` 冒充多环境 |
| C2 | `prune_mismatched_gw_envs.py` 先 dry-run → 确认 → `--apply`（自动备份），再 `gen_nginx_sites.ps1` / `sync.ps1` 刷新片段 |
| C3 | `privacy_upsert` 存真实密码 → 把 `{{ov_privacy:...}}` 引用写入 `secret_ref` → `POST /api/secrets/inject`；用 `upsert_env.py` 补 `login_user`；明文绝不入库 |
| C4 | 确认网关已废弃 → 走注册治理（dry-run→apply）清理该非 local 行 → 刷新 conf；不可达但仍在用则登记说明并暂缓 |

## 只读与安全
- 脚本以 sqlite `mode=ro` 打开注册表，全程仅 SELECT + 文件 stat/文本读取；实测跑前后 `registry.sqlite` SHA-256 一致。
- 不解析、不打印任何明文密码；`secret_ref` 违规详情最多截 60 字符。
- 设 `PYTHONIOENCODING=utf-8` 防 Windows GBK 乱码。

## 已知冲突（记录，不擅自改）
`deploy-env/dashboard/api.py:34-35` 注释称密码明文持久化在 DB(`password_plain`)，与 `deploy-env/SKILL.md:20`「密码绝不入库」冲突；当前实现确有 `password_plain` 列。本 skill 如实报 `plaintext_password_in_db`，但**不**在本 skill 内改动 api.py；需专项计划处理。
