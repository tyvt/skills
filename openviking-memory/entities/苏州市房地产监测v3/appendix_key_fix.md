# AppendixRequirementGrid Vue2 key 修复
修复了苏州市房地产监测V3中因 Vue2 不允许 template v-for 上写 key 导致的企业状态调整弹窗编译报错。

## 问题根因
- Vue 2（vite:vue2）不允许在 <template v-for> 上写 :key，key 必须落在真实 DOM 节点上，否则编译报错。

## 修复方案
- AppendixRequirementGrid.vue 从 <template v-for> 上移除 :key。
- 菜单行 <p>、卡片行 <div> 各自带上 :key。
- 卡片容器改为 v-else，与 v-if="item.isMenu" 成对，避免同一轮循环渲染两个节点。

## 验证与归属
- 涉及文件：AppendixRequirementGrid.vue、companyRecordAgency/detail.vue、AccountStateDialog.vue。
- 所属项目：苏州市房地产监测V3；来源会话：4f2bea14-4e58-49e2-9cdc-b2eb4273611d。
- 验证：保存后 Vite 正常编译；若 dev server 仍报错刷新或重启。该组件出现在机构入网详情等使用 AppendixPackageSection 的页面。

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3",
  "name": "appendix_key_fix",
  "source_extraction_id": "844cdb82624f4fef9399a4f794b17314",
  "version": 1,
  "memory_type": "entities"
}
-->