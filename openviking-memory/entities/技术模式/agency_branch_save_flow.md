# 分支机构详情保存流程调整
苏州市房地产监测V3 项目按「主机构备案后后端自动备案」调整了 `AgencyBranchDetail.vue` 的保存流程，去掉提交/审批前端逻辑。

## 主要变更
- `AgencyBranchDetail.vue`：保存走 `handleSave`，仅校验后调保存接口；移除 `validateAppendix` 预检；提示改为「保存成功/保存失败」；`show-submit`、`show-approval` 保持关闭
- `agencyBranch.js`：接口注释「提交」改「保存」；删除未使用的 `listAgencyBranchAppendix`
- E2E 测试：去掉「缺要件被拦截」场景；Mock 保存后 `recordState` 仍为 `0`

## 当前流程
- 企业端新增/编辑分支机构 → 点击「保存」，前端不再触发备案或审批
- 主机构备案后，后端自动将分支机构置为已备案（`recordState=1`）
- 要件上传仍可操作，但不再作为保存前置拦截条件
- 后续 `src/api/company/agencyBranch.js` 已删除，相关组件改为直接使用 `this.$post` 调用接口（见偏好「前端接口调用方式」）

## 涉及文件
- `src/views/institution/agencyBranch/components/AgencyBranchDetail.vue`
- `src/views/institution/agencyBranch/agencyBranch.js`
- `src/mixins/detailMixins.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：40edb9e5-354a-4c2b-8557-eea7a3245770；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_save_flow",
  "source_extraction_id": "8859921961514c0b83e99829e8eff324",
  "version": 2,
  "memory_type": "entities"
}
-->