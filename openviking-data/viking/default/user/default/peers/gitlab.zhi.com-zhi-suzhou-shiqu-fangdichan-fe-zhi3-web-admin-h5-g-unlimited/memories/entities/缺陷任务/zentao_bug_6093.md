# 禅道Bug 6093 价格备案申请筛选业务状态下拉为空
房产管理系统价格备案申请列表页（苏州）「业务状态」筛选下拉无数据，列表列「已备案」却能正常显示。

## 根因
- 筛选项在 `recordPriceMngSuzhou/index.vue` 的 `initDict` 调用 `getDicts('BIZ_STATE')`，字典接口按类型精确匹配，客测环境类型是小写 `biz_state`（待提交/审核中/已备案/作废/已撤销），故下拉拿到空数组显示「无数据」
- 列表列「已备案」能显示，是因为表格列未传 `dictUrl` 时，会把字段名 `bizState` 转成 `biz_state` 再拉字典，筛选与列表并非同一次请求

## 修复方案
- `recordPriceMngSuzhou/index.vue` 中 `getDicts('BIZ_STATE')` 改为 `getDicts('biz_state')`
- 业务状态列补上 `dictUrl: 'biz_state'`，与筛选共用同一份选项
- 只改这一页，未动公共组件，也未批量改其他仍写 `BIZ_STATE` 的页面

## 验证与交付
- 该页 `npx eslint` 退出码 0
- `npm run build` 通过（2026-11-03 15:00:27，gitHash `8f27b58b9` 为构建时 HEAD，6093 改动未提交）
- 产物 `dist/assets/recordPriceMngSuzhou-Cfu4WRLx.js` 含 `dictUrl:"biz_state"`、不含 `BIZ_STATE`
- nginx 8098 已 reload，该文件返回 200，内容与产物一致
- 台账记在 `docs/frontend/common-errors.md` 的 E-029
- 禅道 bug 仍为 active、指派 tiany，本次未回写；代码未提交

## 未验证项
- 未用客测账号点开下拉目视确认（本环境无客测登录态）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6093",
  "source_extraction_id": "16c965ff80f34791a3ac678de02939c9",
  "version": 1,
  "memory_type": "entities"
}
-->