# Submodule Fix Rebase for Fast-Forward
Rebase a submodule fix branch onto origin/develop/v3.0.0 when it is behind, so the push becomes a fast-forward instead of a rejected non-fast-forward.

## When To Use
- Local develop/v3.0.0 (or submodule equivalent) is stale; origin advanced with merges never pulled locally, so the fix branch is not an ancestor of origin.
- Local develop/v3.0.0 is checked out/locked in the main worktree; merge back via fast-forward refspec pushes (no force) to avoid disturbing parallel WIP.
- Must not force-push to a shared branch.

## Procedure
- Push the submodule first if it is already fast-forward-ready; the submodule SHA is unchanged by the parent rebase.
- Rebase the fix branch onto origin/develop/v3.0.0; a single gitlink commit replays cleanly and the submodule SHA stays the same.
- If the remote advances again mid-work, rebase the submodule onto the new origin tip (gitlink change becomes a trivial ff), point the parent gitlink at the rebased submodule commit, then rebase the parent onto the new origin tip.
- Fix branches can be pushed to origin even when the develop/v3.0.0 merges are rejected.

## Example bug-6363 (2026-11-09)
- Submodule fix `4409af208` based on `6009ddf16`; parent fix branched from local `develop/v3.0.0` at `045d91a`, but origin was ahead at `2892034` (contained the `fix/contract-version-dialog-public-component` merge never pulled).
- Remote later advanced: parent origin `956cdca`, submodule origin `c958bba49`; pushes based on stale local tips were rejected and the parent rebase hit a submodule pointer conflict.
- Fix branches `fix/bug-6363-attachment-lost` (submodule) and `fix/bug-6363-attachment-lost-parent` were created on origin; only the `develop/v3.0.0` merges were rejected.
- Recovery executed and succeeded: submodule rebased onto `c958bba49` → `2001247828766ff771bc6eb561adafcbb9ebbc9c`; parent gitlink pointed at it, parent rebased onto `956cdca` → `99f511e`. Both `develop/v3.0.0` branches pushed via clean fast-forward (submodule `200124782`, parent `99f511e`).

<!-- MEMORY_FIELDS
{
  "category": "git_workflow",
  "name": "submodule_rebase_ff",
  "source_extraction_id": "571012528e1e4a56951f61a3cd4feb95",
  "version": 2,
  "memory_type": "entities"
}
-->