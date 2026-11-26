# 禅道任务 2415：承办银行开户网点弹窗无数据
苏住房G 后台承办银行网点列表的「开户网点」选择弹窗查不到数据的缺陷；根因与修复方案已定位，尚未改代码。

## 任务与线索
- 禅道任务 2415：承办银行（workBank）网点列表「新增网点」弹窗中，「银行网点名称」打开的「开户网点」SelectDialog 无数据，本应可选；任务 desc 为空。
- caoxinxing 最新评论「使用bankCode来查」并附截图（fileID 22448）。
- API：`src/api/jgyh/yhwdgl.js` 的 `listYhwdsDialog` → `/presale/bankBranch/selectToYhwd/getBankBranchListByWorkBank`，按 bankCode 查询。

## 根因
- 生效模块是 `system/workBank`（含 detail.vue）；`benefit/pubWorkBank` 是无 detail.vue 的孤儿重复模块，两处 `pubRegulatoryBranchDialog.vue` 有相同缺陷。
- `system/workBank/components/pubRegulatoryBranchDialog.vue` 的 `openBankBranchDialog`（约 353-379 行）以 `filterParams:{bankName,isStart:'1',isSupervisionBank:'1'}` 查 `/system/unionBank/page`（另带 bizState:2），`workBankId:this.unionBankCode` 被注释，bankName 过滤对后端无效。
- SelectDialog 的 `getList` 仅当 `tree.isTree` 为真才加 `params[treeKey]=treeSelection[treeKey]`（bankCode）；该弹窗无 tree、请求无 bankCode，故返回空。
- `system/workBank/detail.vue` 第 154 行只传 `:union-bank-code="form.bankNum"`（通讯编码）与 `:bank-name="form.bankName"`，未传银行编码 `form.bankCode`；行 383 用 `row.bankCode || row.unionBankCode` 赋 `form.bankBranchCode`。

## 修复方案
- 参照 `company/companyRegister/components/bankTable.vue` 的成功用法：`treeUrl:'/system/bank/list'`、`treeKey:'bankCode'`，以选中银行 bankCode 过滤列表。
- 计划把 workBank 的 `form.bankCode`（银行编码）传入弹窗作 `filterParams.bankCode` 并移除无效 bankName 过滤，使 `/system/unionBank/page` 收到 bankCode 后返回开户网点列表。
- 会话结束时未查 git 状态、未改代码、未构建验证、未提交推送、未禅道回写；接续会话需完成这些步骤。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "禅道任务",
  "name": "zentao_task_2415",
  "source_extraction_id": "1fb43a05f88f409b81e19c9b1c781fea",
  "version": 1,
  "memory_type": "entities"
}
-->