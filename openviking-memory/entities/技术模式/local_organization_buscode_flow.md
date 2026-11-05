# 本地机构动态 busCode 传播链（苏住房G）
苏住房G 项目前端本地机构动态 busCode 的处理逻辑与审查结论。

## 传播链
- flowBusCode → OperationBtnGroup → zs-approval 组件链
- 详情加载后随 form.isLocalOrganization 更新
- 涉及文件：utils/localOrganizationFlow.js、mixins/localOrganizationFlowMixin.js、mixins/approval.js、components/OperationBtnGroup/index.vue

## 已知问题
- isLocalOrganization 为空时一律走本地码，与非本地菜单进入的 meta.busCode 可能不一致
- getDetail 完成前仍可能用错误码拉附件/流程
- 前端详情侧未见字段明确契约，需确认接口返回 '0'/'1'
- 审查 Verdict: BLOCK（3项 HIGH + 若干 MEDIUM），ESLint 无报错

## 修复待定
- 需先定产品规则：空值默认本地 还是 空值跟路由 meta
- 定好后改 resolveFlowBusCode 并加详情 loading 守卫

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "local_organization_buscode_flow",
  "source_extraction_id": "85aebb1930c949e9b8df248d137025f2",
  "version": 1,
  "memory_type": "entities"
}
-->