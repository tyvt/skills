# dsh-pwsh-local
DSH local PowerShell execution tool for running pwsh commands in sessions; PowerShell 7.6.9 installed on 2026-11-11.

## Environment and Version
- PowerShell 7.6.9 installed at `C:\Program Files\PowerShell\7\pwsh.exe` on 2026-11-11 from official zip (not MSI), added to PATH.
- Windows PowerShell 5.1.19041.6456 retained at `C:\Windows\System32\WindowsPowerShell\v1.0` untouched.
- DSH resolution order: config `pwshPath` (unset) -> 7.6.9 path -> PATH `pwsh.exe` -> 5.1; new sessions auto-use 7.6.9.
- Session active during upgrade still used 5.1; later sessions auto 7.6.9, no DSH config change needed.
- PS 7 does not wrap native stderr as NativeCommandError; file writes default UTF-8 (no GBK corruption).

## Failure Audit (347 session files, last 8 days, as of 2026-11-11)
- 17686 pwsh calls; tool-layer failures 27 (0.15%): INVALID_ARGS 15 (empty `{}`), ABORTED 8, TOOL_OUTCOME_UNKNOWN 4.
- Non-zero exit codes 1912 (10.8%); on 2026-11-11 tool failures 0.
- 1912 exit-1 breakdown: 930 no PS error log (correction: originally 925 misparsed; args stored as string, commands existed), 694 NativeCommandError (5.1 only, gone after upgrade), ~70 syntax, rest usage.
- 930 no-error exits: ~690 probe normal returns (git status --porcelain 49, grep/check-ignore 25, ls-remote/remote/ls-tree 25, push 19 with 12 ok/7 real, log/show/diff 39; Get-ChildItem/Get-Content/Get-Process/Test-Path/Select-String with -ErrorAction SilentlyContinue 168 swallowed missing paths; git diff | Select-Object 1), ~240 real failures (network 70, build/test 81, script 68, path missing 38, empty output 34), ~70 quote/variable issues.
- 15 empty-arg INVALID_ARGS all in session 904a727e (11-09 cross-day cursor/composer-2.5), alongside empty read/grep: long-session context decay, not pwsh contract broken.
- Syntax errors: UnexpectedToken 22, MissingEqualsInHashLiteral 21 (double-quote `@{u}`), TerminatorExpectedAtEndOfString 10, InvalidVariableReferenceWithDrive 13.
- Usage errors: CommandNotFoundException 33, ConvertFrom-Json 23, Select-String/Get-ChildItem/Get-Content path missing ~43.

## Upgrade Outcome and Boundaries
- 2026-11-11 PS 7.6.9 eliminated two 5.1 issues: stderr-as-failure (694 NativeCommandError), GBK file writes.
- Remaining: 930 no-error non-zero exits (~690 probes, ~240 real, ~70 quote issues; shell change useless), quote/`@{u}` parse errors, empty-arg INVALID_ARGS.
- Call conventions (in tool-call-hygiene): use single quotes for `-m`; `git rev-parse '@{u}'`; `$env:GIT_EDITOR='true'` (not `GIT_EDITOR=true`).
- Empty-arg INVALID_ARGS is long-session decay: stop and switch session after two consecutive.
- Failure handling at call layer (not tool): probes use `git status --porcelain; exit 0` or only check exit on `; if`; `git push`/`commit` non-zero is failure; GitHub via mirror/proxy not pwsh retry; `node -e` >1 line write `.mjs`; `Test-Path` first; two empty args -> new session.


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_pwsh_local",
  "source_extraction_id": "9e2988b6bbf64d64ab44c4e9b8cd46cc",
  "version": 4,
  "memory_type": "entities"
}
-->