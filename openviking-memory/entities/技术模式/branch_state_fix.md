# branch_record_state字典编码不一致修复
苏州市房地产监测V3 中 `branch_record_state` 字典与接口 `bizState` 编码不一致导致显示错误，已修复并用 Playwright 验证。

## 根因
- 字典值 `2` 表示「已注销」，接口 `bizState=2` 表示「已备案」，直接查表致 `cancelStatus=0` 也显示「已注销」
- 列表接口无 `bizStatusName` 字段

## 修复
- `branchStatus.js` 映射：cancelStatus=1→字典码2（已注销）；bizState=0→字典码0（未备案）；其余→字典码1（已备案）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 新增 `e2e/institution/agency-branch-status.spec.js` 跑通：企业端/主管部门端未注销备案记录不显示已注销
- 涉及文件：branchStatus.js、AgencyPersonnelList.vue、personnelStatus.js
- 所属项目：苏州市房地产监测V3；来源会话：db358c02-d2dc-45a3-b641-20f260d73f4b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_state_fix",
  "source_extraction_id": "79b5aa53d4d3492ab1e8446e4879e7ca",
  "version": 1,
  "memory_type": "entities"
}
-->