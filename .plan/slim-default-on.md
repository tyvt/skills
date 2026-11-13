---
status: approved
human_confirmed: true
session: slim-default-on
title: PLAN_REVIEW_SLIM 默认开启
---

# PLAN_REVIEW_SLIM 默认开启

## 前因后果
用户要求把 PLAN_REVIEW_SLIM 设成 true 让有损抽取默认生效。编排器 jsonbridge 每次 orchestrate 调用新起子进程、读 api.py 现值，故改默认值即下次调用生效、无需重启；env 变量 `PLAN_REVIEW_SLIM=false` 仍可覆盖。

## 现状与证据
- `dsh/langgraph-orchestrator/src/api.py:31` `PLAN_REVIEW_SLIM = os.getenv("PLAN_REVIEW_SLIM", "false").strip().lower() == "true"`，默认 false。
- jsonbridge 按需 spawn 子进程、每次读最新 api.py，改默认即下次 orchestrate 调用生效、无需重启。

## 实施方案
1. `dsh/langgraph-orchestrator/src/api.py:31` 把 `os.getenv("PLAN_REVIEW_SLIM", "false")` 的默认 `"false"` 改为 `"true"`；注释同步「默认开启，置 PLAN_REVIEW_SLIM=false 可回退送全文」。

## 验证计划
- 在编排器目录：`python -c "import os; os.environ.pop('PLAN_REVIEW_SLIM',None); import src.api as a; print(a.PLAN_REVIEW_SLIM)"` 输出 `True`；再 `PLAN_REVIEW_SLIM=false python -c ...` 输出 `False`（覆盖生效）。
- `cd dsh/langgraph-orchestrator; python -m pytest -q` 全绿（仅改默认值、不动逻辑）。

## 风险与回滚
变更受 git 管理，git revert 即可。
