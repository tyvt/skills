# 缴存模块共用组件
产品2.0 的 zhi2-web-admin 中电梯缴存、公共收益缴存、续筹缴存与资金补交共用 depositNotice/components/ 下组件，改一次覆盖四模块。

## 模块关系
- 电梯缴存、公共收益缴存、续筹缴存与资金补交共用 depositNotice/components/ 下组件
- 修改一次即可覆盖四个模块，避免重复维护

## 修复内容
- AccountDetailDialog.vue 改用 el-table 标准样式，新增 depositType 属性由父组件传入正确业务类型
- 修复从路由名推断 depositType 错误：benefit 应为 publicincome，renewal 应为 continuouspayment
- PaymentRangeTable.vue 向弹窗传 :deposit-type，单位代缴版同步修正 afterpayment/publicincome 大小写

## 涉及文件与归属
- 涉及文件：AccountDetailDialog.vue、PaymentRangeTable.vue、components/index.vue
- 所属项目：产品2.0；来源会话：83dd90e8-3c97-4a8a-a0a8-6a32cf5c91fe；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "deposit_shared_components",
  "source_extraction_id": "0d97247c6f304cc4a9cc4f1e6b453cb7",
  "version": 1,
  "memory_type": "entities"
}
-->
