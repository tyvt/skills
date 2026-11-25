# HANDOFF-CHAIN-deploy-dashboard-credentials-hop4-20261125-0931
Nine-section chain handoff document for hop4 of the deploy dashboard credentials task, written 2026-11-25 when the hop3 session hit its cost ceiling.

## Chain meta
- Path: D:/plan/skills/HANDOFF-CHAIN-deploy-dashboard-credentials-hop4-20261125-0931.md
- chain_id=deploy-dashboard-credentials, hop=3 closed, next hop=4; maxHops is not set, so the chain continues until the unfinished items are cleared.
- Next hop scheduled as schedule-77997f80…, fires 2026-11-25 09:31:28 with target=new_once.
- hop3 ran read-only checks only, so no production code or DB was changed and no half-migrated DB was left beside the live dashboard.

## Goal and acceptance
- Original goal: the deploy dashboard's account/password entries disappeared; backfill all historical credentials (many recorded in past conversations) and persist them in the database.
- Acceptance: dashboard shows every historical account plus password, plaintext passwords persisted in the DB, selftest passes, agent-browser on-machine verification screenshotted and confirmed by the user.

## Verified state carried to hop4
- Plan gate already approved (approved_sha256 4dc7e3…d39af, status approved/human_confirmed); hop1 inventory, 3 privacy plaintexts decoded and DB inventory are done.
- DB: 34 env rows and 2 account rows; neither table has a plaintext password column; 10 slash-style mismatched secret_refs (fdc-v3 ×5, portal ×5) plus 2 valid viking-style refs.
- api.py anchors 33-36, 128-140 and 306-328; lines 137/139/328 are masked by tooling and cannot serve as edit anchors, so the visible source lines feeding them must be edited instead.
- Dashboard process runs at 127.0.0.1:18098 (PID 2472).

## Open items for hop4
- Five unfinished section-4 items: fix the 10 mismatched secret_refs; put plaintext in the DB (password_plain column + migration script + api.py changes); backfill historical credentials (admin account and business test accounts, upsert dedupe); verify (selftest + agent-browser screenshot + user confirmation); wrap up (job_list, clean artifacts, ask the user how to commit).
- selftest_dashboard.py:63-65 asserts the state holds no plaintext, which conflicts with the plaintext-in-DB goal; hop4 must decide how to resolve it.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "tech_doc",
  "name": "deploy_credentials_handoff",
  "source_extraction_id": "ef5f70b69f334597b8406c9583b0f5fe",
  "version": 1,
  "memory_type": "entities"
}
-->