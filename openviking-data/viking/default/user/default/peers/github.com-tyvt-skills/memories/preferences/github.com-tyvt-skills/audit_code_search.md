- Use two-step grep verification: batch `paths` mode to locate key files with controlled output, then `content` mode with a small limit to check distinctive features; keep parallel narrow batches around four items.
- When full-repository globs exceed file budgets, narrow checks to known project directories; when a memory path omits subdirectory prefixes, locate the file within the relevant project directory.
- When a background full-repository grep over large directories hangs, kill it and use a bounded scan tool with a scan budget; at high cost use offset/limit line reads to narrow the range.
- When grep skips files because of GBK or other encoding issues, missing evidence is not disproof; verify the exact files, symbols, and content features directly.
- In batch `git grep`, check quoting and pattern splitting so multiple patterns are not merged; if hits are unstable, switch to a narrow script with declared paths or plain-grep exact verification.
- If a glob tool requires the pattern argument to be an array, wrap the pattern in an array and rerun that batch.
- Basename and global token counts are noisy; use a targeted verifier that checks referenced files, distinctive technical symbols, and rare Chinese phrases.
- When basename lookup misses because generic names such as `index.vue` return only the first few files, use the specific path suffix from the memory and exact whole-repository symbol search.
- If a precise-check hint uses basename matching while containing a directory path, rerun uncertain items with relative-path matching before judging.
- When capped grep output stops after the first matches, a mismatch may come from a sibling or copied repository; run a decisive check scoped to the claimed project.
- When a per-file token limit yields false zero-hits, broaden to the global file index and emit compact per-candidate hit lines with file paths.
- If verification fails because of wrong path separators, rerun the affected batch with corrected separators before judging.
- When exact-string checks produce false negatives from spacing or branch differences, run a flexible whitespace-normalized confirmation and inspect snippet evidence before judging.
- Resolve Chinese project aliases to local repository directories before scanning, such as Investment Push (投资推送) to the `fund` repo; wrong or missing repos cause false MISS results.
- Map project names by longest match rather than substring so '无锡市区小程序嵌入H5' is not mis-mapped to the '小程序' directory.
- When filename hits are too coarse, upgrade to project-aware content-level verification: identify the owning repo and verify distinctive functions, fields, interfaces, and file names in source.
- When project-name matching fails or decisive symbols have zero hits, check whether extension coverage missed `.mjs`, `.py`, `.svg`, or similar files, then run a targeted global symbol supplement.
- 同类批量对象很多（如 45 条记忆涉及 15+ 项目仓）且逐条核对成本偏高时，若并行扇出子代理成本过高，改用一次性批量核对脚本：按项目分组、加载源码文本、搜索各自特征符号、输出浓缩命中表，避免逐条 grep。
- When a file finder reports NO FILE for paths that should exist in a multi-worktree repository, suspect that worktrees were excluded; extract exact file paths from the intermediate verification JSON and perform targeted reads instead.
- On a GBK shell console, shell redirection writes GBK bytes even when the source JSON is UTF-8; generate UTF-8 output files with Python using explicit encoding rather than shell redirection.
- 核对成本逼近上限时立即收窄：停止整读候选全文，改为一次性提取精简核对清单（标题/项目/涉及文件）再批量实机核对。

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "audit_code_search",
  "source_extraction_id": "f84e1d6177394f2e9763ba1451621b78",
  "peer_id": "github.com-tyvt-skills",
  "version": 4,
  "memory_type": "preferences"
}
-->