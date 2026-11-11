# Summary
2026-11-11用户要求确认BASE从2026-11-04改为2026-11-06是否为完整交易日。通过lake_base.pick_base()返回2026-11-06，符合§1.2判据（全市场平均成交额≥前20日中位数80%），非盘中快照，验证通过。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-financial-data-lake]**: ...**

### 另外两个小确认

**BASE 从 2026-11-04 改成 2026-11-06**：需要确认 11-06 是 `lake_base.pick_base()` 判定的完整交易日，不是盘中快照。...
...
**assistant [peer=github.com-tyvt-financial-data-lake]**: Now the full picture of concern #2 is clear:
- Doc §5.1 has `score=1/√(vol×|mdd|)`, §5.2 沪深比例, §5.3 集中度. **No "目标买价/10%" section exists.** ✗ matched — user is right.
- The rule **does** exist as `max_gap_pct: 10` in `持仓面板/config.js` and in `reselect_portfolio.py` `_gap`. Its panel note (config.js line 381) describes it: "现价高于目标买价超过 max_gap_pct 的不入选；w=0 不进清单".

So the "10% 目标买价" is real and user-authorized (2026-11-11 request), documented in the **panel config** but **not in 筛选标准_最终版.md §5**. And critically, in `reselect_portfolio.py` it does remove from the portfolio composition (drops gap>10 from `df` before top-N), not just the buy list.

Now let me get the remaining facts:
- Confirm BASE 2026-11-06 via `pick_base` (small confirmation #4).
- Understand bench logic (concern #5): `reselect_portfolio.py` bench = `df[(深) & ~held & sw1!=银行].head(3)`. But `df` at that point already had gap>10 rows **dropped** (line 122: `df = df[~(df.gap>10)]`). So the bench **excludes** gap>10 names — that's why only 2 shown (东莞/五粮液). The other 深 names (粤高速/招商公路/陕天然气/宁波) are gap>10, dropped from `df`, so not eligible for bench. Confirmed user's suspicion.

Let me run `pick_base` to confirm 2026-11-06.
**assistant [peer=github.com-tyvt-financial-data-lake]**: Confirmed: **`pick_base()` returns 2026-11-06** — it IS the complete trading day per the §1.2 判据. So BASE 2026-11-06 is validated (small confirmation #4 resolved: ✓ valid).

Now I have all the facts. Let me also confirm the bench logic detail and check what `df` contains after gap-drop to verify the bench-2 explanation.

<!-- MEMORY_FIELDS
{
  "event_name": "BASE日期确认",
  "goal": "验证基准日完整性",
  "summary": "2026-11-11用户要求确认BASE从2026-11-04改为2026-11-06是否为完整交易日。通过lake_base.pick_base()返回2026-11-06，符合§1.2判据（全市场平均成交额≥前20日中位数80%），非盘中快照，验证通过。",
  "ranges": "42,61-69",
  "source_extraction_id": "7848d905fcac48b59dfcbc73d394060c",
  "version": 1,
  "memory_type": "events"
}
-->