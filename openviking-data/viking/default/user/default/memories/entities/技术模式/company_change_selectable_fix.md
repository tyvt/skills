# 企业变更备案列表删除入口隐藏修复
苏州市房地产监测V3 中修复企业变更确认备案列表多选删除入口无法隐藏的问题。

## 根因
- `table.js` mixin 已有 `data.selectable: true`；Vue 2 中同名 `computed` 与 `data` 冲突时以 `data` 为准，导致 `v-if="selectable"` 恒为 true，多选列无法去除

## 修复内容
- 删除 computed 里的 `selectable`，在组件 `data()` 写 `selectable: !this.isChange`（组件 data 覆盖 mixin）
- 入网变更备案（`change/index` 传 `isChange=true`）时 `selectable` 为 false，整列勾选框不再渲染
- 提示刷新页面查看；dev 未热更新可强刷或重启 Vite

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`table.js`、`company/companyRecordAgency/change/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话：8530b5ce-8b7c-4942-9abf-bfbaed7a0d36；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_selectable_fix",
  "source_extraction_id": "6b2829c917c749e4b68d277d60842f1c",
  "version": 1,
  "memory_type": "entities"
}
-->