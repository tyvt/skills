# zhi2-mobile-admin-h5-c-unlimited

Frontend admin H5 repository under gitlab.zhi.com/zhi/huaian/all/wuguan/fe/ for the wuguan system.

## Description
- Uni-app (uni-preset-vue) project built with `uni build`.
- CI runner uses external shared script nodejs-build.sh for install and packaging.

## Role
- Hosts multiple release lines including dev (main) and dev_wuxi-sfb (无锡苏服办).
- Packaging step runs `tar czf <ref>.tar.gz dist/*` from the repo root.

## Significance
- A CI build failure on 2026-11-04 (tag 202608171350) was caused by output written to `../dist` instead of `./dist`.
- Main dev branch builds to `./dist`; older release lines may still use `../dist`.
- Tag convention is `YYYYMMDDHHMM` build timestamp; e.g., tag 202611041057 created 2026-11-04 on commit 9982a72.

<!-- MEMORY_FIELDS
{
  "category": "code_repo",
  "name": "zhi2-mobile-admin-h5-c-unlimited",
  "source_extraction_id": "fc7219c29ef244b38f0b64150f40a98e",
  "peer_id": "gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-mobile-admin-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->