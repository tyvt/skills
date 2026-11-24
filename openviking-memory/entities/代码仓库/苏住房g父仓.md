# 苏住房G父仓
苏住房前端项目的父级 Git 仓库，通过 submodule gitlink 引用子模块 `zhi2-web-admin`（苏住房前端）。

## Relations
- 是 `zhi2-web-admin` 子模块的父仓库，子模块提交需由其提升 gitlink 后提交推送
- 分支 `develop/v2.6.2-suzhufang` 上以仅更新 gitlink 的方式提交子模块版本提升
- 2026-11-15 快照显示父仓与子模块的主线检出都在 `develop/v2.6.2-suzhufang`；项目此前的主线提交也沿用该分支名
- 任务代码不落在主线，而在独立的 task 分支上开发，需逐个核对 task 分支与远端的 ahead/behind

## 相关提交
- 2026-11-12 提交 `4340d9f`（`chore: bump zhi2-web-admin to ae6d06902 (#6409)`），仅更新子模块 gitlink，推送 `origin/develop/v2.6.2-suzhufang`（1cb2118 → 4340d9f）
- 2026-11-13 子模块推送 `50d3a8961`（关键数据导航底部撑满）后，父仓提交 `9260130`（`chore: 更新 zhi2-web-admin 指针（关键数据导航底部撑满）`），推送前落后上游 3 提交，经 stash gitlink → `git pull --rebase` → 恢复提交，远端 SHA 一致
- 2026-11-13 子模块推送 `274e3272e`（Bug6576 修复）后，父仓提交 `aa2ad3d`（`chore: bump zhi2-web-admin 指针 + 新增 E2E 用例`），仅更新 gitlink 并含 e2e 用例，已推送 `origin/develop/v2.6.2-suzhufang`
- 2026-11-13 子模块推送 `bef0c34eb`（首页企业总数卡跳转带 parentDeptId 区域过滤修复，bug#5819 同源）后，父仓提交 `fbf3e12`（仅更新 gitlink），gitlink 冲突已解（远程 66e1ed397 为本地提交祖先，未回退他人代码），已推送 `origin/develop/v2.6.2-suzhufang`
- 2026-11-15 子模块提交 `9ba4ccc0d`（Navbar 顶部导航重样式）后，父仓提交 `ba24695`（`feat(navbar): update submodule and add visual E2E`，含新增视觉 E2E 用例），已推送 `origin/develop/v2.6.2-suzhufang`，远端 SHA 核对一致、本机主线已快进，未部署
- 2026-11-24 禅道 6899 链路收口：子模块提交 `ce9b34955`（仅 `src/views/flood/screen/index.vue` 与 `docs/flood/common-errors.md`）→ 父仓提交 `2adb355`（gitlink 指向 `ce9b34955`），均已推送 `origin/develop/v2.6.2-suzhufang` 且远端 SHA 一致；未纳入 `ScreenHeader.vue`、`particles.js`、`HeatMapPanel.vue`、`_review.json`、`env/.env`；已清理 `Temp\zentao-6899`、`D:\禅道附件\bug\6899`、nginx 备份 `苏住房G.bak-6899` 与 `.task-state`，无残留后台任务，本跳未重跑 eslint／npm test（沿用 hop4 exit 0 基线）

<!-- MEMORY_FIELDS
{
  "category": "代码仓库",
  "name": "苏住房G父仓",
  "source_extraction_id": "8287222ff0194d5ca1280044e2752a4c",
  "version": 7,
  "memory_type": "entities"
}
-->