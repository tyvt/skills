# 预售转现售审核按钮缺失缺陷
房产管理系统 zhi2-web-admin 中预售转现售申请（业务编码 `yszxs`）详情页审核中状态缺少审核按钮，连超管都无，根因是流程绑定通用模板而前端按 key 匹配落空，已改为柔性匹配并推送。

## 根因与定位
- 页面：预售转现售申请详情页 `presale/cashsale/components/CashsaleDetail.vue`
- 业务编码 `yszxs` 在 `SYS_FLOW_CONFIG` 绑定通用审批模板 `process_68xcwhhq:29`，节点 key 为 `Activity_0zrk1re`（提交）/`Activity_1ksnm9e`（审批）
- 直报现售 `xsbasq` 用 `PRESALE_PERMIT` 流程（节点 key `taskAccept`/`taskFinalAudit`），不受影响
- 前端 `visibleAdminNodes` 按 `flowKeyNode` 查 `TRANSFER_AUDIT_NODES`（仅含 `taskFinalAudit`），通用流程的 `Activity_1ksnm9e` 查不到返回空数组 → 审核按钮全无，权限码未走到，超管也无

## 修复方案
- 转现售单审批节点不再按节点 key 匹配：流程查看器有未办结节点且后端 `isApprovalAuth` 通过即出「终审审批」按钮
- 按钮固定取 `TRANSFER_AUDIT_NODES.taskFinalAudit` 的文案/权限码 `presale:cashsale:approval`/接口 `approval`
- 撤掉临时加的 `Activity_1ksnm9e` 硬编码映射，只留注释说明（`cashsaleConstants.js`）
- 直报流程（多节点强绑 key）仍走原 `APPLY_AUDIT_NODES` 匹配，不受影响
- 错误台账 `docs/frontend/common-errors.md` 补充 E-050

## 验证与交付
- 子模块 zhi2-web-admin 提交 `8d2811555`（push 已核对 ls-remote），父仓 gitlink `87ee992`，错误台账 E-050 `cfc5ce8`，均推送 `origin/develop/v3.0.0`
- DM 库核对 `SYS_FLOW_CONFIG`/`ACT_RU_TASK`；eslint 0 新增；`npm run build` exit 0
- 远端并行提交 `9c66d761f` 已 rebase 合入后重新构建

## 未验证项
- 浏览器实测未做（需部署后用审核中转现售单确认按钮出现、审批接口带 `Activity_*` 节点 key 能正常通过）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "yszxs_audit_missing",
  "source_extraction_id": "ed73cc1e941747c896125f46bf11c9aa",
  "version": 1,
  "memory_type": "entities"
}
-->