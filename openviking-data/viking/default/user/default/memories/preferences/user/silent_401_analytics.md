- In the 苏住房C mini-program (zhi2-mobile-shimin), analytics requests returning 401 with an expired token must be handled silently to avoid triggering logout and blocking page navigation.
- appAnalytics.js uses silentPost with noReject: true and skipToken: true, plus .catch(() => null) to guarantee resolve.
- httpInstance.js skips userStore.clear()/appLogin() when noReject is set, resolves(null) on network fail, and adds skipToken to omit the Authorization header.
- Verification: src=苏住房C/067.md; source session f8d2218a-2bef-4ce0-99ff-25ccbca24f30.

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：f8d2218a-2bef-4ce0-99ff-25ccbca24f30


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "silent_401_analytics",
  "source_extraction_id": "6a5f40753ef0432f99d9c80a416f56e7",
  "version": 1,
  "memory_type": "preferences"
}
-->
