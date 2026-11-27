- When extracting verification symbols, cover all technical identifiers and Chinese terms, not only backtick content; filter out session IDs, hashes, and generic words.
- Broad substring hits in generic symbols, aggregate repositories, and cache directories do not count as evidence; only precise hits in real business source code for specific filenames, API paths, long unique identifiers, and distinctive assertions count as evidence.
- Use progressive narrowing for evidence checks: first build a project-repository map and confirm that referenced files and key identifiers exist, then search the whole repository for distinctive assertions such as function names, constants, APIs, CSS classes, and Chinese phrases, then filter noise like `package-lock`, bundles, `assets`, `docs`, `e2e`, and `worktrees` to keep only real source hits, and finally confirm borderline items.
- For memories claiming something was "fixed/removed", missing key symbols cannot be judged INVALID outright: first confirm whether zero hits is the expected state of the "removed" claim; if consistent (e.g., zero occurrences of isSuzhouzhizai/currentEnvironment in source) judge VALID, while a memory claiming behavior exists but with symbols entirely missing (e.g., home.vue absent) is INVALID. The direction of a missing-symbol judgment depends on whether the memory claims "exists" or "removed".
- A basename/filename index alone is insufficient: generic filenames such as detail.vue appear across many repositories, so the claimed project repository must be cross-checked with distinctive symbols before counting a hit as evidence.
- Judge session-state or conversation-state memories INVALID when they only record a status such as a contract passing or a screenshot being published, with no locatable code artifact and unclear project ownership.
- Judge environmental-handling memories such as cache clearing INVALID when their key symbol has no source hit and no verifiable code artifact exists.
- When a memory describes a fix using a specific value that has since changed in current source, judge VALID if the structural fix still exists; for example, a claimed 3fr 2fr grid ratio was judged valid because center-bottom-row still defines a column-width ratio (current value 66fr 34fr).

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "audit_evidence_standards",
  "source_extraction_id": "6d74980a2a6c44099a2f02e2ecab23a0",
  "peer_id": "github.com-tyvt-skills",
  "version": 7,
  "memory_type": "preferences"
}
-->