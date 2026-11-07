# 配套用房更名及封闭设施删除回写风险
苏州市房地产监测V3 中配套用房模块已统一命名但侧栏旧名需后台改，且删除封闭设施字段可能因 detailMixins 回写需保存前过滤。

## 问题根因
- 仓库无‘小区配套用房’文案，配套用房模块已统一命名，侧栏旧名需后台菜单改
- detail.vue 删除封闭设施表单及字段，但详情接口返回字段经 detailMixins 可能回写

## 改动内容
- 在 detail.vue 删除封闭设施表单及字段
- 彻底剔除需在保存前过滤经 detailMixins 可能回写的字段

## 涉及文件
- zhi2-web-admin/src/views/projectManagement/auxiliaryProject/detail.vue
- zhi2-web-admin/src/views/projectManagement/auxiliaryProject/index.vue
- zhi2-web-admin/src/views/projectManagement/auxiliaryProject/components/houseTable.vue
- zhi2-web-admin/src/views/projectManagement/auxiliaryProject/components/houseDialog.vue
- 苏州市房地产监测V3/路由信息.json

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/141.md
- 来源会话ID：0fcad87d-b6db-4906-a704-25d2a6908a00
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auxiliary_house_rename",
  "source_extraction_id": "0925c1b461604fd789523e8d04997112",
  "version": 1,
  "memory_type": "entities"
}
-->