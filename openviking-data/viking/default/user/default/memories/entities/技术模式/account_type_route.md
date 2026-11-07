# 自治组织类型用 accountType 直映射详情路由
自治域组织类型以 accountType 为准（4-1 监委会、4-2 业委会、4-3 物管会），列表/详情跳转不再用 businessType 二次推断。

## 路由映射维护
- 在 autonomy/record/components/enums.js 维护 ACCOUNT_TYPE_PATH：4-1→autonomy/record/supervisory/detail，4-2→industry/detail，4-3→property/detail
- ownerCommitteeWorker/detail 的 goToOrganizationDetail 读 form.accountType 查表跳转

## 列表过滤
- 列表侧同步用 accountType 过滤掉非监委会/业委会/物管会条目

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/record/components/enums.js、autonomy/ownerCommitteeWorker/detail.vue、autonomy/ownerCommitteeWorker/index.vue
- 所属项目：园区公共收益；来源会话：76841df4-d581-4fbe-b73a-bfa8117127d5；代码基线：635e747

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_type_route",
  "source_extraction_id": "7f591e2941124ffe888ff01baea64df3",
  "version": 1,
  "memory_type": "entities"
}
-->