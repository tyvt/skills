# OpenViking 记忆快照

本目录是 OpenViking 长期记忆库的**文件级快照备份**，用于版本管理与回溯。

## 来源

- 源目录：`~/.openviking/data/viking/default/user/default/memories/`
- 抓取时间：2026-11-03（全量导入进行到 81/84 项目时的中途快照，非最终态）
- 格式：OpenViking 0.5.3 记忆文件，每个 `.md` 正文末尾带 `<!-- MEMORY_FIELDS {...} -->` 元数据块

## 内容规模

| 分类 | 文件数 |
| --- | --- |
| entities | 1957 |
| events | 53 |
| preferences | 279 |
| identity.md | 1 |
| soul.md | 1 |
| **合计** | **2291** |

总计约 2.7 MB。

## 目录说明

- `entities/`：实体知识卡（技术模式、组件、业务实体、项目等）
- `events/`：按日期归档的事件记忆（`events/YYYY/MM/DD/`）
- `preferences/`：偏好记忆
- `identity.md` / `soul.md`：身份与人格基线

## 关于旧方案

本仓库曾用 `long-term-memory/`（patterns/project 分片 md）作 AGENTS 索引；该目录已删除（曾大面积零填充损坏）。长期记忆现以 OpenViking 服务 + 本目录快照为准。

## 校验

抓取后已对全部 2291 个文件逐一检查：

- 零填充（NUL 字节占比 > 5%）：0 个
- 末尾截断（不以 `-->` 结束）：0 个
