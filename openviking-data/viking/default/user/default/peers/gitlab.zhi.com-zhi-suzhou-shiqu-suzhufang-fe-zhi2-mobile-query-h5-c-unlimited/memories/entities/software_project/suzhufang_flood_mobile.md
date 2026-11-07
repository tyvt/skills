# suzhufang-flood-mobile
A front-end H5 mobile query project for Suzhou flood prevention (苏住房防汛C端), built with uni-app.
## Description
- Package name: suzhufang-flood-mobile@0.1.0
- Repo path: zhi/suzhou/shiqu/suzhufang/fe/zhi2-mobile-query-h5-c-unlimited
- Uses uni-app (`uni build`), Vitest for unit tests, Node v22.23.4 / NPM 10.9.9
## Key Facts
- Default CI branch: dev (commit 828c2619 as detached HEAD)
- Build profile: dev, executed via /home/gitlab-runner/scripts/nodejs-build.sh
- Test files: tests/request.test.ts, tests/photos.test.ts, tests/counter.test.ts, tests/flood.test.ts (20 cases)
## Relations
- Contains src/utils/request.ts which derives API base from VITE_API_BASE_URL at runtime via isConfigured()/getApiBase()
- CI runs on gitlab-runner 16.9.0 (zhi-runner-pre)

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "software_project",
  "name": "suzhufang_flood_mobile",
  "source_extraction_id": "ffea204e58364146a47d1f2d9e6ed4f0",
  "version": 1,
  "memory_type": "entities"
}
-->