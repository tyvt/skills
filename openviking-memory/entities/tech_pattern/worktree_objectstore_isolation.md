# Worktree Submodule Object Store Isolation
A nested submodule worktree inside a parent repo worktree keeps its own independent object store, so commits fetched into the main submodule are invisible to it.

## Root Cause
- A parent repo worktree with a nested zhi2-web-admin submodule worktree gives the submodule worktree its own separate object store.
- `git submodule update --init` in the worktree fails when its gitlink commit (e.g. 2eb1e3ba) is missing from the worktree submodule's object store.
- Fetching the gitlink commit into the main submodule's object store does not make it visible to the worktree submodule.

## Fix Workflow
- Fetch the gitlink commit directly into the worktree submodule (e.g. `git -C <wt>/zhi2-web-admin fetch origin <sha>`), then `git -C <wt>/zhi2-web-admin reset --hard <sha>`.
- After the worktree submodule is at the gitlink commit, its source files become present and editable.

## Verification
- Confirmed in the 2026-11-09 session: the worktree submodule reached gitlink commit 2eb1e3ba with the target file present after the direct fetch and reset.
- This isolation is distinct from the core.worktree misconfig and the flat-worktree creation defect.

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "worktree_objectstore_isolation",
  "source_extraction_id": "3bc7fb93fafe405ca87bbea0c9b32071",
  "version": 1,
  "memory_type": "entities"
}
-->