# Summary
2026-11-12，用户在八审中指出 §3.1 对 npx eslint --version 的 bin 直接跟需明确，建议注明对 npx/pnpm exec 先剥前置再取 bin 判 --version/--help。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...sessions*` 一并拦"作为已知行为。

### 6. §3.1 公共前置对 `npx eslint --version` 的"bin 直接跟"需明确

`npx eslint --version` 的 bin 是 `eslint`，`--version` 跟在 eslint 后，应放行；但"任一此类 bin 直接跟 --version"对 `npx` 而言 `npx --version` 是 npx 版本，`npx eslint --version` 是 eslint 版本，两者都应豁免。建议注明"对 `npx/pnpm exec` 先剥前置再取 bin，再判 `--version/--help`"。

---

## 与历轮对照（收敛）

| 轮次 | 剩余问题 |
|---|---|...

<!-- MEMORY_FIELDS
{
  "event_name": "npx版本判定说明建议",
  "goal": "建议明确npx判定",
  "summary": "2026-11-12，用户在八审中指出 §3.1 对 npx eslint --version 的 bin 直接跟需明确，建议注明对 npx/pnpm exec 先剥前置再取 bin 判 --version/--help。",
  "ranges": "23-25",
  "source_extraction_id": "bc74b3cbea604d1e98cd5377721abc5c",
  "version": 1,
  "memory_type": "events"
}
-->