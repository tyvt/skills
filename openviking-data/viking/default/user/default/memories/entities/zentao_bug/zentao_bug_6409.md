# 禅道 Bug 6409
禅道缺陷 6409：首页公共收益「历史累计」跳转带了时间条件，导致列表条数与统计对不上。

## 现象描述
- 首页公共收益「历史累计」统计不传 `month`，但点击跳转仍套用当月备案时间 `startRecordTime` / `endRecordTime`
- 卡片显示 147 条，列表仅 1 条
- 管理主体、监管账户、已签托管协议专户均走此路径

## 初次修复方案
- `zhi2-web-admin/src/views/home/v2/homeStatNav.js`：`BENEFIT_STAT_NAV` 按 `mode` 组参数
- 仅 `month` 带当月备案区间；`history` / `chart` 不带时间；管理主体在非当月仍只保留 `accountState: '0'`
- `zhi2-web-admin/src/views/home/index-v2.vue`：`openBenefitStat` 传入 `this.benefitMode`，当月跳转行为不变

## 重开与新需求（2026-11-12）
- 2026-11-12 lichandan 重开（resolved→reactivated）；新增需求：跳转列表展示「待提交/审核中」，要求仅显「已备案」
- `biz_state` 字典：0=待提交、1=审核中、2=已备案（用 `biz_state` 非 `BIZ_STATE`）；跳转参数需传 `bizState: '2'`
- 截图 `22518.png`：开户申请（监管账户/account）列表 217 条，首屏均待提交/审核中，证实 history 模式缺 `bizState` 过滤
- 四列表页中 `pubRegulatoryAgreement`、`pubRegulatoryAccount` 含 `bizState`；`pubBankAccountBalance`（资金）无 `bizState`（本身即已备案余额）
- org 卡片保留 `accountState: '0'` 并补 `bizState: '2'`，与首页已备案口径一致

## 验证与状态
- 初次修复：`npx eslint` 退出 0；`npm test`（test 模式 Vite 构建）通过，`version.json` 构建时间 `2026/11/10 13:28:20`
- 初次修复已本地提交（commit `bd344fac3`，分支 `develop/v2.6.2-suzhufang`），未推送 (as of 2026-11-10)
- 提交信息：`fix(home): public benefit history jump drops month filter (#6409)`；禅道状态未回写
- 2026-11-12 新需求已实现：history 模式（org/account/protocol）补 `bizState: '2'`（org 保留 `accountState: '0'`），month 模式经 `monthRecordedParams` 已带 `bizState: '2'` 未改动；改动为简单对象字面量编辑，eslint 退出 0，build 验证未执行（本机 vite 构建易卡死/成本溢出，按本地规范默认不跑；orchestrate 跑 npm run build 曾被「调用被取消」未真正执行）
- 2026-11-12 提交并推送：子模块 `zhi2-web-admin` 提交 `ae6d06902`（`fix(home): 公共收益跳转列表仅展示已备案数据 (#6409)`），推送 `origin/develop/v2.6.2-suzhufang`（738a8fa42 → ae6d06902）；父仓 `苏住房G` 提交 `4340d9f`（`chore: bump zhi2-web-admin to ae6d06902 (#6409)`，仅更新子模块 gitlink）并推送（1cb2118 → 4340d9f），两端远程 SHA 一致
- 2026-11-12 禅道回写已提交：DBX 事务 UPDATE `zt_bug` 置 `status=resolved/resolution=fixed/resolvedBy=tiany/resolvedBuild=trunk/assignedTo=lichandan`，并 INSERT `zt_action`（resolved，含根因+修复+验证说明）；bug 元数据 `openedBy=lichandan`、`product=42`、`project=141`、`execution=142`；事务已 begin→update→insert→verify→commit→close，复核通过 (as of 2026-11-12)

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6409",
  "source_extraction_id": "e4f78157978d46c0badfc8242797431f",
  "version": 5,
  "memory_type": "entities"
}
-->