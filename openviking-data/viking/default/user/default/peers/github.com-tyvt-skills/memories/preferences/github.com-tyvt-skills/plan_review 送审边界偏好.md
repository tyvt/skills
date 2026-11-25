- 仅当计划含 `edit`/`write` 代码改动时才送 plan_review；纯文档交付、纯分析、纯复盘直接交用户，不送 review
- 送审粒度：首轮整篇 ≤4k chars；被打回后只发「变更段 + 新增证据」，禁止整篇重发（r3 的 1.5k 摘要送审为正确默认形态）
- 轮次上限：>2 轮给提示（不阻断），>3 轮硬拒（`review_override: true` 解锁）；原 >4 硬拒阈值过松，本次跑到 5 轮才拦
- 送审的计划路径必须放在 `plan_path` 参数，不能塞进 `plan`（正文）参数，否则审核器报「正文不可读取」被打回（2026-11-25 连踩两次）
- 计划 PASS 且用户确认后，成本交接的下一跳实施前无需重审，frontmatter 的 status: approved / approved_sha256 继续有效

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "plan_review 送审边界偏好",
  "source_extraction_id": "5991f56841a84886b532de9e6515cc00",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "preferences"
}
-->