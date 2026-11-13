# D:\repository\skills 技能仓库
GitHub 仓库（本地 D:\repository\skills，远程 https://github.com/tyvt/skills.git 的 origin/main），集中存放可复用的 DSH 技能、OpenViking 记忆快照与导入工具脚本，由 github.com/tyvt-skills 维护。DSH 通过 ~/.dsh/skills/<name> junction/软链（符号链根 C:\Users\Administrator\.dsh\skills）加载技能。

## 规模与技能清单
- 2026-11-13 全量审查覆盖 19 个 skill 目录 + 10 个 dsh 插件
- 带 SKILL.md 的「真技能」原有 8 个，2026-11-04 删除 3 个从未调用的技能（grill-me、i-have-adhd、long-form-corpus-rewrite）后剩余 5 个：zentao-analyzer（真实调用 128 次最常用）、decision-options（22）、token-frugal（7）、tool-call-hygiene（4）、tdd（1）
- 会话日志位于 ~/.dsh/sessions，2026-11-04 统计有 1602 个多帧 zstd 会话日志文件
- 2026-11-13 审查评级：指令类 skill 8A/4B/0C；脚本类含 zentao-analyzer 为 C（其余 3 个 A/B + 3 个 B）；dsh 插件多为 A
- 2026-11-13 提交 75d14ff5（归因报告六处修改）至 origin/main；2026-11-10 zentao-analyzer SKILL.md 补 git submodule status + 每子模块 git -C worktree list（bug6369 空转 8 步根因修复），提交 86279dd0（仅提交未推送）；仓库存在未提交改动按规范不自动提交

## 目录与内容
- openviking-memory/：OpenViking 记忆库快照
- openviking-data/：OpenViking 质量数据备份，含 viking/.../user/default/ 整树（memories、peers、sessions、skills、resources、privacy、摘要）、vectordb/、backend_meta.json；初始提交 1a4a1b9 仅含 memories+peers（约11.36MB/7213 md）；2026-11-07 扩展全量快照 4cdcd7bf（约213MB/20154 文件）；2026-11-09 09:01 c9a15051「全量快照 20237 files」；同日验证快照 dc290366（21,050 文件/214MB，含 4,359 原始导出文件）与记忆快照 605e1435（6,609 md/8.49MB）推 origin/main，local HEAD==origin/main 取代 c9a15051；sessions/ 含 505 目录（277 个 mm-* 导入会话）；手动时间点快照（无定时）；原始对话文本在 memory-migration/out/（本地不入 OpenViking），2026-11-09 曾临时拷入 openviking-data/source-exports/ 随 dc290366 推 GitHub（4,359 文件/240.2MB），因违纯镜像约定同日迁出为独立 memory-migration-archive/ 由专门脚本备份；不入库 data/_system/、锁文件、pending/、state/
- skills/scripts/：patch-ov-cursor-evidence.mjs、fix-ov-memory-footer-order.mjs、refresh-cursor-import-state.mjs 等导入质量脚本
- dsh/：git 子模块（agent 规则演进代码），含 agent-guard 插件（ask-guard.js 纯函数 + index.js 接线 + cordis.patch.yml 灰度 askGuard.mode: warn）、scripts/ask-guard-promote.ps1、AGENTS.md 三行硬约束索引（指向 zentao-analyzer）、zentao-analyzer/SKILL.md（定位顺序与 lint 模板）；szfc-page-guard 曾建后删；langgraph-orchestrator 新增 offtask 检测（graph.py log_offtask 记 JSONL 日志 + scripts/offtask_stats.py 统计分模型触发率）；file_reader/code_editor 经 graph.py:65-67 与 config.yaml 确认无本地磁盘读取权限，读盘唯一途径为 pwsh；2026-11-13 提交 80512c00（10 files +496/-18）与 39f162d0 至 origin/main；2026-11-13 新建未提交 dsh/scripts/link-plugins.ps1（junction 把 8 个插件链接到 dsh/<name>，默认全量且幂等，dcwhc 映射 dsh-channel-wechat-companion，cordis.patch.yml 无硬编码旧路径）与 dsh/orchestrator/lib/index.js renderResult 补显示 workdir_source 修复；junction 使源码改动即时对 Node 可见无需 pnpm install --force，但 Node 启动加载进内存、改显示层仍需重启 Web
- openviking-autostart/：OpenViking 不可用自动拉起 skill（SKILL.md + drill.ps1），2026-11-13 plan_review 通过并真实停服演练成功
- cursor-model-routing/：cursor 模型路由技能（SKILL.md + run-matrix.ps1 + tasks.json + validate-offtask.ps1 + .gitignore + REPORT.md），2026-11-13 本地提交 3437a788「feat(skill): add cursor-model-routing」（6 文件/585 行仅本地未推送）；results/ 经 .gitignore 排除不入 git，复现靠重跑脚本；本地 main ahead 8（本次 1 + 既有 7 个 P0/orchestrator/agent-guard 未推提交）
- dsh/patches/openviking-audit-phaseA/：阶段 A 审计补丁副本、.bak-20261113A 原版备份、verify_a1_a0.py、README；2026-11-13 提交 a128d4ee（仅本地未推送）；关联 OpenViking 源码 clone 于 D:\repository\OpenViking（worktree D:\repository\OpenViking-wt-phasea 分支 feat/ov-audit-phasea 基于 v0.5.3 f691133d 仅本地未推送）；回滚=还原 .bak + 重启 openviking-server
- captcha-recognizer/：验证码识别技能，2026-11-13 审查发现整目录未入库（git 未跟踪）

