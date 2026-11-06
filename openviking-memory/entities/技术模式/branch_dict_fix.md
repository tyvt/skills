# 经纪机构分支列表备案状态字典不一致修复
修复苏州市房地产监测V3中经纪机构分支列表页与详情页业务状态字典不一致导致备案状态显示错误的问题。
## 问题根因
- 详情页 AgencyBranchDetail.vue 通过 branch_record_state 字典解析 bizState，显示正确
- 列表页 AgencyBranchList.vue 虽传 :options="bizStateOptions"（同 branch_record_state），但 zs-table-column 对 prop="bizState" 硬编码，始终使用全局 biz_state 字典，列级 options 被忽略
## 修复方案
- zs-table-column.vue 新增 bizStateColumnOptions，优先级：列传入 options → dict-url 加载的 options → 全局 biz_state
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：AgencyBranchDetail.vue、AgencyBranchList.vue、zs-table-column.vue
- 所属项目：苏州市房地产监测V3；来源会话：496c6098-23c5-4c0a-8ce1-a0e134ebfc15；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_dict_fix",
  "source_extraction_id": "212c18051ff547cab1b52f1f1e9fd4df",
  "version": 1,
  "memory_type": "entities"
}
-->