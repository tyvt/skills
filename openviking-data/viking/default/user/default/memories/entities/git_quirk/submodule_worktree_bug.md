# Submodule Worktree Resolution Bug
Git submodule worktree resolution fails on Windows with nested Chinese paths, returning wrong gitdir.

## Description
- Submodule `.git` file contains correct UTF-8, but `git -C $wtSub` fails to resolve.
- `git -C $wtSub` returns the main submodule's gitdir as `--show-toplevel`, so git treats `$wtSub` as the main repo and reports mass deletions.
- This is a broken-internal-pointer artifact from a pre-existing Windows + nested-Chinese-path quirk in submodule worktree resolution.

## Impact
- Does not affect the deliverable: parent gitlink (`ls-tree` confirmed `d71a36607`) and submodule HEAD (via explicit gitdir) are both correct.
- Fix commits are already correct; only a cosmetic `modified content` flag remains.

## Mitigation
- Inspect worktree internal back-pointer (`gitdir`/`commondir`) and how the superproject views the submodule.
- Attempt `git worktree repair` to settle the cosmetic `modified content` flag.

## Relations
- Affects git submodule worktrees with nested Chinese paths on Windows.
- Commits involved: parent gitlink and submodule HEAD both at `d71a36607`.

<!-- MEMORY_FIELDS
{
  "category": "git_quirk",
  "name": "submodule_worktree_bug",
  "source_extraction_id": "7741f2c46f2c44c9be78fb3e3faac458",
  "version": 1,
  "memory_type": "entities"
}
-->