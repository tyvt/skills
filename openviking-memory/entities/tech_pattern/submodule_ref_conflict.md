# zhi2-web-admin submodule reference inconsistency merge conflict
The parent repo's zhi2-web-admin submodule reference locally points to 000c168 while remote points to 60d75dc, causing a merge conflict; keep the integrated submodule and generate a merge commit.

## Background
- The parent repo's reference to submodule zhi2-web-admin points to 000c168 locally and 60d75dc remotely; the inconsistency triggers a merge conflict
- This reference-pointer divergence is a common submodule merge conflict source, not a code-content conflict

## Solution
- Keep the local 000c168 submodule commit that was integrated from remote 60d75dc
- Generate merge commit 1377d5f to unify the reference and keep the working tree clean
- After merging, parent and child repo references are consistent, avoiding repeated future conflicts

## Verification and Attribution
- Verification: session d1128cb7, src=产品2.0/058.md
- Involved files: zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue、src/views/autonomy/election/components/apply/CandidateDialog.vue、src/views/autonomy/candidateCollect/components/CandidateTable.vue
- Project: 产品2.0; source session: d1128cb7-0606-40a0-b1b8-83b92090485f; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "submodule_ref_conflict",
  "source_extraction_id": "2618dad3089247029330eb677f274518",
  "version": 1,
  "memory_type": "entities"
}
-->