# 物业合同备案入口v-if隐藏修复
产品2.0多个物业相关组件因`v-if="!hasData"`在有数据时隐藏右上角备案入口，已修复为常显。

## 根因
- 多个子组件用 `v-if="!hasData"` 控制右上角备案入口，有数据时入口被隐藏
- 空数据时表格内「暂无数据，请先进行xxx备案」提示逻辑未改，仅右上角入口改为常显

## 修复内容
- `propertyContractTable.vue`：移除 `v-if="!hasData"`，物业合同备案入口常显
- `committeeTable.vue`：业委会/物管会备案入口常显，并删除仅用于控制显示的 `checkCommitteeDataFlags`
- `managementOrgPanel.vue`：移除 `v-if="!hasData"`，管理主体备案入口常显
- `regulatoryAccountPanel.vue`：移除 `v-if="!hasData"`，开户申请备案入口常显
- `detail.vue` 中「经营资产信息」备案按钮本身无 `v-if`，若仍看不到需排查 `showBenefitService`（benefit 服务健康检查）是否为 false

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`propertyContractTable.vue`、`committeeTable.vue`、`managementOrgPanel.vue`、`regulatoryAccountPanel.vue`
- 所属项目：产品2.0；来源会话：35553223-dace-4e9a-b3e2-6d7267b933f7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_entry_fix",
  "source_extraction_id": "797be703d3f941b1800210066e40365e",
  "version": 1,
  "memory_type": "entities"
}
-->