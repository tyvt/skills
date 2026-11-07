# 本地非本地二态流程的isLocalOrganization三值判定
苏住房G项目中同一业务需同时服务本地机构与非本地机构（如市住建）两套流程，isLocalOrganization 必须是「是/否/未返回」三态，不能把 undefined 塌缩成布尔。

## 问题背景
- 苏州V3 同一批公司/人员详情页同时服务本地机构与市住建等非本地机构，两类主体各有 busCode（本地码→*XQFBD 非本地码）
- isLocalOrganization 是「是/否/还没拿到」三态，undefined 与 false 合并处理（如 if(!isLocalOrganization) return localBusCode）会把未返回字段永久锁在本码
- 详情异步返回前用默认码发起提交/审批会打错流程，也不能把 undefined 当成「非本地」

## 解决方案
- mapper 三个分支显式分开：true→localBusCode；false→LOCAL_TO_NON_LOCAL_BUS_CODE[localBusCode]||localBusCode；undefined/null/''→优先保留 route.meta.busCode，否则回退 localBusCode
- 与后端约定详情 DTO 必返 isLocalOrganization（'0'|'1'），data()/detailCallback 显式保留，不能被 getForm 白名单/归一化过滤掉
- 详情 loading 结束前用 v-if="!loading" 禁用 OperationBtnGroup 内提交/审批，消除错误编码窗口
- busCode 变化后靠 :key 重建审批状态；mixin.flowBusCode→详情页:bus-code→OperationBtnGroup→ZsSubmit/zs-approval/流程查看

## 与已知差异及验证
- 区别于已知 #295/#404/#445/#857/#939（只讲要件与流程 busCode 同源、按 formMode/业务态 resolve），本条补主体维度二态分流+三值判定+异步窗口封锁
- 验证：会话 9c8f0d10 审查 HIGH「isLocalOrganization 为 undefined 时强制走本地码」「详情 form 侧未见契约」「加载前存在错误 busCode 操作窗口」
- 涉及文件：src/utils/localOrganizationFlow.js、mixins/localOrganizationFlowMixin.js、mixins/approval.js、components/OperationBtnGroup/index.vue、components/zs-approval/index.vue、ApprovalProcessDialog.vue、views/company/companyManagement/components/detail.vue、companyRegister/detail.vue、staffManagement/components/detail.vue
- 所属项目：苏住房G；来源会话：9c8f0d10-8555-4605-9555-1d8641db8e16；代码基线：3192070

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "localorg_three_state",
  "source_extraction_id": "379120973bb24c27ab7081046431e71c",
  "version": 1,
  "memory_type": "entities"
}
-->
