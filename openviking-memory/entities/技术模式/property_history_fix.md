# 前期物业合同历史维护误走审批修复
产品2.0前期物业服务合同备案详情页未传递路由`ifHistory`参数，导致历史合同维护仍走审批，已修复。

## 根因
- 列表页点击「历史合同维护」时路由正确带上 `ifHistory=1`（path/add, query: formMode=add, direct=1, ifHistory=1）
- `propertyContractTemporary/detail.vue` 未读取并传递该参数，子组件 `ifHistory` 用默认值 `0`
- 提交请求体为 `ifHistory: 0`，仍走审批流程

## 修复内容
- `propertyContractTemporary/detail.vue`：从 `$route.query.ifHistory` 读取并传值（转为数字 `1`）给 detail 组件
- `components/detail.vue` 的 `getForm()`：提交时优先取路由参数，其次表单数据，最后 prop

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`propertyContract/components/index.vue`、`propertyContractTemporary/detail.vue`、`components/detail.vue`
- 所属项目：产品2.0；来源会话：d952db17-fd70-47a3-8c5e-131e0f221118；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_history_fix",
  "source_extraction_id": "797be703d3f941b1800210066e40365e",
  "version": 1,
  "memory_type": "entities"
}
-->