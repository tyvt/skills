# dsh plan-gate
dsh 仓库中的计划门禁插件，拦截工具调用中的 git 写子命令并要求通过验证门禁凭证。
## 功能
- 在 guardTools 白名单中增补 pwsh，index.js 与 cordis.patch.yml 同步修改；pwsh 独立块独占处理
- 复用 orchestrator-gate 的 splitSegments / tokenize，新增三态 classifyGitCommand（write / not-git / unknown）
- 任一 unknown 段即整体拒绝；5 大 git 子命令统一拦截；branch / remote 按参数细分；支持 git -C、.exe、-c 前缀识别
- not-git 放行，unknown 拒绝，write 走 _review.json 凭证校验
## 校验与测试
- sha256Content 逐字节复刻 verify 实现；用 Python compute_content_sha 真跑对拍得到 MATCH
- 2026-11-14 自测 selftest 70/70（新增 49 项）、pytest 159 passed 无回归
- 2026-11-14 该改动以 commit 6d38afdd 提交（3 个文件，+293/−3），尚未推送远端

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "工具插件",
  "name": "dsh_plan_gate",
  "source_extraction_id": "8b30a2e1f39c4d9dae43731e1a03bbe6",
  "version": 1,
  "memory_type": "entities"
}
-->