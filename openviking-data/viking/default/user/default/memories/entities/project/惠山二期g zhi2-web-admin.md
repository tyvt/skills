# Huishan Phase 2G zhi2-web-admin
Wuxi Huishan Phase 2G (Product 2.0) is a real-estate service platform property-management admin frontend whose defects are tracked and written back in Zentao.

## Repository and Environment
- GitLab project `gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited`; local path `D:\repository\惠山二期G\zhi2-web-admin`; branch `develop/v2.6.2-huishan`.
- Local nginx site `惠山二期G.conf` originally listened on `http://localhost:8119`, changed on 2026-11-24 to 8120 (reload returned HTTP 200, backend points to the company dev gateway), with `dist` deployed; the login page has a graphic arithmetic captcha (examples: `4*5=20` on 2026-11-24, `9/9=1` on 2026-11-25), and the logged-in home shows "Huishan District" and "Todo Items".
- Port ownership: 8120 serves Huishan Phase 2G (`D:/repository/惠山二期G/dist`); 8167 belongs to Suzhufang G (suzhufang-g / test), not Huishan Phase 2G.
- Production site `http://www.hsqhoafunds.cn:5777/` is reachable over HTTP 200; HTTPS on 5777 fails with an SSL protocol error, so only HTTP works; login uses admin plus a graphic captcha, and OCR reading "0" is unreliable, so inspect the image directly.
- The deploy panel uses port 18098; before 2026-11-24 the project environment was unregistered and generic registry admin credentials were used; that day prod (port 5777, port_base 5773) and local (8119) were registered, then migrated to the sole dev slot 8120 with account privacy reference `{{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}}`; credential privacy reference `deploy_env-huishan-g-dev` was injected into panel memory (reveal succeeded), but the panel still showed `listen_ports:[8119]` and health=down due to stale port cache. `gen_nginx_sites.ps1` overwrites all projects and was not used for this site; the sync-script null-index bug is recorded under "Deploy Panel". Plan and handoff documents are in `D:\plan\惠山二期G`, with a `.plan/` directory (e.g., `task2393.md`).

## Routes and Code
- Menu routes are dynamically generated: only 18 static routes and no parking; dynamic routes are in Vuex `state.permission.originalRoutes`; clicking "More Functions" has no popup and collapsing the sidebar cannot reveal business menus.
- The parking-space list page component is `benefit/parkingSpace/index`, with real path `/ShFund/xqgll/business/parking/parkingSpace`; `router.push` is bounced by the route guard to `#/index`, while `open` with the real hash path works; the earlier failed path `#/benefit/parkingSpace` was wrong.
- The fund-allotment list path is `/benefit/pubAllotNotice`, detail path `/{id}?formMode=view`; direct detail navigation is bounced by the guard to `#/index`; dev `getRouters` returns 500, so dist static routes are the fallback; dev has cancellable documents with state=0008/9999 (e.g., `2077233286180032514`), the list API needs a token, and the dev-slot account works.
- Narrow grep to the submodule directory because repository-root grep is blocked; run eslint from the zhi2-web-admin cwd with the parent local eslint (parent cwd gives 16 alias false positives), while commit lint-staged still reports existing `@/` alias-resolution errors; when Huishan and Suzhufang baselines differ only slightly use `git merge-file`, and whole-file conflicts are often CRLF/LF differences that can be merged after normalizing line endings.

## Build and Work Items
- Confirm the build baseline before every change; `npm run build` exceeds the orchestrator's 180-second limit, so run it as a background process and poll logs (2026-11-24 baseline exit 0; post-change verify-build exit 0).
- After defect fixes, write back to Zentao; other handled items include bug 6939 (parking toolbar hidden "Approval" button), task 2768 (maintenance vote URL), and bug 6972 (collection account opening-bank required validation, fixed, verified, and committed on 2026-11-25).
- Detailed work for bug 6950 is in the separate `bug_6950_cancel_request_method` entity; detailed work for bug 6677 is in `bug_6677_position`; detailed work for task 2908 is in `zentao_2908_account_unfreeze`.


<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "惠山二期G zhi2-web-admin",
  "source_extraction_id": "e3712e5dae714c35b6d3f4d5e0113e49",
  "version": 12,
  "memory_type": "entities"
}
-->