# memory_audit.py
scripts/memory_audit.py 是 OpenViking 记忆审计抽查脚本。

## 用法
- 流程为 `select` 抽候选、按规则判定、`apply` 写回；`stats` 汇总覆盖情况。
- 抽查可指定条数（如 `select --n 10`），默认 7 天冷却。
- 判定口径为只接受 `valid`/`invalid` 两态（匹配当前治理规则，弃用旧 `suspect`）；无 frontmatter/空证据标 `invalid`，不采信为当前事实、不删除。
- 写回字段包括 `audit_status`、`last_checked`、`verdict_note`。

## 运维状态
- 脚本位于 `scripts/memory_audit.py`；2026-11-25 定位时全仓 grep 未命中，缩小到 `scripts` 目录后找到。
- 相关提交为 `a871747d`、`e9b7c364`：apply 改为回读判成功，stats 改为单次 ov grep。
- push 已恢复，远端同步。
- 审计日志位于 `~/.dsh/cache/memory-audit/audit.jsonl`。
- 2026-11-25 第二轮抽检 apply 时遇 URI 归一化：MCP 写入把标题空格转成 `_`，带空格标题记忆生成下划线副本、原空格版仍未审计；已将 frontmatter 合并到规范文件并删除空格版重复项，最终该 URI 唯一。

## Recent Audit Round
- On 2026-11-25, a sample audit checked 10 memories against real code in D:/repository with two-state verdicts: 7 valid and 3 invalid; apply wrote back 10/10 verify:ok with skipped:0 and no concurrent changes.
- Three memories were invalid: `portal_api_1400` (portalApiRewrite.js actually lives in the 门户 repo, not 产品2.0; 产品2.0 getInfo uses /system/user/getInfo at line 132), `area_publish_arg` (the area report publish difference is reportState/publishState query parameters, not a second region-code argument; e2e-result.md:301 explicitly warns against misjudgment), `dev_icon_row_bug` (developerCommodityFlow/:developer-flow have no trace in the working tree or git history; current code uses businessFlows+variant).
- This round did not change memory body semantics, delete memories, commit git, or write to project directories; intermediate files stayed only in ~/.dsh/cache/memory-audit/.
- In a further 2026-11-25 sample audit, 10 candidates were checked against real code with verdicts 7 valid and 3 invalid; apply wrote back 10/10 successfully with skipped:0. Invalid memories: `git_branch_strategy` (abstract preference statement with no concrete code fact to verify), `zs_dialog_zindex` (code actually uses `:above-drawer` and z-index 100/-1, no wrapper-class/100000), `wechat_uniapp_incompat` (`037.md` evidence not found, `clickCheckTask` 0 hits, baseline none). No memory body changes, deletions, or git commit; intermediate files stayed in ~/.dsh/cache/memory-audit/.

<!-- MEMORY_FIELDS
{
  "category": "脚本",
  "name": "memory_audit",
  "source_extraction_id": "17b54dcf5f2247bbb888db259bcbc0ac",
  "peer_id": "github.com-tyvt-skills",
  "version": 4,
  "memory_type": "entities"
}
-->