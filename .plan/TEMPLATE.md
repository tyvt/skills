---
status: draft
human_confirmed: false
risk: low
review_override: false
session: <sessionId>
title: <一句话任务名>
---

# <任务标题>

## 一、前因后果
- 任务/Bug 背景、问题现象、根因，一句话说清「为什么要做」。

## 二、已核验事实
> 硬门：本节每条必须给「文件:行」证据，如 `src/api.py:241`。禁止无证据条目。
- E1 `dsh/xxx/graph.py:198` `_readonly_read_ok`：仅放行相对路径……
- E2 `dsh/xxx/api.py:241` `run_plan_review`：……

## 三、实施方案（分步）
| 步骤 | 落点文件:函数 | 改动 | 验证 |
|---|---|---|---|
| 1 | `path/to.py:123` `fn` | …… | 单测/命令 |

## 四、风险与回滚
| 风险 | 缓解 | 回滚/开关 |
|---|---|---|
| …… | …… | env/开关/独立 commit |

## 五、验证计划
- 单测命令、selftest、静态检查；未执行写「未执行」；量化验收口径（若有）。

## 六、范围
- 涉及的插件/文件清单；明确不做什么。
