- Cursor has no native fully unattended code review capability; the user relies on global rule `~/.cursor/rules/code-review-graph-auto.mdc` and a `sessionStart` Hook in `~/.cursor/hooks.json` that checks `git diff HEAD` to inject CRG context.
- Review thresholds are set by `FILE_THRESHOLD=3` and `LINE_THRESHOLD=80` in `crg-diff-check.py`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "cursor_crg_review",
  "source_extraction_id": "9c284e58ed614ab5ae1e20683f747416",
  "version": 1,
  "memory_type": "preferences"
}
-->