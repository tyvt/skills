# zhi2-mobile-query-h5-c
Suzhou Housing flood-control C-end mobile query H5 project (GitLab suzhufang-fe/zhi2-mobile-query-h5-c), a uni-app Vue3 H5 frontend.

## Pages & Layout
- home/index.vue has a global `.scroll-tabs` tab row container and a `BottomNav` component
- mine/index.vue layout uses `.user-card` (blue gradient), `.menu-card` (white), `.mine-body` (padding)
- mine page `.menu-card` and `.menu-row` are flex containers so skeleton rows lay out correctly

## Loading Pattern
- Uses a `loading` state gating content with `v-if="!loading"` and showing skeleton blocks while loading
- Skeleton screens added to home and mine pages, inserted before `BottomNav` (2026-11-09)

## Build & Environment
- uni-app Vue3 project; uni builds can take a while and are run in the background
- Worktree has no `node_modules`; a junction is created from the worktree's `node_modules` to the main repo's to avoid copying
- Build from worktree succeeds (exit 0), clean with no errors/warnings, `dist` produced (2026-11-09)
- Standalone session has no `node_modules` installed (uni-app deps are a heavy install), so full build/typecheck is infeasible; verification marked 未执行 and relies on code review (2026-11-11)

## Testing
- Vitest config includes `tests/**/*.test.ts` from the project root, so new tests placed at root `tests/` are picked up by `npm run test`
- `npm run test` runs vitest from `tools/testing` and also `uni build -m test`; the orchestrate tool pool has no shell-exec, so builds/tests run directly in-session
- Remote-mode tests mock `request` (from `../utils/request`) to lock the `bizState`→`status` mapping and list/detail filter separation without real APIs

## Home Page SEC Structure (2026-11-11)
- home/index.vue contains SEC0–SEC5 sections: SEC0 = dynamic region chips built from region list API (replaced static truncated list that cut off 高新区; labeled "全市数据"), SEC1 = key data with clear label→value pairs
- SEC2–SEC5 are `Record<'history'|'current'|'chart', string>` tab objects, each tab is its own HTML block
- home/index.vue (2026-11-11): dynamic region chips via `buildInnerHtml` + chip builder + escape helper; `activeChip` default state; `bindStats()` wired into `renderAll`; `loadData()` fetches region list + G-end stats and is invoked in `onMounted`; no `REF_SEC0` static reference remains
- 数智页 data binding targets only unambiguous unique headline labels (region/area/enterprise counts, benefit/repair/sunshine counts); detailed sub-grids and 物业评价 stay as design (API mapping undefined / backend missing)

## Request & Region API (2026-11-11)
- request util: `raw:true` returns envelope `{code,msg,data}` (callers unwrap `.data`); default (non-raw) returns unwrapped `data`
- Region list `GET /v2.0/system/region/list` (parentCode=320500) returns `JsonResult<List<SysRegionVo>>` → array of `{regionName, regionCode, level, parentCode}`
- `/list` needs no login (only `listByPermission` requires auth) — suitable for the handheld public page
- portal.ts `detail()` unwraps `{code,msg,data}` envelope; new typed G-end stat API functions `getKeyData`/`getBenefitData`/`getRepairData`/`getSunshineOverview`/`getRegionList` appended to portal.ts follow this same unwrap pattern (2026-11-11)

## Todo Count Source (2026-11-11)
- 首页与我的页待办计数原取自 `getTaskCount().todoNum`（演示值12），与任务列表 `getTodoTaskList().total`（3）不符；bug 6457 修复后统一改为取自列表 total（2026-11-11）
- 我的页原展示字面「待处理」文案徽标，bug 6457 修复后改为展示数字计数（2026-11-11）
- 修复中移除了不再使用的 `getTaskCount` API 包装，提交 `72bc8cf` 并回写禅道 6457 为已解决（2026-11-11）

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_mobile_query_h5_c",
  "source_extraction_id": "647f5b5204984ae0b1ca224b1caf7b15",
  "version": 6,
  "memory_type": "entities"
}
-->