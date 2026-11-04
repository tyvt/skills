# 单位标签按路由类型区分交存与代交
园区物管（相城G）中缴存通知表单的单位标签按路由类型统一由计算属性控制，避免硬编码占位符引用不存在的变量。

## 问题描述
- 手动硬编码改动导致表单占位符引用了不存在的变量，运行时报错
- 电梯缴存与初交单位代交两种路由的标签、占位符、校验提示分散硬编码，难以维护

## 解决方案
- 表单标签、占位符及校验提示统一通过 `companyUnitLabel` 计算属性控制
- 电梯缴存（路由 `elevator`）显示「资金交存单位」
- 初交单位代交（路由 `unit`）显示「资金代交单位」

## 验证与归属
- 涉及文件：d:/repository/相城G/src/views/repairFunds/deposit/depositnotice/detail.vue、d:/repository/相城G/src/views/repairFunds/deposit/depositnotice/index.vue
- 所属项目：相城G；代码基线：none
- 来源会话：77e0fe3d-4dd5-49c3-90b2-105aa977bf93；验证证据：extracted source=cursor project=相城G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unit_label_route",
  "source_extraction_id": "e69b5c4392454ad0aaa761388c263c0b",
  "version": 2,
  "memory_type": "entities"
}
-->