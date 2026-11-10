# vite build 本机卡死引发成本溢出
本机 vite-build 在 version.json 后卡死，配合缓冲管道与长轮询触发多次 compaction，导致等效成本激增至约 1.03M。

## 问题根因
- 本机 vite-build 在生成 version.json 后卡死，未正常退出
- 使用 `Out-String|Select-Object` 缓冲管道加 job_output 长轮询，加剧阻塞
- 触发 3 次 compaction，等效成本约 1.03M（历史基线 167k 的 6.2 倍）

## 止损规则（P0）
- 默认不跑本机 npm test
- 若必须跑：建日志目录、用 Start-Process 启动、每 30s 查 CPU
- cost-meter 首次约 150k 等效成本警告即止损

## 归属与验证
- 来源：bug6402 复盘（2026-11-10）
- 已写入 D:\repository\skills\agent-cost-hygiene\SKILL.md「本机构建与止损」与 tool-call-hygiene 的 GIT_EDITOR / 缓冲管道两行，本地提交 bcab4712（2026-11-10），但 git push 两次均 Connection was reset 未推送，本地 main 超前 origin/main 1 个提交

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_build_stuck",
  "source_extraction_id": "939071c7fd8c48ddb069b6099d3d7425",
  "version": 2,
  "memory_type": "entities"
}
-->