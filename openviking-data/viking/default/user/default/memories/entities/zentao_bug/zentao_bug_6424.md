# ZenTao Bug 6424
ZenTao defect 6424: AgencyPersonnelDetail.vue fix resolved via DBX transactional write-back on 2026-11-10.

## Description
- Module: agency personnel detail page (AgencyPersonnelDetail.vue in zhi2-web-admin submodule).
- Bug state before fix: status=active, assignedTo=tiany, openedBy=zhunan, product=7, project=200, execution=201.

## Resolution
- DBX transactional UPDATE zt_bug set status=resolved/fixed, resolvedBy=tiany, plus INSERT zt_action resolved action; committed and persistence verified on 2026-11-10.
- Code fix: only AgencyPersonnelDetail.vue is the real change; public/version.json was a build artifact (reverted); env/.env and .tmp-bug6424/ are pre-existing and untouched.
- Git: submodule and parent both on develop/v3.0.0, behind origin by 5 commits; remote incoming task#2311 (agency management) and bug#2380 (project-filing cert) do not touch AgencyPersonnelDetail.vue, so no conflict; user chose commit+push, rebase onto remote started on 2026-11-10.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6424",
  "source_extraction_id": "4b9fe04f693a41e1bfcf74b1735f6de8",
  "version": 1,
  "memory_type": "entities"
}
-->