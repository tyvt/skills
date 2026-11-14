# 组件v-if="!hasData"隐藏有数据备案入口
多个子组件使用`v-if="!hasData"`控制右上角备案入口，有数据时入口隐藏，需移除判断令入口常显。

## 根因
- 多个子组件使用`v-if="!hasData"`控制右上角备案入口，有数据时入口隐藏。
- `detail.vue`经营资产信息备案按钮若缺失需排查`showBenefitService`为false。

## 解决方案
- `propertyContractTable.vue`、`managementOrgPanel.vue`、`regulatoryAccountPanel.vue`移除该判断令入口常显。
- `committeeTable.vue`入口常显并删除`checkCommitteeDataFlags`。
- 空数据表格内提示逻辑不变。

## 涉及文件
- 页面与子组件：src/views/publicQuery/complex/detail.vue、components/propertyContractTable.vue、components/committeeTable.vue、components/managementOrgPanel.vue、components/regulatoryAccountPanel.vue、components/advertiseTable.vue
- 模板工具：components/overviewSubTableTemplate.js

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/071.md
- 来源会话ID：35553223-dace-4e9a-b3e2-6d7267b933f7
- 代码基线：none
- 所属项目：产品2.0（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "hasdata_hides_entry",
  "source_extraction_id": "93fc02dc1e89499999a4e056d2d8c26e",
  "version": 2,
  "memory_type": "entities"
}
-->