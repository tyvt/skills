# zhi2-mobile-admin-h5-c-unlimited
Admin H5 submodule of zhi2-mobile-shimin-h5-c-unlimited, built by uni CLI with output directed to the parent repo root for CI packaging.

## Description
- GitLab path: gitlab.zhi.com/zhi/huaian/all/wuguan/fe/zhi2-mobile-admin-h5-c-unlimited
- Submodule of zhi2-mobile-shimin-h5-c-unlimited; branch dev_wuxi-sfb
- Build script: uni build --outDir ../dist (output to parent repo root)

## Key Facts
- pm.mjs build runs npm with cwd=submodule dir, so --outDir ../dist resolves to parent repo root dist/
- CI tar dist/* runs at repo root, so build output MUST land at repo root (not submodule dir)
- History: 3a562de (2026-05-18) set ../dist; d778f9f (2026-11-04 10:40) wrongly changed to ./dist, breaking CI; reverted in 620919a
- Commit 620919a (dev_wuxi-sfb) fixes CI; tagged 202611041456

## Relations
- Submodule of zhi2-mobile-shimin-h5-c-unlimited (parent branch main-sfb)

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited",
  "category": "git_submodule",
  "name": "zhi2_admin_h5",
  "source_extraction_id": "56449f4768b3493f8d03e1689ad0a8ae",
  "version": 1,
  "memory_type": "entities"
}
-->