# dev_wuxi-sfb

Git branch and release line for 无锡苏服办 (Wuxi SuFuBan) in the zhi2-mobile-admin-h5-c-unlimited frontend repo.

## Description
- Separate release line diverged from the dev main branch.
- Built via `uni build`; CI packages with `tar dist/*` from repo root.

## Role
- Source branch for tag 202608171350 (a release build).
- Previously lacked the `./dist` outDir fix that dev main branch already had.

## Significance
- On 2026-11-04 its build outDir was changed from `../dist` to `./dist` to match CI packaging, fixing a CI failure.
- Other version branches cut from old baselines may have the same `../dist` mismatch.
- The assetsPublicity business fix (commit a790f5a, 进入页面前补全小区信息) originated on this branch (tag 202608171350) but was determined to belong on dev (淮安主线) and was ported there on 2026-11-04.

<!-- MEMORY_FIELDS
{
  "category": "git_branch",
  "name": "dev_wuxi-sfb",
  "source_extraction_id": "9451b7b6bbf84ff891d21fae2885ef2d",
  "peer_id": "gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-mobile-admin-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->