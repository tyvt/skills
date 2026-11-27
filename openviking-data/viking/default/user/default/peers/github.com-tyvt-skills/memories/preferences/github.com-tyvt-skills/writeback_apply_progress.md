- For large writebacks, use apply with `--wait` and then collect the result; it can run long. After completion, confirm final applied and skipped counts and no concurrent changes before reporting.
- Apply performs an ov write plus readback for each item and is slow, roughly 11-12 seconds per item, with embedding timeout cases up to 120 seconds; expect slow cases to move to the background.
- The apply script can shell out to the ov CLI multiple times per memory, so a 45-item batch can take a long time even when each individual call is normal.
- Large writebacks should run in the background while verification continues; do not wait idly, and do not guess or splice job ids when background execution is slow.
- Use job_list to obtain the real job id and poll until completion; if progress is slow but stable, use a blocking wait to avoid high-frequency polling overhead.
- Stdout redirection output files and job_output may only become visible when the process ends; lack of intermediate stdout is normal, so do not diagnose a hang prematurely.
- During execution, judge progress from audit-log growth rather than repeatedly reading output files that are not yet written.
- audit.jsonl appends one line per apply; its line count indicates progress, and if the path is uncertain, use just-completed apply output to identify it instead of spending time searching.
- If apply runs for many minutes with no output or appears stuck, stop repeating waits and inspect process state and the apply script logic, including network retries, interactive waits, OpenViking health, Ollama health, and the autostart skill.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "writeback_apply_progress",
  "source_extraction_id": "8686cc58841f4a43b41db0ae35c629de",
  "version": 1,
  "memory_type": "preferences"
}
-->