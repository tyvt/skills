# Summary
The GitLab CI job for tag 202608171350 (commit a790f5a7 on dev_wuxi-sfb branch, the 无锡苏服办 release line) failed with exit status 1 on 2026-11-04. The build compiled successfully (Build complete in 43s), but the packaging step `tar czf ...-202608171350.tar.gz dist/*` failed with "tar: dist/*: Cannot stat: No such file or directory" because `uni build --outDir ../dist` wrote output to the parent directory of the repo root, leaving no dist/ in the repo root for tar to find.
# 2026-11-04 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-huaian-all-wuguan-fe-zhi2-mobile-admin-h5-c-unlimited]**: ...[log]
[log] 欢迎将web站点部署到uniCloud前端网页托管平台，高速、免费、安全、省心，详见：https://uniapp.dcloud.io/uniCloud/hosting
[log] DONE  Build complete.
Build success in 43 seconds.
---202608171350.tar.gz---
tar: dist/*: Cannot stat: No such file or directory
tar: Exiting with failure status due to previous errors
section_end:1793758097:step_script
[0K[31;1mERROR: Job failed: exit status 1
[0;m

<!-- MEMORY_FIELDS
{
  "event_name": "ci_packaging_failed",
  "goal": "Record CI build failure cause",
  "summary": "The GitLab CI job for tag 202608171350 (commit a790f5a7 on dev_wuxi-sfb branch, the 无锡苏服办 release line) failed with exit status 1 on 2026-11-04. The build compiled successfully (Build complete in 43s), but the packaging step `tar czf ...-202608171350.tar.gz dist/*` failed with \"tar: dist/*: Cannot stat: No such file or directory\" because `uni build --outDir ../dist` wrote output to the parent directory of the repo root, leaving no dist/ in the repo root for tar to find.",
  "ranges": "37-39",
  "source_extraction_id": "8b6159ec325948c5b1b2438fddb2b790",
  "version": 1,
  "memory_type": "events"
}
-->