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

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_mobile_query_h5_c",
  "source_extraction_id": "388c86f854f543cdbae831d305864857",
  "version": 1,
  "memory_type": "entities"
}
-->