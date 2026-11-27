---
audit_status: valid
last_checked: 2026-11-27T21:12:59+08:00
verdict_note: V3 仓 RegulatoryAccountDialog.vue-5 确有 <zs-dialog custom-class="zs-select-dialog-compact">，全文件 1 行 diff 描述精确命中，修复属实。
---
# 业务对账选择归集账号弹窗分页遮挡修复
苏州市房地产监测V3 修复业务对账「选择归集账号」弹窗分页条和取消按钮遮挡表格行的问题。

## 问题根因
- 禅道 bug 7084 对应预售资金监管银行 → 账务管理 → 业务对账页面，截图 fileID 24883。
- 「选择归集账号」弹窗中“共20条记录 / 10条/页 / 1 2 / 前往”分页控件与「取消」按钮压在表格行上。
- RegulatoryAccountDialog.vue 手写的 zs-dialog 未传 custom-class="zs-select-dialog-compact"，内层 .el-dialog 类仅为 el-dialog。
- 弹窗 body 因缺少 compact 类保持 overflow:visible 与固定 371px 高度，表格约 330px 溢出 198px 包裹区，导致分页和页脚脱离正常布局。
- 提交 53de6cc49 将弹窗从 form-layout="single" 改为 select-dialog 时漏传该 compact 类。

## 修复方案
- 在 zhi2-web-admin/src/views/components/RegulatoryAccountDialog.vue:5 的 <zs-dialog> 增加 custom-class="zs-select-dialog-compact"，全文件仅 1 行 diff。
- 与标准 zs-select-dialog.vue 保持一致；浏览器注入该类可消除遮挡，分页回到可滚动 body 内。

## 验证与结果
- 2026-11-27 在客测环境复现，并通过构建版本复核：内层 .el-dialog 带 zs-select-dialog-compact，body overflow-y:auto，footer 位于 body 底部 446，分页可滚动到达。
- eslint 0 error；3 个 warning 为 el-form 第13/14/17行既有问题，未触碰。
- 基线构建和修复后构建均 exit 0。
- 计划通过审查（80/100）并获确认后实施。

## 待办与交接
- 待展示验证图并取得用户确认（前端验证门）；确认后提交推送并回写禅道 7084（comment 附图）。
- 交接文档：D:/plan/苏州市房地产监测V3/HANDOFF-CHAIN-bug7084-select-regulatory-account-ui-hop1-20261127-1707.md。
- 下一跳排程 2026-11-27 17:07:30；待清理过程产物与后台 job。

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "regulatory_dialog_compact",
  "source_extraction_id": "d64bd431525f4dd893b9a7e5d3ecba47",
  "version": 1,
  "memory_type": "entities"
}
-->