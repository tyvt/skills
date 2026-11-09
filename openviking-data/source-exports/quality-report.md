# OpenViking 记忆质量检查报告

生成时间：2026-11-04（导入/去重/align-final 之后）

## 1. 服务与索引

| 项 | 结果 |
|----|------|
| `openviking doctor` | **All checks passed**（Config / Embedding bge-m3-ov / VLM hy3 / Disk） |
| `/health` | ok 0.5.3 |
| 检索冒烟 | POST `/api/v1/search` 见下方结论 |

## 2. 与 DSH 提炼对齐（三缺口项目）

| 项目 | 唯一标题 | done | 状态 |
|------|----------|------|------|
| 苏住房C | 533 | 533 | OK（源内 2 条重复标题） |
| 产品2.0 | 398 | 398 | OK（源内 1 条重复） |
| 门户 | 269 | 269 | OK（5 条经 mark-done-if-covered 语义覆盖） |

全库 `distilled-projects`：**109 项目 / 4427 唯一标题**（条目 4431）。84 项目全量 import 进度文件未保留完整 success 列表，以 live 库 + 三项目对齐为准。

## 3. 文件结构（live `~/.openviking/.../memories`）

| 指标 | 数值 | 说明 |
|------|------|------|
| 用户可见 `.md`（不含 `.*`） | **~3953** | 与 Git 快照 `90503b2` 一致 |
| 含内部/索引 `.md` 总计 | **4078** | 含 **125** 个 `.*` 类索引文件 |
| entities / preferences / events | 3492 / 482 / 100 | 目录分布合理 |
| Overview 索引卡 | **124** | OV 自动生成，正常 |
| 正文完全相同 | **0 组** | 去重后良好 |
| 同名 slug 多路径 | **1 组** | `zhi2_web_admin`（portal_submodule vs software_project） |

## 4. 质量问题分级

### 低优先级（可接受）

- **偏薄条目 ~134**：多为 `preferences/user` 单行偏好；符合「用户偏好可短」。
- **缺 MEMORY_FIELDS 125 条**：几乎全部在 **点号前缀** 内部文件（`.overview.md` 等），用户记忆卡正文块正常。

### 中优先级（建议后续清理）

- **葡语/误分类路径 ~298 条**：`entities/padrão técnico` 等目录仍在（去重 quarantine 已移 35 条中文重复）。内容与中文 `entities/技术模式` 可能并存，检索会命中多语言路径，**不影响正确性，影响浏览与备份 diff**。
- **1 组 basename 重复**：建议保留 `entities/portal_submodule/zhi2_web_admin.md` 或较 Rich 的一篇，另一篇移 quarantine（与 dedupe-apply 同策略）。

### 已缓解

- **failed 批误标 done**：已 reconcile + import 仅 write/edit>0 记 done。
- **slug 双份（32 组）**：dedupe apply 后 **basename 重复 0→1**（仅余上述 1 组）。

## 5. Git 备份

| 提交 | 说明 |
|------|------|
| `90503b2` | **3953 md**，`align-final`，已 push |
| `9930139` | 3916 md，`align-dedupe-complete` |

README 中规模表仍为 11-03 中途快照，**建议**更新为 90503b2 规模（非本次必须）。

## 6. 检索与可用性（结论）

- 对话注入 `<openviking-context>` 与 MCP `search`/`read` 依赖 embedding；doctor **probe ok**。
- 门户/产品类 distilled 标题在库中多映射为 **技术模式 slug**（如 `menu_absolute_path`），**语义覆盖** 优于标题字面一致——质量上 **可用**，溯源标题以 distilled JSON 为准。

## 7. 建议下一步（可选）

1. ~~再跑一轮 dedupe 处理 `zhi2_web_admin` 双份~~ → **已处理**：产品2.0 副本改名为 `zhi2_web_admin_product20.md`，门户保留 `zhi2_web_admin`。
2. ~~葡语目录同名 slug 批量 quarantine~~ → **已扫描**：当前 **0** 条满足「葡语路径 + 非葡语目录同名 slug + 正文覆盖」（[`quarantine-foreign-if-covered.mjs`](scripts/quarantine-foreign-if-covered.mjs)）。
3. ~~更新 openviking-memory README~~ → **已完成** + `quality-cleanup` 快照。
4. 开始 **Cursor / WorkBuddy / OpenCode** 源导入前，单独做一版「源内重复标题」统计。

---

机器可读：[`dedupe-report.json`](dedupe-report.json) · [`align-report.json`](align-report.json) · [`mark-done-covered.json`](mark-done-covered.json)
