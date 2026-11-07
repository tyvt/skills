# 工单功能从榆林小程序迁移
苏住房C(zhi2-mobile-shimin)已从榆林小程序完成工单（报事报修）功能迁移，升级API并新增多个页面。

## 迁移内容
- API从旧`eventReport`切换为工单体系：列表`/property/workOrder/app/orders/page`、详情`/property/workOrder/app/orders/{id}`、提交`/property/workOrder/app/orders`、撤销`/property/workOrder/app/orders/withdraw`、分类`/property/workOrder/app/categories`、评价`/property/workOrder/satisfaction/app/evaluate`、指标`/property/workOrder/satisfaction/app/metrics/{id}`
- 新增5个页面+RepairCard：`index`(报修/报事Tab切换、筛选、搜索、底部固定按钮)、`add`(分类卡片式UI)、`submit`(表单提交、房屋/设备选择、图片上传、成功弹窗)、`chooseF`等

## 涉及文件与归属
- 文件：`src/pages_owner/repair/index.vue`、`add.vue`等，参考`榆林小程序/src/pages_owner/repair/index.vue`、`add.vue`
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：fd000b83-ec69-43c3-8313-394ae8ba40c3；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "work_order_migration",
  "source_extraction_id": "bf9a9e6490474d3899e2f109c73f11cf",
  "version": 1,
  "memory_type": "entities"
}
-->