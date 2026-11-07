- Portal/homepage display mock dates should be unified to the year 2026 (notices.js, rental.js, brokers.js, InformationPages.vue, PropertyDetailDialog.vue, etc.).
- Pre-sale certificate expiry dates and regulatory template years remain unchanged.
- On announcement API failure, fall back to `publicNotices`.
- Affected files: src/views/home/publicPortal/mock/notices.js, trades.js, properties.js, rental.js, brokers.js, portalTradeDate.js, UnifiedLogin.vue, tests/e2e/unified-login-visual.spec.ts.
- Verification src=门户/026.md; source session 5a79e058-ab01-4651-a329-93cfa63f858d.

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：5a79e058-ab01-4651-a329-93cfa63f858d


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "portal_mock_date_2026",
  "source_extraction_id": "1462c6b877c444ca9421fa5c18344883",
  "version": 1,
  "memory_type": "preferences"
}
-->
