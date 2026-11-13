# Summary
2026-11-13 助手在 D:\repository\skills\cursor-model-routing\ 创建 SKILL.md、tasks.json、run-matrix.ps1、REPORT.md；冒烟 11 个 Cursor 模型全通，主矩阵 35 格加赠额 12 格全成功（仅 $0.065），得出 Composer 在多数任务不输 Grok、仅 T3 翻车的反直觉结论，并给出修正路由建议。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...设计/评审/长上下文/知识工作 → Grok；卡住才升级”。第1步 A/B 仍然要做，但 A/B 的对照组可以按任务类型拆开跑——这样你测出的系数是任务类型 × 路由的交互项，而不是一个混在一起的均值。
做一下这个测试集，放在D盘skills目录，然后测试一下cursor提供的模型
...
**assistant [peer=github.com-tyvt-skills]**: 已完成。两件事都落地并实测跑完。

## 交付物（`D:\repository\skills\cursor-model-routing\`）
- [SKILL.md](D:\repository\skills\cursor-model-routing\SKILL.md) — 可复用 skill：T1–T7 定义、模型/配额清单、5 指标口径、分流规则草案、复现用法
- [tasks.json](D:\repository\skills\cursor-model-routing\tasks.json) — T1–T7 七类任务的可运行 prompt + 判据（自包含，不依赖外部文件）
- [run-matrix.ps1](D:\repository\skills\cursor-model-routing\run-matrix.ps1) — 直连网关测试器：`smoke`/`primary`/`gift` 三套件、动态从 `/v1/models` 取模型、按 model+task 幂等写 `results/`、赠额花费硬上限、`-DryRun` 预览
- [REPORT.md](D:\repository\skills\cursor-model-routing\REPORT.md) — 实测报告（矩阵 + 结论）

## 实测怎么做的
网关重扫出 **11 个 cursor 直连模型**，按你的口径分：主池（grok-4.7@256k/500k、4.6、4.5、composer-2.5）大余量、其余 6 个 $20 赠额省测。**先冒烟 11 个全通** → **主矩阵 5 模型 × T1–T7 = 35 格全成功**（grok-4.6 T5 首次 180s 超时，放大到 300s 重跑成功）→ **赠额 6 模型 × T1/T2 = 12 格**，整轮仅 **$0.065**。

## 关键发现（反直觉，值得你看）
1. **"Grok=脑/Composer=手"在单轮裸测里只部分成立**：Composer 2.5 在 T1/T4/T5/T7 质量不输甚至超过 Grok，且**快 2–3 倍、cost=0**。
2. **但 T3 终端调试 Composer 翻车**——输出跑到一个完全无关的 `SkillUpgradeTracker` 模板（幻觉串题）；四款 Grok 全部精准定位"config 未提交/大小写/编译产物缺 config"。
3. **T7 也反直觉**：面向非技术受众，Composer 简报干净，Grok 却泄了"缓存未命中、登录接口异常"技术词。
4. **缓存实锤第0步**：grok-4.7@256k/500k 每轮注入 ~1300 token 前缀、**~85% 缓存命中**（真实上报、但按 API 计费）；composer 多数 **0%**（走池额度 cost=0，抵消了未命中全价）。

## 分流修正建议（报告第六节）
T1/T2/T4/T5/T6/T7 → **Composer**（便宜快质量够）；**仅 T3 终端调试 → Grok**（Composer 会跑题）；Composer 重试仍失败/CRITICAL → 升级 grok-4.7@256k。仍需用 DSH 真实多轮会话对 T3/T5 做端到端复核后才最终定系数。

这些是新建 `D:\repository\skills\cursor-model-routing\` 新 skill 目录 + `.task-state/` 临时脚本，未改编排器/网关/DSH 包。需要我把这个新 skill 目录提交进 git 吗？（仅提交 / 提交并推送 / 暂不处理）

<!-- MEMORY_FIELDS
{
  "event_name": "Cursor模型路由技能落地",
  "goal": "交付技能与实测报告",
  "summary": "2026-11-13 助手在 D:\\repository\\skills\\cursor-model-routing\\ 创建 SKILL.md、tasks.json、run-matrix.ps1、REPORT.md；冒烟 11 个 Cursor 模型全通，主矩阵 35 格加赠额 12 格全成功（仅 $0.065），得出 Composer 在多数任务不输 Grok、仅 T3 翻车的反直觉结论，并给出修正路由建议。",
  "ranges": "25,157-168",
  "source_extraction_id": "5d63e0b1e05b4ffcb1e31a6efaa8607f",
  "version": 1,
  "memory_type": "events"
}
-->