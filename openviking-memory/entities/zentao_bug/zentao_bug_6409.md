# 禅道Bug 6409 首页公共收益「历史累计」跳转条件错误
禅道缺陷 6409：首页公共收益「历史累计」跳转错误携带当月备案时间，列表条数与卡片统计不符。

## 现象与范围
- 「历史累计」统计不传 month，跳转仍套当月备案时间 startRecordTime / endRecordTime：卡片 147 条、列表 1 条
- 管理主体、监管账户、已签托管协议专户均走此路径

## 修复与需求变更
- 初次修复（homeStatNav.js）：BENEFIT_STAT_NAV 按 mode 组参，仅 month 带当月备案区间，history / chart 不带时间，管理主体非当月仅保留 accountState: '0'；index-v2.vue 的 openBenefitStat 传 this.benefitMode，当月行为不变；本地提交 bd344fac3（develop/v2.6.2-suzhufang，信息 fix(home): public benefit history jump drops month filter (#6409)），当时未推送、禅道未回写 (as of 2026-11-10)
- 2026-11-12 lichandan 重开（resolved→reactivated）并提新需求：跳转列表仅展示「已备案」，不展示「待提交/审核中」
- 字典 biz_state：0=待提交、1=审核中、2=已备案（字段名用 biz_state 非 BIZ_STATE），跳转需传 bizState: '2'；截图 22518.png 显示 account 列表 217 条首屏均为待提交/审核中，证实 history 模式缺过滤
- 列表页差异：pubRegulatoryAgreement、pubRegulatoryAccount 含 bizState，pubBankAccountBalance（资金）无 bizState（本身即已备案余额）；实现为 history 模式 org / account / protocol 补 bizState: '2'（org 保留 accountState: '0'，与首页已备案口径一致），month 模式经 monthRecordedParams 已带该参数未改动

## 验证与回写
- eslint 退出 0；npm test（test 模式 Vite 构建）通过，version.json 构建时间 2026/11/10 13:28:20
- 改动仅为对象字面量编辑；build 未执行（本机 vite 易卡死、按本地规范不跑；orchestrate 跑 npm run build 曾被「调用被取消」）
- 2026-11-12 推送：子模块 zhi2-web-admin ae6d06902（fix(home): 公共收益跳转列表仅展示已备案数据 (#6409)）推 origin/develop/v2.6.2-suzhufang（738a8fa42 → ae6d06902）；父仓 苏住房G 4340d9f（chore: bump zhi2-web-admin to ae6d06902 (#6409)，仅更新 gitlink）推送 1cb2118 → 4340d9f，远程 SHA 一致
- 2026-11-12 禅道回写：DBX 事务 UPDATE zt_bug（status=resolved、resolution=fixed、resolvedBy=tiany、resolvedBuild=trunk、assignedTo=lichandan）+ INSERT zt_action（resolved，含根因/修复/验证说明）；元数据 openedBy=lichandan、product=42、project=141、execution=142；begin→update→insert→verify→commit→close 复核通过 (as of 2026-11-12)

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6409",
  "source_extraction_id": "708648c9c67942d89a6e4b56c43dfb28",
  "version": 6,
  "memory_type": "entities"
}
-->