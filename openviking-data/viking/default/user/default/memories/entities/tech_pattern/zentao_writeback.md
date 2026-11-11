# zentao-bug-writeback
Agent process to resolve and write back a ZenTao bug, using the `zentao-analyzer` skill.

## Workflow
- Load the `zentao-analyzer` skill to get the exact DBX write-back pattern
- The skill routes write-back through `zentao-resolve.mjs`, which prints the SQL transaction but does not execute it
- Execute the printed transaction via DBX

## SQL Transaction
- `UPDATE zt_bug`: set status=resolved, resolution=fixed, resolvedBy/lastEditedBy=tiany, assignedTo=openedBy, resolvedDate/lastEditedDate=NOW()
- `INSERT INTO zt_action`: 14 columns, `read` backtick, files NULL, vision 'rnd'

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "zentao_writeback",
  "source_extraction_id": "27e5be11847d4ae6a086674ed801460c",
  "version": 1,
  "memory_type": "entities"
}
-->