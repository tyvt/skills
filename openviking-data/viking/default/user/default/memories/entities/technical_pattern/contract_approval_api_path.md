# Contract approval API path must use flowable/task
In Suzhou Real Estate Monitoring V3, `contractRequest.js` `getFlowViewer` and `isApprovalAuth` used wrong `/flowable/definition/*` path, causing approval errors; fixed to `/flowable/task/*`.

## Root Cause
- `zhi2-web-admin/src/views/contract/utils/contractRequest.js` used `/flowable/definition/*` for approval viewer and auth checks
- Incorrect path caused contract approval exceptions

## Fix
- Changed interface paths to `/flowable/task/*`

## Affected Files
- Contract util: zhi2-web-admin/src/views/contract/utils/contractRequest.js
- Flowable API: src/api/flowable/definition.js, src/api/flowable/todo.js
- Config: 路由信息.json, zhi2-web-admin/vite.config.js
- Views: flowable/flow.vue, presale/cashsale/components/CashsaleDetail.vue, src/api/index.js

## Verification and Attribution
- Evidence: src=苏州市房地产监测V3/124.md
- Project: 苏州市房地产监测V3; Session: 957b5194-9887-4b03-a4b2-f48dde8ed5fa; Baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：957b5194-9887-4b03-a4b2-f48dde8ed5fa


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "contract_approval_api_path",
  "source_extraction_id": "21bae0b2f9ec4f2ebc5dd6faf236e3e2",
  "version": 1,
  "memory_type": "entities"
}
-->
