- Run a final privacy/secret scan across all candidate bodies before writing back verdicts.
- Clean up temporary verification scripts after completion so only cache intermediates remain.
- When the OpenViking writeback apply runs slowly in the background, do not guess or stitch a job id; use job_list to obtain the real id and poll until completion before reporting.
- When a writeback apply takes a long time, do not diagnose a hang prematurely: check the script logic first (each item needs several ov CLI reads/writes, about 135 calls and roughly 12 seconds per item for 45 items); when the process is not visible but the job is still running, do not judge progress from aggregate audit_status counts (mostly historical rounds), instead read the last_checked timestamps of the first and last URI in the current round to confirm persistence and spot-check middle items to estimate remaining time.
- Use a script to read uri/sha from select.json and merge verdicts into result.json, avoiding manual transcription of all entries.
- When the script indexes verdict notes by 1-based position, do not insert missing keys in the middle of the dictionary (it misaligns all later keys); instead adjust the read index (for example base[i+1]) and undo the insertion.
- Confirm the apply script path before writeback: the script is in the project scripts/ directory and the working directory is D:/repository/skills, to avoid path errors.
- result.json is an array; each verdict record contains uri, verdict, note, and body_sha256_16 fields; apply maps and writes back each item by these fields.

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "audit_writeback_execution",
  "source_extraction_id": "8553008f42b145f5bb6bf1ebf560b590",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "preferences"
}
-->