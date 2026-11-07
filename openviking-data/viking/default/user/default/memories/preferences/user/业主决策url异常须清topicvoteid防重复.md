- `usePortal.js` 的 `openOwnerDecisionVoteH5()` 在 `fetchOwnerDecisionVoteUrl()` 抛异常时，于 `finally` 调用 `markOwnerDecisionConsumed()` 清除 `portal_topic_vote_id` 与 `portalPostAction`
- 延后 50ms 弹 toast，避免决策 ID 残留引发重复弹窗或跳转
- 涉及文件：utils/portal.js、pages/webview/home.vue、hooks/useUrlQueryParam.js、App.vue、hooks/usePortal.js、utils/h5Context.js、store/portal.js、api/portal.js
- 验证：src=无锡市区小程序嵌入H5/014.md；来源会话 02076a8a-747c-4891-a785-497ddd2c8a97

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "业主决策URL异常须清topicvoteid防重复",
  "source_extraction_id": "b743329be02845368645a88e947afc1c",
  "version": 1,
  "memory_type": "preferences"
}
-->