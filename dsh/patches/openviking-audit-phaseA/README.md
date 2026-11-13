# OpenViking Phase A 审计改动（2026-11-13）

对应计划 `.plan/openviking-optimization-20261113.md` 阶段 A（A0/A1/A2/A3）。

## 上游存档
- 服务端改动已提交：`D:\repository\OpenViking-wt-phasea`（worktree），分支 `feat/ov-audit-phasea`（基于 tag v0.5.3），commit `f691133d`。仅本地，未推送。
- 插件改动：`@openviking__dsh-memory-plugin@0.5.33.patch`（本目录），已通过 `pnpm patch-commit` 应用到 `~/.dsh/profiles/web/node_modules`。含 A0 caller 头与 A2 profile.md 缺失降级；toolSurface 补丁（A-1）一并保留。

## 运行环境（live）
- pip 包 `openviking==0.5.3`（site-packages）已打同内容补丁并重启 openviking-server（health ok）。
- 迁移：usage_audit.sqlite3 `_schema_meta.version` 4/5→6，`request_audit` 增列 `caller TEXT`。

## 各文件含义
- `observability__*.py`、`metrics__*.py`、`server__routers__sessions.py`：live 修改后的副本（`.bak-20261113A` 为改前原版，回滚用：复制回 site-packages 对应路径并重启 openviking-server）。
- `check_schema.py` / `verify_a1_a0.py`：验证脚本（列/版本检查；人为 400 探针 + 明细落库断言）。

## 已验证
- A3：同 session_id 连发两次 POST /api/v1/sessions → 200, existed=True，409 零新增。
- A1+A0：POST find 带 `X-OpenViking-Caller: probe-test` 触发 400 → request_audit 明细行落库（api_type=search.find, error_code=INVALID_ARGUMENT, caller=probe-test）。
- A2/插件 caller 头：代码落地 + node --check 通过，**待重启 dsh web 后新会话验证**（连续 5 turn content/read 404 零新增；caller 非空率 100%）。

## 未做
- B1 ov.conf（VLM 改写降频）：低峰执行，暂缓。
- 上游推送：未推送（等用户决定）。
