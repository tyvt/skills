# Summary
2026-11-13，测算 27h 窗口 hy3 合计 1.84M in + 1.67M out（≈130k tok/h 持续），按 3/15 元每 M 估算 ≈ ¥31/天；bge-m3 为本地零成本。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 分析质量够送审，但送审前补三样东西——VLM 空转的决定性证据、成本数字、每项的验收指标；落地顺序改成"先补可观测性、再动成本、最后动行为"。
...
**assistant [peer=github.com-tyvt-skills]**: ...每小时 9k in + 9k out/次的 VLM 消耗与之同步。
   - UTC 13 时检索为 0 却仍有 hy3 38k+9.6k token → **后台记忆抽取**是第二来源。
2. **成本数字**：27h 窗口 hy3 合计 1.84M in + 1.67M out（≈130k tok/h 持续），按 3/15 元每 M 估算 ≈ **¥31/天**；bge-m3 为本地零成本。
3. **验收指标**：每阶段已写死可测指标——A 阶段错误明细零缺口/404·409 零新增；B 阶段 hy3 24h 日均 token 降 ≥70%、深夜归零、p50 不超 A0 基线×1.1、灰度命中率降 >10% 即回滚；...

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking优化成本测算",
  "goal": "测算VLM调用成本",
  "summary": "2026-11-13，测算 27h 窗口 hy3 合计 1.84M in + 1.67M out（≈130k tok/h 持续），按 3/15 元每 M 估算 ≈ ¥31/天；bge-m3 为本地零成本。",
  "ranges": "0,35-36",
  "source_extraction_id": "e9bbb5fc9fe84cc8b7906037ebb25f31",
  "version": 1,
  "memory_type": "events"
}
-->