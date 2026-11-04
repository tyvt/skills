# 由于字典错误导致收费类型无选项
服务方案中的收费类型字段没有选项，因为组件使用了字典键 `charge_type` 而不是 `FEE_TYPE`。

## 问题根因
- `ServiceSchemePanel.vue` 和 `AgencyBranchDetail.vue` 使用了错误的字典键 `charge_type`
- 当前系统使用 `FEE_TYPE`，导致收费类型下拉框没有选项

## 解决方案
- 将字典键改为 `FEE_TYPE`，涉及 `ServiceSchemePanel.vue`、`AgencyBranchDetail.vue` 以及 mock 文件 `agency-branch-flow.spec.js`
- 同步相应的 e2e 测试

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/118.md
- 涉及文件: `ServiceSchemePanel.vue`, `Step4ServiceScheme.vue`, `AgencyBranchDetail.vue`, `agency-branch-flow.spec.js`
- 所属项目: 苏州市房地产监测V3
- 源会话: 35fd1584-6f54-4128-979b-a920dbba023c
- 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "service_scheme_fee_type",
  "source_extraction_id": "d785eb449c3747999b3990855d973c1c",
  "version": 1,
  "memory_type": "entities"
}
-->