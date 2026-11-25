# DBX MCP stdio driver
The local `dbx-mcp.exe` binary, driven over stdio JSON-RPC from PowerShell so SQL scripts can be executed straight from disk.

## Description
- Binary lives at `C:\Users\Administrator\.dbx\bin\dbx-mcp.exe` and speaks stdio JSON-RPC, so one process can initialize, open a session, begin a transaction, execute and commit without pushing SQL text through the model context.
- `dbx_execute_batch` accepts only a `sql` string and rejects `@file` references, so a 62KB generated script must be split into chunks or fed chunk by chunk.
- Sessions opened through `dbx_open_session` need `enable_transactions=true` before `begin`; batch calls route to the pinned session and `transaction_state` stays active across calls.

## Known pitfalls
- A single ~33KB batch call hung for 10+ minutes with near-zero process CPU; splitting into small chunks, or line-by-line execution with progress markers, is required.
- Statements containing Chinese stall the driver unless UTF-8 is set on the redirected stdin/stdout streams.
- A line-based RPC reader breaks when a response spans multiple lines, showing up as an apparent hang with no output.
- PowerShell `$args` is a reserved automatic variable and must not be used as a script parameter name.
- Killing the driver or its DBX child with an open transaction rolls back cleanly: on 2026-11-25 `MAX(id)` was unchanged and zero rows existed in the target range afterwards.

## Usage facts
- Validated with a probe: open session → begin → one real INSERT/UPDATE → rollback, before running the full transaction.
- On 2026-11-25 it committed 344 statements atomically (96 new zt_task rows, ids 2806–2901) for the ZenTao 2026-11-15~11-23 effort recalculation; transient routing faults succeeded on one verbatim retry.
- Temporary driver/probe scripts written to TEMP were deleted after the run and no leftover DBX processes remained.

<!-- MEMORY_FIELDS
{
  "category": "tools",
  "name": "dbx_mcp_driver",
  "source_extraction_id": "c3c4847bc5dd44d3b75da70633727d1f",
  "version": 1,
  "memory_type": "entities"
}
-->