# WorkBuddy scheduled checkin migrated to pi-web via wbipc
The original WorkBuddy timed checkin is brought under pi-web scheduling management.

## Setup
- Scripts `checkin_all.py` and `wbipc_client.py` placed in `C:\Users\Administrator\.pi-web\scripts\workbuddy-checkin\`
- Login state obtained via wbipc named pipe
- Scheduled task `task-cn8tz7` (cron `0 8 * * *`) written to `~/.pi-web/scheduler-tasks.json`
- On trigger, wakes via conversation to headless execution with ordered fallback

## Affected Files
- Skill and docs: workbuddy-checkin-changsheng/SKILL.md, .pi-web/scripts/workbuddy-checkin/README.md
- Scripts: checkin_all.py, wbipc_client.py
- Scheduler config: ~/.pi-web/scheduler-tasks.json

## Verification and Attribution
- Evidence: src=苏州市房地产监测V3/123.md
- Project: 苏州市房地产监测V3; Session: 01a171cc-76a9-7048-964a-22d6748131b4; Baseline: none


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "workbuddy_checkin_piweb",
  "source_extraction_id": "21bae0b2f9ec4f2ebc5dd6faf236e3e2",
  "version": 1,
  "memory_type": "entities"
}
-->