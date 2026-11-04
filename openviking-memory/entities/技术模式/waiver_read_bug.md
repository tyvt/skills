# 弃权选项读取位置错误致表决项为空
太仓一网通办H5 的弃权选项 `waiver` 位于响应顶层而非 `data.data`，重构后读取位置错误导致 `optionList` 为空，已修复。

## 问题根因
- 接口返回的弃权选项 `waiver` 在响应顶层（`data.waiver`），不在 `data.data` 里
- 旧版代码用 `data.waiver`，重构后只读 `data.data.waiver`，取不到值
- 结果：`optionList` 一直为 `[]`，后端返回「请选择表决结果」

## 修复内容
- `vote.js`：`fetchSelectView` 改为 `detail.waiver || data.waiver`，并写入 `voteWaiver`
- `OptionStepChoose.vue`：弃权提交改用 `voteWaiver`；若仍为空则提示错误，不再发空请求
- `election.ts`：同步修正弃权选项读取，避免选举模块同类问题

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：src/views/owner-decision/components/OptionStepChoose.vue、src/views/owner-decision/ParticipateIn.vue、src/views/owner-decision/components/GeneralStepChoose.vue、src/store/vote.js、src/store/election.ts
- 所属项目：太仓一网通办H5；来源会话：a8c326c2-9bf5-46ac-a057-08be20ab8806；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "waiver_read_bug",
  "source_extraction_id": "422ff77c57eb4bd69b30a82abb41573c",
  "version": 1,
  "memory_type": "entities"
}
-->