# 开发企业列表默认已备案筛选修复
苏住房G 开发企业列表页进入时会默认按「已备案」筛选，与物业服务企业页行为一致。

## 修复方案
- 在 `develop/index.vue` 为列表组件增加 `defaultBizState="2"`
- 公共组件 `components/index.vue` 已支持该属性，页面加载和点击「重置」时把业务状态设为 `2`（已备案）

## 效果
- 刷新开发企业页面后，业务状态下拉框默认显示「已备案」，列表按该条件查询

## 验证与归属
- 涉及文件：`zhi2-web-admin/src/views/company/companyManagement/develop/index.vue`、`components/index.vue`
- 所属项目：苏住房G；来源会话：9746fea2-a8bc-4394-9108-c849aad1148f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "develop_bizstate_fix",
  "source_extraction_id": "ae55cc6b3935446799466a4196796bb8",
  "version": 1,
  "memory_type": "entities"
}
-->