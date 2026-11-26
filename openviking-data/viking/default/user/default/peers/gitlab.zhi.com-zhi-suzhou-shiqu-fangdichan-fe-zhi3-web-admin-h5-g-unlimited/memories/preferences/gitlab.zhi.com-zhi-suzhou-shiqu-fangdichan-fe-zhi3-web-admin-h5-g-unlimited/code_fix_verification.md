- Prefers minimal fixes and proactively rolls back intermediate changes that could introduce regressions, such as registry edits that point fallback routes to the wrong menu.
- Validates changes with single-file eslint plus a build (exit 0), treating existing full-lint red baselines as unrelated to the current change.
- When the orchestrator repeatedly fails on `npm run lint`, switches to a narrower form: single-file eslint only on changed `.vue` files.
- Verifies real data and parsing chains before changes (business DB change orders, menu-table busCode, todo-jump query parameters), then performs real-device verification.

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "user": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "topic": "code_fix_verification",
  "source_extraction_id": "ce61e01aa0944a3391e938adc440bc7d",
  "version": 1,
  "memory_type": "preferences"
}
-->