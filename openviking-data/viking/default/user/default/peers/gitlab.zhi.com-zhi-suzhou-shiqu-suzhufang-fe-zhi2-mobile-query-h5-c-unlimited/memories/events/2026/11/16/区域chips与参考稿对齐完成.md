# Summary
2026-11-16，排查发现 REF_SEC0（ref-assets.ts:5）本来就是「全市数据」+more_horiz 的完整参考 DOM，问题出在 buildInnerHtml 用动态 regionChipsHtml() 替代了它；按计划步骤 6 修改动态函数并保留 bug6456 功能，先将 activeChip 默认值改为「全市数据」，随后 chips 已对齐。
# 2026-11-16 (Monday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 重大发现：`REF_SEC0`（ref-assets.ts:5）本来就是「全市数据」+more_horiz 的完整参考 DOM——问题在 `buildInnerHtml` 用动态 `regionChipsHtml()` 替代了它。按计划步骤 6 改动态函数（保留 bug6456 功能）。先改 `activeChip` 默认值：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: chips 已对齐。接着按计划步骤 8 改满意度透传：

<!-- MEMORY_FIELDS
{
  "event_name": "区域chips与参考稿对齐完成",
  "goal": "修复chips渲染差异",
  "summary": "2026-11-16，排查发现 REF_SEC0（ref-assets.ts:5）本来就是「全市数据」+more_horiz 的完整参考 DOM，问题出在 buildInnerHtml 用动态 regionChipsHtml() 替代了它；按计划步骤 6 修改动态函数并保留 bug6456 功能，先将 activeChip 默认值改为「全市数据」，随后 chips 已对齐。",
  "ranges": "31-35",
  "source_extraction_id": "c63c75c141ce4e568af1757b73666f53",
  "version": 1,
  "memory_type": "events"
}
-->