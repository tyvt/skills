# zhi2-mobile-shimin-h5-c-unlimited
Wuxi city-district citizen H5 frontend parent repo (package name suzhufang@1.0.0), built via GitLab CI with a nested admin submodule.

## Description
- GitLab path: gitlab.zhi.com/zhi/wuxi/shiqu/benefit/fe/zhi2-mobile-shimin-h5-c-unlimited
- Package name: suzhufang (version 1.0.0); build profile: rel
- Parent repo branch: main-sfb (commit d2a039b after 2026-11-04 CI fix)
- Uses GitLab runner zhi-runner-pre WgnM5oiW (system ID r_F1ksuTk5wX7U), gitlab-runner 16.9.0
- CI script: /home/gitlab-runner/scripts/nodejs-build.sh

## Build and CI
- CI flow: npm run build (root) -> node scripts/pm.mjs build -> runs npm run build in submodule (cwd=submodule) -> uni build --outDir ../dist -> output to repo-root dist/ -> tar dist/* at repo root
- Node v22.23.4, NPM 10.9.9, NODE_OPTIONS --max-old-space-size=8192 (heap 8240 MB)
- Tag convention: annotated timestamp tag YYYYMMDDHHMM on parent and submodule; e.g. 202611041456

## Relations
- Parent of submodule zhi2-mobile-admin-h5-c-unlimited (branch dev_wuxi-sfb)
- Gitlink updated to submodule commit 620919a after 2026-11-04 fix

## Key Facts
- 2026-11-04 CI failed at tar step (dist/* not found); fixed by reverting submodule --outDir to ../dist
- Tag 202611041456 pushed on parent (d2a039b) and submodule (620919a)

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited",
  "category": "git_project",
  "name": "zhi2_shimin_h5",
  "source_extraction_id": "56449f4768b3493f8d03e1689ad0a8ae",
  "version": 1,
  "memory_type": "entities"
}
-->