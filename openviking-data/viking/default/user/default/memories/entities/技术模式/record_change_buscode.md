# 企业备案变更busCode按本地非本地维度收敛
苏住房G项目企业备案变更接口需按「机构类型×是否本地机构」确定busCode，通过localOrganizationFlow的resolver与mixin开关收敛。

## 问题背景
- 企业备案变更接口 companyRecordChange/addAndSubmit 需携带 busCode，由「机构类型 × 是否本地机构」共同决定
- 本地机构编码 qybgxq，非本地编码 QYBGJLXQFBD，散落 if(isLocal) 三元易致「保存能过但提交报流程未维护完成」
- 同一套 toB 详情组件服务多机构/场景，页面难各自判断

## 解决方案
- utils/localOrganizationFlow.js 新增常量 COMPANY_RECORD_CHANGE_LOCAL_BUS_CODE='qybgxq' 与 resolveCompanyRecordChangeFlowBusCode
- resolver 优先级：路由 meta.busCode 优先 → 兜底本地编码 → 按 isLocalOrganization 映射到非本地编码
- localOrganizationFlowMixin 新增默认 false 的 prop useCompanyRecordChangeFallback，开启时 flowBusCode 走 resolver
- 消费页 operation-btn-group 绑 :bus-code，getForm() 的 isChange 分支把 busCode 写进请求体
- toB/change/detail.vue 显式打开该 prop，其他页面行为完全不变

## 验证与归属
- 验收：无 meta+本地 → qybgxq；非本地 → QYBGJLXQFBD；有 meta 以路由为准，Network 核对请求体
- 前提：isLocalOrganization 已由 getOwnCompany 等接口回填到 form，否则恒落本地分支
- 涉及文件：src/utils/localOrganizationFlow.js、src/mixins/localOrganizationFlowMixin.js、src/views/toB/companyRecord/detail.vue、src/views/toB/change/detail.vue
- 所属项目：苏住房G；来源会话：a7f41aac-d27d-4bbc-95f2-163087036786；代码基线：15e201a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_change_buscode",
  "source_extraction_id": "dab230741e8b4b79a6560976b4006de8",
  "version": 1,
  "memory_type": "entities"
}
-->