- Select repositories by memory type: verify tool, preference, and knowledge memories in `skills/` or the OpenViking repository; verify business memories in the corresponding business repository.
- Verify tool- or rule-related knowledge memories directly in the `skills/` directory and AGENTS files; the skills exclusion rule applies only to project code claims, not to memories whose subject is itself a tool or rule.
- When mapping a memory to a code repository, use the exact project name from the memory text (e.g., 苏州市房地产监测V3项目) rather than guessing from partial keywords like "portal", because guessing wrong leads to incorrect verdicts.
- Evidence collection with `git grep` at repository roots misses submodule contents (most projects keep source in submodules such as `zhi2-mobile-shimin` and `zhi2-web-admin`); use a filesystem walk that includes submodules and skips heavy directories.
- Content-based search misses files whose own filename is not present in their text; batch-check filename existence for uncertain or borderline candidates.
- For large batches, use a single bounded verification script to check each candidate's distinctive tokens or fix points in the actual repository, writing compact UTF-8 evidence for staged review; avoid broad, slow globs.
- When Chinese directory names are mojibake-encoded on the filesystem, exact Chinese path walks return nothing; walk the whole tree and match by a path substring that actually works instead of relying on the exact path.
- ZenTao bug and task records require a live DB check through the DBX query tool to confirm their identity, status, and resolution details.
- Build-gate checks do not apply to audit scripts because an audit is not a project code change.
- For borderline code-fix memories, run a focused check using the exact claimed file paths within their specific repositories and inspect the exact current file content before deciding, instead of relying only on repository-wide token scans.
- When the console garbles Chinese but the candidate file is valid UTF-8 (for example select.json), extract a compact uri-and-hash index and the full contents into a readable file via Python instead of reading raw console output.
- Judge a memory INVALID when it is based only on screenshot inference about a project with no local repository and no code evidence, because it cannot be corroborated.

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "audit_repo_mapping",
  "source_extraction_id": "a538600852464a749105bc67aaea42eb",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "preferences"
}
-->