# 操作前置守卫依赖缺失外键静默拦截
物业费账单列表点收款提示缺少物业管理区域信息且接口未发，根因为handlePay用列表行缺失的complexId做硬校验。

## 问题根因
- handlePay打开收款弹窗前用row.complexId做硬校验
- 列表分页接口返回行对象通常只带complexName等展示字段，不带关联外键complexId
- 守卫永远不过，收款弹窗和payDetail请求被静默拦截，仅一条业务提示无报错

## 解决方案
- 操作类前置守卫只校验发起操作必需的最小主键（如账单row.id），不校验列表行可能缺失的关联外键
- 弹窗打开后先调detail接口（/property/spFeeBill/payDetail/{billId}）取回complexId，再依赖该ID加载后续数据（如支付渠道listPayablePaymentChannel）
- 形成「主键校验→detail补ID→再拉依赖数据」顺序，凡列表行缺外键致按钮被拦/接口不发皆可套用

## 验证与归属
- 验证证据：会话eb97ca91修复方案为index.vue的handlePay只校验row?.id，collectionDialog.vue打开后先调GET /property/spFeeBill/payDetail/{billId}取complexId再加载支付渠道
- 涉及文件：zhi2-web-admin/src/views/property/spFeeBill/components/index.vue、collectionDialog.vue
- 所属项目：产品2.0；来源会话：eb97ca91-bf05-47bd-962a-06182b75ff56；代码基线：a357f32/075e6e9等（zhi2-web-admin子模块）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_fk_guard",
  "source_extraction_id": "fb402dbbd77a4c29a09d2ea0a800eb3b",
  "version": 1,
  "memory_type": "entities"
}
-->