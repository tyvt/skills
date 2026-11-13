- 仅当计划含 `edit`/`write` 代码改动时才送 plan_review；纯文档交付、纯分析、纯复盘直接交用户，不送 review
- 送审粒度：首轮整篇 ≤4k chars；被打回后只发「变更段 + 新增证据」，禁止整篇重发（r3 的 1.5k 摘要送审为正确默认形态）
- 轮次上限：>2 轮给提示（不阻断），>3 轮硬拒（`review_override: true` 解锁）；原 >4 硬拒阈值过松，本次跑到 5 轮才拦

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "plan_review 送审边界偏好",
  "source_extraction_id": "4fceea5f2b3646dd89a130bd9faff751",
  "version": 1,
  "memory_type": "preferences"
}
-->