# D:\repository\skills 技能仓库
GitHub 仓库（本地 D:\repository\skills，远程 origin/main），github.com-tyvt-skills 维护，存可复用 DSH 技能、OpenViking 记忆快照与导入脚本；DSH 经 ~/.dsh/skills/<name>（根 C:\Users\Administrator\.dsh\skills）符号链/Junction 加载；悬空链已清理，session-handoff 于 2026-11-25 补挂后恢复可用。

## 规模与内容
- 2026-11-13 全量审查：19 skill 目录 + 10 dsh 插件；2026-11-04 删 grill-me、i-have-adhd、long-form-corpus-rewrite 后，带 SKILL.md 的真技能剩 5（原 8）
- 2026-11-14 调用量：zentao-analyzer 128（最常用）、decision-options 22、token-frugal 7、tool-call-hygiene 4、tdd 1；新增 clarify-first
- ~/.dsh/sessions 会话日志（2026-11-04 有 1602 个多帧 zstd 日志）；2026-11-13 评级：指令类 8A/4B/0C，脚本类 zentao-analyzer C，dsh 插件多为 A
- openviking-memory/ 记忆库快照；openviking-data/ 质量数据备份（初提 1a4a1b9；2026-11-07 全量 4cdcd7bf 213MB/20154；2026-11-09 dc290366 21050/214MB 与 605e1435 已推 origin/main；sessions/ 505 目录；data/_system/、锁、pending/、state/ 不入库）
- skills/scripts/ 含 patch-ov-cursor-evidence.mjs 等导入脚本；captcha-recognizer 2026-11-14 入库；openviking-autostart 为 OV 自动拉起 skill（2026-11-13 演练成功）；cursor-model-routing 2026-11-13 本地提交 3437a788

## 提交记录
- 2026-11-13 75d14ff5、2026-11-10 86279dd0（zentao-analyzer SKILL.md 补 submodule 状态）、2026-11-14 b3b9a7a1（计划+批1验证）、ca2a29d9（批1配置实施）、21766e33（6 组修复）、4e25406e（第二轮清理）均已推 origin/main
- 2026-11-24 deploy-env：28ed9a70 看板明文密码（dashboard/api.py + index.html）、d72eab21、d55ae787（AGENTS.md 部署面板硬拦截 P0 段 + upsert_env.py + POST /api/registry/upsert + SKILL.md 两节）已推 origin/main
- 2026-11-24 dsh/langgraph-orchestrator/config.yaml 15 处 deepseek 模型 id 全量换为 hy4flash-free（workbuddy 10 处、auto 5 处），同步更新描述注释与 tests/test_tool_signal_split.py:52 兜底断言
- 未推：636e780b（上述编排器替换，仅两文件）与 1a86b32b（index.html 网关换行 + registry.sqlite），本地 main ahead 2，网络恢复后 git push origin main
- 另有遗留未推提交 30209316 与一批脏文件，2026-11-25 未触碰
- 批 2 草案待用户拍板，详见 tyvt_skills_20261114 实体卡

## 安全与仓库卫生
- P0 明文凭据：zentao-analyzer/credentials.py:13 与 zentao_file.py:69 硬编码禅道账号 tiany + 明文密码 Field123456（两处不一致），用户确认原样保留
- P0 向量库巨量：git ls-files 35244 文件，约 87% 为 DB/记忆快照；openviking-memory/data 续随 git 同步
- P0 运行态/大二进制：tool-error-today.json、重复 PNG；一致性漂移：dsh-explore hook 名 explore-drift 实为 agent-guard·exploration、plan-gate 注释 fail-open 实为 block、README 列不存在 skill
- 完整审查报告 .task-state/REVIEW-2026-11-13.md

## 关系
- dsh/ 为 git 子模块（独立提交，先子后父），skills 与 langgraph-orchestrator 同仓一次提交；controller-bench/ 为批量测试目录，细节见 dsh_plugins 与 controller_bench 实体卡

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "tyvt_skills",
  "source_extraction_id": "ce0e8ae1665b4eb08766450d66a51951",
  "source_extraction_ids": [
    "06401e30356f44b7931a89723cf979f0",
    "56afe6d268ed4224b7de33d546af5e42"
  ],
  "version": 35,
  "memory_type": "entities"
}
-->