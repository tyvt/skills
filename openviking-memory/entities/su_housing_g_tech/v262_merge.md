# 子模块 zhi2-web-admin v2.6.2 合并
苏住房G 子模块 zhi2-web-admin 已完成 develop/v2.6.2 → develop/v2.6.2-suzhufang 的合并，提交 c828f7ebf。

## 冲突处理原则
- 业务逻辑冲突：保留苏住房分支（HEAD）
- Bug 修复：采用 v2.6.2 修复

## 冲突文件处理明细（20 个）
- 保留苏住房业务逻辑（15 个）：高级查询组件（complexFieldConfig.js、zs-advanced-query.vue）、公共查询模块（complex、companyProjectStats、dualPublicityStats、buildingTable）、渠道管理（paymentChannel）、划拨通知/账单/用款申请/银行回单等详情页、优惠弹窗字段配置
- 采用 v2.6.2 Bug 修复（1 个）：serviceItem/detail.vue — 服务内容表格展示修复
- 合并双方改动（4 个）：index.scss（保留苏住房布局选择器 + 采用 v2.6.2 表格高度修复）、property/complex/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：高级查询组件、serviceItem/detail.vue、index.scss、property/complex/index.vue 等
- 所属项目：苏住房G；来源会话：fb857748-af92-4775-bcff-a46d38cd48d4

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "v262_merge",
  "source_extraction_id": "f2074fcee61d4e23857dd9d56f0de7d1",
  "version": 1,
  "memory_type": "entities"
}
-->