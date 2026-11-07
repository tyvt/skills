# dev

Git branch and main release line (淮安主线) for the zhi2-mobile-admin-h5-c-unlimited frontend repo.

## Description
- Main Huaian line from which dev_wuxi-sfb (无锡苏服办线) was cut at commit 40349dc.
- Built via `uni build`; builds output to `./dist`.

## Role
- Hosts the 淮安主线 business code, distinct from dev_wuxi-sfb.
- Target branch for the assetsPublicity business fix port on 2026-11-04.

## Significance
- On 2026-11-04 the assetsPublicity fix (ensureProjectInfo/displayProjectName) was ported from dev_wuxi-sfb (commit a790f5a) to dev (commit 9982a72) via an isolated worktree, then fast-forward merged to local dev, pushed to origin/dev (synced at 9982a72), and tagged 202611041057 (YYYYMMDDHHMM convention) on 9982a72 pushed to remote.
- dev's useProjectState.js lacks `applyHouseSelection` (only `applyProjectSelection`), so ports from dev_wuxi-sfb must adapt to `applyProjectSelection(obj, houseList)`.

<!-- MEMORY_FIELDS
{
  "category": "git_branch",
  "name": "dev",
  "source_extraction_id": "fc7219c29ef244b38f0b64150f40a98e",
  "peer_id": "gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-mobile-admin-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->