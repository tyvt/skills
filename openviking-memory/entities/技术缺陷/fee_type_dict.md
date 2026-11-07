# 服务方案收费类型字典误用charge_type无选项
`ServiceSchemePanel.vue` 与 `AgencyBranchDetail.vue` 使用错误字典键 `charge_type`，系统实际为 `FEE_TYPE`，致新增/详情收费类型下拉无选项。
## 问题根因
- 系统收费类型字典键实际为 `FEE_TYPE`，但 `ServiceSchemePanel.vue`、`AgencyBranchDetail.vue` 误用 `charge_type`
- 致新增与详情页收费类型下拉无选项
## 解决方案
- 将上述两文件及 `agency-branch-flow.spec.js` 的 Mock 字典键同步改为 `FEE_TYPE`
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/318.md
- 涉及文件：institution/agencyBranch/components/ServiceSchemePanel.vue、institutionRegister/components/Step4ServiceScheme.vue、institution/agencyBranch/components/AgencyBranchDetail.vue、e2e/institution/agency-branch-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：35fd1584-6f54-4128-979b-a920dbba023c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "fee_type_dict",
  "source_extraction_id": "969c384fc80b418cbab762ab5162a5c9",
  "version": 1,
  "memory_type": "entities"
}
-->