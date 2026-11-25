# session-handoff 交接技能
DSH 技能，用于按 9 节格式生成会话交接文档，本体位于技能仓库 D:\repository\skills\session-handoff。

## 组成
- SKILL.md 为技能说明，handoff-policy.mjs 为策略脚本，handoff-policy.test.mjs 为自带测试。

## 挂载与状态
- 生效目录 C:\Users\Administrator\.dsh\skills\ 原先缺少链接，加载时报 “skill is unknown or no longer available”。
- 2026-11-25 补建 Junction 指向仓库目录后恢复，系统重新列入可用技能目录，加载报错消失。
- 恢复后 handoff-policy.test.mjs 测试 1 pass / 0 fail，SKILL.md 可达。
- 挂载方式与仓库内其余技能一致；本次只补本地挂载，未改动仓库文件，未提交或推送。

## 相关
- 交接产物为 9 节格式文档，按偏好放 D:\plan\skills\，文件名含链路主题、hop 序号与时间戳。
- 2026-11-25 同批排查另发现 cursor-model-routing、vite-build-profiler、openviking-autostart 三个技能漏挂，已一并补建 Junction；clarify-first 实体副本同日转为链接。

<!-- MEMORY_FIELDS
{
  "category": "工具",
  "name": "session_handoff",
  "source_extraction_id": "980e0a51151d4fc7bf02c5cbf5be61aa",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->