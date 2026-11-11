# 禅道 Bug 6409
禅道缺陷 6409：首页公共收益「历史累计」跳转带了时间条件，导致列表条数与统计对不上。

## 现象描述
- 首页公共收益「历史累计」统计不传 `month`，但点击跳转仍套用当月备案时间 `startRecordTime` / `endRecordTime`
- 卡片显示 147 条，列表仅 1 条
- 管理主体、监管账户、已签托管协议专户均走此路径

## 修复方案
- `zhi2-web-admin/src/views/home/v2/homeStatNav.js`：`BENEFIT_STAT_NAV` 按 `mode` 组参数
- 仅 `month` 带当月备案区间；`history` / `chart` 不带时间；管理主体在非当月仍只保留 `accountState: '0'`
- `zhi2-web-admin/src/views/home/index-v2.vue`：`openBenefitStat` 传入 `this.benefitMode`，当月跳转行为不变

## 验证与状态
- 两文件 `npx eslint` 通过（退出码 0）；`npm test`（test 模式 Vite 构建）通过，`version.json` 构建时间 `2026/11/10 13:28:20`
- 已在子模块本地提交（commit `bd344fac3`，分支 `develop/v2.6.2-suzhufang`），未推送 (as of 2026-11-10)
- 禅道状态未回写；提交信息 `fix(home): public benefit history jump drops month filter (#6409)`

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6409",
  "source_extraction_id": "ddc1d9d46a1a4b3c8142ff6164016ac7",
  "version": 1,
  "memory_type": "entities"
}
-->