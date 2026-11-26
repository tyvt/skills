---
audit_status: valid
last_checked: 2026-11-26T22:20:21+08:00
verdict_note: 惠山二期G 实机含 housePosition.js、housePositionFormatter 与隆舜园，bug 6677 修复属实。
---
# 禅道 bug 6677 房屋坐落缺分隔符
惠山二期G 物管端（zhi2-web-admin，分支 develop/v2.6.2-huishan）房屋坐落列缺少「-」分隔符的前端缺陷，2026-11-25 已修复、实机验证、推送并回写禅道。

## 缺陷与根因
- 禅道 bug 6677 由 zhoudongdong 提出：后端拼接串直出 `隆舜园21单元101`，前端 `prop:'position'` 直接展示，未加分隔符。
- 目标格式为楼幢号-单元-室号并加 `-`，如 `隆舜园2-1单元-101`，共 5 处拼接需统一。

## 修复方案
- 新增 alias-free 纯逻辑模块 `src/formatters/housePosition.js`，按行字段重建 `项目名+幢-单元-室号`，保留 position 兜底。
- `src/formatters/index.js`（第 3 行 import、约 209 行 export）默认导出挂 `housePositionFormatter`。
- 空值用显式 `null/undefined/''` 判断，禁用 `filter(Boolean)`（会丢弃数字 0）；交接文档 §4/§8 纠正了计划文档的写法。
- 5 处接入：`complex/rangeTable.vue:141`、`complex/houseTable.vue:105`、`complex/rangeTableInfo.vue:139`（原为内联无分隔 formatter）、`complexChange/houseTable.vue:107`、`complexChange/rangeTable.vue:129`。

## 验证与交付
- unit 5/5 通过（齐全/缺单元/缺室号/幢号 0/全空回退）；基线、改后、提交后三次 `npm run build` 均 exit 0。
- lint：新增 js 与 5 个 vue 文件全干净，`index.js` 78–111 行 34 个 `quote-props` 报错为既存基线。
- dev 8120 实机：物业管理→物业管理区域信息→隆舜园→楼幢「2」→房屋清单弹窗，10 行房屋坐落均带 `-`，首行 `隆舜园2-1单元-101`；截图经用户确认后才提交。
- 提交子模块 `14bd01627`、父仓 `9a19a9f` 并推送；提交后重建使 `version.json.gitHash=14bd01627` 对齐 HEAD，husky pre-commit 的 eslint --fix 未改逻辑。
- 禅道回写：zt_bug 6677 status=resolved、resolution=fixed、assignedTo=zhoudongdong（openedBy），action 内含验证图 fileID 24287 并挂到 bug；临时产物与后台任务已清理。

## 踩坑
- watchdog 脚本没有 `-WorkDir` 参数（默认靠 `Get-Location`），需先 `Set-Location` 并把日志写到 `$env:TEMP`。
- agent-browser 的 `@eN` ref 在 pwsh 中需加引号，否则被 splatting 破坏。

<!-- MEMORY_FIELDS
{
  "category": "任务",
  "name": "zentao_bug_6677",
  "source_extraction_id": "c758406bee4747c59d546716f80e72ea",
  "version": 1,
  "memory_type": "entities"
}
-->