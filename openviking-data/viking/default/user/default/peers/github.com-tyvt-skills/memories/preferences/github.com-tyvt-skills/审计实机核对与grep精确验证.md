- Use two-step grep verification: batch `paths` mode to locate key files with controlled output, then `content` mode with a small limit to check distinctive features; keep parallel narrow grep batches around four items to avoid gate thresholds.
- When console output mangles Chinese text, dump readable UTF-8 text to a cache file and read it with the UTF-8 file tool instead of relying on the mangled console output.
- When a shell redirect corrupts the encoding of output containing Chinese text, write the file directly with Python using explicit UTF-8 encoding instead of relying on shell redirection.
- When a redirected output file already contains non-UTF-8 bytes, read it with decoding errors ignored (for example `errors='ignore'`) to salvage readable content before regenerating a clean UTF-8 dump.
- When grep skips files because of GBK or other encoding issues, missing evidence is not disproof; verify the exact files, symbols, and content features directly.
- In batch `git grep`, check quoting and pattern splitting so multiple patterns are not merged into one noisy pattern; if hits are unstable, switch to a narrow script declared at the paths or plain-grep exact verification.
- When results are dominated by `dist/` or other build artifacts, narrow verification to source directories with targeted globs and read or grep exact source files; worktree copies can inflate scan counts, so verify against the main repository's narrow paths.
- If a glob tool call fails because the pattern argument must be an array, wrap it in an array and re-run that batch.
- Basename matching and global token counts are often too noisy; use a targeted verifier that checks each memory's referenced files and distinctive tokens, including rare Chinese phrases.
- When verification cost rises, build a one-pass batch verifier that maps keywords to candidates, scans relevant repository source files once, and outputs evidence hits per candidate before deep-checking low-hit claims.
- An actively called decisive symbol overrides a memory claim that the behavior was commented out or hidden; verify call sites, not just definitions.
- For the last uncertain items, locate the exact target files and verify exact strings or specific claims instead of relying on broad counts.
- Treat verification MISS results as inconclusive when hidden directories were skipped or project attribution may differ; run a targeted pass on exact paths before judging.
- Under a strict "proof of validity" standard, require real-code evidence for decisive symbols and referenced paths; mark candidates unverifiable when that evidence cannot be confirmed.
- 判定 INVALID 的三类典型原因：数值或描述与代码现状不符、目标文件全仓不存在、仅为过程流水账且无可核对的稳定代码证据。

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "审计实机核对与grep精确验证",
  "source_extraction_id": "733c7d1784344034a90fdc814efbe658",
  "peer_id": "github.com-tyvt-skills",
  "version": 16,
  "memory_type": "preferences"
}
-->