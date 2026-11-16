---
plan_id: token-frugal-attribution-actions-20261116
status: approved
human_confirmed: true
approved_sha256: f904608b068b9920d92b441003334b3ec4a63251eb8783636e53822569efa467
approved_version: 2
---

# token-frugal 增加「归因→动作」触发式闭环

## ① 前因后果
今日复盘 ee03fc37（eq 15M、命中34%、每步59k）暴露：token-frugal §3 能列出 A–E 五类浪费信号，但 §4「归因结果如何落地」只写"遵循 agent-cost-hygiene / dsh-token-policy"，没有把信号转成可执行动作。复盘者看完归因仍不知道"命中34%该干什么"。需在 §4 补触发式动作，让归因直接接动作。

## ② 现状与证据
- `token-frugal/SKILL.md:86-94` §3 已有 A–E 归因表（A 低缓存长跑 / B goal 续跑 / C compaction 反复失败 / D 大结果+重复整读 / E 工具错误自愈），带信号列。
- `token-frugal/SKILL.md:96-98` §4 当前仅一段"指向 agent-cost-hygiene 与 dsh-token-policy，不重复维护阈值"，无动作项。
- 实测触发样本 ee03fc37：goal续跑16轮、compaction 227试/102败、重复整读121、可自愈错误48，印证 A/C/E 信号真实存在。

## ③ 实施方案
仅改 `token-frugal/SKILL.md` §4（以该节现有"指向 agent-cost-hygiene 与 dsh-token-policy"那句为插入锚点，在其后插入，不依赖固定行号），保留该指向句原样，于其后按 §3 的 A→B→C→D→E 顺序新增「按信号触发动作」的简短 bullet，每条形如"信号 → 立即动作"，门槛只引用 §3 已有信号或指向 dsh-token-policy，不写死模型名、不新增数字：
- A 低缓存长跑：§3 症状（命中 38–75%、每步未命中高）的长任务，换高缓存模型（模型纪律以 dsh-token-policy 为准，不在此写死模型名）。
- B goal 续跑：§3 信号 `≥5` 轮即按"一批文件一个 goal"拆片。
- C compaction：§3 症状"compaction/start ≫ summary"（反复失败）即换新会话，勿硬撑续压。
- D 大结果+重复整读：同文件整篇只读一次，后续 offset/limit 取片段；大输出先过滤。
- E 工具错误自愈：改文件前先 read；按 `tool-call-hygiene` 修，勿原样重试。
不改脚本、不改 AGENTS.md/rules.js、不改其他 skill。

## ④ 验证计划
- `git diff token-frugal/SKILL.md` 复核只改 §4、不改其他文件或章节。
- `grep -n "低缓存\|命中\|goal\|compaction\|重复整读\|先 read" token-frugal/SKILL.md` 确认 A–E 五条动作就位；对照 §3 原文核对引用门槛（A「38–75%」/B「≥5」/C「compaction/start≫summary」）与原文一致、无写死模型名。
- 通读 §3→§4 确认：保留原指向 agent-cost-hygiene/dsh-token-policy 句、顺序 A–E 一致、无 §3 之外的新数字。
- 构建：纯 Markdown 文档改动，无 JS/TS 产物，不执行 npm run build（未执行+原因：纯文档、仓内无对应构建目标）。