## 安全与仓库卫生
- P0 明文凭据入库：zentao-analyzer/credentials.py:13 与 zentao_file.py:69 硬编码真实禅道账号 tiany + 明文密码 Field123456 且两处不一致，已进 git
- P0 向量库巨量入库：git ls-files 共 35,244 文件，其中 openviking-data 23,889、openviking-memory 6,734，约 87% 被跟踪文件是 DB 运行态/记忆快照（git status 数百条噪音根源）
- P0 运行态产物/大二进制入库：tool-error-today.json、zentao_file_21043/21199（约 1.2MB 重复 PNG）
- P0 缺失项：captcha-recognizer 整目录未入库；.gitignore 缺 dsh/**/.pytest_cache、.task-state；陈旧备份 token-guard/_bak_20261112-160336/ 待清
- 一致性漂移：dsh-explore 通篇 hook 名写 explore-drift 实际是 agent-guard·exploration；token-frugal 文档调顶层 workflow-audit.mjs 实际只在 templates/；plan-gate 注释 fail-open vs 实现 block、reviewer 名过时；headless 仍启用已停用 cursor 模型；README.md 列不存在的 grill-me/i-have-adhd 且漏列大量现存 skill
- 可优化：agent-cost-hygiene↔dsh-token-policy 重复、dsh-token-policy 孤儿 references、cursor-model-routing 研究记录混入指令、8+ 处硬编码绝对路径、几处 Map 无淘汰、token-models 是唯一无 selftest 插件、废弃脚本残留
- 完整审查报告：.task-state/REVIEW-2026-11-13.md

## 关系
- OpenViking 记忆备份与工具脚本托管仓库
- default-workspace 的 memory-migration/ 非独立 git 仓库，工具脚本备份至此
- dsh 是 skills 仓库的 git 子模块，独立提交；按 submodule-commit 规则自底向上先提交子模块再提交父仓
- skills 仓库与 langgraph-orchestrator 共用同一仓库（无 .gitmodules、无 gitlink），一次提交同时覆盖两处
- ~/.dsh/skills、~/.cursor/skills、~/.claude/skills 中为指向仓库技能目录的符号链接，删除后悬空链接已清理


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "tyvt_skills",
  "source_extraction_id": "7567ffc03de34314a755766f125a031c",
  "version": 15,
  "memory_type": "entities"
}
-->